---
name: viral-opportunity-scoring
description: score and prioritize lead magnet ideas from research logs for mindx data, itba, and ai campaigns using audience fit, pain urgency, repetition, shareability, novelty, mindx positioning fit, conversion potential, and source quality.
---

# Viral Opportunity Scoring

## Objective

Convert messy research findings into a ranked shortlist of lead magnet ideas that are likely to attract the right leads and fit MindX.

## Required inputs

- `production_artifacts/source_log.csv`
- `production_artifacts/01_research_digest.md`
- Campaign brief from `production_artifacts/00_brief.md`
- Brand inputs if available

## Workflow

1. **Create idea candidates.** Cluster source insights into 5-15 possible lead magnet ideas.
2. **Score each idea out of 100.** Use the weighted rubric in `references/scoring-rubric.md`.
3. **Apply penalties.** Penalize copyright risk, unsupported claims, generic saturation, outdatedness, weak offer fit, or unsafe claims.
4. **Recommend top ideas.** Select top 3-5 ideas, explaining why they can spread and why they fit MindX.
5. **Define format and CTA.** For each top idea, propose lead magnet format, reader promise, CTA bridge, and production complexity.
6. **Flag risks.** List source gaps, fact-check needs, approval needs, and content differentiation requirements.

## Output format

Create/update `production_artifacts/02_idea_shortlist.md` with:

- scoring summary table,
- top idea detail,
- recommended format,
- why now,
- why MindX,
- risks and mitigations,
- ideas to park for later.

## Decision rules

- 80-100: strong candidate; proceed if source/copyright risk is manageable.
- 70-79: usable; improve angle or proof before drafting.
- 60-69: park or research more.
- Below 60: do not produce unless strategic reason exists.

## Quality checklist

- Top idea is not selected only because it sounds catchy.
- Scoring includes evidence from source log.
- MindX fit and conversion fit are both considered.
- Risky ideas are not allowed to pass silently.
- Final shortlist includes a practical format, not just a title.

## Reference

Use `references/scoring-rubric.md` for weights, penalties, and example interpretation.
