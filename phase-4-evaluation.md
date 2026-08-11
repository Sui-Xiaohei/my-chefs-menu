# My Chef’s Menu v0.3 — Phase 4 PNG Capacity Evaluation

## Evaluation scope

- Date: 2026-08-11
- Mode: product design assessment only
- Browser: Chromium 151 headless, real DOM rendering
- Export path: the product's existing `html-to-image` flow
- Export size: 1080 × 1350 px (4:5)
- Themes: Michelin Fine Dining, Modern European, Romantic Dinner
- Dish counts: 4, 6, 8, 10
- Content cases: Short Description, Long Description, Long Dish Title, Mixed Chinese-English Content
- Distribution: dishes were distributed as evenly as possible across Starter, Main Course, Dessert, and Drinks.
- Total combinations: 48
- Successfully generated PNG files: 19

`MENU_CONTENT_TOO_LONG` was treated as the technical export boundary. A successful export was then reviewed separately for design quality; successful export does not automatically mean the layout is recommended.

## Capacity matrix

Legend:

- Pass: PNG exported and the theme remained visually acceptable.
- Tight: PNG exported, but whitespace or decorative safety margin was no longer suitable as a recommended product limit.
- Blocked: export was stopped by `MENU_CONTENT_TOO_LONG`.

### Michelin Fine Dining

| Dish count | Short Description | Long Description | Long Dish Title | Mixed Chinese-English |
| --- | --- | --- | --- | --- |
| 4 | Pass | Pass | Pass | Pass |
| 6 | Pass | Blocked (1528px) | Blocked (1404px) | Pass |
| 8 | Blocked (1392px) | Blocked (1853px) | Blocked (1692px) | Blocked (1392px) |
| 10 | Blocked (1602px) | Blocked (2165px) | Blocked (1981px) | Blocked (1602px) |

Assessment:

- Four dishes remain spacious and clearly preserve the fine-dining hierarchy.
- Six dishes with short or compact mixed-language descriptions still feel intentional and premium. The centered composition remains coherent, with approximately 166px below the final dish in the tested layout.
- Six long descriptions make body copy dominate the menu and exceed export height.
- Eight dishes already exceed the canvas even with short descriptions. The theme cannot be allowed to become a dense centered list.

Recommended maximum: **6 dishes total**, with compact content. Use **4 dishes** as the safe target when descriptions or dish titles are long.

### Modern European

| Dish count | Short Description | Long Description | Long Dish Title | Mixed Chinese-English |
| --- | --- | --- | --- | --- |
| 4 | Pass | Pass | Pass | Pass |
| 6 | Pass | Blocked (1517px) | Blocked (1363px) | Pass |
| 8 | Tight (1348px) | Blocked (1836px) | Blocked (1636px) | Tight (1348px) |
| 10 | Blocked (1509px) | Blocked (2137px) | Blocked (1909px) | Blocked (1509px) |

Assessment:

- This theme has the highest raw capacity because its left-aligned editorial structure handles repeated dishes efficiently.
- Six compact dishes preserve the editorial rhythm and leave a healthy content margin.
- Eight compact dishes technically export, but only about 43px remains below the last dish. The lower botanical decoration enters the text area and the page begins to feel like a populated list rather than a composed editorial menu.
- Long descriptions weaken the contrast between dish name and supporting copy before the technical boundary is reached.

Recommended maximum: **6 dishes total**. Eight is a technical edge case, not a product recommendation.

### Romantic Dinner

| Dish count | Short Description | Long Description | Long Dish Title | Mixed Chinese-English |
| --- | --- | --- | --- | --- |
| 4 | Pass | Pass, visually dense | Blocked (1441px) | Pass |
| 6 | Pass, near limit | Blocked (1623px) | Blocked (1831px) | Pass, near limit |
| 8 | Blocked (1485px) | Blocked (1960px) | Blocked (2222px) | Blocked (1485px) |
| 10 | Blocked (1703px) | Blocked (2274px) | Blocked (2612px) | Blocked (1703px) |

Assessment:

- Four compact dishes best preserve the romantic composition and generous whitespace.
- Six compact dishes still retain the color, typography, signature mark, and category hierarchy, but only about 82px remains below the last dish. This is the upper acceptable boundary, not the ideal target.
- Four long descriptions technically export with only about 62px below the final dish. Description text becomes too prominent and the intimate, airy feeling is weakened.
- Long dish titles are especially expensive in this theme: the four-dish test already exceeded the export canvas because the larger romantic typography wrapped to multiple lines.

Recommended maximum: **6 compact dishes total**; **4 dishes** is the preferred design target. With long dish titles, plan for fewer than four unless the titles are shortened.

## Cross-theme product recommendation

### Dish limits

- Recommended unified maximum: **6 dishes per menu**.
- Recommended maximum per Category: **2 dishes**.
- Preferred composition: 1–2 dishes in each populated Category, distributed across the menu.
- Eight dishes should not be promoted as supported capacity. Modern European can technically export eight compact dishes, but the theme quality is already degraded; Michelin and Romantic Dinner cannot export the equivalent case.
- Ten dishes is outside the 1080 × 1350 single-page product format for all three themes.

The limit should protect the menu as a designed object, not promise maximum data capacity. Keep the existing height check as the final technical guard even if a product-level dish limit or guidance is introduced.

### Description length

A Description limit or active guidance is needed.

- Recommended soft limit: approximately **100 Latin characters** or **45 CJK characters per dish**.
- Descriptions should normally occupy no more than two export lines.
- When the menu contains more than four dishes, encourage shorter descriptions.
- Avoid silently truncating exported text. Prefer a character counter, concise-writing guidance, and the existing export-height error as the final guard.

Reason: the long-description tests allowed four-dish exports but visibly shifted attention from dish names to body copy. At six dishes, all themes exceeded the canvas.

### Dish title length

A Dish Title limit or active guidance is needed.

- Recommended soft limit: approximately **60 Latin characters** or **24 CJK characters per dish**.
- Target one line; allow two lines when necessary.
- Romantic Dinner should receive the strongest warning because its larger dish-name typography reaches the capacity boundary first.
- Do not silently truncate titles in the PNG.

Reason: long titles doubled or tripled dish-name height. Six-dish long-title tests were blocked in all themes, and Romantic Dinner was blocked with only four dishes.

## Final Phase 4 decision

- Set the v0.3 product recommendation at **6 total dishes / 2 dishes per Category**.
- Treat **4 dishes** as the safe high-quality target for menus with long descriptions or titles.
- Add Description and Dish Title soft guidance in a future implementation phase.
- Retain `MENU_CONTENT_TOO_LONG` as the authoritative final export guard.
- Do not reduce typography, spacing, padding, or decorative identity to accommodate 8–10 dishes.
- Do not redesign the themes into generic lists for additional capacity.

Phase 4 capacity assessment result: **Completed**.
