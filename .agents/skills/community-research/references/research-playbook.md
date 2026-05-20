# Research Playbook

## Query pattern bank

### Data

Vietnamese:
- học data analyst bắt đầu từ đâu
- trái ngành sang data analyst
- data analyst cần học excel sql power bi python như thế nào
- portfolio data analyst junior
- phỏng vấn data analyst fresher
- có nên học data analyst không

English:
- data analyst roadmap beginner
- data analyst portfolio projects
- how to become data analyst with no experience
- sql power bi excel python learning path
- junior data analyst interview questions

### ITBA

Vietnamese:
- it business analyst là gì
- BA khác ITBA khác PO PM như thế nào
- trái ngành sang business analyst
- học ITBA cần gì
- template user story acceptance criteria requirement
- một ngày làm việc của business analyst

English:
- business analyst vs product owner vs project manager
- IT business analyst requirements template
- user story acceptance criteria examples
- business analyst career change
- business analyst stakeholder interview questions

### AI

Vietnamese:
- học AI cho người không chuyên
- dùng chatgpt trong công việc
- prompt cho dân văn phòng
- AI thay thế công việc không
- nên học công cụ AI nào trước
- workflow AI tăng năng suất

English:
- AI literacy roadmap
- ChatGPT workflows for work
- AI productivity prompts
- prompt engineering for beginners
- responsible AI checklist for employees

## Source extraction schema

Use this schema when adding to `source_log.csv`:

| Field | Guidance |
|---|---|
| source_id | short unique ID, e.g. fb-001, tiktok-003 |
| date_collected | date of research |
| platform | facebook, google, tiktok, youtube, linkedin, reddit, public-doc, other |
| language | vi, en, mixed |
| source_title | title or short source label |
| url | public URL if available |
| author_or_org | public author/org only |
| public_or_permissioned | public, owned, permissioned |
| topic | Data/ITBA/AI topic |
| persona_signal | who appears to care |
| engagement_signal | likes/comments/shares/views/saves if public |
| hook_or_question | short paraphrase of key hook/question |
| core_insight | paraphrased insight |
| evidence_type | question, comment, job post, guide, video, report, thread |
| source_quality_1_5 | credibility/usefulness score |
| reuse_permission_notes | safe to cite/summarize? |
| copyright_risk | low/medium/high |
| mindx_fit_notes | how it could fit MindX positioning |
| recommended_use | idea, proof, objection, example, keyword, not safe |
| fact_check_needed | yes/no |

## Signal interpretation

Strong signals:
- repeated questions across platforms,
- comments asking for templates/roadmaps/examples,
- saves/shares on practical resources,
- job posts repeatedly asking for the same skills,
- English resources with high utility but weak Vietnamese localization.

Weak signals:
- one-off viral post with shallow relevance,
- vague motivational content,
- unverified salary/job claims,
- content that is popular only because of controversy but not aligned with MindX.

## Safety boundaries

- Do not collect names, emails, phone numbers, profile links, screenshots of private users, or private group content.
- Do not reproduce a creator's full framework or paid resource.
- When unsure about reuse rights, mark `copyright_risk = high` and use only as directional insight.
