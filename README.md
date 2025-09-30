# Marriage Invite 🎉💍

**Open-source nerdy wedding invitation site** — an interactive envelope that opens into a landing page with all details (names, venue, time, IBAN). Configurable, modular, and deployable for free on GitHub Pages.

---

## ✨ Features
- **Envelope animation**: swipe/drag to open.
- **Landing page**: names, date/time, location with Google Maps link, IBAN with copy button.
- **PDF export**: click *Download PDF* (uses browser’s print-to-PDF).
- **Config-driven**: everything is customizable via `public/config.json` (no hardcoding).
- **Modular**: envelope and landing are swappable modules.
- **Free hosting**: deploy automatically to GitHub Pages.

---

## 📦 Tech Stack
- [Vite](https://vitejs.dev/) — fast dev/build tool.
- [TypeScript](https://www.typescriptlang.org/) — typed JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling.

---

## 🚀 Getting Started

### ⚙️ 0. Configuration

All invitation details are stored in **`public/config.json`**.

1. Copy the sample file:
```bash
cp public/config.sample.json public/config.json
```

2. Edit `public/config.json` with your data:
```json
{
  "invite": {
    "bride": "Alice",
    "groom": "Bob",
    "date": "Saturday, June 20, 2026",
    "time": "16:30",
    "venueName": "Villa dei Programmatori",
    "address": "Via Algoritmo 42, Roma",
    "mapsUrl": "https://maps.google.com/?q=Via+Algoritmo+42+Roma",
    "iban": "IT60X0542811101000000123456",
    "note": "Dress code: nerd-chic."
  }
}
```


### 1. Clone the repository
```bash
git clone https://github.com/alescire94/marriage_invite.git
cd marriage_invite
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run in development mode
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to see the site.

---


3. Save and refresh the site.

---

## 🏗 Build

To create the production build:
```bash
npm run build
```
The static files will be in the **`dist/`** folder.

---

## 🌐 Deploy (GitHub Pages)

This repo includes a **GitHub Actions workflow** that builds and deploys automatically:

1. Push changes to the `main` branch.
2. The workflow runs `npm run build`.
3. The contents of `dist/` are published to **GitHub Pages**.

Your site will be available at:
```
https://<your-username>.github.io/marriage_invite/
```

⚠️ Make sure `vite.config.ts` has the correct base path:
```ts
export default defineConfig({
  base: '/marriage_invite/'
})
```

---

## 🔧 Modular Design
- **Envelope**: located in `src/modules/envelope/`
- **Landing**: located in `src/modules/landing/`

You can replace or extend modules without touching the rest of the code.

---

## 📜 License
MIT — feel free to fork, customize, and share your nerdy wedding invite! 🎊