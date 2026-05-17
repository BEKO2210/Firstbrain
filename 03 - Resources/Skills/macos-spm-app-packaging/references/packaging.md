---
type: referenz
created: 2026-04-11
parent-skill: "macos-spm-app-packaging"
domain: software-development
category: devtools
tags:
  - skill-referenz
  - software-development
  - devtools
---
# Packaging notes

## Build output paths
SwiftPM places binaries under:
- `.build/<arch>-apple-macosx/<config>/<AppName>` for arch-specific builds
- `.build/<config>/<AppName>` for some products (frameworks/tools)

Use `ARCHES="arm64 x86_64"` with `swift build` to produce universal binaries.

## Common environment variables (used by templates)
- `APP_NAME`: App/binary name (for example, `MyApp`).
- `BUNDLE_ID`: Bundle identifier (for example, `com.example.myapp`).
- `ARCHES`: Space-separated architectures (default: host arch).
- `SIGNING_MODE`: `adhoc` to avoid keychain prompts in dev.
- `APP_IDENTITY`: Codesigning identity name for release builds.
- `MACOS_MIN_VERSION`: Minimum macOS version for Info.plist.
- `MENU_BAR_APP`: Set to `1` to add `LSUIElement` to Info.plist.

## Connections

- **Gehoert zu:** [[macos-spm-app-packaging]]
- **Pfad:** `references/packaging.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Entwickler-Tools]]
