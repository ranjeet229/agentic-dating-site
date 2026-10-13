# Pairwise Agents

Consent-first, agentic dating demo. Each fictional demo participant has an agent that uses only voluntarily supplied information and permitted source summaries to create explainable rankings and safe, low-pressure date simulations.

## Architecture
`Next.js UI → API routes → Mongoose/MongoDB (when configured) → deterministic agent engine / optional Gemini`

## Setup

1. `npm install`
2. Set `MONGODB_URI`, `GEMINI_API_KEY`, and `GEMINI_MODEL` in `.env`.
3. `npm run dev`

The app works immediately without a database using an in-memory demo dataset of 25 adult, opt-in fictional participants. With Mongo configured, new participant and consent records persist through Mongoose. Run `npm run seed` after connecting MongoDB for production seeding. Gemini is optional: its JSON-only adapter reads `GEMINI_API_KEY` and `GEMINI_MODEL`; the deterministic, validated local agent remains the fallback.

## Responsible data

No scraping, authentication bypasses, or private-profile access. The provider adapter is deliberately a placeholder until an approved provider is configured. It never infers sensitive traits. Rankings are transparent decision support, not recommendations.

## Testing and deployment

Run `npm test` and `npm run build`. Deploy on Vercel with the environment values added in Project Settings; use MongoDB Atlas for persistent storage. Screenshot placeholders: landing, demo dashboard, profile, date, rankings.
