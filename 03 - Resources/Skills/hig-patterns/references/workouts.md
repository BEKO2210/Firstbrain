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
![A checkmark in a circle to indicate correct usage.](https://docs-assets.developer.apple.com/published/88662da92338267bb64cd2275c84e484/checkmark%402x.png)| GPS is not used during a Pool Swim, and water may prevent a heart-rate measurement, but Apple Watch will still track your calories, laps, and distance using the built-in accelerometer.  
![A checkmark in a circle to indicate correct usage.](https://docs-assets.developer.apple.com/published/88662da92338267bb64cd2275c84e484/checkmark%402x.png)| In this type of workout, you earn the calorie equivalent of a brisk walk anytime sensor readings are unavailable.  
![A checkmark in a circle to indicate correct usage.](https://docs-assets.developer.apple.com/published/88662da92338267bb64cd2275c84e484/checkmark%402x.png)| GPS will only provide distance when you do a freestyle stroke. Water might prevent a heart-rate measurement, but calories will still be tracked using the built-in accelerometer.  
  
**Provide a summary at the end of a session.** A summary screen confirms that a workout is finished and displays the recorded information. Consider enhancing the summary by including Activity rings, so that people can easily check their current progress.

**Discard extremely brief workout sessions.** If a session ends a few seconds after it starts, either discard the data automatically or ask people if they want to record the data as a workout.

**Make sure text is legible for when people are in motion.** When a session requires movement, use large font sizes, high-contrast colors, and arrange text so that the most important information is easy to read.

**Use Activity rings correctly.** The Activity rings view is an Apple-designed element featuring one or more rings whose colors and meanings match those in the Activity app. Use them only for their documented purpose.

## [Platform considerations](https://developer.apple.com/design/human-interface-guidelines/workouts#Platform-considerations)

 _No additional considerations for iOS, iPadOS, or watchOS. Not supported in macOS, tvOS, or visionOS._

## [Resources](https://developer.apple.com/design/human-interface-guidelines/workouts#Resources)

#### [Related](https://developer.apple.com/design/human-interface-guidelines/workouts#Related)

[Activity rings](https://developer.apple.com/design/human-interface-guidelines/activity-rings)

#### [Developer documentation](https://developer.apple.com/design/human-interface-guidelines/workouts#Developer-documentation)

[WorkoutKit](https://developer.apple.com/documentation/WorkoutKit)

[Workouts and activity rings](https://developer.apple.com/documentation/HealthKit/workouts-and-activity-rings) — HealthKit

#### [Videos](https://developer.apple.com/design/human-interface-guidelines/workouts#Videos)

[![](https://devimages-cdn.apple.com/wwdc-services/images/3055294D-836B-4513-B7B0-0BC5666246B0/12499BF9-8217-4A56-81CA-5E7CB66904DD/9856_wide_250x141_1x.jpg) Track workouts with HealthKit on iOS and iPadOS ](https://developer.apple.com/videos/play/wwdc2025/322)

[![](https://devimages-cdn.apple.com/wwdc-services/images/D35E0E85-CCB6-41A1-B227-7995ECD83ED5/50551741-78CD-4E8A-9550-7D0EC29D7882/8035_wide_250x141_1x.jpg) Build custom workouts with WorkoutKit ](https://developer.apple.com/videos/play/wwdc2023/10016)

[![](https://devimages-cdn.apple.com/wwdc-services/images/119/30D3C2CB-B24D-467A-9B20-A369641E966F/4850_wide_250x141_1x.jpg) Build a workout app for Apple Watch ](https://developer.apple.com/videos/play/wwdc2021/10009)

## Connections

- **Gehoert zu:** [[hig-patterns]]
- **Pfad:** `references/workouts.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Software Architektur]]
