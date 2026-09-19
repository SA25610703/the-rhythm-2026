# 🎶 The Rhythm 2026 - University Event Countdown Website

An electrifying, responsive, high-energy countdown web application for your university festival: **The Rhythm 2026**.

Built with **zero external build tools** (100% vanilla HTML5, CSS3, and modern JavaScript). It can be opened directly in any web browser, or deployed to any free web hosting platform in under 60 seconds.

---

## 🚀 Instant Deployment & Hosting Options

### Option 1: Netlify Drop (Easiest — No account or git required!)
1. Visit **[Netlify Drop](https://app.netlify.com/drop)**.
2. Drag and drop this entire `the-rhythm-2026` folder onto the web page.
3. Your site is live instantly with a free HTTPS URL (e.g. `https://the-rhythm-2026.netlify.app`).

---

### Option 2: GitHub Pages (Free, permanent & university repo friendly)
1. Initialize a Git repository and push this folder to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for The Rhythm 2026 countdown"
   git branch -M main
   git remote add origin https://github.com/<your-username>/the-rhythm-2026.git
   git push -u origin main
   ```
2. On GitHub, go to **Settings** > **Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, select `main` and root `/`, then click **Save**.
4. Your website will be live at `https://<your-username>.github.io/the-rhythm-2026/`.

---

### Option 3: Vercel
1. Run with npx (no installation required):
   ```bash
   npx vercel
   ```
2. Follow the 2 prompts, and your site is deployed.

---

## 🛠️ How to Customize Your Event

All festival details are centralized inside **`config.js`**. You don't need to touch complex HTML or CSS to change dates or names:

Open `config.js` and change:
```javascript
window.EVENT_CONFIG = {
  eventName: "The Rhythm 2026",
  tagline: "Feel The Pulse. Break The Silence.",
  university: "Your University Name",
  
  // Set your countdown target date (YYYY-MM-DDTHH:MM:SS)
  targetDate: "2026-11-20T18:00:00",
  
  venue: {
    name: "Main Campus Grand Amphitheatre",
    city: "University Central Grounds"
  },
  
  // Edit schedule days and events
  schedule: [...],
  
  // Edit FAQ items
  faq: [...]
};
```

### URL Date Testing Shortcut
You can test any target date or trigger the live festival state immediately by passing a `?date=` query string in your browser:
- Test an upcoming date: `index.html?date=2026-12-31T23:59:59`
- Test celebration mode (past date): `index.html?date=2026-01-01T00:00:00`

---

## ✨ Features Included

- ⏱️ **Live High-Precision Countdown**: Days, Hours, Minutes, and Seconds with circular SVG progress indicators.
- 🎵 **Web Audio Pulse Synthesizer**: Native in-browser 118 BPM ambient festival kick & chord beat with mute/unmute control.
- 🌊 **Canvas Rhythm Visualizer**: Flowing animated waveforms and ambient particle constellation reacting to mouse & touch movements.
- 📅 **Add to Calendar**: Instant 1-click Google Calendar link & `.ics` file generator (Apple Calendar, Outlook).
- 🎟️ **Instant Digital Pass Generator**: RSVP modal where attendees can generate, download, or print a personalized festival pass with barcode.
- 🎉 **Confetti Engine**: Full celebration blast when the timer hits zero or on demand.
- 📱 **Mobile First & Responsive**: Optimized for iOS, Android, tablets, and 4K displays.

---

## 💻 Local Preview

You can open `index.html` by double-clicking it in File Explorer, or start a local lightweight web server:

```powershell
# In PowerShell or Command Prompt inside this directory:
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

