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
---|---  
A| Activates a control  
B| Cancels an action or returns to previous screen  
X| —  
Y| —  
Left shoulder| Navigates left to a different screen or section  
Right shoulder| Navigates right to a different screen or section  
Left trigger| —  
Right trigger| —  
Left/right thumbstick| Moves selection  
Directional pad| Moves selection  
Home/logo| Reserved for system controls  
Menu| Opens game settings or pauses gameplay  
  
**Support multiple connected controllers.** If there are multiple controllers connected, use labels and glyphs that match the one that the player is actively using. If your game supports multiplayer, use the appropriate labels and symbols when referring to a specific player’s controller. If you need to refer to buttons on multiple controllers, consider listing them together.

**Prefer using symbols, not text, to refer to game controller elements.** The Game Controller framework makes [SF Symbols](https://developer.apple.com/design/human-interface-guidelines/sf-symbols) available for most elements, including the buttons on various brands of game controllers. Using symbols instead of text descriptions can be especially helpful for players who aren’t experienced with controllers because it doesn’t require them to hunt for a specific button label during gameplay.

![A screenshot of the SF Symbols app showing symbols in the Gaming category.](https://docs-assets.developer.apple.com/published/c76627e659aa17ab46a638437cc5d33c/game-controls-sf-symbols-gaming-category%402x.png)

## [Keyboards](https://developer.apple.com/design/human-interface-guidelines/game-controls#Keyboards)

Keyboard players appreciate using keyboard bindings to speed up their interactions with apps and games.

**Prioritize single-key commands.** Single-key commands are generally easier and faster for players to perform, especially while they’re simultaneously using a mouse or trackpad. For example, you might use the first letter of a menu item as a shortcut, such as I for Inventory or M for Map; you might also map the game’s main action to the Space bar, taking advantage of the key’s relatively large size.

**Test key binding comfort game using an Apple keyboard.** For example, if a key binding uses the Control key (^) on a non-Apple keyboard, consider remapping it to the Command key (⌘) on an Apple keyboard. On Apple keyboards, the Command key is conveniently located next to the Space bar, making it especially easy to reach when players are using the W, A, S, and D keys.

**Take the proximity of keys into account.** For example, if players navigate using the W, A, S, and D keys, consider using nearby keys to define other high-value commands. Similarly, if there’s a group of closely related actions, it can work well to map their bindings to keys that are physically close together, such as using the number keys for inventory categories.

**Let players customize key bindings.** Although players tend to expect a reasonable set of defaults, many people need to customize a game’s key bindings for personal comfort and play style.

## [Platform considerations](https://developer.apple.com/design/human-interface-guidelines/game-controls#Platform-considerations)

 _No additional considerations for iOS, iPadOS, macOS, or tvOS. Not supported in watchOS._

### [visionOS](https://developer.apple.com/design/human-interface-guidelines/game-controls#visionOS)

**Match spatial game controller behavior to hand input.** In addition to supporting a wide array of wireless game controllers, your visionOS game can also support spatial game controllers such as PlayStation VR2 Sense controller. Allow players to interact with your game in a similar manner to how they interact using their hands. Specifically, support looking at an object and pressing the controller’s left or right trigger button to indirectly interact, or reaching out and pressing the left or right trigger button to directly interact. For more information, see [visionOS](https://developer.apple.com/design/human-interface-guidelines/gestures#visionOS).

## [Resources](https://developer.apple.com/design/human-interface-guidelines/game-controls#Resources)

#### [Related](https://developer.apple.com/design/human-interface-guidelines/game-controls#Related)

[Designing for games](https://developer.apple.com/design/human-interface-guidelines/designing-for-games)

[Gestures](https://developer.apple.com/design/human-interface-guidelines/gestures)

[Keyboards](https://developer.apple.com/design/human-interface-guidelines/keyboards)

[Playing haptics](https://developer.apple.com/design/human-interface-guidelines/playing-haptics)

#### [Developer documentation](https://developer.apple.com/design/human-interface-guidelines/game-controls#Developer-documentation)

[Create games for Apple platforms](https://developer.apple.com/games/)

[Touch Controller](https://developer.apple.com/documentation/TouchController)

[Game Controller](https://developer.apple.com/documentation/GameController)

#### [Videos](https://developer.apple.com/design/human-interface-guidelines/game-controls#Videos)

[![](https://devimages-cdn.apple.com/wwdc-services/images/C03E6E6D-A32A-41D0-9E50-C3C6059820AA/2DB746B8-E0B0-4ED1-B250-902DB7A0F3E7/9196_wide_250x141_1x.jpg) Design advanced games for Apple platforms ](https://developer.apple.com/videos/play/wwdc2024/10085)

[![](https://devimages-cdn.apple.com/wwdc-services/images/119/AD3141F9-6984-4328-9388-551C8677F6A2/4973_wide_250x141_1x.jpg) Tap into virtual and physical game controllers ](https://developer.apple.com/videos/play/wwdc2021/10081)

[![](https://devimages-cdn.apple.com/wwdc-services/images/C03E6E6D-A32A-41D0-9E50-C3C6059820AA/51863C09-0E96-4230-91A3-B85E950FBF3D/9205_wide_250x141_1x.jpg) Explore game input in visionOS ](https://developer.apple.com/videos/play/wwdc2024/10094)

## [Change log](https://developer.apple.com/design/human-interface-guidelines/game-controls#Change-log)

Date| Changes  
---|---  
June 9, 2025| Updated touch control best practices, updated game controller mapping for UI, and added guidance for spatial game controller support in visionOS.  
June 10, 2024| Added guidance for supporting touch controls and changed title from Game controllers.

## Connections

- **Gehoert zu:** [[hig-inputs]]
- **Pfad:** `references/game-controls.md`
- **Domain:** [[KI & Machine Learning]]
- **Kategorie:** [[LLM & KI-Agenten]]
