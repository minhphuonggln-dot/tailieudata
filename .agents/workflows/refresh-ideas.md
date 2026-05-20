# Workflow - Refresh Ideas

## Trigger

Dùng 1-2 tháng/lần để cập nhật ngân hàng ý tưởng lead magnet mới, ngay cả khi chưa sản xuất tài liệu cụ thể.

## Goal

Tạo một danh sách idea mới dựa trên tín hiệu cộng đồng, trend, câu hỏi lặp lại, nguồn tiếng Anh mới, và các thay đổi trong thị trường Data/ITBA/AI.

## Inputs

- `knowledge-base.md`
- `production_artifacts/source_log.csv` từ các vòng trước
- Brief nhẹ: track, persona ưu tiên, kênh research, thời gian muốn quan sát

## Steps

1. Dùng `community-research` để thu thập 20-40 nguồn mới.
2. Ghi các nguồn mới vào source log hoặc một source log theo tháng.
3. So sánh với `knowledge-base.md` để xác định:
   - chủ đề mới nổi,
   - câu hỏi lặp lại nhiều hơn,
   - ý tưởng cũ đáng refresh,
   - gap tiếng Việt từ nguồn tiếng Anh.
4. Dùng `viral-opportunity-scoring` để chấm top 10 ideas.
5. Update `knowledge-base.md` phần backlog và learning log.
6. Đề xuất 1-2 lead magnet nên sản xuất trong tháng tới.

## Output

```markdown
# Idea Refresh - YYYY-MM

## New source summary

## Emerging pains/questions

## Top 10 scored ideas

## Recommended next lead magnets

## Ideas to archive

## Research gaps
```

## Quality bar

- Không chỉ chase trend; mỗi idea cần liên kết rõ với persona và offer MindX.
- Ưu tiên idea có thể tạo utility thật, không chỉ title hay.
- Flag các idea cần data hoặc approval thêm.
