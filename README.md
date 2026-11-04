# Meal Builder

A personal nutrition tracking app as a Progressive Web App (PWA) — built for private use and installable directly on iPhone via Safari, no App Store required.

**Live:** https://lisjuscha.github.io/meal-builder/

---

## What it does

Meal Builder lets you log meals from a personal ingredient database, track macros and calories across the day, and get a simple overview of your eating habits — all without an account, without a server, and without your data ever leaving your device.

### Features

- **Meal Builder** — pick ingredients, set portions and cooking style, generate a recipe automatically
- **Nutrition traffic light** — green / yellow / red rating per meal based on macro balance
- **Macro ring** — visual protein / carbs / fat split
- **Daily goal** — personal kcal target with progress bar
- **Water tracker** — daily water intake in ml, resets at midnight
- **Health tags** — ingredient flags like high-protein, high-fiber, antioxidants
- **Season calendar** — shows which ingredients are currently in season
- **Cycle-based nutrition** — optional phase-based food recommendations (Menstruation / Follikulär / Ovulation / Luteal)
- **Fridge Mode** — pick what you have at home, get a suggested combination
- **Meal rating & notes** — 1–5 stars and a personal note per meal
- **Balance hint** — reminder if no vegetables, fruit, or protein logged today
- **Weekly trends** — bar chart of kcal, protein, or fiber over the last 7 days
- **Templates** — save meals you make regularly for quick reuse
- **Shopping list** — add ingredients from any meal directly to a checklist
- **Meal plan** — weekly calendar with 4 meal slots per day
- **Recipe import** — paste a recipe text, the app recognises matching ingredients automatically
- **Cooking session** — step-by-step cooking mode with screen-on (WakeLock)
- **Backup / Restore** — export all data as a JSON file and reimport it any time (Settings)

---

## How to install on iPhone

1. Open https://lisjuscha.github.io/meal-builder/ in **Safari**
2. Tap the **Share** button (box with arrow pointing up)
3. Tap **"Zum Home-Bildschirm"** (Add to Home Screen)
4. Confirm — the app now sits on your home screen like a native app

Works on Android the same way (Chrome → "Add to Home Screen").

---

## Data & privacy

All data is stored locally on your device using IndexedDB. Nothing is sent to any server. The app has no backend, no account system, no analytics.

Each device has its own separate database — if you install the app on two phones, they do not share meals or settings.

**Important:** Browser data can be cleared by iOS in rare cases (very low storage + app unused for a long time). Use **Einstellungen → Datensicherung → Exportieren** occasionally to save a backup JSON file to your Files app.

---

## Disclaimer

This is a personal side project, built and maintained for private use. The code is public for transparency, not as a supported product.

- No guarantee of correctness, completeness, or continued availability
- Nutritional values are approximate estimates, not verified medical data
- The cycle-based nutrition suggestions are for personal orientation only — not medical advice
- No support is provided for issues encountered by third parties

If you find this useful and want to use it, feel free — but expect rough edges.
