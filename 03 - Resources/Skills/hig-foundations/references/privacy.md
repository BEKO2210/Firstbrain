---
type: referenz
created: 2026-04-11
parent-skill: "hig-foundations"
domain: productivity
category: developer-experience
tags:
  - skill-referenz
  - productivity
  - developer-experience
---|---|---  
![A checkmark in a circle to indicate a correct example.](https://docs-assets.developer.apple.com/published/88662da92338267bb64cd2275c84e484/checkmark%402x.png)| The app records during the night to detect snoring sounds.| An active sentence that clearly describes how and why the app collects the data.  
![An X in a circle to indicate an incorrect example.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)| Microphone access is needed for a better experience.| A passive sentence that provides a vague, undefined justification.  
![An X in a circle to indicate an incorrect example.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)| Turn on microphone access.| An imperative sentence that doesn’t provide any justification.  
  
Here are several examples of the standard system alert:

  * Example 1 
  * Example 2 
  * Example 3 



![A screenshot of a permission alert for a social media app displaying a purpose string that reads Allow Social Media to access your location? Turning on location  will allow us to show you nearby post locations. Below the string is a small map image containing the Precise On notice and below the map are three buttons in a stack. From the top, the buttons are titled Allow Once, Allow While Using App, and Don’t Allow.](https://docs-assets.developer.apple.com/published/cc8f1498cf0906c5cbba7b0a71fff511/privacy-social-media-post-location-alert%402x.png)

![A screenshot of a permission alert for a social media app displaying a purpose string that reads Social Media Would Like to Access Your Photos. Allow access to photos to upload photos from your library. The string is followed by three buttons in a stack. From the top, the buttons are titled Select Photos, Allow Access to All Photos, and Don’t Allow.](https://docs-assets.developer.apple.com/published/6143de7f950793edc8d632a54bf5d2bb/privacy-social-media-post-photo-alert%402x.png)

![A screenshot of a permission alert for a social media app displaying a purpose string that reads Social Media Would Like to Access Your Contacts. Find friends using Social Media and add them to your network. The string is followed by two side-by-side buttons: Don’t Allow and Allow.](https://docs-assets.developer.apple.com/published/9a0f4d978424e52a782b4f1596426415/privacy-social-media-friends-contacts-alert%402x.png)

### [Pre-alert screens, windows, or views](https://developer.apple.com/design/human-interface-guidelines/privacy#Pre-alert-screens-windows-or-views)

Ideally, the current context helps people understand why you’re requesting their permission. If it’s essential to provide additional details, you can display a custom screen or window before the system alert appears. The following guidelines apply to custom views that display before system alerts that request permission to access protected data and resources, including camera, microphone, location, contact, calendar, and tracking.

**Include only one button and make it clear that it opens the system alert.** People can feel manipulated when a custom screen or window also includes a button that doesn’t open the alert because the experience diverts them from making their choice. Another type of manipulation is using a term like “Allow” to title the custom screen’s button. If the custom button seems similar in meaning and visual weight to the allow button in the alert, people can be more likely to choose the alert’s allow button without meaning to. Use a term like “Continue” or “Next” to title the single button in your custom screen or window, clarifying that its action is to open the system alert.

![A screenshot of an app's pre-alert screen that reads Turning on location services allows us to provide features like: alerts when your friends are nearby, news of events happening near you, tagging and sharing your location. You can change this later in the Settings app. Below the text is a button titled Next.](https://docs-assets.developer.apple.com/published/bda87e1bb5098ab79fee0d0a3be3a10b/privacy-custom-messaging-correct%402x.png)

![A checkmark in a circle to indicate a correct example.](https://docs-assets.developer.apple.com/published/88662da92338267bb64cd2275c84e484/checkmark%402x.png)

**Don’t include additional actions in your custom screen or window.** For example, don’t provide a way for people to leave the screen or window without viewing the system alert — like offering an option to close or cancel.

![A screenshot of an app’s pre-alert screen that includes a button titled Cancel that appears below the Next button.](https://docs-assets.developer.apple.com/published/56cc76fcd5f87de8dae06080b81358f2/privacy-custom-messaging-incorrect-cancel-button%402x.png)

![An X in a circle to indicate an incorrect example.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)Don’t include an option to cancel.

![A screenshot of an app’s pre-alert screen that includes a Close button in the top-left corner. The Next button appears near the bottom of the screen.](https://docs-assets.developer.apple.com/published/a5cb7d6881eb22e248afd3f806743f67/privacy-custom-messaging-incorrect-close-button%402x.png)

![An X in a circle to indicate an incorrect example.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)Don’t include an option to close the view.

### [Tracking requests](https://developer.apple.com/design/human-interface-guidelines/privacy#Tracking-requests)

App tracking is a sensitive issue. In some cases, it might make sense to display a custom screen or window that describes the benefits of tracking. If you want to perform app tracking as soon as people launch your app, you must display the system-provided alert before you collect any tracking data.

**Never precede the system-provided alert with a custom screen or window that could confuse or mislead people.** People sometimes tap quickly to dismiss alerts without reading them. A custom messaging screen, window, or view that takes advantage of such behaviors to influence choices will lead to rejection by App Store review.

There are several prohibited custom-screen designs that will cause rejection. Some examples are offering incentives, displaying a screen or window that looks like a request, displaying an image of the alert, and annotating the screen behind the alert (as shown below). To learn more, see [App Review Guidelines: 5.1.1 (iv)](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage).

  * Incentive 
  * Imitation request 
  * Alert image 
  * Alert annotation 



![A screenshot of an app’s pre-tracking message that reads Allow tracking and get a $100 credit toward your next purchase. Below the text is an image of a dollar sign inside a circle. Below the image is a button titled Get $100 credit.](https://docs-assets.developer.apple.com/published/6000f4e89c244b12c8438aec034f7d1b/privacy-custom-messaging-prohibited-incentive%402x.png)

![An X in a circle to indicate an incorrect example.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)Don’t offer incentives for granting the request. You can’t offer people compensation for granting their permission, and you can’t withhold functionality or content or make your app unusable until people allow you to track them.

![A screenshot of an app’s pre-tracking message that reads Allow tracking for a better experience. Below the text is a bar graph image that shows four bars increasing in height from left to right. Below the graph is a button titled Allow Tracking.](https://docs-assets.developer.apple.com/published/f1d292d13b6548e9eb72397e0d3ad760/privacy-custom-messaging-prohibited-imitation%402x.png)

![An X in a circle to indicate an incorrect example.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)Don’t display a custom screen that mirrors the functionality of the system alert. In particular, don’t create a button title that uses “Allow” or similar terms, because people don’t allow anything in a pre-alert screen.

![A screenshot of an app’s pre-tracking message that reads Choose Allow when prompted. Below the text is an image of the system-provided alert. Below the image is a button titled Continue. The Allow While Using the App button in the system-provided alert image is circled.](https://docs-assets.developer.apple.com/published/5ae208fd0806ac0d7e89f9939a93c6e5/privacy-custom-messaging-prohibited-alert%402x.png)

![An X in a circle to indicate an incorrect example.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)Don’t show an image of the standard alert and modify it in any way.

![A screenshot of an app’s pre-tracking message that reads Allow tracking for a better experience. The app’s custom screen also includes an upward-pointing arrow and the words Choose Allow in the lower third of the screen.](https://docs-assets.developer.apple.com/published/780cf726198155101ee7cff6d786669f/privacy-custom-messaging-prohibited-alert-annotation%402x.png)

![An X in a circle to indicate an incorrect example.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)Don’t add a visual cue that draws people’s attention to the system alert’s Allow buttons.

## [Location button](https://developer.apple.com/design/human-interface-guidelines/privacy#Location-button)

In iOS, iPadOS, and watchOS, Core Location provides a button so people can grant your app temporary authorization to access their location at the moment a task needs it. A location button’s appearance can vary to match your app’s UI and it always communicates the action of location sharing in a way that’s instantly recognizable.

![An image of a lozenge-shaped blue button that displays a white location indicator — that is, a narrow arrow head shape that points to the top right — followed by the text Current Location.](https://docs-assets.developer.apple.com/published/2d4e44adec80170cec96d3446617e700/location-button%402x.png)

The first time people open your app and tap a location button, the system displays a standard alert. The alert helps people understand how using the button limits your app’s access to their location, and reminds them of the location indicator that appears when sharing starts.

![A screenshot of the alert displayed by the location button that appears on top of a background image showing a partial map. The alert reads Allow Social Media to access your location? Turning on location  will allow us to show you nearby post locations. Below this text the alert displays a small image of the map, zoomed in to show part of Cupertino. Below the map are three buttons; from the top the titles are Allow Once, Allow While Using App, and Don't Allow.](https://docs-assets.developer.apple.com/published/5cff6abb7fc42b749c616ab763a09968/privacy-social-media-map-location-alert%402x.png)

After people confirm their understanding of the button’s action, simply tapping the location button gives your app one-time permission to access their location. Although each one-time authorization expires when people stop using your app, they don’t need to reconfirm their understanding of the button’s behavior.

Note

If your app has no authorization status, tapping the location button has the same effect as when a person chooses _Allow Once_ in the standard alert. If people previously chose _While Using the App_ , tapping the location button doesn’t change your app’s status. For developer guidance, see [`LocationButton`](https://developer.apple.com/documentation/CoreLocationUI/LocationButton) (SwiftUI) and [`CLLocationButton`](https://developer.apple.com/documentation/CoreLocationUI/CLLocationButton) (Swift).

**Consider using the location button to give people a lightweight way to share their location for specific app features.** For example, your app might help people attach their location to a message or post, find a store, or identify a building, plant, or animal they’ve encountered in their location. If you know that people often grant your app _Allow Once_ permission, consider using the location button to help them benefit from sharing their location without having to repeatedly interact with the alert.

**Consider customizing the location button to harmonize with your UI.** Specifically, you can:

  * Choose the system-provided title that works best with your feature, such as “Current Location” or “Share My Current Location.”

  * Choose the filled or outlined location glyph.

  * Select a background color and a color for the title and glyph.

  * Adjust the button’s corner radius.




To help people recognize and trust location buttons, you can’t customize the button’s other visual attributes. The system also ensures a location button remains legible by warning you about problems like low-contrast color combinations or too much translucency. In addition to fixing such problems, you’re responsible for making sure the text fits in the button — for example, button text needs to fit without truncation at all accessibility text sizes and when translated into other languages.

Important

If the system identifies consistent problems with your customized location button, it won’t give your app access to the device location when people tap it. Although such a button can perform other app-specific actions, people may lose trust in your app if your location button doesn’t work as they expect.

## [Protecting data](https://developer.apple.com/design/human-interface-guidelines/privacy#Protecting-data)

Protecting people’s information is paramount. Give people confidence in your app’s security and help preserve their privacy by taking advantage of system-provided security technologies when you need to store information locally, authorize people for specific operations, and transport information across a network.

Here are some high-level guidelines.

**Avoid relying solely on passwords for authentication.** Where possible, use [passkeys](https://developer.apple.com/documentation/authenticationservices/public-private_key_authentication/supporting_passkeys/) to replace passwords. If you need to continue using passwords for authentication, augment security by requiring two-factor authentication (for developer guidance, see [Securing Logins with iCloud Keychain Verification Codes](https://developer.apple.com/documentation/AuthenticationServices/securing-logins-with-icloud-keychain-verification-codes)). To further protect access to apps that people keep logged in on their device, use biometric identification like Face ID, Optic ID, or Touch ID. For developer guidance, see [Local Authentication](https://developer.apple.com/documentation/LocalAuthentication).

**Store sensitive information in a keychain.** A keychain provides a secure, predictable user experience when handling someone’s private information. For developer guidance, see [Keychain services](https://developer.apple.com/documentation/Security/keychain-services).

**Never store passwords or other secure content in plain-text files.** Even if you restrict access using file permissions, sensitive information is much safer in an encrypted keychain.

**Avoid inventing custom authentication schemes.** If your app requires authentication, prefer system-provided features like [passkeys](https://developer.apple.com/documentation/authenticationservices/public-private_key_authentication/supporting_passkeys/), [Sign in with Apple](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple) or [Password AutoFill](https://developer.apple.com/documentation/Security/password-autofill). For related guidance, see [Managing accounts](https://developer.apple.com/design/human-interface-guidelines/managing-accounts).

## [Platform considerations](https://developer.apple.com/design/human-interface-guidelines/privacy#Platform-considerations)

 _No additional considerations for iOS, iPadOS, tvOS, or watchOS._

### [macOS](https://developer.apple.com/design/human-interface-guidelines/privacy#macOS)

**Sign your app with a valid Developer ID.** If you choose to distribute your app outside the store, signing your app with Developer ID identifies you as an Apple developer and confirms that your app is safe to use. For developer guidance, see [Xcode Help](https://developer.apple.com/go/?id=ios-app-distribution-guide).

**Protect people’s data with app sandboxing.** Sandboxing provides your app with access to system resources and user data while protecting it from malware. All apps submitted to the Mac App Store require sandboxing. For developer guidance, see [Configuring the macOS App Sandbox](https://developer.apple.com/documentation/Xcode/configuring-the-macos-app-sandbox).

**Avoid making assumptions about who is signed in.** Because of fast user switching, multiple people may be active on the same system.

### [visionOS](https://developer.apple.com/design/human-interface-guidelines/privacy#visionOS)

By default, visionOS uses ARKit algorithms to handle features like persistence, world mapping, segmentation, matting, and environment lighting. These algorithms are always running, allowing apps and games to automatically benefit from ARKit while in the Shared Space.

ARKit doesn’t send data to apps in the Shared Space; to access ARKit APIs, your app must open a Full Space. Additionally, features like Plane Estimation, Scene Reconstruction, Image Anchoring, and Hand Tracking require people’s permission to access any information. For developer guidance, see [Setting up access to ARKit data](https://developer.apple.com/documentation/visionOS/setting-up-access-to-arkit-data).

In visionOS, user input is private by design. The system automatically displays hover effects when people look at interactive components you create using SwiftUI or RealityKit, giving people the visual feedback they need without exposing where they’re looking before they tap. For guidance, see [Eyes](https://developer.apple.com/design/human-interface-guidelines/eyes) and [Gestures > visionOS](https://developer.apple.com/design/human-interface-guidelines/gestures#visionOS).

Developer access to device cameras works differently in visionOS than it does in other platforms. Specifically, the back camera provides blank input and is only available as a compatibility convenience; the front camera provides input for [spatial Personas](https://developer.apple.com/design/human-interface-guidelines/shareplay#visionOS), but only after people grant their permission. If the iOS or iPadOS app you’re bringing to visionOS includes a feature that needs camera access, remove it or replace it with an option for people to import content instead. For developer guidance, see [Making your existing app compatible with visionOS](https://developer.apple.com/documentation/visionOS/making-your-app-compatible-with-visionos).

## [Resources](https://developer.apple.com/design/human-interface-guidelines/privacy#Resources)

#### [Related](https://developer.apple.com/design/human-interface-guidelines/privacy#Related)

[Entering data](https://developer.apple.com/design/human-interface-guidelines/entering-data)

[Onboarding](https://developer.apple.com/design/human-interface-guidelines/onboarding)

#### [Developer documentation](https://developer.apple.com/design/human-interface-guidelines/privacy#Developer-documentation)

[Requesting access to protected resources](https://developer.apple.com/documentation/UIKit/requesting-access-to-protected-resources) — UIKit

[Security](https://developer.apple.com/documentation/Security)

[Requesting authorization to use location services](https://developer.apple.com/documentation/CoreLocation/requesting-authorization-to-use-location-services) — CoreLocation

[App Tracking Transparency](https://developer.apple.com/documentation/AppTrackingTransparency)

#### [Videos](https://developer.apple.com/design/human-interface-guidelines/privacy#Videos)

[![](https://devimages-cdn.apple.com/wwdc-services/images/3055294D-836B-4513-B7B0-0BC5666246B0/0A08BD06-2B59-45BA-AA75-C9206946195D/9945_wide_250x141_1x.jpg) Integrate privacy into your development process ](https://developer.apple.com/videos/play/wwdc2025/246)

[![](https://devimages-cdn.apple.com/wwdc-services/images/3055294D-836B-4513-B7B0-0BC5666246B0/473C8E4A-1764-482D-BE24-B3A7BBDBD526/9996_wide_250x141_1x.jpg) What’s new in passkeys ](https://developer.apple.com/videos/play/wwdc2025/279)

[![](https://devimages-cdn.apple.com/wwdc-services/images/C03E6E6D-A32A-41D0-9E50-C3C6059820AA/39DEAE04-CBAD-401A-973C-3916F2B9624A/9251_wide_250x141_1x.jpg) What’s new in privacy ](https://developer.apple.com/videos/play/wwdc2024/10123)

## [Change log](https://developer.apple.com/design/human-interface-guidelines/privacy#Change-log)

Date| Changes  
---|---  
June 21, 2023| Consolidated guidance into new page and updated for visionOS.

## Connections

- **Gehoert zu:** [[hig-foundations]]
- **Pfad:** `references/privacy.md`
- **Domain:** [[Produktivitaet & Werkzeuge]]
- **Kategorie:** [[Developer Experience]]
