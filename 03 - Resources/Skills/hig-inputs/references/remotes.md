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
---|---|---  
Touch surface (swipe)| Navigates. Changes focus.| Performs directional pad behavior.  
Touch surface (press)| Activates a control or an item. Navigates deeper.| Performs primary button behavior.  
Back| Returns to previous screen. Exits to Apple TV Home Screen.| Pauses/resumes gameplay. Returns to previous screen, exits to main game menu, or exits to Apple TV Home Screen.  
Play/Pause| Activates media playback. Pauses/resumes media playback.| Performs secondary button behavior. Skips intro video.  
  
## [Compatible remotes](https://developer.apple.com/design/human-interface-guidelines/remotes#Compatible-remotes)

Some remotes that are compatible with Apple TV include buttons for browsing live TV or other channel-based content. For example, a remote might include a button people can use to open an electronic program guide (EPG) and other buttons they can use to browse the guide or change channels. For developer guidance, see [Providing Channel Navigation](https://developer.apple.com/documentation/TVServices/providing-channel-navigation); for design guidance, see [EPG experience](https://developer.apple.com/design/human-interface-guidelines/live-viewing-apps#EPG-experience).

**If your live-viewing app provides an EPG, respond to a remote’s EPG-browsing buttons in ways people expect.** When people press a “guide” or “browse” button, they expect your EPG to open. While they’re viewing your EPG, people expect to navigate through it by pressing a “page up” or “page down” button. Avoid responding to these buttons in other ways while people are browsing the EPG. On the Siri Remote and compatible remotes, people can also tap on the upper or lower area of the Touch surface to browse the EPG. If your app doesn’t support an EPG experience, the system routes these button presses to the default guide app on the viewer’s device.

**While your content plays, respond to a compatible remote’s “page up” or “page down” button by changing the channel.** People expect these buttons to behave differently when they switch between viewing content and browsing an EPG.

## [Platform considerations](https://developer.apple.com/design/human-interface-guidelines/remotes#Platform-considerations)

 _Not supported in iOS, iPadOS, macOS, visionOS, or watchOS._

## [Resources](https://developer.apple.com/design/human-interface-guidelines/remotes#Resources)

#### [Related](https://developer.apple.com/design/human-interface-guidelines/remotes#Related)

[Use your Siri Remote or Apple TV Remote with Apple TV](https://support.apple.com/en-us/HT205305)

## Connections

- **Gehoert zu:** [[hig-inputs]]
- **Pfad:** `references/remotes.md`
- **Domain:** [[KI & Machine Learning]]
- **Kategorie:** [[LLM & KI-Agenten]]
