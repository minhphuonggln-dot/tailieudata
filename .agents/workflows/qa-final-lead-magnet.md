# Workflow - QA Final Lead Magnet

## Trigger

Dùng khi `06_draft.md` đã có bản gần cuối và cần kiểm tra trước khi đưa qua design/publish.

## Inputs

- `production_artifacts/06_draft.md`
- `production_artifacts/source_log.csv`
- `production_artifacts/04_positioning_brief.md`
- `brand_inputs/mindx_usp.md`
- `.agents/rules/mindx-lead-magnet-rules.md`

## Steps

1. Dùng `editorial-conversion-qa` để kiểm tra draft theo 8 dimension:
   - source support,
   - copyright/originality,
   - persona fit,
   - MindX positioning,
   - practical usefulness,
   - conversion clarity,
   - readability,
   - design readiness.
2. Tạo `07_qa_report.md`.
3. Nếu có lỗi critical:
   - gắn severity,
   - chỉ rõ section cần sửa,
   - đề xuất copy hoặc structural fix.
4. Nếu pass:
   - tạo final publish checklist,
   - trích xuất title variants, social hooks, landing page description nếu brief yêu cầu.

## Pass criteria

- Không có unsupported major claim.
- Không copy nội dung nguồn.
- CTA liên quan trực tiếp tới giá trị lead magnet.
- Người đọc có thể áp dụng ít nhất một checklist/template/framework sau khi đọc.
- Brand claim đã được duyệt hoặc được viết an toàn.

## Output

- Updated `07_qa_report.md`
- Optional: publish copy pack
