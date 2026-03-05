# Beitragen / Contributing

Danke, dass du zu diesem Projekt beitragen möchtest! Hier findest du alle Informationen, die du brauchst.

## Sprache im Repository

- **Notizen, Dokumentation und Kommunikation:** Deutsch
- **Code, Frontmatter-Keys und Tags:** Englisch (z.B. `type: project`, `status: active`)

## Einen Bug melden

1. Öffne ein [Issue](https://github.com/BEKO2210/Second_brain_Obsidian_Edition-/issues/new) auf GitHub
2. Beschreibe das Problem klar und nachvollziehbar:
   - Was hast du erwartet?
   - Was ist stattdessen passiert?
   - Welche Obsidian-Version und welches Betriebssystem nutzt du?
3. Füge Screenshots hinzu, wenn es um die Darstellung geht

## Ein neues Template vorschlagen

1. Erstelle ein Issue mit dem Titel: `[Template] Name des Templates`
2. Beschreibe:
   - Welchen Notiz-Typ das Template abdecken soll
   - Welche Frontmatter-Felder benötigt werden
   - Einen groben Aufbau des Templates (Überschriften, Abschnitte)
3. Optional: Hänge eine `.md`-Beispieldatei an

## Einen Pull Request erstellen

1. **Fork** das Repository
2. Erstelle einen neuen Branch: `git checkout -b feature/mein-feature`
3. Mache deine Änderungen
4. Achte auf folgende Regeln:
   - Templates gehören nach `05 - Templates/`
   - Jedes Template braucht korrektes YAML-Frontmatter mit mindestens `type`, `created`, `tags`
   - Jede Notiz braucht einen `## Verbindungen`-Abschnitt
   - Keine persönlichen Daten oder Beispiel-Inhalte committen
5. **Commit** mit einer klaren Nachricht: `git commit -m "Add: Template für XY"`
6. **Push** deinen Branch: `git push origin feature/mein-feature`
7. Öffne einen **Pull Request** gegen den `main`-Branch

## Was wir nicht annehmen

- Persönliche Notizen oder Vault-Inhalte
- Änderungen an `.obsidian/`-Konfigurationsdateien (diese sind nutzerspezifisch)
- Templates ohne korrektes Frontmatter

## Fragen?

Öffne ein Issue oder starte eine [Discussion](https://github.com/BEKO2210/Second_brain_Obsidian_Edition-/discussions) auf GitHub.
