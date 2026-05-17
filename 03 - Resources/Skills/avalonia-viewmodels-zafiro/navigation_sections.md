---
type: skill-dokument
created: 2026-04-11
parent-skill: "avalonia-viewmodels-zafiro"
domain: software-development
category: frontend
tags:
  - skill-referenz
  - software-development
  - frontend
---
# Navigation & Sections

Zafiro provides powerful abstractions for managing application-wide navigation and modular UI sections.

## Navigation with INavigator

The `INavigator` interface is used to switch between different views or viewmodels.

```csharp
public class MyViewModel(INavigator navigator)
{
    public async Task GoToDetails()
    {
        await navigator.Navigate(() => new DetailsViewModel());
    }
}
```

## UI Sections

Sections are modular parts of the UI (like tabs or sidebar items) that can be automatically registered.

### The [Section] Attribute

ViewModels intended to be sections should be marked with the `[Section]` attribute.

```csharp
[Section("Wallet", icon: "fa-wallet")]
public class WalletSectionViewModel : IWalletSectionViewModel
{
    // ...
}
```

### Automatic Registration

In the `CompositionRoot`, sections can be automatically registered:

```csharp
services.AddAnnotatedSections(logger);
services.AddSectionsFromAttributes(logger);
```

### Switching Sections

You can switch the current active section via the `IShellViewModel`:

```csharp
shellViewModel.SetSection("Browse");
```

> [!IMPORTANT]
> The `icon` parameter in the `[Section]` attribute supports FontAwesome icons (e.g., `fa-home`) when configured with `ProjektankerIconControlProvider`.

## Connections

- **Gehoert zu:** [[avalonia-viewmodels-zafiro]]
- **Pfad:** `navigation_sections.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Frontend Entwicklung]]
