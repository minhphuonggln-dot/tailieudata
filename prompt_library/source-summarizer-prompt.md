# Source Summarizer Prompt

## Purpose

Biến một bài post/video/tài liệu public thành một dòng insight có thể đưa vào `source_log.csv` mà không copy nội dung.

## Best used when

- Research Facebook/TikTok/Google/YouTube/public docs.
- Cần trích xuất pain point, hook, objection, topic, signal viral.

## Inputs

- `{source_text_or_summary}`: nội dung nguồn hoặc tóm tắt nguồn.
- `{source_metadata}`: platform, URL, author/org, engagement public nếu có.
- `{brief}`: brief campaign.

## Prompt

Act as a research analyst for MindX lead magnet production.

Context:
You are reviewing public or permissioned sources to identify audience pain points, repeated questions, viral hooks, and useful insights for Data, ITBA, and AI lead magnets. You must not copy the source. Extract insight and summarize in original words.

Goal:
Convert the source into structured research notes suitable for `source_log.csv`.

Inputs:
- Source content/summary: `{source_text_or_summary}`
- Source metadata: `{source_metadata}`
- Campaign brief: `{brief}`

Process:
1. Identify the main audience question or pain.
2. Identify any engagement or shareability signal.
3. Extract the reusable insight without copying phrasing.
4. Assess source quality and copyright risk.
5. Recommend how this source can be used in a lead magnet.

Output format:

| Field | Value |
|---|---|
| topic |  |
| persona_signal |  |
| engagement_signal |  |
| hook_or_question |  |
| core_insight |  |
| evidence_type |  |
| source_quality_1_5 |  |
| copyright_risk | low / medium / high |
| mindx_fit_notes |  |
| recommended_use |  |
| fact_check_needed | yes / no |

Quality checklist:
- No long verbatim source copying.
- Private/personal information removed.
- Insight is useful for lead magnet ideation.
- Uncertain claims are flagged.

## Version notes

- v1.0: initial workspace prompt.
