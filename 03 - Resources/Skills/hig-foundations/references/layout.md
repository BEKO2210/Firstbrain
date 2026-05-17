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
Unfocused content width| 860 pt  
Horizontal spacing| 40 pt  
Minimum vertical spacing| 100 pt  
  
![An illustration of Apple TV, displaying a three-column grid of media items. Additional media items are partially visible on the right side and bottom edge of the screen.](https://docs-assets.developer.apple.com/published/efc27c2f40d150e6350f03d8709527d8/visual-design-grid-3-column%402x.png)

#### [Three-column grid](https://developer.apple.com/design/human-interface-guidelines/layout#Three-column-grid)

Attribute| Value  
---|---  
Unfocused content width| 560 pt  
Horizontal spacing| 40 pt  
Minimum vertical spacing| 100 pt  
  
![An illustration of Apple TV, displaying a four-column grid of media items. Additional media items are partially visible on the right side of the screen.](https://docs-assets.developer.apple.com/published/b02a182e769f7a89201719f46547dabf/visual-design-grid-4-column%402x.png)

#### [Four-column grid](https://developer.apple.com/design/human-interface-guidelines/layout#Four-column-grid)

Attribute| Value  
---|---  
Unfocused content width| 410 pt  
Horizontal spacing| 40 pt  
Minimum vertical spacing| 100 pt  
  
![An illustration of Apple TV, displaying a five-column grid of media items. Additional media items are partially visible on the right side and bottom edge of the screen.](https://docs-assets.developer.apple.com/published/6eebe97a166aceb55ed18304ac46be8d/visual-design-grid-5-column%402x.png)

#### [Five-column grid](https://developer.apple.com/design/human-interface-guidelines/layout#Five-column-grid)

Attribute| Value  
---|---  
Unfocused content width| 320 pt  
Horizontal spacing| 40 pt  
Minimum vertical spacing| 100 pt  
  
![An illustration of Apple TV, displaying a six-column grid of media items. Additional media items are partially visible on the right side and bottom edge of the screen.](https://docs-assets.developer.apple.com/published/a2a7efa8dc58b3615082ba7e62e81437/visual-design-grid-6-column%402x.png)

#### [Six-column grid](https://developer.apple.com/design/human-interface-guidelines/layout#Six-column-grid)

Attribute| Value  
---|---  
Unfocused content width| 260 pt  
Horizontal spacing| 40 pt  
Minimum vertical spacing| 100 pt  
  
![An illustration of Apple TV, displaying a seven-column grid of media items. Additional media items are partially visible on the right side of the screen.](https://docs-assets.developer.apple.com/published/3e625b746a4a31f083020cfa91674bd6/visual-design-grid-7-column%402x.png)

#### [Seven-column grid](https://developer.apple.com/design/human-interface-guidelines/layout#Seven-column-grid)

Attribute| Value  
---|---  
Unfocused content width| 217 pt  
Horizontal spacing| 40 pt  
Minimum vertical spacing| 100 pt  
  
![An illustration of Apple TV, displaying an eight-column grid of media items. Additional media items are partially visible on the right side and bottom edge of the screen.](https://docs-assets.developer.apple.com/published/71f872111291a6f1b465ddfd4f4dc246/visual-design-grid-8-column%402x.png)

#### [Eight-column grid](https://developer.apple.com/design/human-interface-guidelines/layout#Eight-column-grid)

Attribute| Value  
---|---  
Unfocused content width| 184 pt  
Horizontal spacing| 40 pt  
Minimum vertical spacing| 100 pt  
  
![An illustration of Apple TV, displaying a nine-column grid of media items.](https://docs-assets.developer.apple.com/published/19125b211b45864b26f33d8f54a98a87/visual-design-grid-9-column%402x.png)

#### [Nine-column grid](https://developer.apple.com/design/human-interface-guidelines/layout#Nine-column-grid)

Attribute| Value  
---|---  
Unfocused content width| 160 pt  
Horizontal spacing| 40 pt  
Minimum vertical spacing| 100 pt  
  
**Include additional vertical spacing for titled rows.** If a row has a title, provide enough spacing between the bottom of the previous unfocused row and the center of the title to avoid crowding. Also provide spacing between the bottom of the title and the top of the unfocused items in the row.

**Use consistent spacing.** When content isn’t consistently spaced, it no longer looks like a grid and it’s harder for people to scan.

**Make partially hidden content look symmetrical.** To help direct attention to the fully visible content, keep partially hidden offscreen content the same width on each side of the screen.

### [visionOS](https://developer.apple.com/design/human-interface-guidelines/layout#visionOS)

The guidance below can help you lay out content within the windows of your visionOS app or game, making it feel familiar and easy to use. For guidance on displaying windows in space and best practices for using depth, scale, and field of view in your visionOS app, see [Spatial layout](https://developer.apple.com/design/human-interface-guidelines/spatial-layout). To learn more about visionOS window components, see [Windows > visionOS](https://developer.apple.com/design/human-interface-guidelines/windows#visionOS).

Note

When you add depth to content in a standard window, the content extends beyond the window’s bounds along the z-axis. If content extends too far along the z-axis, the system clips it.

**Consider centering the most important content and controls in your app or game.** Often, people can more easily discover and interact with content when it’s near the middle of a window, especially when the window is large.

**Keep a window’s content within its bounds.** In visionOS, the system displays window controls just outside a window’s bounds in the XY plane. For example, the Share menu appears above the window and the controls for resizing, moving, and closing the window appear below it. Letting 2D or 3D content encroach on these areas can make the system-provided controls, especially those below the window, difficult for people to use.

**If you need to display additional controls that don’t belong within a window, use an ornament.** An ornament lets you offer app controls that remain visually associated with a window without interfering with the system-provided controls. For example, a window’s toolbar and tab bar appear as ornaments. For guidance, see [Ornaments](https://developer.apple.com/design/human-interface-guidelines/ornaments).

**Make a window’s interactive components easy for people to look at.** You need to include enough space around an interactive component so that visually identifying it is easy and comfortable, and to prevent the system-provided hover effect from obscuring other content. For example, place buttons so their centers are at least 60 points apart. For guidance, see [Eyes](https://developer.apple.com/design/human-interface-guidelines/eyes), [Spatial layout](https://developer.apple.com/design/human-interface-guidelines/spatial-layout), and [Buttons > visionOS](https://developer.apple.com/design/human-interface-guidelines/buttons#visionOS).

### [watchOS](https://developer.apple.com/design/human-interface-guidelines/layout#watchOS)

**Design your content to extend from one edge of the screen to the other.** The Apple Watch bezel provides a natural visual padding around your content. To avoid wasting valuable space, consider minimizing the padding between elements.

![An illustration of the Workout app’s main list of workouts on Apple Watch. A callout indicates that the currently focused workout item spans the full width of the available screen area.](https://docs-assets.developer.apple.com/published/9b9b27a4e9e752fc4ed6be98f5eb5b0d/layout-full-width%402x.png)

**Avoid placing more than two or three controls side by side in your interface.** As a general rule, display no more than three buttons that contain glyphs — or two buttons that contain text — in a row. Although it’s usually better to let text buttons span the full width of the screen, two side-by-side buttons with short text labels can also work well, as long as the screen doesn’t scroll.

![A diagram of an Apple Watch screen showing two side-by-side buttons beneath three lines of text.](https://docs-assets.developer.apple.com/published/25c5882538789bded5a9953eb5e2001f/layout-controls%402x.png)

**Support autorotation in views people might want to show others.** When people flip their wrist away, apps typically respond to the motion by sleeping the display, but in some cases it makes sense to autorotate the content. For example, a wearer might want to show an image to a friend or display a QR code to a reader. For developer guidance, see [`isAutorotating`](https://developer.apple.com/documentation/WatchKit/WKExtension/isAutorotating).

## [Specifications](https://developer.apple.com/design/human-interface-guidelines/layout#Specifications)

### [iOS, iPadOS device screen dimensions](https://developer.apple.com/design/human-interface-guidelines/layout#iOS-iPadOS-device-screen-dimensions)

Model| Dimensions (portrait)  
---|---  
iPad Pro 12.9-inch| 1024x1366 pt (2048x2732 px @2x)  
iPad Pro 11-inch| 834x1194 pt (1668x2388 px @2x)  
iPad Pro 10.5-inch| 834x1194 pt (1668x2388 px @2x)  
iPad Pro 9.7-inch| 768x1024 pt (1536x2048 px @2x)  
iPad Air 13-inch| 1024x1366 pt (2048x2732 px @2x)  
iPad Air 11-inch| 820x1180 pt (1640x2360 px @2x)  
iPad Air 10.9-inch| 820x1180 pt (1640x2360 px @2x)  
iPad Air 10.5-inch| 834x1112 pt (1668x2224 px @2x)  
iPad Air 9.7-inch| 768x1024 pt (1536x2048 px @2x)  
iPad 11-inch| 820x1180 pt (1640x2360 px @2x)  
iPad 10.2-inch| 810x1080 pt (1620x2160 px @2x)  
iPad 9.7-inch| 768x1024 pt (1536x2048 px @2x)  
iPad mini 8.3-inch| 744x1133 pt (1488x2266 px @2x)  
iPad mini 7.9-inch| 768x1024 pt (1536x2048 px @2x)  
iPhone 17 Pro Max| 440x956 pt (1320x2868 px @3x)  
iPhone 17 Pro| 402x874 pt (1206x2622 px @3x)  
iPhone Air| 420x912 pt (1260x2736 px @3x)  
iPhone 17| 402x874 pt (1206x2622 px @3x)  
iPhone 16 Pro Max| 440x956 pt (1320x2868 px @3x)  
iPhone 16 Pro| 402x874 pt (1206x2622 px @3x)  
iPhone 16 Plus| 430x932 pt (1290x2796 px @3x)  
iPhone 16| 393x852 pt (1179x2556 px @3x)  
iPhone 16e| 390x844 pt (1170x2532 px @3x)  
iPhone 15 Pro Max| 430x932 pt (1290x2796 px @3x)  
iPhone 15 Pro| 393x852 pt (1179x2556 px @3x)  
iPhone 15 Plus| 430x932 pt (1290x2796 px @3x)  
iPhone 15| 393x852 pt (1179x2556 px @3x)  
iPhone 14 Pro Max| 430x932 pt (1290x2796 px @3x)  
iPhone 14 Pro| 393x852 pt (1179x2556 px @3x)  
iPhone 14 Plus| 428x926 pt (1284x2778 px @3x)  
iPhone 14| 390x844 pt (1170x2532 px @3x)  
iPhone 13 Pro Max| 428x926 pt (1284x2778 px @3x)  
iPhone 13 Pro| 390x844 pt (1170x2532 px @3x)  
iPhone 13| 390x844 pt (1170x2532 px @3x)  
iPhone 13 mini| 375x812 pt (1125x2436 px @3x)  
iPhone 12 Pro Max| 428x926 pt (1284x2778 px @3x)  
iPhone 12 Pro| 390x844 pt (1170x2532 px @3x)  
iPhone 12| 390x844 pt (1170x2532 px @3x)  
iPhone 12 mini| 375x812 pt (1125x2436 px @3x)  
iPhone 11 Pro Max| 414x896 pt (1242x2688 px @3x)  
iPhone 11 Pro| 375x812 pt (1125x2436 px @3x)  
iPhone 11| 414x896 pt (828x1792 px @2x)  
iPhone XS Max| 414x896 pt (1242x2688 px @3x)  
iPhone XS| 375x812 pt (1125x2436 px @3x)  
iPhone XR| 414x896 pt (828x1792 px @2x)  
iPhone X| 375x812 pt (1125x2436 px @3x)  
iPhone 8 Plus| 414x736 pt (1080x1920 px @3x)  
iPhone 8| 375x667 pt (750x1334 px @2x)  
iPhone 7 Plus| 414x736 pt (1080x1920 px @3x)  
iPhone 7| 375x667 pt (750x1334 px @2x)  
iPhone 6s Plus| 414x736 pt (1080x1920 px @3x)  
iPhone 6s| 375x667 pt (750x1334 px @2x)  
iPhone 6 Plus| 414x736 pt (1080x1920 px @3x)  
iPhone 6| 375x667 pt (750x1334 px @2x)  
iPhone SE 4.7-inch| 375x667 pt (750x1334 px @2x)  
iPhone SE 4-inch| 320x568 pt (640x1136 px @2x)  
iPod touch 5th generation and later| 320x568 pt (640x1136 px @2x)  
  
Note

All scale factors in the table above are UIKit scale factors, which may differ from native scale factors. For developer guidance, see [`scale`](https://developer.apple.com/documentation/UIKit/UIScreen/scale) and [`nativeScale`](https://developer.apple.com/documentation/UIKit/UIScreen/nativeScale).

### [iOS, iPadOS device size classes](https://developer.apple.com/design/human-interface-guidelines/layout#iOS-iPadOS-device-size-classes)

A size class is a value that’s either regular or compact, where _regular_ refers to a larger screen or a screen in landscape orientation and _compact_ refers to a smaller screen or a screen in portrait orientation. For developer guidance, see [`UserInterfaceSizeClass`](https://developer.apple.com/documentation/SwiftUI/UserInterfaceSizeClass).

Different size class combinations apply to the full-screen experience on different devices, based on screen size.

Model| Portrait orientation| Landscape orientation  
---|---|---  
iPad Pro 12.9-inch| Regular width, regular height| Regular width, regular height  
iPad Pro 11-inch| Regular width, regular height| Regular width, regular height  
iPad Pro 10.5-inch| Regular width, regular height| Regular width, regular height  
iPad Air 13-inch| Regular width, regular height| Regular width, regular height  
iPad Air 11-inch| Regular width, regular height| Regular width, regular height  
iPad 11-inch| Regular width, regular height| Regular width, regular height  
iPad 9.7-inch| Regular width, regular height| Regular width, regular height  
iPad mini 7.9-inch| Regular width, regular height| Regular width, regular height  
iPhone 17 Pro Max| Compact width, regular height| Regular width, compact height  
iPhone 17 Pro| Compact width, regular height| Compact width, compact height  
iPhone Air| Compact width, regular height| Regular width, compact height  
iPhone 17| Compact width, regular height| Compact width, compact height  
iPhone 16 Pro Max| Compact width, regular height| Regular width, compact height  
iPhone 16 Pro| Compact width, regular height| Compact width, compact height  
iPhone 16 Plus| Compact width, regular height| Regular width, compact height  
iPhone 16| Compact width, regular height| Compact width, compact height  
iPhone 16e| Compact width, regular height| Compact width, compact height  
iPhone 15 Pro Max| Compact width, regular height| Regular width, compact height  
iPhone 15 Pro| Compact width, regular height| Compact width, compact height  
iPhone 15 Plus| Compact width, regular height| Regular width, compact height  
iPhone 15| Compact width, regular height| Compact width, compact height  
iPhone 14 Pro Max| Compact width, regular height| Regular width, compact height  
iPhone 14 Pro| Compact width, regular height| Compact width, compact height  
iPhone 14 Plus| Compact width, regular height| Regular width, compact height  
iPhone 14| Compact width, regular height| Compact width, compact height  
iPhone 13 Pro Max| Compact width, regular height| Regular width, compact height  
iPhone 13 Pro| Compact width, regular height| Compact width, compact height  
iPhone 13| Compact width, regular height| Compact width, compact height  
iPhone 13 mini| Compact width, regular height| Compact width, compact height  
iPhone 12 Pro Max| Compact width, regular height| Regular width, compact height  
iPhone 12 Pro| Compact width, regular height| Compact width, compact height  
iPhone 12| Compact width, regular height| Compact width, compact height  
iPhone 12 mini| Compact width, regular height| Compact width, compact height  
iPhone 11 Pro Max| Compact width, regular height| Regular width, compact height  
iPhone 11 Pro| Compact width, regular height| Compact width, compact height  
iPhone 11| Compact width, regular height| Regular width, compact height  
iPhone XS Max| Compact width, regular height| Regular width, compact height  
iPhone XS| Compact width, regular height| Compact width, compact height  
iPhone XR| Compact width, regular height| Regular width, compact height  
iPhone X| Compact width, regular height| Compact width, compact height  
iPhone 8 Plus| Compact width, regular height| Regular width, compact height  
iPhone 8| Compact width, regular height| Compact width, compact height  
iPhone 7 Plus| Compact width, regular height| Regular width, compact height  
iPhone 7| Compact width, regular height| Compact width, compact height  
iPhone 6s Plus| Compact width, regular height| Regular width, compact height  
iPhone 6s| Compact width, regular height| Compact width, compact height  
iPhone SE| Compact width, regular height| Compact width, compact height  
iPod touch 5th generation and later| Compact width, regular height| Compact width, compact height  
  
### [watchOS device screen dimensions](https://developer.apple.com/design/human-interface-guidelines/layout#watchOS-device-screen-dimensions)

Series| Size| Width (pixels)| Height (pixels)  
---|---|---|---  
Apple Watch Ultra (3rd generation)| 49mm| 422| 514  
10, 11| 42mm| 374| 446  
10, 11| 46mm| 416| 496  
Apple Watch Ultra (1st and 2nd generations)| 49mm| 410| 502  
7, 8, and 9| 41mm| 352| 430  
7, 8, and 9| 45mm| 396| 484  
4, 5, 6, and SE (all generations)| 40mm| 324| 394  
4, 5, 6, and SE (all generations)| 44mm| 368| 448  
1, 2, and 3| 38mm| 272| 340  
1, 2, and 3| 42mm| 312| 390  
  
## [Resources](https://developer.apple.com/design/human-interface-guidelines/layout#Resources)

#### [Related](https://developer.apple.com/design/human-interface-guidelines/layout#Related)

[Right to left](https://developer.apple.com/design/human-interface-guidelines/right-to-left)

[Spatial layout](https://developer.apple.com/design/human-interface-guidelines/spatial-layout)

[Layout and organization](https://developer.apple.com/design/human-interface-guidelines/layout-and-organization)

#### [Developer documentation](https://developer.apple.com/design/human-interface-guidelines/layout#Developer-documentation)

[Composing custom layouts with SwiftUI](https://developer.apple.com/documentation/SwiftUI/composing-custom-layouts-with-swiftui) — SwiftUI

#### [Videos](https://developer.apple.com/design/human-interface-guidelines/layout#Videos)

[![](https://devimages-cdn.apple.com/wwdc-services/images/3055294D-836B-4513-B7B0-0BC5666246B0/1AAA030E-2ECA-47D8-AE09-6D7B72A840F6/10044_wide_250x141_1x.jpg) Get to know the new design system ](https://developer.apple.com/videos/play/wwdc2025/356)

[![](https://devimages-cdn.apple.com/wwdc-services/images/124/1E740BE0-AF55-430B-B8C2-346CA2982476/6549_wide_250x141_1x.jpg) Compose custom layouts with SwiftUI ](https://developer.apple.com/videos/play/wwdc2022/10056)

[![](https://devimages-cdn.apple.com/wwdc-services/images/7/2546ECBD-6443-41EC-921D-6429026F8B67/1700_wide_250x141_1x.jpg) Essential Design Principles ](https://developer.apple.com/videos/play/wwdc2017/802)

## [Change log](https://developer.apple.com/design/human-interface-guidelines/layout#Change-log)

Date| Changes  
---|---  
September 9, 2025| Added specifications for iPhone 17, iPhone Air, iPhone 17 Pro, iPhone 17 Pro Max, Apple Watch SE 3, Apple Watch Series 11, and Apple Watch Ultra 3.  
June 9, 2025| Added guidance for Liquid Glass.  
March 7, 2025| Added specifications for iPhone 16e, iPad 11-inch, iPad Air 11-inch, and iPad Air 13-inch.  
September 9, 2024| Added specifications for iPhone 16, iPhone 16 Plus, iPhone 16 Pro, iPhone 16 Pro Max, and Apple Watch Series 10.  
June 10, 2024| Made minor corrections and organizational updates.  
February 2, 2024| Enhanced guidance for avoiding system controls in iPadOS app layouts, and added specifications for 10.9-inch iPad Air and 8.3-inch iPad mini.  
December 5, 2023| Clarified guidance on centering content in a visionOS window.  
September 15, 2023| Added specifications for iPhone 15 Pro Max, iPhone 15 Pro, iPhone 15 Plus, iPhone 15, Apple Watch Ultra 2, and Apple Watch SE.  
June 21, 2023| Updated to include guidance for visionOS.  
September 14, 2022| Added specifications for iPhone 14 Pro Max, iPhone 14 Pro, iPhone 14 Plus, iPhone 14, and Apple Watch Ultra.

## Connections

- **Gehoert zu:** [[hig-foundations]]
- **Pfad:** `references/layout.md`
- **Domain:** [[Produktivitaet & Werkzeuge]]
- **Kategorie:** [[Developer Experience]]
