# Production Artifacts

Thư mục này chứa toàn bộ đầu vào, đầu ra trung gian và bản nháp cuối cùng cho một vòng sản xuất lead magnet.

## Quy ước đặt phiên bản

Khi bắt đầu campaign mới, duplicate thư mục này thành:

```text
production_artifacts/YYYY-MM-track-topic/
```

Ví dụ:

```text
production_artifacts/2026-06-data-portfolio-starter-kit/
```

## Trình tự cập nhật file

1. Điền `00_brief.md`.
2. Cập nhật `source_log.csv` khi research.
3. Viết `01_research_digest.md`.
4. Chạy scoring và tạo `02_idea_shortlist.md`.
5. Chọn idea, viết `03_persona_jtbd.md` và `04_positioning_brief.md`.
6. Soạn `05_outline.md` và `06_draft.md`.
7. QA bằng `07_qa_report.md`.

## Không xóa source log

`source_log.csv` là bằng chứng cho quá trình research, fact-check và tránh copy. Mọi nguồn quan trọng cần có mặt trong file này.
