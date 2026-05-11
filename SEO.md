# Sladent — How to Rank #1 for "стоматологія Тернопіль"

Practical, prioritised playbook. The website is technically SEO-ready; this is everything else.

---

## Target keywords (Ukrainian)

Primary:
- `стоматологія Тернопіль`
- `стоматолог Тернопіль`
- `Стоматологія Родини Придатко`
- `Sladent Тернопіль`

Service-specific:
- `імплантація зубів Тернопіль`
- `дитячий стоматолог Тернопіль`
- `ортодонтія Тернопіль`
- `вініри Тернопіль`
- `відбілювання зубів Тернопіль`
- `протезування зубів Тернопіль`

Neighbourhood/address:
- `стоматологія просп. Злуки`
- `стоматолог Злуки 8`

---

## Priority 1 — Google Business Profile (do this first, biggest impact)

GBP drives **60-70% of local pack** ("near me" / map) results. Without it you cannot rank for local searches.

1. Go to <https://business.google.com> → claim or create the listing for **"Sladent" / "Стоматологія Родини Придатко"**.
2. Verify by postcard (Google sends a code to просп. Злуки, 8 — takes 5-14 days).
3. Fill **everything**:
   - Category: **Dentist** (primary), Pediatric Dentist, Cosmetic Dentist, Orthodontist (secondary).
   - Hours: Пн-Пт 09:00-20:00, Сб 10:00-15:00.
   - Phone: `+380 (97) 935 1535`.
   - Website: `https://sladent.com` (or custom domain).
   - Description (750 chars): use main keywords naturally — `Сімейна стоматологія в Тернополі з 2008 року. Імплантація, ортодонтія, дитяча стоматологія, естетика. Родина лікарів Придатко.`
   - Services: add every service from `services.html` as a separate item with description + price range.
   - Attributes: "Wheelchair accessible", "Online appointments", "Accepts new patients".
4. Upload **30+ photos**: exterior, interior, equipment, team portraits, before/after smile shots, logo, video tour. Update monthly.
5. Add a **Google Posts** update every 1-2 weeks (offers, blog snippets, new tech). Posts boost ranking signals.

---

## Priority 2 — Reviews engine

Reviews are the single strongest local ranking factor after GBP itself.

**Goal: 50+ Google reviews in 6 months, average ≥ 4.7.**

How:
- After every appointment, hand the patient a card with a QR code linking to your Google review page (`https://g.page/r/<your-place-id>/review`).
- Send an SMS 2 hours after their visit: _"Дякуємо, що обрали Sladent. Якщо вам сподобалось — поділіться враженням: [link]. — Команда Придатко"_.
- **Always reply** to every review (positive and negative) within 24 h. Replies are a ranking signal and trust signal.
- Never buy reviews — Google detects and de-indexes.

Surface reviews on the website too — the Elfsight widget on `reviews.html` already pulls Google reviews; keep it.

---

## Priority 3 — Google Search Console + Analytics

1. Add the property `https://sladent.com` at <https://search.google.com/search-console>.
2. Verify via HTML tag (paste into `<head>` of `index.html`) or DNS.
3. Submit the sitemap: `https://sladent.com/sitemap.xml`.
4. Use **URL Inspection** to request indexing of each page once.
5. Connect **Google Analytics 4** (free) — track which keywords actually convert. Snippet goes in `<head>`.

Monitor weekly:
- Impressions, click-through-rate (CTR) per query
- Mobile usability errors
- Core Web Vitals (LCP, INP, CLS)

---

## Priority 4 — Local citations (NAP consistency)

Make sure **N**ame / **A**ddress / **P**hone are byte-identical everywhere:

```
Sladent — Стоматологія Родини Придатко
просп. Злуки, 8, м. Тернопіль, 46010
+380 (97) 935 1535
```

Already listed (claim and update if outdated):
- list.in.ua
- te.ua / 109.te.ua
- mydentalnet.com
- top20.ua
- barb.ua
- proternopil.te.ua

Add:
- Facebook Business Page (link to Instagram and website)
- Apple Maps Connect
- 2GIS (`2gis.ua`)
- Yandex Maps (skip — sanctions / Russian)
- Sklik.ua / Doc.ua / Likarni.com / Health.ua (UA medical directories)

---

## Priority 5 — Content marketing (local SEO)

Goal: rank for long-tail "питання + Тернопіль" searches.

Create a `/blog/` section (5-10 articles, 800-1500 words each, Ukrainian):

1. _"Скільки коштує імплантація зубів у Тернополі 2026"_ — price guide
2. _"Як вибрати дитячого стоматолога — поради батькам"_
3. _"Брекети чи елайнери: що краще для дорослих"_
4. _"Що робити при гострому зубному болі вночі"_ (high-intent emergency keyword)
5. _"Відбілювання зубів: міфи і факти"_
6. _"Імплантація All-on-4: для кого підходить"_
7. _"Гігієна порожнини рота: повний гайд від стоматолога"_
8. _"Чим відрізняється Sladent від інших клінік у Тернополі"_ (brand)

Each article:
- H1 with the exact keyword phrase
- H2/H3 hierarchy
- Internal link to relevant service page + contact CTA
- Real photo (own image, not stock)
- Author byline (Доктор Ярослав Придатко)
- 800+ words, scannable

---

## Priority 6 — Backlinks (slow but compounds)

Easy wins:
- **Sponsorships**: local school, sports club, charity. They link back from their site.
- **Press**: Тернопільські Новини, 0352.ua, 20minut.ua — pitch a story (15 years of family practice, new technology, free check-ups for kids).
- **Guest posts** on UA health blogs: Wonderzine, The Village (UA), or MOZ.gov.ua patient resources.
- **Dental association directories**: Асоціація Стоматологів України (asu.org.ua).
- **HARO / Qwoted equivalent**: respond to UA journalists asking for dentist quotes.

Avoid: paid link networks, PBNs, foreign spammy directories. Google penalises.

---

## Priority 7 — Technical (already done — just verify)

The site already has:
- ✅ HTTPS (Netlify auto)
- ✅ Mobile-responsive
- ✅ `Dentist` JSON-LD with full schema
- ✅ `FAQPage` JSON-LD
- ✅ Open Graph + Twitter cards
- ✅ Canonical URLs
- ✅ Image `alt` text in Ukrainian
- ✅ `sitemap.xml` + `robots.txt`
- ✅ Preconnect to fonts, image preload
- ✅ `lang="uk"`, `og:locale=uk_UA`

To verify:
- Run [PageSpeed Insights](https://pagespeed.web.dev/) — aim for 90+ mobile, 95+ desktop.
- Test Rich Results: <https://search.google.com/test/rich-results> — paste URL, confirm `Dentist` + `FAQPage` show as eligible.
- Mobile-Friendly Test: <https://search.google.com/test/mobile-friendly>.

---

## Priority 8 — Domain (done — `sladent.com`)

Site is live at `https://sladent.com`. To strengthen local SEO further, consider also acquiring `sladent.com.ua` and 301-redirecting it to `sladent.com` — a `.ua` ccTLD pointing here adds a small local-signal boost and protects the brand. Optional, not critical.

Verify:
- `https://sladent.com` and `https://www.sladent.com` both serve the site (one should 301 to the other).
- `http://` → `https://` 301 redirect is active (Netlify does this automatically).
- SSL certificate is valid (Let's Encrypt via Netlify, auto-renews).

---

## Timeline & expectations

| Week | Expect |
|------|--------|
| 1    | GBP verification postcard mailed, sitemap submitted, Analytics tracking |
| 2-3  | GBP verified, first reviews start coming in, indexing of new pages |
| 4-6  | Site starts appearing for brand searches (`Sladent Тернопіль`) and long-tail (`дитячий стоматолог Злуки`) |
| 8-12 | First page rankings for medium-competition terms (`імплантація зубів Тернопіль`) |
| 4-6 mo | Top 3 in local pack for `стоматологія Тернопіль` if reviews + GBP are well-maintained |
| 6-12 mo | #1 in local pack achievable with sustained reviews, content, citations |

Google does not promise rankings, and you cannot pay your way to #1 organic (only ads). Consistency over months is what wins.

---

## Quick win checklist (do this week)

- [ ] Claim Google Business Profile and start verification
- [ ] Set up Google Search Console + submit sitemap
- [ ] Set up Google Analytics 4
- [ ] Make patient review request card (QR code linking to GBP review URL)
- [ ] Audit and update NAP on the 6 listed UA directories
- [ ] Write the first blog post (e.g., "Скільки коштує імплантація у Тернополі")
- [ ] Take 20 fresh photos of clinic, team, equipment for GBP
- [ ] Decide on a custom domain (`sladent.com.ua` recommended)

---

## Useful links

- Google Business Profile — <https://business.google.com>
- Google Search Console — <https://search.google.com/search-console>
- Rich Results Test — <https://search.google.com/test/rich-results>
- PageSpeed Insights — <https://pagespeed.web.dev>
- Mobile-Friendly Test — <https://search.google.com/test/mobile-friendly>
- Ukrainian domains — <https://imena.ua>
- Local directories: <https://list.in.ua>, <https://te.ua>, <https://2gis.ua>
