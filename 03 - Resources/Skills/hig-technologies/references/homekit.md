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
![A checkmark in a circle to indicate correct usage.](https://docs-assets.developer.apple.com/published/88662da92338267bb64cd2275c84e484/checkmark%402x.png)| Reading lamp  
![An X in a circle to indicate incorrect usage.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)| 📚 lamp  
![A checkmark in a circle to indicate correct usage.](https://docs-assets.developer.apple.com/published/88662da92338267bb64cd2275c84e484/checkmark%402x.png)| 2nd garage door  
![An X in a circle to indicate incorrect usage.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)| #2 garage door  
  
**Help people avoid creating names that include location information.** Although it’s natural for someone to use “kitchen light” to name a light in the kitchen, including the room name in the service name can lead to unpredictable results when controlling the accessory by voice. Your app can detect service names that duplicate location information and help people fix them. For example, you might present a post-setup experience that removes the room or zone from a service name and encourages people to assign the accessory to that room or zone instead.

## [Siri interactions](https://developer.apple.com/design/human-interface-guidelines/homekit#Siri-interactions)

HomeKit supports powerful, hands-free control using voice commands. You can help people use Siri to interact with accessories, services, and zones in their home quickly and efficiently.

**Present example voice commands to demonstrate using Siri to control accessories during setup.** As soon as people complete the setup of a new accessory, consider using the service name they chose in a few example Siri phrases and encourage people to try them out.

**After setup, consider teaching people about more complex Siri commands.** People might not be aware of the broad range of natural language phrases they can use with Siri and HomePod to control their accessories. After setup is complete, find useful places throughout your app to help people learn about these types of commands. For example, in a scene detail view, you could tell people, _You can say “Hey Siri, set ‘Movie Time.’”_

In addition to recognizing the names of homes, rooms, zones, services, and scenes, Siri can also use information such as accessory category and characteristic to identify a service. For example, when people use terms like _brighter_ or _dim_ , Siri recognizes that they’re referring to a service that has a brightness characteristic, even if they don’t speak the name of the service.

To illustrate the power and flexibility of Siri commands, here are some examples of the types of phrases that people could use to control their accessories.

Phrase| Siri understands  
---|---  
“Turn on the floor lamp”| Service (_floor lamp_)  
“Show me the entryway camera”| Service (_entryway camera_)  
“Turn on the light”| Accessory category (_light_)  
“Turn off the living room light”| Room (_living room_)  
Accessory category (_light_)  
“Make the living room a little bit brighter”| Room (_living room_)  
Accessory category (implied)  
Brightness characteristic (_brighter_)  
“Turn on the recessed lights”| Service group (_recessed lights_)  
“Turn off the lights upstairs”| Accessory category (_lights_)  
Zone (_upstairs_)  
“Dim the lights in the bedroom and nursery”| Accessory category (_lights_)  
Brightness characteristic (_dim_)  
Rooms (_bedroom_ , _nursery_)  
“Run Good night”| Scene (_Good night_)  
“Is someone in the living room?”| Accessory category (implied)  
Occupancy detection characteristic (implied)  
“Is my security system tripped?”| Accessory category (_security system_)  
“Did I leave the garage door open?”| Accessory category (_garage door_)  
Open characteristic (_open_)  
“Did I forget to turn off the lights in the Tahoe House?”| Accessory category (_lights_)  
Home (_Tahoe House_)  
“It’s dark in here”| Current home (_here_)  
Current room (via HomePod)  
Accessory category (implied)  
  
**Recommend that people create zones and service groups, if they make sense for your accessory.** If people might benefit from using context-specific voice commands to control your accessory, suggest these types of interactions and help people set them up. For example, if you provide an accessory such as a light, switch, or thermostat, you could suggest setting up a zone named “upstairs” or a service group named “media center” to support commands like “Siri, turn off the upstairs lights,” or “Siri, activate the media center.”

**Offer shortcuts only for accessory-specific functionality that HomeKit doesn’t support.** HomeKit lets people use ordinary (or natural) language to control accessories without requiring any additional configuration, so you avoid confusing people by offering shortcuts that duplicate HomeKit functionality. Instead, consider offering shortcuts for complementary functionality that your app provides. For example, if people often want to order filters for an air conditioner that you support, you might offer a shortcut like “Order AC filters.” To learn how to provide phrases that people can use for shortcuts, see [Shortcuts and suggestions](https://developer.apple.com/design/human-interface-guidelines/siri#Shortcuts-and-suggestions).

**If your app supports both HomeKit and shortcuts, help people understand the difference between these types of voice control.** People can get confused if they’re presented with multiple methods of voice control. Be sure you clearly indicate what’s possible with shortcuts, and never encourage people to create a shortcut for a scene or action that HomeKit already supports.

## [Custom functionality](https://developer.apple.com/design/human-interface-guidelines/homekit#Custom-functionality)

Your app is a great place to help people appreciate the unique functionality of your accessory. For example, an app for a light that displays different colors could help people create HomeKit scenes using colors imported from their photos.

**Be clear about what people can do in your app and when they might want to use the Home app.** For example, if your app supports only lights, consider encouraging people to create a “Movie Time” scene that not only dims the lights, but also closes the shades, and turns on the TV to a specific input. To do this, first guide people to set up a scene that includes only your accessory’s actions — in this scenario, dimming the lights. Then, your app can suggest that people open the Home app to add their HomeKit-compatible shades and TV to the scene you helped them create. For guidance on how to refer to the Home app, see [Referring to HomeKit](https://developer.apple.com/design/human-interface-guidelines/homekit#Referring-to-HomeKit).

**Defer to HomeKit if your database differs from the HomeKit database.** Give people a seamless experience by automatically reflecting changes made in the Home app or in other third-party HomeKit apps. If you must ask people to manage conflicts in your app, present the conflict visually so that they have a clear picture of the choice they need to confirm. For example, if someone changes an accessory’s service name in the Home app, your app can detect this change and could show both names side by side to confirm that the person wants to use the new name in your app, too.

**Ask permission to update the HomeKit database when people make changes in your app.** You don’t want to surprise people by changing something in the Home app, so it’s essential to get permission or an indication of intent before you write to the database. In particular, never overwrite HomeKit database settings without a person’s explicit direction.

### [Cameras](https://developer.apple.com/design/human-interface-guidelines/homekit#Cameras)

Your app can display still images or streaming video from a connected HomeKit IP camera.

**Don’t block camera images.** It’s fine to supplement the camera’s content with useful features, such as an alert calling attention to potentially interesting activity. However, avoid covering portions of the camera’s images with other content.

**Show a microphone button only if the camera supports bidirectional audio.** A nonfunctioning microphone button takes up valuable display space in your app and risks confusing people.

## [Using HomeKit icons](https://developer.apple.com/design/human-interface-guidelines/homekit#Using-HomeKit-icons)

Use the HomeKit icon in setup or instructional communications related to HomeKit technology.

![The HomeKit icon.](https://docs-assets.developer.apple.com/published/926a46dc1cdf9647a94303a329c43645/homekit-glyph%402x.png)

In addition, you can use the Apple Home app icon when referencing the Apple Home app or in a button that opens the Apple Home app [product page](https://itunes.apple.com/us/app/home/id1110145103?mt=8) in the App Store.

![The Apple Home app icon, which includes a stylized house with a chimney on the right side of its roof, depicted in graduated shades of orange.](https://docs-assets.developer.apple.com/published/2dd7e937870e9cde3c818264d031e15c/homeapp-icon%402x.png)

**Use only Apple-provided icons.** Don’t create your own HomeKit or Home app icon design or attempt to mimic the Apple-provided designs. Download HomeKit icons in [Resources](https://developer.apple.com/design/resources/).

### [Styles](https://developer.apple.com/design/human-interface-guidelines/homekit#Styles)

You have several options for displaying the HomeKit icon.

#### [Black HomeKit icon](https://developer.apple.com/design/human-interface-guidelines/homekit#Black-HomeKit-icon)

Use the HomeKit icon on white or light backgrounds when other technology icons appear in black.

![A black outlined HomeKit icon.](https://docs-assets.developer.apple.com/published/739a8ed96d427f7a1e8eb680feab203c/homekit-black-icon-set%402x.png)

#### [White HomeKit icon](https://developer.apple.com/design/human-interface-guidelines/homekit#White-HomeKit-icon)

Use the HomeKit icon on black or dark backgrounds when other technology icons appear in white.

![A white outlined HomeKit icon.](https://docs-assets.developer.apple.com/published/86f0a2b6f128e579b0b2400f3e8c7fa7/homekit-white-icon-set%402x.png)

#### [Custom color HomeKit icon](https://developer.apple.com/design/human-interface-guidelines/homekit#Custom-color-HomeKit-icon)

Use a custom color when other technology icons appear in the same color.

![A blue outlined HomeKit icon.](https://docs-assets.developer.apple.com/published/f7e6e6aaf077dbcb7cba53cbadf8436d/homekit-custom-color-icon-set%402x.png)

**Position the HomeKit icon consistently with other technology icons.** When other technology icons are contained within shapes, treat the HomeKit icon in the same manner.

![An illustration of three app icons listed in a horizontal row. Text above the icons reads 'Integrate with'. The leftmost app icon is the HomeKit icon in a circle, above the text 'Apple HomeKit'. The remaining two app icons contain squares with dashed frames witihn circles, above text that reads 'Technology'.](https://docs-assets.developer.apple.com/published/d4b79f9c55760002e886eb66776c4044/homekit-settings%402x.png)

**Use the HomeKit icon noninteractively.** Don’t use the icon and the name _HomeKit_ in custom interactive elements or buttons. You can use the Apple Home app icon to open the app’s product page in the App Store.

![An illustration of an incorrectly used HomeKit icon in a circular button styled with a chrome appearance.](https://docs-assets.developer.apple.com/published/08c6b1888cd04ea864bfe8d037eb1814/homekit-donot1%402x.png)

![An X in a circle to indicate incorrect usage.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)

![An illustration of a button incorrectly titled 'HomeKit' with a custom gradient background.](https://docs-assets.developer.apple.com/published/0c8ae4ebd1f0d755d78391a46602eda0/homekit-donot2%402x.png)

![An X in a circle to indicate incorrect usage.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)

**Don’t use the HomeKit icon within text or as a replacement for the word HomeKit.** See [Referring to HomeKit](https://developer.apple.com/design/human-interface-guidelines/homekit#Referring-to-HomeKit) to learn how to properly reference HomeKit in text.

![The first in a series of images showing examples of the HomeKit icon when used in text. In this example, the icon correctly appears first in the line, and then the text 'Lights set with HomeKit.'](https://docs-assets.developer.apple.com/published/36d82399473bdcb7c28130fd4451d8a2/homekit-lights-right%402x.png)

![A checkmark in a circle to indicate correct usage.](https://docs-assets.developer.apple.com/published/88662da92338267bb64cd2275c84e484/checkmark%402x.png)

![The second in a series of images showing examples of the HomeKit icon when used in text. This example depicts the icon incorrectly positioned after the word 'with' in the text 'Lights set with HomeKit.'](https://docs-assets.developer.apple.com/published/c807ea2f349cf7b4765dbf556583c701/homekit-lights-wrong1%402x.png)

![An X in a circle to indicate incorrect usage.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)

![The third in a series of images showing examples of the HomeKit icon when used in text. This example depicts the icon incorrectly positioned at the end of the line of text that reads 'Lights set with'.](https://docs-assets.developer.apple.com/published/5b77fd061bc43cba46493fd96a9bae74/homekit-lights-wrong2%402x.png)

![An X in a circle to indicate incorrect usage.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)

**Pair the icon with the name _HomeKit_ correctly.** You can show the name below or beside the icon if other technologies are referenced in this way. Use the same font that’s used on the rest of your layout. For related guidance, see [Referring to HomeKit](https://developer.apple.com/design/human-interface-guidelines/homekit#Referring-to-HomeKit).

![An illustration of a view containing setup information within an app. The top of the view includes the title 'Setup' above a divider line. Three rows with icons, text, and disclosure buttons for displaying additional information appear below the divider. The first row includes the HomeKit icon followed by the word 'HomeKit'. The other  two rows display dashed squares representing other app icons, each followed by the word 'Name'.](https://docs-assets.developer.apple.com/published/e3e956f06b1658b6e2a1776c9015ad66/homekit-setup%402x.png)Using the icon and name in setup or instructional content

![An illustration of a view containing a grid of four app buttons. The top of the view includes the title 'Apps' above a divider line. Two rows of buttons and labels appear below the divider. The first button in the first row includes the Apple Home app icon, and appears above the text 'Apple Home'. The remaining buttons include dashed squares representing other app icons, and each appears above the text 'App Name'.](https://docs-assets.developer.apple.com/published/2ff6f6ad2861c485ab76b4f2561de95e/homekit-apps%402x.png)Using the icon and name referencing the Apple Home app

## [Referring to HomeKit](https://developer.apple.com/design/human-interface-guidelines/homekit#Referring-to-HomeKit)

**Emphasize your app over HomeKit.** Make references to HomeKit or Apple Home less prominent than your app name or main identity.

**Adhere to Apple’s trademark guidelines.** Apple trademarks can’t appear in your app name or images. In text, use Apple product names exactly as shown on the [Apple Trademark List](https://www.apple.com/legal/intellectual-property/trademark/appletmlist.html).

  * Use Apple product names in singular form only; do not make Apple product names possessive.

  * Don’t translate Apple, Apple Home, HomeKit, or any other Apple trademark.

  * Don’t use category descriptors. For example, say iPad, not tablet.

  * Don’t indicate any kind of sponsorship, partnership, or endorsement from Apple.

  * Attribute Apple, HomeKit, and all other Apple trademarks with the correct credit lines wherever legal information appears within your app.

  * Refer to Apple devices and operating systems only in technical specifications or compatibility descriptions.




| Example text  
---|---  
![A checkmark in a circle to indicate correct usage.](https://docs-assets.developer.apple.com/published/88662da92338267bb64cd2275c84e484/checkmark%402x.png)| Use HomeKit to turn on your lights from your iPhone or iPad.  
![An X in a circle to indicate incorrect usage.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)| Use HomeKit to turn on your lights from your iOS devices.  
  
See [Guidelines for Using Apple Trademarks](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html).

### [Referencing HomeKit and the Home app](https://developer.apple.com/design/human-interface-guidelines/homekit#Referencing-HomeKit-and-the-Home-app)

**Use correct capitalization when using the term _HomeKit_.** _HomeKit_ is one word, with an uppercase _H_ and uppercase _K_ , followed by lowercase letters. _Apple Home_ is two words, with an uppercase _A_ and uppercase _H_ , followed by lowercase letters. If your layout displays only all-uppercase designations, _HomeKit_ or _Apple Home_ can be typeset in all uppercase to match the style of the rest of the layout.

**Don’t use the name _HomeKit_ as a descriptor.** Instead use terms like _works with_ , _use_ , _supports_ , or _compatible_.

| Example text  
---|---  
![A checkmark in a circle to indicate correct usage.](https://docs-assets.developer.apple.com/published/88662da92338267bb64cd2275c84e484/checkmark%402x.png)| [Brand] lightbulbs work with HomeKit.  
![A checkmark in a circle to indicate correct usage.](https://docs-assets.developer.apple.com/published/88662da92338267bb64cd2275c84e484/checkmark%402x.png)| HomeKit-enabled thermostat.  
![A checkmark in a circle to indicate correct usage.](https://docs-assets.developer.apple.com/published/88662da92338267bb64cd2275c84e484/checkmark%402x.png)| You can use HomeKit with [App Name].  
![An X in a circle to indicate incorrect usage.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)| HomeKit lightbulbs.  
  
**Don’t suggest that HomeKit is performing an action or function.**

|  Example text  
---|---  
![A checkmark in a circle to indicate correct usage.](https://docs-assets.developer.apple.com/published/88662da92338267bb64cd2275c84e484/checkmark%402x.png)| Back door is unlocked with HomeKit.  
![An X in a circle to indicate incorrect usage.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)| HomeKit unlocked the back door.  
  
**Use the name _Apple_ with the name _HomeKit_ , if desired.**

| Example text  
---|---  
![A checkmark in a circle to indicate correct usage.](https://docs-assets.developer.apple.com/published/88662da92338267bb64cd2275c84e484/checkmark%402x.png)| Compatible with Apple HomeKit.  
  
**Use the name _HomeKit_ for setup, configuration, and instructions, if desired.**

| Example text  
---|---  
![A checkmark in a circle to indicate correct usage.](https://docs-assets.developer.apple.com/published/88662da92338267bb64cd2275c84e484/checkmark%402x.png)| Open HomeKit settings.  
  
**Use the app name _Apple Home_ whenever referring specifically to the app.** On the first mention of the app in body copy, use the complete name _Apple Home_. Subsequent mentions can refer to the Home app.

| Example text  
---|---  
![A checkmark in a circle to indicate correct usage.](https://docs-assets.developer.apple.com/published/88662da92338267bb64cd2275c84e484/checkmark%402x.png)| Open the Apple Home app.  
![A checkmark in a circle to indicate correct usage.](https://docs-assets.developer.apple.com/published/88662da92338267bb64cd2275c84e484/checkmark%402x.png)| Open the Apple Home app. Your accessory and room will now appear in the Home app.  
![An X in a circle to indicate incorrect usage.](https://docs-assets.developer.apple.com/published/209f6f0fc8ad99d9bf59e12d82d06584/crossout%402x.png)| Open Home.  
  
## [Platform considerations](https://developer.apple.com/design/human-interface-guidelines/homekit#Platform-considerations)

 _No additional considerations for iOS, iPadOS, macOS, tvOS, visionOS, or watchOS._

## [Resources](https://developer.apple.com/design/human-interface-guidelines/homekit#Resources)

#### [Related](https://developer.apple.com/design/human-interface-guidelines/homekit#Related)

[Apple Design Resources](https://developer.apple.com/design/resources/)

[Guidelines for Using Apple Trademarks and Copyrights](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html)

#### [Developer documentation](https://developer.apple.com/design/human-interface-guidelines/homekit#Developer-documentation)

[HomeKit](https://developer.apple.com/documentation/HomeKit)

#### [Videos](https://developer.apple.com/design/human-interface-guidelines/homekit#Videos)

[![](https://devimages-cdn.apple.com/wwdc-services/images/119/8C81F0E7-2E4C-4F4F-82FE-A9EBC73A913D/5239_wide_250x141_1x.jpg) Add support for Matter in your smart home app ](https://developer.apple.com/videos/play/wwdc2021/10298)

## [Change log](https://developer.apple.com/design/human-interface-guidelines/homekit#Change-log)

Date| Changes  
---|---  
May 2, 2023| Consolidated guidance into one page.

## Connections

- **Gehoert zu:** [[hig-technologies]]
- **Pfad:** `references/homekit.md`
- **Domain:** [[KI & Machine Learning]]
- **Kategorie:** [[LLM & KI-Agenten]]
