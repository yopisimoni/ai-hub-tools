import { NextResponse } from "next/server";
import { z } from "zod";
import { ai } from "@/ai/genkit";

const RequestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  request: z.string().trim().min(12).max(4000),
});

const TriageSchema = z.object({
  category: z.string().min(2).max(80),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  summary: z.string().min(5).max(500),
  suggestedAction: z.string().min(5).max(500),
  destination: z.string().min(2).max(120),
});

type Input = z.infer<typeof RequestSchema>;
type Triage = z.infer<typeof TriageSchema>;

export async function POST(req: Request) {
  try {
    const input = RequestSchema.parse(await req.json());

    const aiResult = await classifyWithAI(input).catch(() => null);
    const triage = aiResult ?? classifyWithRules(input.request);

    const persisted = await persistToSupabase(input, triage);
    const workflowTriggered = await triggerN8n(input, triage);

    return NextResponse.json({
      ...triage,
      source: aiResult ? "gemini" : "rules",
      persisted,
      workflowTriggered,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? "Invalid request." },
        { status: 400 }
      );
    }

    console.error("triage_error", error);
    return NextResponse.json({ error: "Unable to process the request." }, { status: 500 });
  }
}

async function classifyWithAI(input: Input): Promise<Triage> {
  if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_GENAI_API_KEY) {
    throw new Error("No AI provider key configured.");
  }

  const prompt = [
    "You are an operations triage system.",
    "Classify the business request below and return ONLY a JSON object with no markdown.",
    'Schema: {"category":"string","priority":"low|medium|high|urgent","summary":"string","suggestedAction":"string","destination":"string"}',
    "Use concise business language.",
    "Priority guidance: urgent = production/revenue/security outage; high = time-sensitive customer or sales issue; medium = normal actionable work; low = informational/non-urgent.",
    "",
    "Name: " + input.name,
    "Email: " + input.email,
    "Request: " + input.request,
  ].join("\n");

  const generated = await ai.generate({ prompt });
  const text = generated.text.trim();

  return TriageSchema.parse(JSON.parse(text));
}

function classifyWithRules(request: string): Triage {
  const text = request.toLowerCase();

  const urgentWords = [
    "down",
    "outage",
    "cannot pay",
    "can't pay",
    "payment failing",
    "security",
    "breach",
    "production broken",
  ];
  const salesWords = ["quote", "customer", "client", "demo", "proposal", "sales", "lead"];
  const technicalWords = [
    "bug",
    "error",
    "failing",
    "broken",
    "api",
    "deployment",
    "checkout",
    "mobile",
    "website",
  ];
  const contentWords = ["post", "content", "linkedin", "article", "newsletter", "social"];

  if (urgentWords.some((word) => text.includes(word))) {
    return {
      category: "Production / Technical Incident",
      priority: "urgent",
      summary: "A production-impacting technical issue needs immediate investigation.",
      suggestedAction:
        "Capture reproduction details and recent changes, notify the technical owner, and begin incident triage before making unrelated changes.",
      destination: "Engineering · Incident queue",
    };
  }

  if (salesWords.some((word) => text.includes(word))) {
    return {
      category: "Sales / Opportunity",
      priority: "high",
      summary: "A potential customer or commercial opportunity requires a timely response.",
      suggestedAction:
        "Create a qualified lead record, summarize the requested scope, and schedule a response with the relevant commercial owner.",
      destination: "Sales · Qualified leads",
    };
  }

  if (technicalWords.some((word) => text.includes(word))) {
    return {
      category: "Technical Request",
      priority: "high",
      summary: "A technical issue or implementation request needs engineering review.",
      suggestedAction:
        "Capture the environment, reproduction steps, expected behavior, and assign the item to engineering for scoped investigation.",
      destination: "Engineering · Triage",
    };
  }

  if (contentWords.some((word) => text.includes(word))) {
    return {
      category: "Content / Marketing",
      priority: "medium",
      summary: "A content or publishing request should enter the editorial workflow.",
      suggestedAction:
        "Extract deliverables, channel, deadline, and approval owner, then route the request into the content review queue.",
      destination: "Marketing · Content queue",
    };
  }

  return {
    category: "General Operations",
    priority: "medium",
    summary: "A general business request requires structured review and assignment.",
    suggestedAction:
      "Confirm the desired outcome, owner, deadline, and dependencies before assigning the request to the appropriate operations queue.",
    destination: "Operations · General queue",
  };
}

async function persistToSupabase(input: Input, triage: Triage): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return false;

  const response = await fetch(url + "/rest/v1/automation_requests", {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: "Bearer " + serviceKey,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      requester_name: input.name,
      requester_email: input.email,
      request_text: input.request,
      category: triage.category,
      priority: triage.priority,
      summary: triage.summary,
      suggested_action: triage.suggestedAction,
      destination: triage.destination,
    }),
    cache: "no-store",
  });

  return response.ok;
}

async function triggerN8n(input: Input, triage: Triage): Promise<boolean> {
  const webhook = process.env.N8N_WEBHOOK_URL;
  if (!webhook) return false;

  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: "request.triaged",
      timestamp: new Date().toISOString(),
      requester: { name: input.name, email: input.email },
      request: input.request,
      triage,
    }),
    cache: "no-store",
  });

  return response.ok;
}
