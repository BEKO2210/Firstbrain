---
type: referenz
created: 2026-04-11
parent-skill: "hig-patterns"
domain: software-development
category: architecture
tags:
  - skill-referenz
  - software-development
  - architecture
---|---  
Alignment| Indicates the alignment of a dragged item. For example, this pattern could be used in a drawing app when the people drag a shape into alignment with another shape. Other scenarios where this type of feedback could be used might include scaling an object to fit within specific dimensions, positioning an object at a preferred location, or reaching the beginning/end or minimum/maximum of something like a scrubber in a video app.  
Level change| Indicates movement between discrete levels of pressure. For example, as people press a fast-forward button on a video player, playback could increase or decrease and haptic feedback could be provided as different levels of pressure are reached.  
Generic| Intended for providing general feedback when the other patterns don’t apply.  
  
For developer guidance, see [`NSHapticFeedbackPerformer`](https://developer.apple.com/documentation/AppKit/NSHapticFeedbackPerformer).

### [watchOS](https://developer.apple.com/design/human-interface-guidelines/playing-haptics#watchOS)

Apple Watch Series 4 and later provides haptic feedback for the Digital Crown, which gives people a more tactile experience as they scroll through content. By default, the system provides linear haptic detents that people can feel as they rotate the Digital Crown. Some system controls, like table views, provide detents as new items scroll onto the screen. For developer guidance, see [`WKHapticType`](https://developer.apple.com/documentation/WatchKit/WKHapticType).

watchOS defines the following set of haptics, each of which conveys a specific meaning to people.

  * Notification 
  * Up 
  * Down 
  * Success 
  * Failure 
  * Retry 
  * Start 
  * Stop 
  * Click 



Video with custom controls. 

Content description: An animation that represents an arrangement of haptic pulses of various durations and strengths by showing a set of thin vertical lines that symbolize sound waves. 

Play 

**Notification.** Tells the person that something significant or out of the ordinary has happened and requires their attention. The system plays this same haptic when a local or remote notification arrives.

Video with custom controls. 

Content description: An animation that represents an arrangement of haptic pulses of various durations and strengths by showing a set of thin vertical lines that symbolize sound waves. 

Play 

**Up.** Tells the person that an important value increased above a significant threshold.

Video with custom controls. 

Content description: An animation that represents an arrangement of haptic pulses of various durations and strengths by showing a set of thin vertical lines that symbolize sound waves. 

Play 

**Down.** Tells the person that an important value decreased below a significant threshold.

Video with custom controls. 

Content description: An animation that represents an arrangement of haptic pulses of various durations and strengths by showing a set of thin vertical lines that symbolize sound waves. 

Play 

**Success.** Tells the person that an action completed successfully.

Video with custom controls. 

Content description: An animation that represents an arrangement of haptic pulses of various durations and strengths by showing a set of thin vertical lines that symbolize sound waves. 

Play 

**Failure.** Tells the person that an action failed.

Video with custom controls. 

Content description: An animation that represents an arrangement of haptic pulses of various durations and strengths by showing a set of thin vertical lines that symbolize sound waves. 

Play 

**Retry.** Tells the person that an action failed but they can retry it.

Video with custom controls. 

Content description: An animation that represents an arrangement of haptic pulses of various durations and strengths by showing a set of thin vertical lines that symbolize sound waves. 

Play 

**Start.** Tells the person that an activity started. Use this haptic when starting a timer or any other activity that a person can explicitly start and stop. The stop haptic usually follows this haptic.

Video with custom controls. 

Content description: An animation that represents an arrangement of haptic pulses of various durations and strengths by showing a set of thin vertical lines that symbolize sound waves. 

Play 

**Stop.** Tells the person that an activity stopped. Use this haptic when stopping a timer or other activity that the person previously started.

Video with custom controls. 

Content description: An animation that represents an arrangement of haptic pulses of various durations and strengths by showing a set of thin vertical lines that symbolize sound waves. 

Play 

**Click.** Provides the sensation of a dial clicking, helping you communicate progress at predefined increments or intervals. Overusing the click haptic tends to diminish its utility and can even be confusing when clicks overlap each other.

## [Resources](https://developer.apple.com/design/human-interface-guidelines/playing-haptics#Resources)

#### [Related](https://developer.apple.com/design/human-interface-guidelines/playing-haptics#Related)

[Feedback](https://developer.apple.com/design/human-interface-guidelines/feedback)

[Gestures](https://developer.apple.com/design/human-interface-guidelines/gestures)

#### [Developer documentation](https://developer.apple.com/design/human-interface-guidelines/playing-haptics#Developer-documentation)

[Core Haptics](https://developer.apple.com/documentation/CoreHaptics)

#### [Videos](https://developer.apple.com/design/human-interface-guidelines/playing-haptics#Videos)

[![](https://devimages-cdn.apple.com/wwdc-services/images/119/100FA6DD-1A48-485A-AFC2-47FDB92376D3/5210_wide_250x141_1x.jpg) Practice audio haptic design ](https://developer.apple.com/videos/play/wwdc2021/10278)

[![](https://devimages-cdn.apple.com/wwdc-services/images/48/9EEAE751-B5EE-4934-8F3A-38361FBA05DE/3277_wide_250x141_1x.jpg) Introducing Core Haptics ](https://developer.apple.com/videos/play/wwdc2019/520)

## [Change log](https://developer.apple.com/design/human-interface-guidelines/playing-haptics#Change-log)

Date| Changes  
---|---  
May 7, 2024| Added guidance for playing haptics on Apple Pencil Pro.  
June 21, 2023| Updated to include guidance for visionOS.

## Connections

- **Gehoert zu:** [[hig-patterns]]
- **Pfad:** `references/playing-haptics.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Software Architektur]]
