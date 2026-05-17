#!/usr/bin/env python3
"""
Aktualisiert alle Prompt-Dateien im Ordner "Kommunikation & Beziehungen"
"""

import os
import re
from pathlib import Path

FOLDER = '03 - Resources/Prompts/Kommunikation & Beziehungen'

# Mapping von Unterkategorien zu MOC-Namen
SUBCAT_TO_MOC = {
    'Coaching': 'Coaching',
    'Familie': 'Familie',
    'Gesprächsführung': 'Gesprächsführung',
    'Konfliktlösung': 'Konfliktlösung',
    'Konversation & Feedback': 'Konversation & Feedback',
    'Kulturelle Kompetenz': 'Kulturelle Kompetenz',
    'Privater Austausch': 'Privater Austausch',
    'Zwischenmenschliche Kommunikation': 'Zwischenmenschliche Kommunikation',
    'Importiert': 'Importiert',
}

def get_subcategory(content):
    """Extrahiert die Unterkategorie aus dem Content"""
    # Look for unterkategorie in second frontmatter
    match = re.search(r'unterkategorie:\s*["\']?([^\n"\']+)["\']?', content, re.IGNORECASE)
    if match:
        return match.group(1).strip()
    return 'Importiert'

def update_frontmatter_tags(content):
    """Korrigiert Tags im ersten Frontmatter"""
    # Finde den ersten frontmatter block
    fm_match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if not fm_match:
        return content
    
    fm = fm_match.group(1)
    rest = content[fm_match.end():]
    
    # Korrigiere tags im frontmatter
    lines = fm.split('\n')
    new_lines = []
    in_tags = False
    
    for line in lines:
        if line.strip().startswith('tags:'):
            in_tags = True
            new_lines.append(line)
        elif in_tags:
            if line.strip().startswith('- #'):
                # Konvertiere tag
                tag = line.strip()[2:].strip()  # Remove "- #"
                tag = tag.lower().replace(' ', '-')
                new_lines.append(f'  - {tag}')
            elif line.strip().startswith('- ') and not line.strip().startswith('- #'):
                # Bereits korrekt formatiert
                new_lines.append(line)
            elif line.strip() == '' or not line.startswith(' '):
                in_tags = False
                new_lines.append(line)
            else:
                new_lines.append(line)
        else:
            new_lines.append(line)
    
    new_fm = '\n'.join(new_lines)
    return f'---\n{new_fm}\n---\n{rest}'

def update_connections(content, subcategory):
    """Aktualisiert oder erstellt die Connections-Sektion"""
    moc_name = SUBCAT_TO_MOC.get(subcategory, 'Importiert')
    
    # Neue Connections-Sektion
    new_connections = f"""## Connections
- **MOC:** [[Prompts MOC]]
- **Category:** [[Kommunikation & Beziehungen]]
- **Subcategory:** [[{moc_name}]]
- **Related:**
"""
    
    # Prüfe ob Connections-Sektion existiert
    conn_match = re.search(r'## Connections\s*\n', content)
    if conn_match:
        # Finde das Ende der Connections-Sektion
        start = conn_match.start()
        rest = content[conn_match.end():]
        
        # Finde das Ende (nächste ## oder Dateiende)
        next_section = re.search(r'\n## ', rest)
        if next_section:
            end = conn_match.end() + next_section.start()
        else:
            end = len(content)
        
        # Ersetze die alte Connections-Sektion
        return content[:start] + new_connections + content[end:]
    else:
        # Füge Connections am Ende hinzu
        return content.rstrip() + '\n\n' + new_connections

def process_file(filepath):
    """Verarbeitet eine einzelne Datei"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Erhalte Unterkategorie
    subcategory = get_subcategory(content)
    
    # Aktualisiere Frontmatter Tags
    content = update_frontmatter_tags(content)
    
    # Aktualisiere Connections
    content = update_connections(content, subcategory)
    
    # Speichere
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return subcategory

def main():
    folder = Path(FOLDER)
    files = sorted([f for f in folder.iterdir() if f.suffix == '.md'])
    
    stats = {}
    for filepath in files:
        try:
            subcat = process_file(filepath)
            stats[subcat] = stats.get(subcat, 0) + 1
            print(f'[OK] {filepath.name} ({subcat})')
        except Exception as e:
            print(f'[ERR] {filepath.name}: {e}')
    
    print('\n--- Zusammenfassung ---')
    for subcat, count in sorted(stats.items()):
        print(f'{subcat}: {count}')
    print(f'\nTotal: {sum(stats.values())} Dateien verarbeitet')

if __name__ == '__main__':
    main()
