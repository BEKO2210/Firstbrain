---
type: referenz
created: 2026-04-11
parent-skill: "hig-components-dialogs"
domain: design-creative
category: video-audio
tags:
  - skill-referenz
  - design-creative
  - video-audio
---|---  
Exit to the Home Screen| iOS, iPadOS  
Pressing Escape (Esc) or Command-Period (.) on an attached keyboard| iOS, iPadOS, macOS, visionOS  
Pressing Menu on the remote| tvOS  
  
## [Platform considerations](https://developer.apple.com/design/human-interface-guidelines/alerts#Platform-considerations)

 _No additional considerations for tvOS or watchOS._

### [iOS, iPadOS](https://developer.apple.com/design/human-interface-guidelines/alerts#iOS-iPadOS)

**Use an action sheet — not an alert — to offer choices related to an intentional action.** For example, when people cancel the Mail message they’re editing, an action sheet provides three choices: delete the edits (or the entire draft), save the draft, or return to editing. Although an alert can also help people confirm or cancel an action that has destructive consequences, it doesn’t provide additional choices related to the action. For guidance, see [Action sheets](https://developer.apple.com/design/human-interface-guidelines/action-sheets).

**When possible, avoid displaying an alert that scrolls.** Although an alert might scroll if the text size is large enough, be sure to minimize the potential for scrolling by keeping alert titles short and including a brief message only when necessary.

### [macOS](https://developer.apple.com/design/human-interface-guidelines/alerts#macOS)

macOS automatically displays your app icon in an alert, but you can supply an alternative icon or symbol. In addition, macOS lets you:

  * Configure repeating alerts to let people suppress subsequent occurrences of the same alert.

  * Append a custom view if it’s necessary to provide additional information (for developer guidance, see [`accessoryView`](https://developer.apple.com/documentation/AppKit/NSAlert/accessoryView)).

  * Include a Help button that opens your help documentation (see [Help buttons](https://developer.apple.com/design/human-interface-guidelines/buttons#Help-buttons)).




**Use a caution symbol sparingly.** Using a caution symbol like `exclamationmark.triangle` too frequently in your alerts diminishes its significance. Use the symbol only when extra attention is really needed, as when confirming an action that might result in unexpected loss of data. Don’t use the symbol for tasks whose only purpose is to overwrite or remove data, such as a save or empty trash.

### [visionOS](https://developer.apple.com/design/human-interface-guidelines/alerts#visionOS)

When your app is running in the Shared Space, visionOS displays an alert in front of the app’s window, slightly forward along the z-axis.

Video with custom controls. 

Content description: A video of an alert in the Freeform app running in the Shared Space in visionOS. When the video plays, someone chooses to permanently delete a recently deleted Freeform board. An alert then appears in front of the Freeform window to ask for confirmation. 

Play 

If someone moves a window without dismissing its alert, the alert remains anchored to the window. If your app is running in a Full Space, the system displays the alert centered in the wearer’s [field of view](https://developer.apple.com/design/human-interface-guidelines/spatial-layout#Field-of-view).

Video with custom controls. 

Content description: A video of an alert in the Freeform app running in the Shared Space in visionOS. When the video plays, someone chooses to permanently delete a recently deleted Freeform board. An alert then appears in front of the Freeform window to ask for confirmation. The alert is not dismissed and remains anchored to the Freeform window as it’s moved around the Shared Space. 

Play 

If you need to display an accessory view in a visionOS alert, create a view that has a maximum height of 154 pt and a 16-pt corner radius.

## [Resources](https://developer.apple.com/design/human-interface-guidelines/alerts#Resources)

#### [Related](https://developer.apple.com/design/human-interface-guidelines/alerts#Related)

[Modality](https://developer.apple.com/design/human-interface-guidelines/modality)

[Action sheets](https://developer.apple.com/design/human-interface-guidelines/action-sheets)

[Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)

#### [Developer documentation](https://developer.apple.com/design/human-interface-guidelines/alerts#Developer-documentation)

[`alert(_:isPresented:actions:)`](https://developer.apple.com/documentation/SwiftUI/View/alert\(_:isPresented:actions:\)-1bkka) — SwiftUI

[`UIAlertController`](https://developer.apple.com/documentation/UIKit/UIAlertController) — UIKit

[`NSAlert`](https://developer.apple.com/documentation/AppKit/NSAlert) — AppKit

## [Change log](https://developer.apple.com/design/human-interface-guidelines/alerts#Change-log)

Date| Changes  
---|---  
February 2, 2024| Enhanced guidance for using default and Cancel buttons.  
September 12, 2023| Added anatomy artwork for visionOS.  
June 21, 2023| Updated to include guidance for visionOS.

## Connections

- **Gehoert zu:** [[hig-components-dialogs]]
- **Pfad:** `references/alerts.md`
- **Domain:** [[Design & Kreativitaet]]
- **Kategorie:** [[Video & Audio Produktion]]
