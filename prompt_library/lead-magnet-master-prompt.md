# Lead Magnet Master Prompt

## Purpose

Dùng khi muốn AI chạy toàn bộ quy trình tạo lead magnet từ brief, nguồn research, USP MindX và persona.

## Best used when

- Đã có `00_brief.md`.
- Đã có hoặc sẽ tạo `source_log.csv`.
- Cần một bản draft hoàn chỉnh có CTA và QA checklist.

## Inputs

- `{brief}`: nội dung `00_brief.md`.
- `{brand_inputs}`: USP, proof, tone, CTA của MindX.
- `{source_log}`: bảng nguồn research.
- `{selected_track}`: Data / ITBA / AI.
- `{target_persona}`: nhóm khách hàng mục tiêu.
- `{output_format}`: ebook / checklist / roadmap / workbook / prompt pack / template pack.

## Prompt

Act as a lead magnet strategist, community researcher, positioning strategist, and conversion editor for MindX.

Context:
MindX needs high-quality lead magnets for audiences interested in Data, ITBA, and AI. The asset must be useful enough to download/share, credible enough for an education brand, and aligned with MindX positioning. Do not invent MindX claims that are not present in the provided brand inputs.

Goal:
Create a source-backed lead magnet concept, outline, and draft that turns public community insights into a MindX-owned educational asset.

Inputs:
- Brief: `{brief}`
- MindX brand inputs: `{brand_inputs}`
- Source log: `{source_log}`
- Track: `{selected_track}`
- Persona: `{target_persona}`
- Output format: `{output_format}`

Process:
1. Summarize the strongest audience pains and repeated questions from the source log.
2. Score 5-10 possible lead magnet ideas using audience fit, pain urgency, shareability, novelty, MindX fit, conversion potential, and source credibility.
3. Recommend the top idea and explain why it should be produced now.
4. Build a persona/JTBD analysis for the selected idea.
5. Create a MindX positioning brief using only approved brand inputs.
6. Draft the outline and full lead magnet in Vietnamese.
7. Add CTA, source notes, and QA checklist.

Output format:
1. Research digest
2. Idea scoring table
3. Selected idea
4. Persona/JTBD
5. MindX positioning
6. Outline
7. Draft
8. CTA package
9. QA checklist

Quality checklist:
- Uses source-backed insights, not generic assumptions.
- Does not copy source wording or proprietary frameworks.
- Does not overclaim about jobs, salary, or guaranteed outcomes.
- Makes the reader able to do something practical after reading.
- Includes a natural bridge to MindX.
- Clearly flags claims requiring approval.

Before answering, resolve ambiguity with reasonable assumptions unless the missing information would create factual or brand risk.

## Version notes

- v1.0: initial workspace prompt.
