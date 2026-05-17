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
Unable to find a surface. Try moving to the side or repositioning your phone.| Unable to find a plane. Adjust tracking.  
Tap a location to place the _[name of object to be placed]_.| Tap a plane to anchor an object.  
Try turning on more lights and moving around.| Insufficient features.  
Try moving your phone more slowly.| Excessive motion detected.  
  
**In a three-dimensional context, prefer 3D hints.** For example, placing a 3D rotation indicator around an object is more intuitive than displaying text-based instructions in a 2D overlay. Avoid displaying textual overlay hints in a 3D context unless people aren’t responding to contextual hints.

![An illustration of a cube. The base of the cube is indicated with a grid, and the active side of the cube is outlined in blue. Arrows follow a continuous circle around the cube to the right, hinting that the cube can be rotated within the 3D context.](https://docs-assets.developer.apple.com/published/43871ef4bb55592e7474b1905da12f98/augmented-reality-3d-hint%402x.png)Prefer a 3D hint in a 3D context.

![An illustration of a cube. The base of the cube is indicated with a grid, and underneath the cube is the word Rotate, hinting that the cube can be rotated within the 3D space.](https://docs-assets.developer.apple.com/published/d60c7354a3ed6528ea35765cd86a970c/augmented-reality-2d-hint%402x.png)If necessary, use a 2D hint in a 3D context.

**Make important text readable.** Use screen space to display text used for critical labels, annotations, and instructions. If you need to display text in 3D space, make sure the text faces people and that you use the same type size regardless of the distance between the text and the labeled object.

**If necessary, provide a way to get more information.** Design a visual indicator that fits with your app experience to show people that they can tap for more information.

![An illustration of an iPhone screen in landscape orientation showing the corner of a room viewed through the camera. In the room are two AR objects: a desk and a chair. Each object has a label attached to the object by a vertical line. The label in each object ends with a greater-than sign to indicate the label can be tapped for more information.](https://docs-assets.developer.apple.com/published/341d2c982c2042c369769344be588e6f/augmented-reality-labels%402x.png)

Camera view

![An illustration of an iPhone screen in landscape orientation showing a full-screen view with the detailed information for a chair. On the left side of the screen is an image of the chair, in the middle is a vertical separator line, and on the right is the model number, price, and size of the chair.](https://docs-assets.developer.apple.com/published/3dcd4c7352111a30f5fab8370b060836/augmented-reality-popover%402x.png)

Detail view

## [Handling interruptions](https://developer.apple.com/design/human-interface-guidelines/augmented-reality#Handling-interruptions)

ARKit can’t track device position and orientation during an interruption, such as when people briefly switch to another app or accept a phone call. After an interruption ends, previously placed virtual objects are likely to appear in the wrong real-world positions. When you support relocalization, ARKit attempts to restore those virtual objects to their original real-world positions using new information. For developer guidance, see [Managing Session Life Cycle and Tracking Quality](https://developer.apple.com/documentation/ARKit/managing-session-life-cycle-and-tracking-quality).

**Consider using the system-provided coaching view to help people relocalize.** During relocalization, ARKit attempts to reconcile its previous state with new observations of the current environment. To make these observations more useful, you can use the coaching view to help people return the device to its previous position and orientation.

![An illustration of an iPhone screen showing the corner of a room viewed through the camera. On the screen is a translucent overlay containing the surface-detection indicator. The indicator is a white square with rounded corners projected into the 3D space. A small iPhone is shown scanning back and forth along the base of the square. A circle of dots trailing the iPhone emphasizes the movement.](https://docs-assets.developer.apple.com/published/f39344a998cd544223592f8b13c118fb/augmented-reality-vertical-orientation%402x.png)

**Consider hiding previously placed virtual objects during relocalization.** To avoid flickering or other unpleasant visual effects during relocalization, it can be best to hide virtual objects and redisplay them in their new positions.

**Minimize interruptions if your app supports both AR and non-AR experiences.** One way to avoid interruptions is by embedding a non-AR experience within an AR experience so that people can handle the task without exiting and re-entering AR. For example, if your app helps people decide on a piece of furniture to purchase by placing the item in a room, you might let them change the upholstery without leaving the AR experience.

**Allow people to cancel relocalization.** If people don’t position and orient their device near where it was before an interruption, relocalization continues indefinitely without success. If coaching people to resume their session isn’t successful, consider providing a reset button or other way to restart the AR experience.

**Indicate when the front-facing camera is unable to track a face for more than about half a second.** Use a visual indicator to indicate that the camera can no longer track the person’s face. If you need to provide text instructions in this situation, keep them to a minimum.

## [Suggesting problem resolutions](https://developer.apple.com/design/human-interface-guidelines/augmented-reality#Suggesting-problem-resolutions)

**Let people reset the experience if it doesn’t meet their expectations.** Don’t force people to wait for conditions to improve or struggle with object placement. Give them a way to start over again and see if they have better results.

![An illustration showing a corner of a brightly lit office that contains a desk and chair.](https://docs-assets.developer.apple.com/published/13887c5129d1c8add4ff07c5b0ba86e5/augmented-reality-sufficient-lighting%402x.png)Sufficient lighting

![An illustration showing a corner of a dark office that contains a desk and chair.](https://docs-assets.developer.apple.com/published/346b5de0b7f08b0a510192cae8189cab/augmented-reality-insufficient-lighting%402x.png)Insufficient lighting

**Suggest possible fixes if problems occur.** Analysis of the real-world environment and surface detection can fail or take too long for a variety of reasons — insufficient light, an overly reflective surface, a surface without enough detail, or too much camera motion. If your app is notified of these problems, use straightforward, friendly language to offer suggestions for resolving them.

Problem| Possible suggestion  
---|---  
Insufficient features detected.| Try turning on more lights and moving around.  
Excessive motion detected.| Try moving your phone slower.  
Surface detection takes too long.| Try moving around, turning on more lights, and making sure your phone is pointed at a sufficiently textured surface.  
  
## [Icons and badges](https://developer.apple.com/design/human-interface-guidelines/augmented-reality#Icons-and-badges)

Apps can display an AR icon in controls that launch ARKit-based experiences. You can download this icon in [Resources](https://developer.apple.com/design/resources/#ios-apps).

![The AR glyph.](https://docs-assets.developer.apple.com/published/05428c411e6c937857838da1fa944416/augmented-reality-glyph%402x.png)

![A button containing the AR glyph and the text View in AR.](https://docs-assets.developer.apple.com/published/5df46e31e22d0b25d2ad1a5e6342eb1d/augmented-reality-glyph-button%402x.png)

**Use the AR glyph as intended.** The glyph is strictly for initiating an ARKit-based experience. Never alter the glyph (other than adjusting its size and color), use it for other purposes, or use it in conjunction with AR experiences not created using ARKit.

**Maintain minimum clear space.** The minimum amount of clear space required around an AR glyph is 10% of the glyph’s height. Don’t let other elements infringe on this space or occlude the glyph in any way.

![An illustration that shows the AR glyph centered within a frame that represents the minimum clear space to leave around the glyph.](https://docs-assets.developer.apple.com/published/4a22c5126bd05f8291ab3637b01c89b9/augmented-reality-glyph-minimum-clear-space%402x.png)

Apps that include collections of products or other objects can use badging to identify specific items that can be viewed in AR using ARKit. For example, an app that sells vintage collectibles might use a badge to mark items that people can preview in their home before making a purchase.

![An illustration of a partial iPhone screen. On the screen is an app with four gray squares in a grid layout, each containing a picture of a vintage toy: one robot, and three rocket ships. In the upper left corner of each square is the AR badge with the glyph and the text AR.](https://docs-assets.developer.apple.com/published/ebffaa99bc0113cb9c94f8cf5da94ace/augmented-reality-badging%402x.png)

**Use the AR badges as intended and don’t alter them.** You can download AR badges, available in collapsed and expanded form, in [Resources](https://developer.apple.com/design/resources/#ios-apps). Use these images exclusively to identify products or other objects that can be viewed in AR using ARKit. Never alter the badges, change their color, use them for other purposes, or use them in conjunction with AR experiences not created with ARKit.

![The AR badge with both the glyph and the text AR.](https://docs-assets.developer.apple.com/published/65ae0b4baf76d633cb247880b2c4f338/augmented-reality-badge-iconandtext%402x.png)AR badge

![The glyph-only AR badge.](https://docs-assets.developer.apple.com/published/807119fbf8f1c62a35dddde3fdc0a026/augmented-reality-badge-icon%402x.png)Glyph-only AR badge

**Prefer the AR badge to the glyph-only badge.** In general, use the glyph-only badge for constrained spaces that can’t accommodate the AR badge. Both badges work well at their default size.

**Use badging only when your app contains a mixture of objects that can be viewed in AR and objects that cannot.** If all objects in your app can be viewed in AR, then badging is redundant.

**Keep badge placement consistent and clear.** A badge looks best when displayed in one corner of an object’s photo. Always place it in the same corner and make sure it’s large enough to be seen clearly (but not so large that it occludes important detail in the photo).

**Maintain minimum clear space.** The minimum amount of clear space required around an AR badge is 10% of the badge’s height. Don’t allow other elements to infringe on this space and occlude the badge in any way.

![An illustration of the AR badge with the AR glyph and text AR. A frame surrounds the badge to indicate leaving clear space around the badge.](https://docs-assets.developer.apple.com/published/ac95fbcb89cd066b471e15c74e0475b4/augmented-reality-badge-iconandtext-clear%402x.png)

![An illustration of the glyph-only AR badge. A frame surrounds the badge to indicate leaving clear space around the badge.](https://docs-assets.developer.apple.com/published/6b63f2ad4df182c7be792b90e56abec7/augmented-reality-badge-icon-clear%402x.png)

## [Platform considerations](https://developer.apple.com/design/human-interface-guidelines/augmented-reality#Platform-considerations)

 _No additional considerations for iOS or iPadOS. Not supported in macOS, tvOS, or watchOS._

### [visionOS](https://developer.apple.com/design/human-interface-guidelines/augmented-reality#visionOS)

With the wearer’s [permission](https://developer.apple.com/design/human-interface-guidelines/privacy#visionOS), you can use ARKit in your visionOS app to detect surfaces in a person’s surroundings, use a person’s hand and finger postions to inform your [custom gestures](https://developer.apple.com/design/human-interface-guidelines/gestures#Designing-custom-gestures-in-visionOS), support interactions that incorporate nearby physical objects into your [immersive experience](https://developer.apple.com/design/human-interface-guidelines/immersive-experiences), and more. For developer guidance, see [ARKit](https://developer.apple.com/documentation/ARKit).

Video with custom controls. 

Content description: A recording showing a 3D model of a meteor in visionOS rotating above a physical table. 

Play 

## [Resources](https://developer.apple.com/design/human-interface-guidelines/augmented-reality#Resources)

#### [Related](https://developer.apple.com/design/human-interface-guidelines/augmented-reality#Related)

[Playing haptics](https://developer.apple.com/design/human-interface-guidelines/playing-haptics)

[Gestures](https://developer.apple.com/design/human-interface-guidelines/gestures)

[Apple Design Resources](https://developer.apple.com/design/resources/#ios-apps)

#### [Developer documentation](https://developer.apple.com/design/human-interface-guidelines/augmented-reality#Developer-documentation)

[ARKit](https://developer.apple.com/documentation/ARKit)

#### [Videos](https://developer.apple.com/design/human-interface-guidelines/augmented-reality#Videos)

[![](https://devimages-cdn.apple.com/wwdc-services/images/124/D9569ADB-FA90-4DB7-9987-A4366BA0E921/6628_wide_250x141_1x.jpg) Qualities of great AR experiences ](https://developer.apple.com/videos/play/wwdc2022/10131)

[![](https://devimages-cdn.apple.com/wwdc-services/images/119/53F3827F-2C69-44D5-9D85-73AF3FF759FD/4965_wide_250x141_1x.jpg) Explore ARKit 5 ](https://developer.apple.com/videos/play/wwdc2021/10073)

## Connections

- **Gehoert zu:** [[hig-technologies]]
- **Pfad:** `references/augmented-reality.md`
- **Domain:** [[KI & Machine Learning]]
- **Kategorie:** [[LLM & KI-Agenten]]
