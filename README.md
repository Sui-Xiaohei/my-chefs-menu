# My Chef’s Menu

My Chef’s Menu is a browser-based menu creator for designing and exporting personal dining menus. Version 0.2.0 provides three visual themes through a shared theme system.

## Features

- Menu title, course, dish, and description inputs
- Starter, Main Course, Dessert, and Drinks sections
- English, Chinese, and mixed-language title support
- Long title handling
- Theme Picker
- Desktop and mobile preview
- Mobile Safari image preview, save, and share flow

## Themes

- **Classic Fine Dining** — formal, centered fine-dining menu
- **Modern** — contemporary editorial restaurant menu
- **Romantic Dinner** — warm personal dinner card

## PNG Export

Menus export as a 1080 × 1350 px PNG in a 4:5 aspect ratio.

## Tech Stack

- HTML
- CSS
- JavaScript
- Vite

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Known Limitations

- Each course currently supports one dish.
- Theme typography depends on Google Fonts and may fall back to system fonts when the service is unavailable.

## Future Roadmap

- Support multiple dishes within each course
- Evaluate self-hosted font assets
- Continue responsive and PNG export compatibility improvements
- Evaluate additional themes based on user feedback
