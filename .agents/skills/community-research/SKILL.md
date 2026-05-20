---
name: community-research
description: research public and permissioned communities, search results, short-form platforms, and public documents to find recurring questions, audience pains, viral hooks, and source-backed lead magnet opportunities for mindx data, itba, and ai campaigns.
---

# Community Research

## Objective

Turn raw public/community signals into a structured research digest and source log for MindX lead magnet production.

## Required inputs

- Campaign brief from `production_artifacts/00_brief.md`.
- Target track: Data, ITBA, AI, or mixed.
- Target persona or audience hypothesis.
- Research scope: platforms, language, date range, competitors/creators, keywords.

## Workflow

1. **Read the brief.** Identify persona, track, business goal, output format, and CTA.
2. **Build a query map.** Include Vietnamese and English query variants for pains, roles, tools, learning roadmap, portfolio, interview, career switch, AI workflows, and objections.
3. **Collect only allowed sources.** Use public or permissioned sources only. Do not scrape private groups, paywalled resources, personal data, or copyrighted documents that are not safe to reuse.
4. **Extract signals.** For each source, capture audience question, pain, engagement signal, hook, core insight, source quality, copyright risk, and MindX fit.
5. **Update `source_log.csv`.** Every meaningful source should have a row. Paraphrase insights instead of copying source text.
6. **Synthesize `01_research_digest.md`.** Group insights into recurring questions, viral patterns, misconceptions, localization opportunities, and early idea pool.
7. **Flag gaps.** Mark missing data, weak sources, claims requiring fact-check, and areas needing human input.

## Output format

Produce:

1. Updated `production_artifacts/source_log.csv` rows.
2. `production_artifacts/01_research_digest.md` using these sections:
   - research scope recap,
   - top recurring questions,
   - viral/engagement patterns,
   - English-source insights worth localizing,
   - misconceptions and objections,
   - source quality notes,
   - initial idea pool.

## Quality checklist

- At least 15-30 sources for a normal campaign unless the brief is intentionally narrow.
- Both Vietnamese and English sources when relevant.
- No private personal data copied into outputs.
- No long verbatim excerpts.
- Insights are paraphrased and connected to possible lead magnet angles.
- Sources with weak evidence are clearly marked.

## Reference

Use `references/research-playbook.md` for query patterns, source schema, and extraction guidance.
