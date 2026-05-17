---
type: resource
created: 2026-04-08
updated: 2026-04-09
tags:
  - prompt
  - kommunikation
  - beziehungen
source: https://github.com/BEKO2210/lyra-prompts
---
---
id: '#3809'
titel: What are some PHP libraries that can be used for image manipulation
kategorie: Kommunikation & Beziehungen
unterkategorie: Importiert
tags:
- libraries
- used
- image
- manipulation
- brief
plattformen:
- ChatGPT
- Claude
- Gemini
schwierigkeit: Anfänger
quelle: openrlhf-UltraFeedback
erstellt: '2026-03-11'
---


## Prompt

```
What are some PHP libraries that can be used for image manipulation? Can you provide a brief explanation of each library and its application to this task? Also, can you give a [PHP] code example demonstrating the implementation of one of these libraries for image manipulation?
One PHP library that can be used for image manipulation is the GD library. It provides functions for image creation, manipulation, and drawing. Another library is ImageMagick, which supports a wider range of image formats and provides more advanced features such as image filtering and compositing.
Here's a [PHP] code example demonstrating the implementation of GD for image manipulation:
<?php
// Load image
$image = imagecreatefromjpeg("image.jpg");
// Get image dimensions
$width = imagesx($image);
$height = imagesy($image);
// Add text to image
$text_color = imagecolorallocate($image, 255, 255, 255);
$text = "Hello World!";
$text_width = imagefontwidth(30) * strlen($text);
$text_height = imagefontheight(30);
$x = ($width - $text_width) / 2;
$y = ($height - $text_height) / 2;
imagestring($image, 30, $x, $y, $text, $text_color);
// Output image
header("Content-Type: image/jpeg");
imagejpeg($image);
// Release resources
imagedestroy($image);
?>
In this example, we load a JPEG image and use the GD library to add text to it. We then output the resulting image as a JPEG file.
```

## Anwendung

**Thema: Used For, Image Manipulation** — Hilft bei Programmier-Fragen von Anfaenger bis Fortgeschritten. Die KI erklaert Konzepte, schreibt Code und hilft beim Debugging.

Kopiere den Prompt und fuege ihn in ChatGPT, Claude oder Gemini ein.
Passe die Details an deine Beduerfnisse an.

## Variationen

- Nenne die Programmiersprache und Version
- Beschreibe den Kontext: Lernprojekt, Arbeit, oder Hobby
- Frage nach Code-Beispielen mit Kommentaren
- Bitte um Best Practices und haeufige Fehlerquellen

## Connections

- **Domain:** [[Kommunikation & Content]]
- **Kategorie:** [[Kommunikation & Beziehungen]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
  - [[llm-prompt-optimizer|llm-prompt-optimizer]]
