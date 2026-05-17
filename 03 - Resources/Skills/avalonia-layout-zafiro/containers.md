---
type: skill-dokument
created: 2026-04-11
parent-skill: "avalonia-layout-zafiro"
domain: software-development
category: frontend
tags:
  - skill-referenz
  - software-development
  - frontend
---
# Semantic Containers

Using the right container for the data type simplifies XAML and improves maintainability. `Zafiro.Avalonia` provides specialized controls for common layout patterns.

## 📦 HeaderedContainer

Prefer `HeaderedContainer` over a `Border` or `Grid` when a section needs a title or header.

```xml
<HeaderedContainer Header="Security Settings" Classes="WizardSection">
    <StackPanel>
        <!-- Content here -->
    </StackPanel>
</HeaderedContainer>
```

### Key Properties:
- `Header`: The content or string for the header.
- `HeaderBackground`: Brush for the header area.
- `ContentPadding`: Padding for the content area.

## ↔️ EdgePanel

Use `EdgePanel` to position elements at the edges of a container without complex `Grid` definitions.

```xml
<EdgePanel StartContent="{Icon fa-wallet}" 
           Content="Wallet Balance" 
           EndContent="$1,234.00" />
```

### Slots:
- `StartContent`: Aligned to the left (or beginning).
- `Content`: Fills the remaining space in the middle.
- `EndContent`: Aligned to the right (or end).

## 📇 Card

A simple container for grouping related information, often used inside `HeaderedContainer` or as a standalone element in a list.

```xml
<Card Header="Enter recipient address:">
    <TextBox Text="{Binding Address}" />
</Card>
```

## 📐 Best Practices

- Use `Classes` to apply themed variants (e.g., `Classes="Section"`, `Classes="Highlight"`).
- Customize internal parts of the containers using templates in your styles when necessary, rather than nesting more controls.

## Connections

- **Gehoert zu:** [[avalonia-layout-zafiro]]
- **Pfad:** `containers.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Frontend Entwicklung]]
