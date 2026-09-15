"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  Database,
  GitBranch,
  Loader2,
  Sparkles,
  Workflow,
} from "lucide-react";

type TriageResult = {
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  summary: string;
  suggestedAction: string;
  destination: string;
  source: "gemini" | "rules";
  persisted: boolean;
  workflowTriggered: boolean;
};

const examples = [
  {
    label: "Sales lead",
    text: "A potential customer wants a quote for a multilingual marketplace and needs a call this week.",
  },
  {
    label: "Technical issue",
    text: "Checkout is failing on mobile Safari after yesterday's deployment and customers cannot complete payment.",
  },
  {
    label: "Content request",
    text: "We need five LinkedIn posts from our latest product announcement, ready for review before publishing.",
  },
];

export default function AutomationLabPage() {
  const [request, setRequest] = useState(examples[0].text);
  const [name, setName] = useState("Demo visitor");
  const [email, setEmail] = useState("demo@example.com");
  const [result, setResult] = useState<TriageResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, request }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to process the request.");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const integrationLabel = result
    ? (result.persisted ? "Supabase ✓" : "Supabase demo") +
      " · " +
      (result.workflowTriggered ? "n8n ✓" : "n8n demo")
    : "";

  return (
    <main className="min-h-screen bg-[#07090d] text-zinc-100">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            AI Tools Hub
          </Link>
          <a
            href="https://yopisimoni.github.io"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-amber-200/20 bg-amber-200/5 px-4 py-2 text-xs font-semibold text-amber-100 transition hover:bg-amber-200/10"
          >
            Simohamed Amara · Portfolio
          </a>
        </header>

        <section className="grid gap-10 py-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3 py-1.5 text-xs font-semibold text-cyan-200">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.8)]" />
              Public automation proof project
            </div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-amber-200">
              Next.js · TypeScript · AI · Supabase REST · n8n
            </p>
            <h1 className="max-w-3xl text-5xl font-black tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
              AI Ops Router
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              A working request-triage workflow that turns unstructured business requests into
              structured actions. It classifies the request, assigns priority, recommends the next
              step, optionally stores the record in Supabase, and can trigger an n8n workflow.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["01", "Triage", "Convert messy requests into structured data."],
                ["02", "Persist", "Save the result through a server-side Supabase REST call."],
                ["03", "Route", "Trigger n8n when a webhook is configured."],
              ].map(([num, title, copy]) => (
                <div
                  key={num}
                  className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"
                >
                  <span className="text-[10px] font-bold tracking-[0.18em] text-amber-200">{num}</span>
                  <h2 className="mt-4 text-sm font-bold text-white">{title}</h2>
                  <p className="mt-2 text-xs leading-5 text-zinc-500">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0d1117] p-6 shadow-2xl shadow-black/40">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-300/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-amber-200/10 blur-3xl" />

            <div className="relative grid gap-3">
              {[
                [Bot, "AI classification", "Gemini when configured · deterministic fallback otherwise"],
                [Database, "Data layer", "Supabase REST persistence from the server route"],
                [Workflow, "Automation", "Optional n8n webhook for routing and downstream actions"],
                [GitBranch, "Product logic", "Priority, category, destination and suggested next step"],
              ].map(([Icon, title, copy]) => {
                const Component = Icon as typeof Bot;
                return (
                  <div
                    key={String(title)}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-amber-200/15 bg-amber-200/5 text-amber-100">
                      <Component className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{String(title)}</h3>
                      <p className="mt-1 text-xs leading-5 text-zinc-500">{String(copy)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid gap-6 pb-16 lg:grid-cols-[.9fr_1.1fr]">
          <form
            onSubmit={submit}
            className="rounded-[26px] border border-white/10 bg-[#0c1015] p-6 sm:p-7"
          >
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-200">
                Try the workflow
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
                Submit a business request
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-xs font-semibold text-zinc-400">
                Name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm text-white outline-none transition focus:border-amber-200/40"
                  required
                />
              </label>
              <label className="grid gap-2 text-xs font-semibold text-zinc-400">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm text-white outline-none transition focus:border-amber-200/40"
                  required
                />
              </label>
            </div>

            <label className="mt-4 grid gap-2 text-xs font-semibold text-zinc-400">
              Request
              <textarea
                value={request}
                onChange={(event) => setRequest(event.target.value)}
                rows={7}
                minLength={12}
                className="resize-none rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-sm leading-6 text-white outline-none transition focus:border-amber-200/40"
                required
              />
            </label>

            <div className="mt-4 flex flex-wrap gap-2">
              {examples.map((example) => (
                <button
                  key={example.label}
                  type="button"
                  onClick={() => setRequest(example.text)}
                  className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[10px] font-semibold text-zinc-400 transition hover:border-white/20 hover:text-white"
                >
                  {example.label}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-between rounded-xl bg-gradient-to-b from-amber-100 to-amber-300 px-4 py-3 text-sm font-black text-[#171108] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="inline-flex items-center gap-2">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {loading ? "Running workflow..." : "Run AI triage"}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {error && (
              <p className="mt-4 rounded-xl border border-red-400/20 bg-red-400/5 p-3 text-xs text-red-200">
                {error}
              </p>
            )}
          </form>

          <div className="rounded-[26px] border border-white/10 bg-[#0c1015] p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
                  Structured result
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
                  Automation output
                </h2>
              </div>
              {result && (
                <span className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  {result.source === "gemini" ? "Gemini AI" : "Safe demo fallback"}
                </span>
              )}
            </div>

            {!result ? (
              <div className="mt-8 grid min-h-[430px] place-items-center rounded-2xl border border-dashed border-white/10 bg-black/10 p-8 text-center">
                <div className="max-w-sm">
                  <Bot className="mx-auto h-9 w-9 text-zinc-600" />
                  <h3 className="mt-4 text-sm font-bold text-zinc-300">Waiting for a request</h3>
                  <p className="mt-2 text-xs leading-6 text-zinc-600">
                    Run the form to see category, priority, destination, suggested action, persistence
                    status, and workflow status.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-7 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <ResultCard label="Category" value={result.category} />
                  <ResultCard label="Priority" value={result.priority.toUpperCase()} />
                  <ResultCard label="Destination" value={result.destination} />
                  <ResultCard label="Integrations" value={integrationLabel} />
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">
                    Summary
                  </span>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{result.summary}</p>
                </div>

                <div className="rounded-2xl border border-amber-200/15 bg-amber-200/[0.035] p-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber-200">
                    Recommended next action
                  </span>
                  <p className="mt-3 text-sm leading-7 text-zinc-200">{result.suggestedAction}</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                  Server-side validation completed before routing.
                </div>
              </div>
            )}
          </div>
        </section>

        <footer className="border-t border-white/10 py-7 text-xs text-zinc-600">
          Built as a public engineering proof project by{" "}
          <a
            href="https://yopisimoni.github.io"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-300 hover:text-white"
          >
            Simohamed Amara
          </a>
          .
        </footer>
      </div>
    </main>
  );
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-600">{label}</span>
      <p className="mt-2 text-sm font-bold text-white">{value}</p>
    </div>
  );
}
