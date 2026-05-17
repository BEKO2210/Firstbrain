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
Scan the [_object name_].| Scan the NFC tag.  
Hold your iPhone near the [_object name_] to learn more about it.| To use NFC scanning, tap your phone to the [_object_].  
  
**Provide succinct instructional text for the scanning sheet.** Provide a complete sentence, in sentence case, with ending punctuation. Identify the object to scan, and revise the text appropriately for subsequent scans. Keep the text short to avoid truncation.

First scan| Subsequent scans  
---|---  
Hold your iPhone near the [_object name_] to learn more about it.| Now hold your iPhone near another [_object name_].  
  
## [Background tag reading](https://developer.apple.com/design/human-interface-guidelines/nfc#Background-tag-reading)

Background tag reading lets people scan tags quickly any time, without needing to first open your app and initiate scanning. On devices that support background tag reading, the system automatically looks for nearby compatible tags whenever the screen is illuminated. After detecting and matching a tag with an app, the system shows a notification that the people can tap to send the tag data to the app for processing. Note that background reading isn’t available when an NFC scanning sheet is visible, Wallet or Apple Pay are in use, cameras are in use, the device is in Airplane Mode, and the device is locked after a restart.

![An illustration of a notification banner above the Home screen on iPhone, which offers an opportunity to open a specific app to process NFC tag data detected nearby.](https://docs-assets.developer.apple.com/published/f42e796e585f504e450d1bf030a66d69/nfc-background%402x.png)

**Support both background and in-app tag reading.** Your app must still provide an in-app way to scan tags, for people with devices that don’t support background tag reading.

## [Platform considerations](https://developer.apple.com/design/human-interface-guidelines/nfc#Platform-considerations)

 _No additional considerations for iOS or iPadOS. Not supported in macOS, tvOS, visionOS, or watchOS._

## [Resources](https://developer.apple.com/design/human-interface-guidelines/nfc#Resources)

#### [Developer documentation](https://developer.apple.com/design/human-interface-guidelines/nfc#Developer-documentation)

[Core NFC](https://developer.apple.com/documentation/CoreNFC)

## Connections

- **Gehoert zu:** [[hig-technologies]]
- **Pfad:** `references/nfc.md`
- **Domain:** [[KI & Machine Learning]]
- **Kategorie:** [[LLM & KI-Agenten]]
