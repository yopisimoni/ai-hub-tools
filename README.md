# AI Tools Hub + AI Ops Router

A public Next.js / TypeScript project that combines an AI tools discovery prototype with a practical automation proof project.

## Featured engineering proof: AI Ops Router

The **AI Ops Router** turns an unstructured business request into a structured operational action.

Flow:

1. User submits a free-text request.
2. Server validates the payload with Zod.
3. Gemini is used when an AI provider key is configured.
4. A deterministic rules fallback keeps the demo functional without secrets.
5. The result contains category, priority, summary, destination, and recommended action.
6. The server can optionally persist the result to Supabase through REST.
7. The server can optionally trigger an n8n webhook for downstream automation.

Route:

`/automation-lab`

### What this demonstrates

- Next.js App Router
- TypeScript
- React client state
- Server-side API routes
- Zod validation
- Genkit + Google AI integration
- Safe fallback behavior
- Supabase REST persistence pattern
- n8n webhook handoff
- Separation of client and server credentials
- Responsive product UI
- Automation-oriented product thinking

### Key files

- `src/app/automation-lab/page.tsx` — interactive product UI
- `src/app/api/triage/route.ts` — validation, AI triage, persistence, workflow handoff
- `docs/automation-lab/supabase.sql` — Supabase table and RLS setup
- `docs/automation-lab/n8n-workflow.json` — importable n8n workflow example

## AI Tools Hub

The original product concept is a community-oriented AI tools discovery experience for finding, comparing, ranking, and discussing useful AI products.

Core product ideas:

- Discover AI tools
- Compare categories and options
- Save favorites
- Share comments and feedback
- Create a personalized account experience

## Main stack

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Genkit
- Google AI
- Firebase-oriented infrastructure
- Zod
- React Query
- Lucide icons

## Development

```bash
npm install
npm run dev
```

Then open the local development URL shown in the terminal.

Run type checking with:

```bash
npm run typecheck
```

## Automation integration setup

The AI Ops Router works in deterministic demo mode with no external secrets.

For a fully connected environment, configure server-side credentials for:

- Gemini / Google AI
- Supabase
- n8n webhook delivery

Do not expose database service credentials in browser-side variables or committed files.

## Status

**Public portfolio / engineering proof project.**

The AI Ops Router code is implemented in the repository. Hosting for the server-side automation route still needs to be configured before the interactive demo is publicly deployed.

---

Built by [Simohamed Amara](https://yopisimoni.github.io)  
[Professional portfolio](https://yopisimoni.github.io) · [GitHub profile](https://github.com/yopisimoni)
