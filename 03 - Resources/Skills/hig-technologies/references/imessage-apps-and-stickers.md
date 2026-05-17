---
type: referenz
created: 2026-04-11
parent-skill: "hig-technologies"
domain: ai-ml
category: llm-agents
tags:
  - skill-referenz
  - ai-ml
  - llm-agents
---|---|---  
Messages, notifications| 148x110| -  
| 143x100| -  
| 120x90| 180x135  
| 64x48| 96x72  
| 54x40| 81x60  
Settings| 58x58| 87x87  
App Store| 1024x1024| 1024x1024  
  
### [Sticker sizes](https://developer.apple.com/design/human-interface-guidelines/imessage-apps-and-stickers#Sticker-sizes)

Messages supports small, regular, and large stickers. Pick the size that works best for your content and prepare all of your stickers at that size; don’t mix sizes within a single sticker pack. Messages displays stickers in a grid, organized differently for different sizes.

![An illustration showing a grid of small stickers in the bottom half of an iPhone screen. Eight stickers are visible in the area, followed by a partial row of four, arranged in three rows.](https://docs-assets.developer.apple.com/published/a64edfeafbb874560b2a72b04505ff43/sticker-sizes-small%402x.png)

Small

![An illustration showing a grid of regular stickers in the bottom half of an iPhone screen. Six stickers are visible in the area, in two rows of three.](https://docs-assets.developer.apple.com/published/092a81eb61dbb7310098aecf4c0c73a7/sticker-sizes-regular%402x.png)

Regular

![An illustration showing a grid of large stickers in the bottom half of an iPhone screen. Two stickers are fully visible in the area, followed by a partial row of two additional stickers.](https://docs-assets.developer.apple.com/published/7d0d3ead02ab892c2eaa8c575707c3d5/sticker-sizes-large%402x.png)

Large

Create your sticker images using the following @3x dimensions for the sticker size you chose. If necessary, the system generates @2x and @1x versions by downscaling the images at runtime. For developer guidance, see [`MSStickerSize`](https://developer.apple.com/documentation/Messages/MSStickerSize).

Sticker size| @3x dimensions (pixels)  
---|---  
Small| 300x300  
Regular| 408x408  
Large| 618x618  
  
A sticker file must be 500 KB or smaller in size. For each supported format, the table below provides guidance for using transparency and animation.

Format| Transparency| Animation  
---|---|---  
PNG| 8-bit| No  
APNG| 8-bit| Yes  
GIF| Single-color| Yes  
JPEG| No| No  
  
## [Platform considerations](https://developer.apple.com/design/human-interface-guidelines/imessage-apps-and-stickers#Platform-considerations)

 _No additional considerations for iOS or iPadOS. Not supported in macOS, tvOS, visionOS, or watchOS._

## [Resources](https://developer.apple.com/design/human-interface-guidelines/imessage-apps-and-stickers#Resources)

#### [Related](https://developer.apple.com/design/human-interface-guidelines/imessage-apps-and-stickers#Related)

[iMessage Apps and Stickers](https://developer.apple.com/imessage/)

#### [Developer documentation](https://developer.apple.com/design/human-interface-guidelines/imessage-apps-and-stickers#Developer-documentation)

[Messages](https://developer.apple.com/documentation/Messages)

[Adding Sticker packs and iMessage apps to the system Stickers app, Messages camera, and FaceTime](https://developer.apple.com/documentation/Messages/adding-sticker-packs-and-imessage-apps-to-the-system-stickers-app-messages-camera-and-facetime) — Messages

#### [Videos](https://developer.apple.com/design/human-interface-guidelines/imessage-apps-and-stickers#Videos)

[![](https://devimages-cdn.apple.com/wwdc-services/images/7/FC4A4C67-CCE9-46D5-9376-D071D53B4FB2/1925_wide_250x141_1x.jpg) Express Yourself! ](https://developer.apple.com/videos/play/wwdc2017/820)

## [Change log](https://developer.apple.com/design/human-interface-guidelines/imessage-apps-and-stickers#Change-log)

Date| Changes  
---|---  
May 2, 2023| Consolidated guidance into one page.

## Connections

- **Gehoert zu:** [[hig-technologies]]
- **Pfad:** `references/imessage-apps-and-stickers.md`
- **Domain:** [[KI & Machine Learning]]
- **Kategorie:** [[LLM & KI-Agenten]]
