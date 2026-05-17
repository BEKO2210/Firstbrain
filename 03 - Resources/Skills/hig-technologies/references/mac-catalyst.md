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
Tap| Left or right click  
Touch and hold| Click and hold  
Pan| Left click and drag  
  
iPadOS gesture…| Translates to trackpad gesture  
---|---  
Tap| Click  
Touch and hold| Click and hold  
Pan| Click and drag  
Pinch| Pinch  
Rotate| Rotate  
  
Developer note

The system sends the two touches in the pinch and rotate gestures to the view under the pointer, not the view under each touch.

### [App icons](https://developer.apple.com/design/human-interface-guidelines/mac-catalyst#App-icons)

**Create a macOS version of your app icon.** Great macOS app icons showcase the lifelike rendering style that people expect in macOS while maintaining a harmonious experience across all platforms.

### [Layout](https://developer.apple.com/design/human-interface-guidelines/mac-catalyst#Layout)

To take advantage of the wider Mac screen in ways that give Mac users a great experience, consider updating your layout in the following ways:

  * Divide a single column of content and actions into multiple columns.

  * Use the regular-width and regular-height size classes, and consider reflowing elements in the content area to a side-by-side arrangement as people resize the window.

  * Present an inspector UI next to the main content instead of using a popover.




**Consider moving controls from the main UI of your iPad app to your Mac app’s toolbar.** Be sure to list the commands associated with these controls in the menus of your Mac app’s menu bar.

**As much as possible, adopt a top-down flow.** Mac apps place the most important actions and content near the top of the window. If your iPad app provides controls in a toolbar, put these controls in the window toolbar of the macOS version of your app.

**Relocate buttons from the side and bottom edges of the screen.** On iPad, placing buttons on these screen edges can help people reach them, but on a Mac, this ergonomic consideration doesn’t apply. You may want to relocate these controls to other areas or put them in the toolbar of your macOS window.

### [Menus](https://developer.apple.com/design/human-interface-guidelines/mac-catalyst#Menus)

Mac users are familiar with the persistent menu bar and expect to find all of an app’s commands in it. In contrast, iPadOS doesn’t have a persistent menu bar, and iPad users expect to find app commands within the app’s UI or in the shortcut interface that displays when they hold the Command key on a connected keyboard.

Developer note

To support keyboard shortcuts for menu commands, use [`UIKeyCommand`](https://developer.apple.com/documentation/UIKit/UIKeyCommand). For developer guidance, see [Adding menus and shortcuts to the menu bar and user interface](https://developer.apple.com/documentation/UIKit/adding-menus-and-shortcuts-to-the-menu-bar-and-user-interface).

If you provide [pop-up buttons](https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons) or [pull-down buttons](https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons) that reveal a menu in your iPad app, the menu automatically takes on a macOS appearance in the Mac app you create with Mac Catalyst.

Developer note

To add and remove custom app menus, use [`UIMenuBuilder`](https://developer.apple.com/documentation/UIKit/UIMenuBuilder) and add menu items that represent your iPad app’s commands as menu items with [`UICommand`](https://developer.apple.com/documentation/UIKit/UICommand).

The system automatically converts the context menus in your iPad app to context menus in the macOS version of your app. As you create the Mac version of your app, consider looking for additional places to support context menus. Mac users tend to expect every object in your app to offer a context menu of relevant actions. Note that on a Mac, a context menu is sometimes called a _contextual_ menu.

## [Platform considerations](https://developer.apple.com/design/human-interface-guidelines/mac-catalyst#Platform-considerations)

 _No additional considerations for iPadOS or macOS. Not supported in iOS, tvOS, visionOS, or watchOS._

## [Resources](https://developer.apple.com/design/human-interface-guidelines/mac-catalyst#Resources)

#### [Related](https://developer.apple.com/design/human-interface-guidelines/mac-catalyst#Related)

[Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos)

#### [Developer documentation](https://developer.apple.com/design/human-interface-guidelines/mac-catalyst#Developer-documentation)

[Mac Catalyst](https://developer.apple.com/documentation/UIKit/mac-catalyst) — UIKit

#### [Videos](https://developer.apple.com/design/human-interface-guidelines/mac-catalyst#Videos)

[![](https://devimages-cdn.apple.com/wwdc-services/images/48/C0F7535C-FB17-48D8-8530-F959A9471DCE/3273_wide_250x141_1x.jpg) Designing iPad Apps for Mac ](https://developer.apple.com/videos/play/wwdc2019/809)

## [Change log](https://developer.apple.com/design/human-interface-guidelines/mac-catalyst#Change-log)

Date| Changes  
---|---  
May 2, 2023| Consolidated guidance into one page.

## Connections

- **Gehoert zu:** [[hig-technologies]]
- **Pfad:** `references/mac-catalyst.md`
- **Domain:** [[KI & Machine Learning]]
- **Kategorie:** [[LLM & KI-Agenten]]
