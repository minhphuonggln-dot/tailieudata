# MindX Lead Magnet Factory Antigravity

## Mục đích

Workspace này dùng để sản xuất định kỳ các bộ tài liệu lead magnet cho nhóm khách hàng quan tâm **Data, ITBA và AI tại MindX**. Mục tiêu không phải là tạo một ebook chung chung, mà là tạo một quy trình lặp lại được: research cộng đồng → lọc cơ hội viral → hiểu persona/JTBD → đóng gói góc nhìn riêng của MindX → soạn tài liệu hoàn chỉnh → QA trước khi xuất bản.

## Output cuối cùng của mỗi vòng sản xuất

Mỗi lead magnet nên có đủ các artifact sau trong `production_artifacts/`:

1. `00_brief.md`: đề bài sản xuất.
2. `source_log.csv`: nhật ký nguồn research.
3. `01_research_digest.md`: tổng hợp insight từ cộng đồng/tài liệu public.
4. `02_idea_shortlist.md`: danh sách ý tưởng đã scoring.
5. `03_persona_jtbd.md`: phân tích khách hàng mục tiêu và Job-to-be-Done.
6. `04_positioning_brief.md`: góc nhìn MindX, thông điệp, USP, proof, CTA.
7. `05_outline.md`: cấu trúc tài liệu.
8. `06_draft.md`: bản nháp lead magnet hoàn chỉnh.
9. `07_qa_report.md`: kiểm tra fact, brand, conversion, copyright, tính hữu ích.

## Cách dùng nhanh

1. Điền `brand_inputs/mindx_usp.md` bằng USP, chương trình học, bằng chứng, tone of voice, CTA chính thức của MindX.
2. Điền `production_artifacts/00_brief.md` cho chiến dịch mới.
3. Chạy workflow `.agents/workflows/start-lead-magnet.md`.
4. Sau khi có danh sách ý tưởng, chọn 1 ý tưởng chính rồi tiếp tục drafting.
5. Trước khi xuất bản, chạy `.agents/workflows/qa-final-lead-magnet.md`.

## Chu kỳ đề xuất 1-2 tháng/lần

| Giai đoạn | Việc chính | Artifact |
|---|---|---|
| Tuần 1 | Research cộng đồng, Google, TikTok, YouTube, tài liệu public tiếng Việt/Anh | `source_log.csv`, `01_research_digest.md` |
| Tuần 1-2 | Chấm điểm viral opportunity, chọn ý tưởng | `02_idea_shortlist.md` |
| Tuần 2 | Phân tích persona/JTBD và MindX positioning | `03_persona_jtbd.md`, `04_positioning_brief.md` |
| Tuần 2-3 | Lên outline, viết bản nháp | `05_outline.md`, `06_draft.md` |
| Tuần 3 | QA, chỉnh sửa, chuẩn bị landing/social/email | `07_qa_report.md` |
| Tuần 4 | Publish, đo lường, lưu learnings cho vòng sau | update `knowledge-base.md` |

## Cấu trúc workspace

```text
mindx-lead-magnet-factory-antigravity/
├── README.md
├── knowledge-base.md
├── mas-overview.md
├── brand_inputs/
│   ├── mindx_usp.md
│   ├── content_direction.md
│   └── proof_assets.md
├── prompt_library/
│   ├── lead-magnet-master-prompt.md
│   └── source-summarizer-prompt.md
├── production_artifacts/
│   ├── 00_brief.md
│   ├── 01_research_digest.md
│   ├── 02_idea_shortlist.md
│   ├── 03_persona_jtbd.md
│   ├── 04_positioning_brief.md
│   ├── 05_outline.md
│   ├── 06_draft.md
│   ├── 07_qa_report.md
│   ├── README.md
│   └── source_log.csv
└── .agents/
    ├── agents.md
    ├── rules/
    │   └── mindx-lead-magnet-rules.md
    ├── workflows/
    │   ├── start-lead-magnet.md
    │   ├── refresh-ideas.md
    │   └── qa-final-lead-magnet.md
    └── skills/
        ├── community-research/
        ├── viral-opportunity-scoring/
        ├── persona-jtbd-analysis/
        ├── mindx-positioning/
        ├── lead-magnet-drafting/
        └── editorial-conversion-qa/
```

## Nguyên tắc vận hành

- Không tự bịa số liệu, cam kết nghề nghiệp, mức lương, tỷ lệ có việc, hoặc claim về MindX nếu chưa có nguồn chính thức trong `brand_inputs/`.
- Chỉ dùng nguồn public hoặc nguồn MindX có quyền sử dụng. Không scrape nhóm kín, nội dung cá nhân, hoặc tài liệu có bản quyền không cho phép tái sử dụng.
- Mọi ý tưởng phải được biến đổi thành góc nhìn mới, có ích và phù hợp với định hướng MindX; không copy cấu trúc, câu chữ hoặc framework độc quyền của bên khác.
- Tài liệu phải có giá trị thật trước CTA. CTA nên mềm, đúng ngữ cảnh, và liên quan trực tiếp tới vấn đề mà lead magnet giải quyết.
- Sau mỗi vòng publish, cập nhật learning: ý tưởng nào có lead tốt, kênh nào hiệu quả, hook nào kéo conversion.

## Phiên bản

- `v0.1`: workspace khởi tạo, có đủ skill, workflow, rule và template artifact.
