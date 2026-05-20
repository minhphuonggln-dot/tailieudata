# MAS Overview - Multi-Agent System cho Lead Magnet Factory

## Mục tiêu hệ thống

MAS này chia quy trình sản xuất lead magnet thành các agent chuyên trách. Mỗi agent dùng một skill riêng để giảm lỗi, tăng tính nhất quán và giúp team MindX vận hành đều đặn 1-2 tháng/lần.

## Agent map

| Agent | Skill chính | Đầu vào | Đầu ra |
|---|---|---|---|
| Lead Magnet Orchestrator | gọi workflow | `00_brief.md`, brand inputs | kế hoạch chạy toàn pipeline |
| Community Research Analyst | `community-research` | brief, chủ đề, persona giả định, kênh research | `source_log.csv`, `01_research_digest.md` |
| Viral Opportunity Strategist | `viral-opportunity-scoring` | source log, research digest, brief | `02_idea_shortlist.md` |
| Persona/JTBD Strategist | `persona-jtbd-analysis` | selected idea, source insight | `03_persona_jtbd.md` |
| MindX Positioning Strategist | `mindx-positioning` | USP, persona, selected idea | `04_positioning_brief.md` |
| Lead Magnet Writer | `lead-magnet-drafting` | all upstream artifacts | `05_outline.md`, `06_draft.md` |
| Editorial & Conversion QA | `editorial-conversion-qa` | draft, sources, brand rules | `07_qa_report.md` |

## Luồng chuẩn

```text
00_brief
  → community-research
  → viral-opportunity-scoring
  → human selects idea
  → persona-jtbd-analysis
  → mindx-positioning
  → lead-magnet-drafting
  → editorial-conversion-qa
  → publish package
```

## Human checkpoints

1. **Sau research**: xác nhận có đủ nguồn và không vi phạm quyền riêng tư/bản quyền.
2. **Sau scoring**: chọn 1 ý tưởng chính, 1-2 ý tưởng phụ để làm angle phụ.
3. **Sau positioning**: xác nhận claim về MindX, USP, chương trình học, CTA.
4. **Sau QA**: duyệt final trước khi design/publish.

## Tiêu chuẩn “done”

- Có ít nhất 15-30 nguồn research phù hợp cho một vòng sản xuất, trừ khi brief rất hẹp.
- Có source log đầy đủ: nguồn, link, nền tảng, ngôn ngữ, insight, engagement nếu public.
- Có scoring minh bạch cho top ideas.
- Có MindX angle rõ ràng, không copy từ nguồn.
- Draft có phần thực hành, checklist, template hoặc framework để người đọc dùng ngay.
- QA không còn lỗi critical về claim, source, bản quyền, brand fit, CTA.
