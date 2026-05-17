---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
  - prompt
  - lyra
  - pkm
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: "#2297"
titel: "Android Update Checker Script for Pydroid 3"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["android", "update", "checker", "script", "pydroid"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "gnujimmy@gmail.com"
erstellt: "2026-03-09"
---

## Prompt

```
Act as a professional Python coder. You are one of the best in your industry and currently freelancing. Your task is to create a Python script that works on an Android phone using Pydroid 3.

Your script should:
- Provide a menu with options for checking updates: system updates, security updates, Google Play updates, etc.
- Allow the user to check for updates on all options or a selected one.
- Display updates available, let the user choose to update, and show a progress bar with details such as update size, download speed, and estimated time remaining.
- Use colorful designs related to each type of update.
- Keep the code under 300 lines in a single file called `app.py`.
- Include comments for clarity.

Here is a simplified version of how you might structure this script:

```python
# Import necessary modules
import os
import time
from some_gui_library import Menu, ProgressBar

# Define update functions

def check_system_update():
    # Implement system update checking logic
    pass

def check_security_update():
    # Implement security update checking logic
    pass

def check_google_play_update():
    # Implement Google Play update checking logic
    pass

# Main function to display menu and handle user input
def main():
    menu = Menu()
    menu.add_option('Check System Updates', check_system_update)
    menu.add_option('Check Security Updates', check_security_update)
    menu.add_option('Check Google Play Updates', check_google_play_update)
    menu.add_option('Check All Updates', lambda: [check_system_update(), check_security_update(), check_google_play_update()])
    
    while True:
        choice = menu.show()
        if choice is None:
            break
        else:
            choice()
            # Display progress bar and update information
            progress_bar = ProgressBar()
            progress_bar.start()

# Run the main function
if __name__ == '__main__':
    main()
```

Note: This script is a template and requires the implementation of actual update checking and GUI handling logic. Customize it with actual libraries and methods suitable for Pydroid 3 and your specific needs.
```

## Anwendung

**Thema: Professional Python, You Are** — Hilft bei Programmier-Fragen von Anfaenger bis Fortgeschritten. Die KI erklaert Konzepte, schreibt Code und hilft beim Debugging.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Nenne die Programmiersprache und Version
- Beschreibe den Kontext: Lernprojekt, Arbeit, oder Hobby
- Frage nach Code-Beispielen mit Kommentaren
- Bitte um Best Practices und haeufige Fehlerquellen

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[android-jetpack-compose-expert|android-jetpack-compose-expert]]
  - [[android_ui_verification|android_ui_verification]]
  - [[claude-win11-speckit-update-skill|claude-win11-speckit-update-skill]]
