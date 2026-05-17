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
---|---  
800x480| 5:3  
960x540| 16:9  
1280x720| 16:9  
1920x720| 8:3  
  
**Provide useful, high-value information in a clean layout that’s easy to scan from the driver’s seat.** Don’t clutter the screen with nonessential details and unnecessary visual embellishments.

**Maintain an overall consistent appearance throughout your app.** In general, ensure that elements with similar functions look similar.

**Ensure that primary content stands out and feels actionable.** Large items tend to appear more important than smaller ones and are easier for people to tap. In general, place the most important content and controls in the upper half of the screen.

## [Color](https://developer.apple.com/design/human-interface-guidelines/carplay#Color)

Color can indicate interactivity, impart vitality, and provide visual continuity.

**In general, prefer a limited color palette that coordinates with your app logo.** Subtle use of color is a great way to communicate your brand.

**Avoid using the same color for interactive and noninteractive elements.** If interactive and noninteractive elements have the same color, it’s hard for people to know where to tap.

**Test your app’s color scheme under a variety of lighting conditions in an actual car.** Lighting varies significantly based on time of day, weather, window tinting, and more. Colors you see on your computer at design time won’t always look the same when your app is used in the real world. Consider how color brightness might affect the experience of driving at night, and how low-contrast colors can wash out in direct sunlight. If necessary, make adjustments to provide the best possible viewing experience in the majority of use cases.

**Ensure your app looks great in both dark and light environments.** CarPlay supports both light and dark appearances, and may automatically adjust the current appearance based on lighting conditions.

**Choose colors that help you communicate effectively with everyone.** Different people see and interpret colors differently. For guidance on using colors in ways that people appreciate, see [Inclusive color](https://developer.apple.com/design/human-interface-guidelines/color#Inclusive-color).

## [Icons and images](https://developer.apple.com/design/human-interface-guidelines/carplay#Icons-and-images)

CarPlay supports both landscape and portrait displays and both @2x (low resolution) and @3x (high resolution) scale factors.

**Supply high-resolution images with scale factors of @2x and @3x for all CarPlay artwork in your app.** The system automatically shows the correct images and scales them appropriately, based on the resolution and size of the car’s display.

**Mirror your iPhone app icon.** A well-designed app icon works well in CarPlay and on iPhone, without the need for a second design.

**Don’t use black for your icon’s background.** Lighten a black background or add a border so the icon doesn’t blend into the display background.

Create your CarPlay app icon in the following sizes:

@2x (pixels)| @3x (pixels)  
---|---  
120x120| 180x180  
  
## [Error handling](https://developer.apple.com/design/human-interface-guidelines/carplay#Error-handling)

A CarPlay app needs to handle errors gracefully and report them to people only when absolutely necessary.

**Report errors in CarPlay, not on the connected iPhone.** If you must notify people of a problem, do so clearly in CarPlay. Never direct people to pick up their iPhone to read or resolve an error.

## [Platform considerations](https://developer.apple.com/design/human-interface-guidelines/carplay#Platform-considerations)

 _No additional considerations for iOS. Not supported in iPadOS, macOS, tvOS, visionOS, or watchOS._

## [Resources](https://developer.apple.com/design/human-interface-guidelines/carplay#Resources)

#### [Related](https://developer.apple.com/design/human-interface-guidelines/carplay#Related)

[CarPlay](http://developer.apple.com/carplay/)

#### [Developer documentation](https://developer.apple.com/design/human-interface-guidelines/carplay#Developer-documentation)

[CarPlay App Programming Guide](https://developer.apple.com/carplay/documentation/CarPlay-App-Programming-Guide.pdf)

#### [Videos](https://developer.apple.com/design/human-interface-guidelines/carplay#Videos)

[![](https://devimages-cdn.apple.com/wwdc-services/images/3055294D-836B-4513-B7B0-0BC5666246B0/3AE21C44-8831-4C0A-BCBE-68C437FB8FC8/9903_wide_250x141_1x.jpg) Turbocharge your app for CarPlay ](https://developer.apple.com/videos/play/wwdc2025/216)

## [Change log](https://developer.apple.com/design/human-interface-guidelines/carplay#Change-log)

Date| Changes  
---|---  
May 2, 2023| Consolidated guidance into one page.

## Connections

- **Gehoert zu:** [[hig-technologies]]
- **Pfad:** `references/carplay.md`
- **Domain:** [[KI & Machine Learning]]
- **Kategorie:** [[LLM & KI-Agenten]]
