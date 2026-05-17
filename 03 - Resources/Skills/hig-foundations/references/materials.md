---
type: referenz
created: 2026-04-11
parent-skill: "hig-foundations"
domain: productivity
category: developer-experience
tags:
  - skill-referenz
  - productivity
  - developer-experience
---|---  
[`ultraThin`](https://developer.apple.com/documentation/SwiftUI/Material/ultraThin)| Full-screen views that require a light color scheme  
[`thin`](https://developer.apple.com/documentation/SwiftUI/Material/thin)| Overlay views that partially obscure onscreen content and require a light color scheme  
[`regular`](https://developer.apple.com/documentation/SwiftUI/Material/regular)| Overlay views that partially obscure onscreen content  
[`thick`](https://developer.apple.com/documentation/SwiftUI/Material/thick)| Overlay views that partially obscure onscreen content and require a dark color scheme  
  
### [visionOS](https://developer.apple.com/design/human-interface-guidelines/materials#visionOS)

In visionOS, windows generally use an unmodifiable system-defined material called _glass_ that helps people stay grounded by letting light, the current Environment, virtual content, and objects in people’s surroundings show through. Glass is an adaptive material that limits the range of background color information so a window can continue to provide contrast for app content while becoming brighter or darker depending on people’s physical surroundings and other virtual content.

Video with custom controls. 

Content description: A recording of the Music app window in visionOS. The window uses the glass material and adapts as the viewing angle and lighting change. 

Play 

Note

visionOS doesn’t have a distinct Dark Mode setting. Instead, glass automatically adapts to the luminance of the objects and colors behind it.

**Prefer translucency to opaque colors in windows.** Areas of opacity can block people’s view, making them feel constricted and reducing their awareness of the virtual and physical objects around them.

![An illustration of a field of view in visionOS with a window in the center. The window has an opaque background that obstructs its surroundings.](https://docs-assets.developer.apple.com/published/137ceb38a96227aa8a9d2021ee82a8e2/materials-visionos-opaque-window-incorrect%402x.png)

![An X in a circle to indicate incorrect usage](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)

![An illustration of a field of view in visionOS with a window in the center. The window has a translucent material background that allows its surroundings to pass through.](https://docs-assets.developer.apple.com/published/3f23b3476f6cf8cc77fdcb91a0c15063/materials-visionos-glass-window%402x.png)

![A checkmark in a circle to indicate correct usage](https://docs-assets.developer.apple.com/published/88662da92338267bb64cd2275c84e484/checkmark%402x.png)

**If necessary, choose materials that help you create visual separations or indicate interactivity in your app.** If you need to create a custom component, you may need to specify a system material for it. Use the following examples for guidance.

  * The [`thin`](https://developer.apple.com/documentation/SwiftUI/Material/thin) material brings attention to interactive elements like buttons and selected items.

  * The [`regular`](https://developer.apple.com/documentation/SwiftUI/Material/regular) material can help you visually separate sections of your app, like a sidebar or a grouped table view.

  * The [`thick`](https://developer.apple.com/documentation/SwiftUI/Material/thick) material lets you create a dark element that remains visually distinct when it’s on top of an area that uses a `regular` background.




![An illustration of a field of view in visionOS with a window in the center. The window is composed of a sidebar on the left and a content area on the right, with a text field at the top and a button in the lower-right corner. The sidebar uses regular material, while the text field uses thick material and the button uses thin material.](https://docs-assets.developer.apple.com/published/c3577aa1e00689431e49973173a151f9/visionos-materials-window-example%402x.png)

To ensure foreground content remains legible when it displays on top of a material, visionOS applies vibrancy to text, symbols, and fills. Vibrancy enhances the sense of depth by pulling light and color forward from both virtual and physical surroundings.

visionOS defines three vibrancy values that help you communicate a hierarchy of text, symbols, and fills.

  * Use [`UIVibrancyEffectStyle.label`](https://developer.apple.com/documentation/UIKit/UIVibrancyEffectStyle/label) for standard text.

  * Use [`UIVibrancyEffectStyle.secondaryLabel`](https://developer.apple.com/documentation/UIKit/UIVibrancyEffectStyle/secondaryLabel) for descriptive text like footnotes and subtitles.

  * Use [`UIVibrancyEffectStyle.tertiaryLabel`](https://developer.apple.com/documentation/UIKit/UIVibrancyEffectStyle/tertiaryLabel) for inactive elements, and only when text doesn’t need high legibility.




![An illustration of a Share button with a translucent background material and a symbol. The symbol uses the default vibrant label color and has very high contrast against the background material.](https://docs-assets.developer.apple.com/published/8f850521ecc2e3953e8e693fe7b4887b/materials-visionos-label-vibrant-primary%402x.png)`label`

![An illustration of a Share button with a translucent background material and a symbol. The symbol uses the secondary vibrant label color and has high contrast against the background material.](https://docs-assets.developer.apple.com/published/876503f2b2b5fd1783e359128ffd2482/materials-visionos-label-vibrant-secondary%402x.png)`secondaryLabel`

![An illustration of a Share button with a translucent background material and a symbol. The symbol uses the tertiary vibrant label color and has muted contrast against the background material.](https://docs-assets.developer.apple.com/published/b3b80e5f23b286f6c7897780676e6dfe/materials-visionos-label-vibrant-tertiary%402x.png)`tertiaryLabel`

### [watchOS](https://developer.apple.com/design/human-interface-guidelines/materials#watchOS)

**Use materials to provide context in a full-screen modal view.** Because full-screen modal views are common in watchOS, the contrast provided by material layers can help orient people in your app and distinguish controls and system elements from other content. Avoid removing or replacing material backgrounds for modal sheets when they’re provided by default.

![An illustration of a modal view in watchOS with an example title, descriptive text, and a single action button. The modal completely covers the screen with a transparent material, and uses a thinner material for the button along with vibrant label text.](https://docs-assets.developer.apple.com/published/b9bdbaa947d461e98681c9fbb87a7052/watchos-modal-view-material-background%402x.png)

## [Resources](https://developer.apple.com/design/human-interface-guidelines/materials#Resources)

#### [Related](https://developer.apple.com/design/human-interface-guidelines/materials#Related)

[Color](https://developer.apple.com/design/human-interface-guidelines/color)

[Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)

[Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode)

#### [Developer documentation](https://developer.apple.com/design/human-interface-guidelines/materials#Developer-documentation)

[Adopting Liquid Glass](https://developer.apple.com/documentation/TechnologyOverviews/adopting-liquid-glass)

[`glassEffect(_:in:)`](https://developer.apple.com/documentation/SwiftUI/View/glassEffect\(_:in:\)) — SwiftUI

[`Material`](https://developer.apple.com/documentation/SwiftUI/Material) — SwiftUI

[`UIVisualEffectView`](https://developer.apple.com/documentation/UIKit/UIVisualEffectView) — UIKit

[`NSVisualEffectView`](https://developer.apple.com/documentation/AppKit/NSVisualEffectView) — AppKit

#### [Videos](https://developer.apple.com/design/human-interface-guidelines/materials#Videos)

[![](https://devimages-cdn.apple.com/wwdc-services/images/3055294D-836B-4513-B7B0-0BC5666246B0/5CD0E251-424E-490F-89CF-1E64848209A6/9910_wide_250x141_1x.jpg) Meet Liquid Glass ](https://developer.apple.com/videos/play/wwdc2025/219)

[![](https://devimages-cdn.apple.com/wwdc-services/images/3055294D-836B-4513-B7B0-0BC5666246B0/1AAA030E-2ECA-47D8-AE09-6D7B72A840F6/10044_wide_250x141_1x.jpg) Get to know the new design system ](https://developer.apple.com/videos/play/wwdc2025/356)

## [Change log](https://developer.apple.com/design/human-interface-guidelines/materials#Change-log)

Date| Changes  
---|---  
September 9, 2025| Updated guidance for Liquid Glass.  
June 9, 2025| Added guidance for Liquid Glass.  
August 6, 2024| Added platform-specific art.  
December 5, 2023| Updated descriptions of the various material types, and clarified terms related to vibrancy and material thickness.  
June 21, 2023| Updated to include guidance for visionOS.  
June 5, 2023| Added guidance on using materials to provide context and orientation in watchOS apps.

## Connections

- **Gehoert zu:** [[hig-foundations]]
- **Pfad:** `references/materials.md`
- **Domain:** [[Produktivitaet & Werkzeuge]]
- **Kategorie:** [[Developer Experience]]
