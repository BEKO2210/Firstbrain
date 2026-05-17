---
type: referenz
created: 2026-04-11
parent-skill: "hig-components-system"
domain: cloud-infrastructure
category: devops
tags:
  - skill-referenz
  - cloud-infrastructure
  - devops
---|---  
Printed communications| Minimum diameter of 3/4 inch (1.9 cm).  
Digital communications| Minimum size of 256×256 px. Use a PNG or SVG file.  
NFC-integrated App Clip Code| The embedded NFC tag needs to be at least 35 mm in diameter or of equivalent size. For example, if your embedded NFC tag is 35 mm in diameter, your printed App Clip Code needs to be at least 1.37 inches (3.48 cm) in diameter.  
  
![An App Clip Code that uses the badge design and has a minimum diameter of 3/4 inch \(1.9 cm\).](https://docs-assets.developer.apple.com/published/604637e18752ed4948becd174afbc361/sizing-minimum-rectangle%402x.png)

![An App Clip Code that uses the design without the App Clip logo and has a minimum diameter of 3/4 inch \(1.9 cm\).](https://docs-assets.developer.apple.com/published/0aa05fa8f03c37459ea683c058a35a2f/sizing-minimum-circular%402x.png)

When determining the dimensions of your App Clip Codes, consider a distance to code size ratio of no more than 20:1. If possible, use a ratio of 10:1 to ensure reliable scanning. For example, an App Clip that people scan from 40 inches (101 cm) away needs to be at least 4 inches (10.16 cm) in diameter.

If you display an App Clip Code near a QR Code or other scannable item, choose a size for the App Clip Code that’s at least the other code’s or item’s size.

![An illustration of an App Clip Code next to a QR code. Red guides denote that both are the same size.](https://docs-assets.developer.apple.com/published/b693a5616cb7a4b58895496c6b834b2d/app-clip-with-qr-code%402x.png)

**Provide enough space between an App Clip Code and adjacent App Clip Codes, graphics, or materials.** The minimum clear space around an App Clip Code is equal to the space between the center glyph and the circular code. If you place your App Clip Code next to another App Clip Code or other machine-readable code, leave enough clear space to allow for reliable scanning of each code.

![An illustration that shows an App Clip Code with the badge design to the left of an App Clip Code without the App Clip logo. A red guide surrounds each App Clip Code, illustrating the clear space requirements.](https://docs-assets.developer.apple.com/published/60ce57295e138b8c399d9c229238f40d/app-clip-spacing%402x.png)

### [Using clear messaging](https://developer.apple.com/design/human-interface-guidelines/app-clips#Using-clear-messaging)

Add clear messaging that informs people how they can use the App Clip Code to launch your App Clip, especially if you use the design without the App Clip logo. For example, add a call to action next to an App Clip Code you display in an email or on a poster. Use the suggested call-to-action messaging or your own copy. Always use a simple, clear call to action.

![An illustration that shows two people sitting at a table at a coffee shop. A placard in the middle of the table contains an App Clip Code. The right side of the illustration shows a zoomed-in version of the placard, which contains an App Clip Code and surrounding text that reads 'Place your order. Hold your iPhone near the menu to place your food order.'.](https://docs-assets.developer.apple.com/published/f168bf0bd2558212caf8059de39205e5/clear-messaging%402x.png)

For a scan-only App Clip Code, you can use the following call to action:

  * Scan to [_describe what people can do with your App Clip_].

  * Scan using the camera on your iPhone or iPad to [describe what people can do with your App Clip].




For an NFC-integrated App Clip Code, you can use the following call to action:

  * Scan to [_describe what people can do with your App Clip_].

  * Hold your iPhone near the [_object name_] to launch an App Clip that [_describe what a person can do with your App Clip_].




For more information, see [NFC](https://developer.apple.com/design/human-interface-guidelines/nfc).

**Adhere to[Guidelines for Using Apple Trademarks](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html) when referring to your App Clip and App Clip Codes.** For example, Apple trademarks can’t appear in your app name or images, always use title case when using the terms App Clips or App Clip Code, and so on. For additional information, see [Legal requirements](https://developer.apple.com/design/human-interface-guidelines/app-clips#Legal-requirements).

### [Customizing your App Clip Code](https://developer.apple.com/design/human-interface-guidelines/app-clips#Customizing-your-App-Clip-Code)

Use [App Store Connect](https://appstoreconnect.apple.com) or the [App Clip Code Generator](https://developer.apple.com/app-clips/resources/) command-line tool to create App Clip Codes, and follow best practices to ensure a reliable scanning experience.

![Four App Clip badges, each using different colors. The two on the left use the badge design, and the two on the right use the design without the App Clip logo.](https://docs-assets.developer.apple.com/published/02d96548534ce28b92754477aadbf9bb/app-clips-customizing%402x.png)

**Always use the generated App Clip Code.** Don’t create your own App Clip Code design or modify a generated App Clip Code in any way. Don’t apply filters, augment its colors, or add glows, shadows, gradients, or reflections. They negatively impact people’s scanning experience. When scaling a generated App Clip Code, don’t change the generated code’s aspect ratio, and be sure to scale all attributes of the App Clip Code — for example the stroke widths.

![An illustration of an invalid App Clip Code with a changed aspect ratio.](https://docs-assets.developer.apple.com/published/2243d4c0011526cae9bd3d69e62907ae/customizing-wrong-1%402x.png)

![An X in a circle to indicate an invalid App Clip Code.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)

![An illustration of an invalid App Clip Code with a color gradient instead of a solid background color.](https://docs-assets.developer.apple.com/published/6578f646c8aae8d6ac64ef965b783175/customizing-wrong-2%402x.png)

![An X in a circle to indicate an invalid App Clip Code.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)

![An illustration of an invalid App Clip Code with a drop shadow effect.](https://docs-assets.developer.apple.com/published/658d3fafbc3dfdd11dc26f1b5a7aee48/customizing-wrong-3%402x.png)

![An X in a circle to indicate an invalid App Clip Code.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)

**Choose colors with enough contrast that ensure accurate scanning.** Each App Clip Code uses three colors: a foreground color, a background color, and a third color that’s generated for you based on the foreground and background colors. Both [App Store Connect](https://appstoreconnect.apple.com) and the [App Clip Code Generator](https://developer.apple.com/app-clips/resources/) command-line tool offer a selection of default color pairs. Alternatively, you can choose custom foreground and background colors. Note that you can’t choose custom colors that will lead to a suboptimal scanning experience. If your color selection doesn’t work well, neither App Store Connect nor the command-line tool will generate an App Clip Code. To help you choose a color combination that works well, both tools contain functionality to suggest a different foreground color based on your custom background color. For more information, see [Creating App Clip Codes with the App Clip Code Generator](https://developer.apple.com/documentation/AppClip/creating-app-clip-codes-with-the-app-clip-code-generator) and [Creating App Clip Codes with App Store Connect](https://developer.apple.com/documentation/AppClip/creating-app-clip-codes-with-app-store-connect).

![An illustration of an App Clip Code that uses the badge design and has callouts for the background, foreground, and generated colors.](https://docs-assets.developer.apple.com/published/aae3a773b90a26b4870f4db43a0c3f94/app-clip-colors%402x.png)

## [Printing guidelines](https://developer.apple.com/design/human-interface-guidelines/app-clips#Printing-guidelines)

App Clip Codes offer the best experience to launch App Clips. As a result, it’s important to manufacture and display App Clip Codes that offer a reliable scanning experience for a long time. You can print App Clip Codes yourself, or work with a professional printing service — for example, [RR Donnelley](https://touchless.acc.rrd.com/).

Always test printed App Clip Codes before you distribute them to be sure they’re scannable from a variety of angles.

**Use high-quality, non-textured print materials.** Print App Clip Codes on matte finishes. Avoid shine, gloss, reflective or holographic overlays, as well as thin laminate finishes or materials. In case you need to laminate print material with an App Clip Code on it, use a matte laminate to avoid shine and reflections. If you place your App Clip Code outdoors, use UV-resistant materials or coatings to prevent fading from exposure to sunlight, rain, and other weather conditions. If you work with a professional printing service, use flexographic printing for best results. If you print the App Clip Codes yourself using a desktop printer, use an inkjet printer for best results.

**Use high-resolution images and printer settings.** When rasterizing the SVG file, set the image resolution to at least 600 ppi, and print your App Clip Codes with a minimum resolution of 300 dpi. Consider leveling and calibrating your printer before printing to ensure a high print quality, and avoid poor color channel alignment, inaccurate gamma values, artifacts, or printing elliptical or otherwise distorted App Clip Codes. When using receipt printers, print App Clip Codes as close to the paper’s maximum bounds as possible.

**Use correct color settings when you convert the generated SVG file to a CMYK image.** Both the [App Clip Code Generator](https://developer.apple.com/app-clips/resources/) command-line tool and [App Store Connect](https://appstoreconnect.apple.com) generate App Clip Codes as SVG files in the sRGB color space. To print colors that match the SVG file, convert the sRGB image to a CMYK image. Use a relative calorimetric (media-relative) intent when performing the conversion. Use “Generic CMYK ICC profile” on CMYK printers or “Gracol 2013 ICC profile” on CMYKOV printers and allow for a color tolerance CIELab Delta E of 2.5.

**If you’re using a printer that only prints in grayscale, only generate grayscale App Clip Codes.** Codes generated in color and then printed in grayscale may work less reliably.

**For NFC-integrated App Clip Codes, choose Type 5 NFC tags.** The embedded NFC tag needs to be at least 35 mm in diameter or of equivalent size.

**If you create large batches of App Clip Codes, thoroughly test your printing workflow, and verify printed App Clip Codes.** For example, conduct small, inexpensive print runs using a subset of codes. Print your App Clip Codes on print templates with additional padded regions that allow you to display the encoded invocation URL and the SVG filename alongside each code for validation at the time of print.

If you create many App Clip Codes with the [App Clip Code Generator](https://developer.apple.com/app-clips/resources/) tool or [App Store Connect](https://appstoreconnect.apple.com), you’ll likely work with a professional printing service. If this is the case, you need to handle a lot of SVG files. Because you have no way of knowing which App Clip Code encodes which URL by looking at an App Clip Code, you need to use a file that contains information about which SVG file maps to which invocation URL. Under any circumstance, careful file management, versioning, and change tracking are key to avoiding faulty print runs. For more information, see [Preparing multiple App Clip Codes for production](https://developer.apple.com/documentation/AppClip/preparing-multiple-app-clip-codes-for-production).

### [Verifying your printer’s calibration](https://developer.apple.com/design/human-interface-guidelines/app-clips#Verifying-your-printers-calibration)

A reliable scanning experience depends on the quality of your printed App Clip Codes. To ensure printing App Clip Codes results in a reliable scanning experience and to avoid using a printer that can’t print high-quality App Clip Codes, Apple offers [printer calibration test sheets](https://developer.apple.com/app-clips/resources/printer-calibration-test-sheets.zip) you can use to verify your printer’s settings and print quality.

**Verify print quality of your chosen color pair with the printer calibration test sheet that shows text boxes for each default color pair.** Follow the instructions on the sheet to print it at the right scale and to verify that your printer can create high-quality App Clip Codes.

**Verify your printer’s grayscale settings by printing the printer calibration test sheet that shows two grayscale bars.** If any of the specific gray colors are light or entirely missing, the printer may need calibration or may not be suitable for printing an App Clip Code that allows for reliable scanning.

## [Legal requirements](https://developer.apple.com/design/human-interface-guidelines/app-clips#Legal-requirements)

Only the Apple-provided App Clip Codes created in App Store Connect or with the App Clip Code Generator command-line tool and that follow these guidelines are approved for use.

App Clip Codes are approved for use to indicate availability of an App Clip. Apple may update the App Clip Code design from time to time at Apple’s discretion.

In the event your App Clip is no longer active, also stop displaying the App Clip Code associated with that inactive App Clip.

You may not use the App Clip Code (including, without limitation, the Apple Logo, the App Clip mark, and the App Clip Code designs) as part of your own company name or as part of your product name. You may not seek copyright or trademark registration for the App Clip Codes or any elements contained therein.

The App Clip Codes described in these guidelines must not be used in any manner that is likely to reduce, diminish, or damage the goodwill, value, or reputation associated with Apple or App Clips; or that infringes or violates the trademarks or other proprietary rights of any third party; or that is likely to cause confusion as to the source of products or services.

Apple retains all rights to its trademarks, copyrights, or other intellectual property rights contained in the materials provided for use hereunder, including, without limitation, the App Clip Codes and any elements contained therein.

Don’t add a symbol to App Clip Codes created in App Store Connect or with the App Clip Code Generator command-line tool.

Don’t translate any Apple trademark. Apple trademarks must remain in English even when they appear within text in a language other than English. With Apple’s approval, a translation of the legal notice and credit lines (but not the trademarks) can be used in materials distributed outside the U.S.

For more information about using Apple trademarks, see [Guidelines for Using Apple Trademarks](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html).

## [Platform considerations](https://developer.apple.com/design/human-interface-guidelines/app-clips#Platform-considerations)

 _No additional considerations for iOS or iPadOS. Not supported in macOS, tvOS, visionOS, or watchOS._

## [Resources](https://developer.apple.com/design/human-interface-guidelines/app-clips#Resources)

#### [Related](https://developer.apple.com/design/human-interface-guidelines/app-clips#Related)

[Apple Pay](https://developer.apple.com/design/human-interface-guidelines/apple-pay)

[Sign in with Apple](https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple)

[Guidelines for Using Apple Trademarks and Copyrights](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html)

#### [Developer documentation](https://developer.apple.com/design/human-interface-guidelines/app-clips#Developer-documentation)

[App Clips](https://developer.apple.com/documentation/AppClip)

[App Store Connect](https://appstoreconnect.apple.com/)

#### [Videos](https://developer.apple.com/design/human-interface-guidelines/app-clips#Videos)

[![](https://devimages-cdn.apple.com/wwdc-services/images/119/95357E8D-01E6-476E-9516-8AF54EC9794A/4878_wide_250x141_1x.jpg) What's new in App Clips ](https://developer.apple.com/videos/play/wwdc2021/10012)

[![](https://devimages-cdn.apple.com/wwdc-services/images/119/7120E473-4A84-447D-8B55-0F1614324E59/4879_wide_250x141_1x.jpg) Build light and fast App Clips ](https://developer.apple.com/videos/play/wwdc2021/10013)

## [Change log](https://developer.apple.com/design/human-interface-guidelines/app-clips#Change-log)

Date| Changes  
---|---  
June 9, 2025| Updated guidance to include demo App Clips.  
May 2, 2023| Consolidated guidance into one page.

## Connections

- **Gehoert zu:** [[hig-components-system]]
- **Pfad:** `references/app-clips.md`
- **Domain:** [[Cloud & Infrastruktur]]
- **Kategorie:** [[DevOps & Deployment]]
