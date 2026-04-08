YAML frontmatter standards:

- Every note MUST have: type, created, tags
- type values: project, area, resource, tool, person, meeting, decision, code-snippet, zettel, daily, review
- created: YYYY-MM-DD format
- tags: array, always English, always lowercase
- Status values: active, planned, on-hold, completed, archived
- Priority values: high, medium, low
- Optional fields by type:
  - project: status, priority, area, due
  - area: status
  - resource/tool/zettel: status
  - meeting: date, participants
  - decision: status, related-project
  - daily: (minimal -- type, created, tags)
  - review: period (weekly/monthly)
