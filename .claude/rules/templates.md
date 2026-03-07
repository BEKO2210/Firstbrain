---
paths:
  - "05 - Templates/**"
---

Template conventions:

- Templates are READ-ONLY. Never modify template files directly.
- Template variables: {{date}} (YYYY-MM-DD), {{title}} (filename), {{time}} (HH:mm)
- Every template must have in frontmatter: type, created (set to {{date}}), tags
- Every template must end with a ## Connections section containing wiki-link placeholders
- When creating a note from a template:
  1. Copy template content to new file in correct folder
  2. Replace all {{date}}, {{title}}, {{time}} with actual values
  3. Fill in at least 2 wiki-links in the Connections section
  4. Add any relevant tags to frontmatter
