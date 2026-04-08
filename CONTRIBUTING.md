# Contributing

Thank you for wanting to contribute to this project! Here is everything you need to know.

## Language in the Repository

- **Notes, documentation, and communication:** English
- **Code, frontmatter keys, and tags:** English (e.g. `type: project`, `status: active`)

## Reporting a Bug

1. Open an [Issue](https://github.com/BEKO2210/Firstbrain/issues/new) on GitHub
2. Describe the problem clearly and reproducibly:
   - What did you expect?
   - What happened instead?
   - Which Obsidian version and operating system are you using?
3. Attach screenshots if the issue involves the display

## Suggesting a New Template

1. Create an Issue with the title: `[Template] Name of Template`
2. Describe:
   - Which note type the template should cover
   - Which frontmatter fields are needed
   - A rough outline of the template (headings, sections)
3. Optional: Attach a sample `.md` file

## Creating a Pull Request

1. **Fork** the repository
2. Create a new branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Follow these rules:
   - Templates belong in `05 - Templates/`
   - Every template needs correct YAML frontmatter with at least `type`, `created`, `tags`
   - Every note needs a `## Connections` section
   - Do not commit personal data or sample content
5. **Commit** with a clear message: `git commit -m "Add: Template for XY"`
6. **Push** your branch: `git push origin feature/my-feature`
7. Open a **Pull Request** against the `main` branch

## What We Do Not Accept

- Personal notes or vault content
- Changes to `.obsidian/` configuration files (these are user-specific)
- Templates without correct frontmatter

## Questions?

Open an Issue or start a [Discussion](https://github.com/BEKO2210/Firstbrain/discussions) on GitHub.
