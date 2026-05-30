# Content pipeline (spec §4.5 / §4.15)

Transforms Meeton's own data into AEO-ready articles. The LLM never invents
figures — every stat is grounded in `app/lib/grounding.ts`, and a fact-check
gate verifies it.

## Flow
`plan(KW) → dedup(KW→URL) → RAG-ground → draft(結論先出し/Q&A) → QA gate 1/2/3 → MDX draft`

- **Gate 0 — dedup**: a KW already owned by a pillar or an existing draft is skipped (cannibalization guard).
- **Gate 1 — grounding**: no grounding rows for the cluster → skip (no thin freeform).
- **Gate 2 — fact-check**: every numeric/percentage token in the draft must appear in the grounding values; otherwise `factCheckPassed:false` and the draft is flagged.
- **Gate 3 — human review**: BOFU (or any fact-check miss) → `needsHumanReview:true`. Human does the final check before publish (§4.5).

## Run
```bash
bun scripts/content-pipeline/generate.ts          # all planned KWs
bun scripts/content-pipeline/generate.ts library  # one cluster
```
Without `ANTHROPIC_API_KEY` it dry-runs (plan + dedup only). With the key it
writes `content/drafts/<slug>.mdx` (frontmatter carries the QA verdict).

## Source of truth
- `app/lib/content-clusters.ts` — clusters + KW→URL map + pillar links.
- `app/lib/grounding.ts` — approved, sourced facts (the ONLY numbers allowed).
- `PLAN` in `generate.ts` — planned new-article KWs (1 KW = 1 intent = 1 URL).

## Publish (separate, deliberate step)
Reviewed drafts → Notion (existing blog render) → hit
`/api/revalidate?secret=…&path=/blog/<slug>/` which revalidates + pings
IndexNow (`app/lib/indexnow.ts`). BOFU must be human-approved first.
