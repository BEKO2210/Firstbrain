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
---|---|---|---  
Passive| No| No| No  
Active| No| No| No  
Time Sensitive| Yes| Yes| No  
Critical| Yes| Yes| Yes  
  
Note

Because a Critical notification can override the Ring/Silent switch and break through scheduled delivery and Focus, you must get an entitlement to send one.

## [Best practices](https://developer.apple.com/design/human-interface-guidelines/managing-notifications#Best-practices)

**Build trust by accurately representing the urgency of each notification.** People have several ways to adjust how they receive your notifications — including turning off all notifications — so it’s essential to be as realistic as possible when assigning an interruption level. You don’t want people to feel that a notification uses a high level of urgency to interrupt them with low-priority information.

**Use the Time Sensitive interruption level only for notifications that are relevant in the moment.** To help people understand the benefits of letting Time Sensitive notifications break through a Focus or scheduled delivery, make sure the notification is about an event that’s happening now or will happen within an hour. The first time a Time Sensitive notification arrives from your app, the system describes how such a notification works and gives people a way to turn it off if they don’t agree that the information requires their immediate attention. Going forward, the system periodically gives people additional opportunities to evaluate how your Time Sensitive notification is working for them. For developer guidance, see [`UNNotificationInterruptionLevel`](https://developer.apple.com/documentation/UserNotifications/UNNotificationInterruptionLevel).

## [Sending marketing notifications](https://developer.apple.com/design/human-interface-guidelines/managing-notifications#Sending-marketing-notifications)

Don’t use notifications to send marketing or promotional content unless people explicitly agree to receive such information. When people want to learn about new features, content, or events related to your app or game, they can grant their permission to receive marketing notifications. For example, people who use a subscription app might appreciate getting an offer to become a subscriber, and game players might want to receive a special offer related to a live game event.

**Never use the Time Sensitive interruption level to send a marketing notification.** People may have agreed to receive marketing notifications from your app, but such a notification must never break through a Focus or scheduled delivery setting.

**Get people’s permission if you want to send them promotional or marketing notifications.** Before you send these notifications to people, you must receive their explicit permission to do so. Create an alert, modal view, or other interface that describes the types of information you want to send and gives people a clear way to opt in or out.

**Make sure people can manage their notification settings within your app.** In addition to requesting permission to send informational or marketing notifications, you must also provide an in-app settings screen that lets people change their choice. For guidance, see [Settings](https://developer.apple.com/design/human-interface-guidelines/settings).

## [Platform considerations](https://developer.apple.com/design/human-interface-guidelines/managing-notifications#Platform-considerations)

 _No additional considerations for iOS, iPadOS, macOS, tvOS, or visionOS._

### [watchOS](https://developer.apple.com/design/human-interface-guidelines/managing-notifications#watchOS)

By default, the notification settings people use for apps on their iPhone apply to the same apps on their Apple Watch. People can manage these settings in the Apple Watch app on iPhone, or they can access per-notification options — such as Mute 1 Hour or Turn off Time Sensitive — by swiping left when a notification arrives on their Apple Watch.

## [Resources](https://developer.apple.com/design/human-interface-guidelines/managing-notifications#Resources)

#### [Related](https://developer.apple.com/design/human-interface-guidelines/managing-notifications#Related)

[Privacy](https://developer.apple.com/design/human-interface-guidelines/privacy)

#### [Developer documentation](https://developer.apple.com/design/human-interface-guidelines/managing-notifications#Developer-documentation)

[User Notifications](https://developer.apple.com/documentation/UserNotifications)

#### [Videos](https://developer.apple.com/design/human-interface-guidelines/managing-notifications#Videos)

[![](https://devimages-cdn.apple.com/wwdc-services/images/119/B63A08EA-8856-4C77-9E1B-EA1CAD990619/4986_wide_250x141_1x.jpg) Send communication and Time Sensitive notifications ](https://developer.apple.com/videos/play/wwdc2021/10091)

[![](https://devimages-cdn.apple.com/wwdc-services/images/49/3D8237BC-06E3-4711-8552-7008A5D5BAAD/3764_wide_250x141_1x.jpg) The Push Notifications primer ](https://developer.apple.com/videos/play/wwdc2020/10095)

## Connections

- **Gehoert zu:** [[hig-patterns]]
- **Pfad:** `references/managing-notifications.md`
- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Software Architektur]]
