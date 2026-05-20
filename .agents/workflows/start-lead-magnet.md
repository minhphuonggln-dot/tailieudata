# Workflow - Start Lead Magnet

## Trigger

Dùng workflow này khi team muốn sản xuất một lead magnet mới cho Data, ITBA hoặc AI.

## Required inputs

- `production_artifacts/00_brief.md`
- `brand_inputs/mindx_usp.md`
- `brand_inputs/content_direction.md`
- `brand_inputs/proof_assets.md`

## Step 0 - Brief readiness check

Owner: Lead Magnet Orchestrator

1. Đọc `00_brief.md`.
2. Kiểm tra các trường tối thiểu: track, persona, business goal, research scope, output format, CTA.
3. Nếu thiếu thông tin không gây rủi ro, tự đặt assumption và ghi vào “Assumptions”.
4. Nếu thiếu thông tin gây rủi ro brand/fact, tạo “Questions requiring human input”.

## Step 1 - Community research

Owner: Community Research Analyst

Use skill: `community-research`

Output:
- Update `source_log.csv`.
- Create/update `01_research_digest.md`.

Minimum bar:
- 15-30 nguồn cho campaign thường.
- Cả tiếng Việt và tiếng Anh nếu brief cho phép.
- Có ít nhất 5 insight từ câu hỏi/comment/pain thật nếu nguồn public có sẵn.

## Step 2 - Viral opportunity scoring

Owner: Viral Opportunity Strategist

Use skill: `viral-opportunity-scoring`

Output:
- `02_idea_shortlist.md`
- Top 3-5 ideas, score, risks, suggested format.

Human checkpoint:
- Team chọn 1 idea chính để đi tiếp.
- Nếu không có idea nào trên 70/100, quay lại research hoặc đổi angle.

## Step 3 - Persona/JTBD analysis

Owner: Persona/JTBD Strategist

Use skill: `persona-jtbd-analysis`

Output:
- `03_persona_jtbd.md`

Minimum bar:
- Có functional, emotional, social jobs.
- Có objections và language bank.
- Có conversion implication.

## Step 4 - MindX positioning

Owner: MindX Positioning Strategist

Use skill: `mindx-positioning`

Output:
- `04_positioning_brief.md`

Human checkpoint:
- Duyệt claim về MindX, proof, CTA.
- Nếu USP/proof chưa đủ, đánh dấu “requires approval” thay vì tự bịa.

## Step 5 - Draft lead magnet

Owner: Lead Magnet Writer

Use skill: `lead-magnet-drafting`

Output:
- `05_outline.md`
- `06_draft.md`

Minimum bar:
- Có title/subtitle.
- Có “who this is for/not for”.
- Có framework/checklist/template/exercise.
- Có CTA tự nhiên.
- Có source notes.

## Step 6 - Editorial and conversion QA

Owner: Editorial & Conversion QA

Use skill: `editorial-conversion-qa`

Output:
- `07_qa_report.md`

Decision:
- `pass`: có thể đưa qua design/publish.
- `pass with edits`: sửa nhỏ rồi publish.
- `needs revision`: quay lại drafting/positioning.
- `blocked`: thiếu source/proof/approval nghiêm trọng.

## Step 7 - Publish package extraction

Sau khi QA pass, tạo thêm các asset phụ nếu cần:

- Landing page hero copy.
- 5 social post angles.
- 3 email subject lines.
- Ads angle.
- Sales/admission follow-up script.

Các asset phụ nên được tạo từ bản final, không tạo trước khi QA pass.
