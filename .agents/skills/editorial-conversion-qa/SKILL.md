---
name: editorial-conversion-qa
description: review final mindx lead magnet drafts for source support, originality, copyright safety, persona fit, mindx positioning, practical usefulness, conversion clarity, readability, and design readiness before publishing.
---

# Editorial Conversion QA

## Objective

Protect quality before publishing: make sure the lead magnet is credible, useful, original, on-brand, and conversion-ready.

## Required inputs

- `production_artifacts/06_draft.md`
- `production_artifacts/source_log.csv`
- `production_artifacts/04_positioning_brief.md`
- `brand_inputs/mindx_usp.md`
- `.agents/rules/mindx-lead-magnet-rules.md`

## Workflow

1. **Check source support.** Every major factual claim should be supported by source log, brand inputs, or marked for fact-check.
2. **Check originality and copyright.** Ensure the draft is a synthesis and not copied from a public source, creator, competitor, or paid resource.
3. **Check persona fit.** Verify that title, examples, language, objections, and exercises match the target persona/JTBD.
4. **Check MindX positioning.** Confirm the POV, proof, tone, and CTA align with approved brand inputs.
5. **Check practical usefulness.** The asset must include at least one actionable checklist, template, exercise, decision tree, or workflow.
6. **Check conversion clarity.** CTA should be relevant, helpful, and not too early or too aggressive.
7. **Check readability.** Improve structure, headings, scannability, examples, and jargon explanations.
8. **Check design readiness.** Flag tables, diagrams, worksheets, callouts, and sections requiring visual treatment.
9. **Write QA decision.** Pass, pass with edits, needs revision, or blocked.

## Output format

Create/update `production_artifacts/07_qa_report.md` with:

- approval status,
- QA scorecard,
- critical issues,
- fact-check list,
- final edits to make,
- publish readiness checklist.

## Severity definitions

- **Critical:** Legal, copyright, privacy, unsupported major claim, false MindX claim, unsafe promise.
- **Major:** Weak persona fit, vague CTA, missing utility, unsupported but non-critical claim.
- **Minor:** Grammar, formatting, clarity, section ordering, design note.

## Pass criteria

- No critical issues.
- Source support score at least 4/5.
- Practical usefulness score at least 4/5.
- MindX positioning score at least 4/5.
- Conversion clarity score at least 3/5.

## Quality checklist

- QA comments are actionable and specific.
- Required fixes identify exact sections.
- Risky claims are rewritten or flagged.
- The report helps a writer make the asset publish-ready.

## Reference

Use `references/qa-scorecard.md` for scoring criteria and pass/fail thresholds.
