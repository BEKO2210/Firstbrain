---
type: resource
created: 2026-04-08
updated: 2026-04-08
tags:
  - prompt
  - lyra
  - pkm
source: https://github.com/BEKO2210/lyra-prompts
---

---
id: "#4314"
titel: "site analiz"
kategorie: "Technik im Alltag"
unterkategorie: "Importiert"
tags: ["site", "analiz", "https", "turvivo", "adresinin"]
plattformen: ["ChatGPT", "Claude", "Gemini"]
schwierigkeit: "Anfänger"
quelle: "awesome-chatgpt-prompts"
autor: "hakanak54@gmail.com"
erstellt: "2026-04-05"
---

## Prompt

```
https://turvivo.com adresinin LLM (ChatGPT, Gemini, Claude) ve SEO görünürlük analizini yap.

Amaç:
- Google’da “tur yazılımı”, “tur acenta yazılımı”, “tur rezervasyon sistemi” gibi anahtar kelimelerde üst sıralara çıkmak
- ChatGPT, Gemini gibi LLM’lerin öneri listelerinde yer almak

---

## ANALİZ AKIŞI

### 1. Veri Toplama
- Ana sayfa + özellikler + fiyatlar + hakkımızda sayfalarını WebFetch ile çek
- Paralel olarak şu aramaları yap:
  - "turvivo.com"
  - "tur yazılımı"
  - "tur rezervasyon sistemi"
  - "tour booking software"
  - site:r10.net OR site:reddit.com OR site:eksisozluk.com "tur yazılımı"

---

### 2. SEO ANALİZİ

Aşağıdaki başlıklarda detaylı analiz yap:

#### Teknik SEO
- Sayfa hızı (tahmini)
- HTML semantik yapı (H1, H2, H3)
- Meta title & description kalitesi
- Internal linking
- Schema (structured data) kullanımı

#### İçerik SEO
- Anahtar kelime kapsamı (keyword coverage)
- Rakiplerle kıyasla içerik derinliği
- Blog / içerik eksiklikleri
- Long-tail keyword fırsatları

#### Otorite (Off-page)
- Marka mention var mı?
- Forum / sosyal / blog görünürlüğü
- Backlink kalitesi (tahmini)

---

### 3. LLM (AI) GÖRÜNÜRLÜK ANALİZİ

Şu sorulara cevap ver:

- ChatGPT / Gemini neden bu siteyi önerir ya da önermez?
- İçerik “answer engine” mantığına uygun mu?
- Site şu sorgular için önerilebilir mi:
  - “en iyi tur yazılımı”
  - “tour booking software”
  - “tur şirketi için web sitesi”

#### Değerlendir:
- Entity (marka) gücü
- Açıklayıcı içerik var mı (What is, How it works vs.)
- Comparison content var mı
- Trust sinyalleri (referans, müşteri, case study)

---

### 4. RAKİP ANALİZİ (ÇOK KRİTİK)

En az 3 global ve 3 Türkiye rakibi çıkar:
- Özellik karşılaştırması
- SEO farkları
- İçerik farkları
- Neden daha üstte oldukları

---

### 5. EKSİKLER & FIRSATLAR

Net olarak listele:

- 🚫 Kritik eksikler (must-have)
- ⚠️ Orta seviye eksikler
- 💡 Quick wins (hemen yapılacaklar)

---

### 6. AKSİYON PLANI (EN ÖNEMLİ KISIM)

Aşağıdaki formatta öner:

#### 0-7 gün
- ...

#### 7-30 gün
- ...

#### 1-3 ay
- ...

---

### 7. BONUS (ÇOK ÖNEMLİ)

Aşağıdakileri üret:

1. SEO uyumlu örnek blog başlıkları (en az 10 adet)
2. “tur yazılımı” için landing page outline
3. ChatGPT’nin önermesi için ideal içerik şablonu
4. FAQ schema önerileri

---

## ÇIKTI FORMATI

- Maddeli, net, teknik
- Gereksiz genel bilgi verme
- Direkt aksiyon üret
- Senior SEO + AI consultant gibi davran
```

## Anwendung

Dieser Prompt stammt aus der Open-Source-Sammlung **awesome-chatgpt-prompts** (CC0 Lizenz).
Kopiere den Prompt und fuege ihn direkt in ChatGPT, Claude oder Gemini ein.

- **Rolle:** site analiz
- **Schwierigkeit:** Anfaenger — einfach kopieren und nutzen
- **Tipp:** Passe den Prompt an deine Beduerfnisse an, indem du spezifische Details hinzufuegst

## Variationen

- Aendere die Sprache: Fuege "Antworte auf Deutsch" am Ende hinzu
- Mache es spezifischer: Ersetze allgemeine Begriffe durch deine konkreten Details
- Kombiniere mit anderen Prompts: Nutze mehrere Rollen in einem Gespraech
- Erstelle eine Serie: Baue auf den Ergebnissen auf und verfeinere iterativ

## Connections

- **Domain:** [[Software Entwicklung]]
- **Kategorie:** [[Technik im Alltag]]
- **Sammlung:** [[Prompt Sammlung]]
- **Passende Skills:**
  - [[site-architecture|site-architecture]]
  - [[enhance-prompt|enhance-prompt]]
  - [[llm-application-dev-prompt-optimize|llm-application-dev-prompt-optimize]]
