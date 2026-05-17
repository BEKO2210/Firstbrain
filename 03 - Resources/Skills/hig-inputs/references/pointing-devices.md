---
type: referenz
created: 2026-04-11
parent-skill: "hig-inputs"
domain: ai-ml
category: llm-agents
tags:
  - skill-referenz
  - ai-ml
  - llm-agents
---|---|---|---  
Primary click| Select or activate an item, such as a file or button.| ●| ●  
Secondary click| Reveal contextual menus.| ●| ●  
Scrolling| Move content up, down, left, or right within a view.| ●| ●  
Smart zoom| Zoom in or out on content, such as a web page or PDF.| ●| ●  
Swipe between pages| Navigate forward or backward between individually displayed pages.| ●| ●  
Swipe between full-screen apps| Navigate forward or backward between full-screen apps and spaces.| ●| ●  
Mission Control (double-tap the mouse with two fingers or swipe up on the trackpad with three or four fingers)| Activate Mission Control.| ●| ●  
Lookup and data detectors (force click with one finger or tap with three fingers)| Display a lookup window above selected content.| | ●  
Tap to click| Perform the primary click action using a tap rather than a click.| | ●  
Force click| Click then press firmly to display a Quick Look window or lookup window above selected content. Apply a variable amount of pressure to affect pressure-sensitive controls, such as variable speed media controls.| | ●  
Zoom in or out (pinch with two fingers)| Zoom in or out.| | ●  
Rotate (move two fingers in a circular motion)| Rotate content, such as an image.| | ●  
Notification Center (swipe from the edge of the trackpad)| Display Notification Center.| | ●  
App Exposé (swipe down with three or four fingers)| Display the current app’s windows in Exposé.| | ●  
Launchpad (pinch with thumb and three fingers)| Display the Launchpad.| | ●  
Show Desktop (spread with thumb and three fingers)| Slide all windows out of the way to reveal the desktop.| | ●  
  
#### [Pointers](https://developer.apple.com/design/human-interface-guidelines/pointing-devices#Pointers)

macOS offers a variety of standard pointer styles, which your app can use to communicate the interactive state of an interface element or the result of a drag operation.

Pointer| Name| Meaning| AppKit API  
---|---|---|---  
![A pointer that resembles a diagonal arrow pointing up and to the left.](https://docs-assets.developer.apple.com/published/5be2c381c17d5d868866b3a5de1013f8/pointers-arrow%402x.png)| Arrow| Standard pointer for selecting and interacting with content and interface elements.| [`arrow`](https://developer.apple.com/documentation/AppKit/NSCursor/arrow)  
![A closed, gloved hand.](https://docs-assets.developer.apple.com/published/6680cdb870edf5364f84a483fd2bead9/pointers-closed-hand%402x.png)| Closed hand| Dragging to reposition the display of content within a view—for example, dragging a map around in Maps.| [`closedHand`](https://developer.apple.com/documentation/AppKit/NSCursor/closedHand)  
![A pointer arrow with a small menu-like square to the right of the arrow.](https://docs-assets.developer.apple.com/published/0cb033cee3b55bd4be661b28b928fdc1/pointers-contextual-menu%402x.png)| Contextual menu| A contextual menu is available for the content below the pointer. This pointer is generally shown only when the Control key is pressed.| [`contextualMenu`](https://developer.apple.com/documentation/AppKit/NSCursor/contextualMenu)  
![A plus symbol.](https://docs-assets.developer.apple.com/published/d55eabe14365af873000aa389e5fad6c/pointers-crosshair%402x.png)| Crosshair| Precise rectangular selection is possible, such as when viewing an image in Preview.| [`crosshair`](https://developer.apple.com/documentation/AppKit/NSCursor/crosshair)  
![A small pointer arrowhead with a circle underneath; the circle contains an Ex.](https://docs-assets.developer.apple.com/published/528819d511869de26beb1fd5008ac773/pointers-disappearing-item%402x.png)| Disappearing item| A dragged item will disappear when dropped. If the item references an original item, the original is unaffected. For example, when dragging a mailbox out of the favorites bar in Mail, the original mailbox isn’t removed.| [`disappearingItem`](https://developer.apple.com/documentation/AppKit/NSCursor/disappearingItem)  
![A small pointer arrowhead with a circle underneath; the circle contains a plus symbol.](https://docs-assets.developer.apple.com/published/ccc7052f9bc6fb302d913633c648adcd/pointers-drag-copy%402x.png)| Drag copy| Duplicates a dragged—not moved—item when dropped into the destination. Appears when pressing the Option key during a drag operation.| [`dragCopy`](https://developer.apple.com/documentation/AppKit/NSCursor/dragCopy)  
![A curved arrow, pointing up and to the right.](https://docs-assets.developer.apple.com/published/47dfbfd5f1bf3141dbf875f47446d1fd/pointers-drag-link%402x.png)| Drag link| During a drag and drop operation, creates an alias of the selected file when dropped. The alias points to the original file, which remains unmoved. Appears when pressing the Option and Command keys during a drag operation.| [`dragLink`](https://developer.apple.com/documentation/AppKit/NSCursor/dragLink)  
![Opposing veritcal braces, used to form an insertion marker.](https://docs-assets.developer.apple.com/published/060f443dee8d260a1a1191d7831e36b7/pointers-horizontal-beam%402x.png)| Horizontal I beam| Selection and insertion of text is possible in a horizontal layout, such as a TextEdit or Pages document.| [`iBeam`](https://developer.apple.com/documentation/AppKit/NSCursor/iBeam)  
![An open, gloved hand.](https://docs-assets.developer.apple.com/published/a5daee642ccc8fb3ac550d176b2d1932/pointers-open-hand%402x.png)| Open hand| Dragging to reposition content within a view is possible.| [`openHand`](https://developer.apple.com/documentation/AppKit/NSCursor/openHand)  
![A small pointer arrowhead with a do not enter symbol underneath.](https://docs-assets.developer.apple.com/published/2daaf47bef26569f92f30a9016095dde/pointers-operation-not-allowed%402x.png)| Operation not allowed| A dragged item can’t be dropped in the current location.| [`operationNotAllowed`](https://developer.apple.com/documentation/AppKit/NSCursor/operationNotAllowed)  
![A gloved hand, with the index finger extended.](https://docs-assets.developer.apple.com/published/25193808b5e72d5983ff26764889718a/pointers-pointing-hand%402x.png)| Pointing hand| The content beneath the pointer is a URL link to a webpage, document, or other item.| [`pointingHand`](https://developer.apple.com/documentation/AppKit/NSCursor/pointingHand)  
![A horizontal bar with a downward-pointing arrow at its midpoint.](https://docs-assets.developer.apple.com/published/328443ed3b5dd85c84de91a60ed30b43/pointers-resize-down%402x.png)| Resize down| Resize or move a window, view, or element downward.| [`resizeDown`](https://developer.apple.com/documentation/AppKit/NSCursor/resizeDown)  
![A vertical bar with a left-pointing arrow at its midpoint.](https://docs-assets.developer.apple.com/published/34113d73f24c003f4b3715e0cef8fbf6/pointers-resize-left%402x.png)| Resize left| Resize or move a window, view, or element to the left.| [`resizeLeft`](https://developer.apple.com/documentation/AppKit/NSCursor/resizeLeft)  
![A vertical bar with left- and right-pointing arrows extending from its midpoint.](https://docs-assets.developer.apple.com/published/478726bb1a630013de1f77b3bccde9e0/pointers-resize-left-right%402x.png)| Resize left/right| Resize or move a window, view, or element to the left or right.| [`resizeLeftRight`](https://developer.apple.com/documentation/AppKit/NSCursor/resizeLeftRight)  
![A vertical bar with a right-pointing arrow at its midpoint.](https://docs-assets.developer.apple.com/published/6045fce093cc242bf438393155b77992/pointers-resize-right%402x.png)| Resize right| Resize or move a window, view, or element to the right.| [`resizeRight`](https://developer.apple.com/documentation/AppKit/NSCursor/resizeRight)  
![A horizontal bar with an up-pointing arrow at its midpoint.](https://docs-assets.developer.apple.com/published/34576a4ab42dea114abf11b3ee57a4f8/pointers-resize-up%402x.png)| Resize up| Resize or move a window, view, or element upward.| [`resizeUp`](https://developer.apple.com/documentation/AppKit/NSCursor/resizeUp)  
![A horizontal bar with up- and down-pointing arrows extending from its midpoint.](https://docs-assets.developer.apple.com/published/d55d0d01c955105a957231266affb447/pointers-resize-up-down%402x.png)| Resize up/down| Resize or move a window, view, or element upward or downward.| [`resizeUpDown`](https://developer.apple.com/documentation/AppKit/NSCursor/resizeUpDown)  
![Opposing horizontal braces, used to form an insertion marker.](https://docs-assets.developer.apple.com/published/15923a8cac833b5bb1fd69b4a395c4a9/pointers-vertical-beam%402x.png)| Vertical I beam| Selection and insertion of text is possible in a vertical layout.| [`iBeamCursorForVerticalLayout`](https://developer.apple.com/documentation/AppKit/NSCursor/iBeamCursorForVerticalLayout)  
  
### [visionOS](https://developer.apple.com/design/human-interface-guidelines/pointing-devices#visionOS)

In visionOS, people can attach an external pointing device or keyboard, and use both devices while they continue to use their eyes and hands. If people look at an element and then move the pointer, the system brings focus to the element under the pointer. Your app doesn’t have to do anything to support this behavior.

When a pointing device is attached, the area people are looking at determines the pointer’s context. For example, when people shift their eyes from one window to another, the pointer’s context seamlessly transitions to the new window.

Video with custom controls. 

Content description: A recording that shows a pointer moving around, highlighting items, and scrolling content within a Safari window in visionOS. A picture-in-picture window is visible in the bottom left corner of the recording. It shows a person's hand operating a trackpad next to a keyboard outside the field of view. The person's gestures on the trackpad correspond to the pointer movements. 

Play 

When people use an attached pointing device that supports gestures, like a trackpad or mouse, the pointer hides while people are gesturing, minimizing visual distraction. In this scenario, the pointer remains hidden until people move it, when it reappears in the location they’re looking at.

## [Resources](https://developer.apple.com/design/human-interface-guidelines/pointing-devices#Resources)

#### [Related](https://developer.apple.com/design/human-interface-guidelines/pointing-devices#Related)

[Entering data](https://developer.apple.com/design/human-interface-guidelines/entering-data)

[Keyboards](https://developer.apple.com/design/human-interface-guidelines/keyboards)

#### [Developer documentation](https://developer.apple.com/design/human-interface-guidelines/pointing-devices#Developer-documentation)

[Input events](https://developer.apple.com/documentation/SwiftUI/Input-events) — SwiftUI

[Pointer interactions](https://developer.apple.com/documentation/UIKit/pointer-interactions) — UIKit

[Mouse, Keyboard, and Trackpad](https://developer.apple.com/documentation/AppKit/mouse-keyboard-and-trackpad) — AppKit

#### [Videos](https://developer.apple.com/design/human-interface-guidelines/pointing-devices#Videos)

[![](https://devimages-cdn.apple.com/wwdc-services/images/49/F9A980A7-B00A-4856-9172-FDB610A419E5/3509_wide_250x141_1x.jpg) Design for the iPadOS pointer ](https://developer.apple.com/videos/play/wwdc2020/10640)

## [Change log](https://developer.apple.com/design/human-interface-guidelines/pointing-devices#Change-log)

Date| Changes  
---|---  
June 21, 2023| Updated to include guidance for visionOS.

## Connections

- **Gehoert zu:** [[hig-inputs]]
- **Pfad:** `references/pointing-devices.md`
- **Domain:** [[KI & Machine Learning]]
- **Kategorie:** [[LLM & KI-Agenten]]
