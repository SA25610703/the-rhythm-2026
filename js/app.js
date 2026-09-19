/**
 * The Rhythm 2026 (ரீதம்) - Standalone Countdown Engine
 * High-precision countdown to today 5:00 PM (Hours, Minutes, Seconds)
 */

document.addEventListener("DOMContentLoaded", () => {
  const config = window.EVENT_CONFIG || {};

  // 1. Initialize Visualizer & Ambient Synth Engine
  const visualizer = new RhythmVisualizer("bg-canvas");
  const audioEngine = new RhythmAudioEngine(visualizer);

  // Audio Toggle Button
  const soundToggleBtn = document.getElementById("sound-toggle");
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener("click", () => {
      const isPlaying = audioEngine.toggle();
      soundToggleBtn.classList.toggle("active", isPlaying);
      const label = soundToggleBtn.querySelector(".sound-label");
      if (label) {
        label.textContent = isPlaying ? "Beat: ON" : "Beat: OFF";
      }
    });
  }

  // 2. Populate Branding
  if (config.eventName) {
    document.querySelectorAll(".event-name-text").forEach(el => el.textContent = config.eventName);
  }
  if (config.tamilTitleImage) {
    const imgEl = document.querySelector(".tamil-title-img");
    if (imgEl) {
      imgEl.src = config.tamilTitleImage;
      if (config.tamilTitle) imgEl.alt = config.tamilTitle;
    }
  } else if (config.tamilTitle) {
    const tamilEl = document.querySelector(".tamil-hero-title");
    if (tamilEl) tamilEl.textContent = config.tamilTitle;
  }
  if (config.university) {
    document.querySelectorAll(".university-text").forEach(el => el.textContent = config.university);
  }

  // 3. Apply Background Adjustments from config
  if (config.background) {
    const root = document.documentElement;
    const bg = config.background;
    if (bg.image) root.style.setProperty("--bg-image", `url('${bg.image}')`);
    if (bg.opacity !== undefined) root.style.setProperty("--bg-opacity", bg.opacity);
    if (bg.blur) root.style.setProperty("--bg-blur", bg.blur);
    if (bg.position) root.style.setProperty("--bg-position", bg.position);
    if (bg.size) root.style.setProperty("--bg-size", bg.size);
    if (bg.brightness !== undefined) root.style.setProperty("--bg-brightness", bg.brightness);
    if (bg.contrast !== undefined) root.style.setProperty("--bg-contrast", bg.contrast);
    if (bg.vignetteOpacity !== undefined) root.style.setProperty("--vignette-opacity", bg.vignetteOpacity);
  }

  // 3. Initialize Pure Countdown (Hours, Minutes, Seconds)
  initCountdown(config, visualizer);
});

function initCountdown(config, visualizer) {
  const urlParams = new URLSearchParams(window.location.search);
  const dateParam = urlParams.get("date");

  let targetDate;
  if (dateParam) {
    targetDate = new Date(dateParam).getTime();
  } else {
    // Target: Today Evening 5:00 PM (17:00:00 local time)
    if (config.targetDate) {
      const parsed = new Date(config.targetDate).getTime();
      targetDate = !isNaN(parsed) ? parsed : getDefaultToday5PM();
    } else {
      targetDate = getDefaultToday5PM();
    }
  }

  function getDefaultToday5PM() {
    const d = new Date();
    d.setHours(17, 0, 0, 0);
    return d.getTime();
  }

  const hoursEl = document.getElementById("count-hours");
  const minutesEl = document.getElementById("count-minutes");
  const secondsEl = document.getElementById("count-seconds");

  const ringHours = document.getElementById("ring-hours");
  const ringMinutes = document.getElementById("ring-minutes");
  const ringSeconds = document.getElementById("ring-seconds");

  const countdownBox = document.getElementById("countdown-section");
  const celebrationBox = document.getElementById("celebration-section");

  let hasCelebrated = false;

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";

      if (countdownBox) countdownBox.classList.add("event-live");
      if (celebrationBox) celebrationBox.style.display = "block";

      if (!hasCelebrated && window.confettiEngine) {
        hasCelebrated = true;
        window.confettiEngine.burstFestivalCelebration();
      }
      return;
    }

    // Only Hours, Minutes, Seconds
    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");

    // Circular progress indicators (circumference 283 for r=45)
    const circumference = 283;
    if (ringSeconds) {
      const secOffset = circumference - (seconds / 60) * circumference;
      ringSeconds.style.strokeDashoffset = secOffset;
    }
    if (ringMinutes) {
      const minOffset = circumference - (minutes / 60) * circumference;
      ringMinutes.style.strokeDashoffset = minOffset;
    }
    if (ringHours) {
      const maxHr = Math.max(12, hours);
      const hrOffset = circumference - (hours / maxHr) * circumference;
      ringHours.style.strokeDashoffset = hrOffset;
    }

    if (visualizer && seconds % 2 === 0) {
      visualizer.triggerPulse(0.12);
    }
  }

  update();
  setInterval(update, 1000);

  // Manual Confetti Celebration button
  const celebrateBtn = document.getElementById("trigger-celebration");
  if (celebrateBtn) {
    celebrateBtn.addEventListener("click", () => {
      if (window.confettiEngine) {
        window.confettiEngine.burstFestivalCelebration();
      }
    });
  }
}
