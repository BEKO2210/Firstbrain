---
type: referenz
created: 2026-04-11
parent-skill: "hig-components-menus"
domain: ai-ml
category: llm-agents
tags:
  - skill-referenz
  - ai-ml
  - llm-agents
---|---  
Dialog with dismissal buttons (like OK and Cancel)| Lower corner, opposite to the dismissal buttons and vertically aligned with them  
Dialog without dismissal buttons| Lower-left or lower-right corner  
Settings window or pane| Lower-left or lower-right corner  
  
**Use a help button within a view, not in the window frame.** For example, avoid placing a help button in a toolbar or status bar.

**Avoid displaying text that introduces a help button.** People know what a help button does, so they don’t need additional descriptive text.

#### [Image buttons](https://developer.apple.com/design/human-interface-guidelines/buttons#Image-buttons)

An _image button_ appears in a view and displays an image, symbol, or icon. You can configure an image button to behave like a push button, toggle, or pop-up button.

**Use an image button in a view, not in the window frame.** For example, avoid placing an image button in a toolbar or status bar. If you need to use an image as a button in a toolbar, use a toolbar item. See [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars).

**Include about 10 pixels of padding between the edges of the image and the button edges.** An image button’s edges define its clickable area even when they aren’t visible. Including padding ensures that a click registers correctly even if it’s not precisely within the image. In general, avoid including a system-provided border in an image button; for developer guidance, see [`isBordered`](https://developer.apple.com/documentation/AppKit/NSButton/isBordered).

**If you need to include a label, position it below the image button.** For related guidance, see [Labels](https://developer.apple.com/design/human-interface-guidelines/labels).

### [visionOS](https://developer.apple.com/design/human-interface-guidelines/buttons#visionOS)

A visionOS button typically includes a visible background that can help people see it, and the button plays sound to provide feedback when people interact with it.

Video with custom controls. 

Content description: A recording showing the top portion of a window in visionOS. The window contains several buttons, including a 'More' button, which receives the hover effect. The button is selected and a menu containing additional options appears. 

Play 

There are three standard button shapes in visionOS. Typically, an icon-only button uses a [`circle`](https://developer.apple.com/documentation/SwiftUI/ButtonBorderShape/circle) shape, a text-only button uses a [`roundedRectangle`](https://developer.apple.com/documentation/SwiftUI/ButtonBorderShape/roundedRectangle) or [`capsule`](https://developer.apple.com/documentation/SwiftUI/ButtonBorderShape/capsule) shape, and a button that includes both an icon and text uses the capsule shape.

visionOS buttons use different visual styles to communicate four different interaction states.

![An image of a circular button that contains an icon of an outlined square with rounded corners. The button background is dark and the dashed outline is white.](https://docs-assets.developer.apple.com/published/aed0b1c313448f088dd1ee24663db11e/visionos-button-state-idle%402x.png)Idle

![An image of a circular button that contains an icon of an outlined square with rounded corners. The button background is medium dark and the outline is white.](https://docs-assets.developer.apple.com/published/29d708fd7985184cbee9d90d7684da92/visionos-button-state-hover%402x.png)Hover

![An image of a circular button that contains an icon of an outlined square with rounded corners. The button background is white and the outline is black.](https://docs-assets.developer.apple.com/published/0b94e710605235dfca19ef853499cf26/visionos-button-state-selected%402x.png)Selected

![An image of a circular button that contains an icon of an outlined square with rounded corners. The button background is very dark and the outline is light.](https://docs-assets.developer.apple.com/published/737120252765e5427161af32bb17e7fb/visionos-button-state-unavailable%402x.png)Unavailable

Note

In visionOS, buttons don’t support custom hover effects.

In addition to the four states shown above, a button can also reveal a tooltip when people look at it for a brief time. In general, buttons that contain text don’t need to display a tooltip because the button’s descriptive label communicates what it does.

Video with custom controls. 

Content description: An animation showing a tooltip appearing beneath a visionOS button. 

Play 

In visionOS, buttons can have the following sizes.

Shape| Mini (28 pt)| Small (32 pt)| Regular (44 pt)| Large (52 pt)| Extra large (64 pt)  
---|---|---|---|---|---  
Circular| ![A checkmark denoting availability.](https://docs-assets.developer.apple.com/published/9c1e6292b0ff3ee8f9e10917ad97f3da/table-availability-checkmark%402x.png)| ![A checkmark denoting availability.](https://docs-assets.developer.apple.com/published/9c1e6292b0ff3ee8f9e10917ad97f3da/table-availability-checkmark%402x.png)| ![A checkmark denoting availability.](https://docs-assets.developer.apple.com/published/9c1e6292b0ff3ee8f9e10917ad97f3da/table-availability-checkmark%402x.png)| ![A checkmark denoting availability.](https://docs-assets.developer.apple.com/published/9c1e6292b0ff3ee8f9e10917ad97f3da/table-availability-checkmark%402x.png)| ![A checkmark denoting availability.](https://docs-assets.developer.apple.com/published/9c1e6292b0ff3ee8f9e10917ad97f3da/table-availability-checkmark%402x.png)  
Capsule (text only)| | ![A checkmark denoting availability.](https://docs-assets.developer.apple.com/published/9c1e6292b0ff3ee8f9e10917ad97f3da/table-availability-checkmark%402x.png)| ![A checkmark denoting availability.](https://docs-assets.developer.apple.com/published/9c1e6292b0ff3ee8f9e10917ad97f3da/table-availability-checkmark%402x.png)| ![A checkmark denoting availability.](https://docs-assets.developer.apple.com/published/9c1e6292b0ff3ee8f9e10917ad97f3da/table-availability-checkmark%402x.png)|   
Capsule (text and icon)| | | ![A checkmark denoting availability.](https://docs-assets.developer.apple.com/published/9c1e6292b0ff3ee8f9e10917ad97f3da/table-availability-checkmark%402x.png)| ![A checkmark denoting availability.](https://docs-assets.developer.apple.com/published/9c1e6292b0ff3ee8f9e10917ad97f3da/table-availability-checkmark%402x.png)|   
Rounded rectangle| | ![A checkmark denoting availability.](https://docs-assets.developer.apple.com/published/9c1e6292b0ff3ee8f9e10917ad97f3da/table-availability-checkmark%402x.png)| ![A checkmark denoting availability.](https://docs-assets.developer.apple.com/published/9c1e6292b0ff3ee8f9e10917ad97f3da/table-availability-checkmark%402x.png)| ![A checkmark denoting availability.](https://docs-assets.developer.apple.com/published/9c1e6292b0ff3ee8f9e10917ad97f3da/table-availability-checkmark%402x.png)|   
  
**Prefer buttons that have a discernible background shape and fill.** It tends to be easier for people to see a button when it’s enclosed in a shape that uses a contrasting background fill. The exception is a button in a toolbar, context menu, alert, or [ornament](https://developer.apple.com/design/human-interface-guidelines/ornaments) where the shape and material of the larger component make the button comfortably visible. The following guidelines can help you ensure that a button looks good in different contexts:

  * When a button appears on top of a glass [window](https://developer.apple.com/design/human-interface-guidelines/windows#visionOS), use the [`thin`](https://developer.apple.com/documentation/SwiftUI/Material/thin) material as the button’s background.

  * When a button appears floating in space, use the [glass material](https://developer.apple.com/design/human-interface-guidelines/materials#visionOS) for its background.




**Avoid creating a custom button that uses a white background fill and black text or icons.** The system reserves this visual style to convey the toggled state.

**In general, prefer circular or capsule-shape buttons.** People’s eyes tend to be drawn toward the corners in a shape, making it difficult to keep looking at the shape’s center. The more rounded a button’s shape, the easier it is for people to look steadily at it. When you need to display a button by itself, prefer a capsule-shape button.

**Provide enough space around a button to make it easy for people to look at it.** Aim to place buttons so their centers are always at least 60 pts apart. If your buttons measure 60 pts or larger, add 4 pts of padding around them to keep the hover effect from overlapping. Also, it’s usually best to avoid displaying small or mini buttons in a vertical stack or horizontal row.

**Choose the right shape if you need to display text-labeled buttons in a stack or row.** Specifically, prefer the rounded-rectangle shape in a vertical stack of buttons and prefer the capsule shape in a horizontal row of buttons.

**Use standard controls to take advantage of the audible feedback sounds people already know.** Audible feedback is especially important in visionOS, because the system doesn’t play haptics.

### [watchOS](https://developer.apple.com/design/human-interface-guidelines/buttons#watchOS)

watchOS displays all inline buttons using the [`capsule`](https://developer.apple.com/documentation/SwiftUI/ButtonBorderShape/capsule) button shape. When you place a button inline with content, it gains a material effect that contrasts with the background to ensure legibility.

![An illustration that represents a screen on Apple Watch, which includes capsule-shaped Primary and Secondary buttons.](https://docs-assets.developer.apple.com/published/79565402ab107166de9aa0fe6eab4e6d/buttons-watch-full-width%402x.png)

**Use a toolbar to place buttons in the corners.** The system automatically moves the time and title to accommodate toolbar buttons. The system also applies the [Liquid Glass](https://developer.apple.com/design/human-interface-guidelines/materials#Liquid-Glass) appearance to toolbar buttons, providing a clear visual distinction from the content beneath them.

![An illustration showing toolbar buttons in the top leading and trailing corners, as well as three toolbar buttons across the bottom of the screen.](https://docs-assets.developer.apple.com/published/28835a2c6f34513eb0758beef1f6015d/buttons-watch-toolbar-corners%402x.png)

**Prefer buttons that span the width of the screen for primary actions in your app.** Full-width buttons look better and are easier for people to tap. If two buttons must share the same horizontal space, use the same height for both, and use images or short text titles for each button’s content.

**Use toolbar buttons to provide either navigation to related areas or contextual actions for the view’s content.** These buttons provide access to additional information or secondary actions for the view’s content.

**Use the same height for vertical stacks of one- and two-line text buttons.** As much as possible, use identical button heights for visual consistency.

## [Resources](https://developer.apple.com/design/human-interface-guidelines/buttons#Resources)

#### [Related](https://developer.apple.com/design/human-interface-guidelines/buttons#Related)

[Pop-up buttons](https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons)

[Pull-down buttons](https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons)

[Toggles](https://developer.apple.com/design/human-interface-guidelines/toggles)

[Segmented controls](https://developer.apple.com/design/human-interface-guidelines/segmented-controls)

[Location button](https://developer.apple.com/design/human-interface-guidelines/privacy#Location-button)

#### [Developer documentation](https://developer.apple.com/design/human-interface-guidelines/buttons#Developer-documentation)

[`Button`](https://developer.apple.com/documentation/SwiftUI/Button) — SwiftUI

[`UIButton`](https://developer.apple.com/documentation/UIKit/UIButton) — UIKit

[`NSButton`](https://developer.apple.com/documentation/AppKit/NSButton) — AppKit

## [Change log](https://developer.apple.com/design/human-interface-guidelines/buttons#Change-log)

Date| Changes  
---|---  
December 16, 2025| Updated guidance for Liquid Glass.  
June 9, 2025| Updated guidance for button styles and content.  
February 2, 2024| Noted that visionOS buttons don’t support custom hover effects.  
December 5, 2023| Clarified some terminology and guidance for buttons in visionOS.  
June 21, 2023| Updated to include guidance for visionOS.  
June 5, 2023| Updated guidance for using buttons in watchOS.

## Connections

- **Gehoert zu:** [[hig-components-menus]]
- **Pfad:** `references/buttons.md`
- **Domain:** [[KI & Machine Learning]]
- **Kategorie:** [[LLM & KI-Agenten]]
