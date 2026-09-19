/**
 * ==========================================================
 * THE RHYTHM 2026 - EVENT CONFIGURATION
 * ==========================================================
 * You can edit all details of your university event right here!
 * No coding experience needed — just edit the values between quotes.
 */

window.EVENT_CONFIG = {
  // Main Event Branding from Official Poster
  eventName: "THE RHYTHM 2026",
  tamilTitle: "ரிதம்",
  tamilTitleImage: "assets/tamil-title.png",
  tagline: "Big Things Are Coming Soon",
  subTagline: "Rhythm Karaoke Night • Live Vocals, Acoustic & Campus Jam",
  university: "NORTHERN UNI Student Community",
  edition: "Karaoke Night Edition",

  // Target Countdown Date & Time: Today Evening 5:00 PM
  targetDate: "2026-09-19T17:00:00",

  // Location & Venue Details
  venue: {
    name: "NORTHERN UNI 501 MULTI-PURPOSE HALL",
    
  },

  // Festival Theme Colors (Warm Amber, Golden Glow & Dark Espresso)
  theme: {
    primaryGradient: "linear-gradient(135deg, #f5e6c8 0%, #d4af37 50%, #e59866 100%)",
    accentColor: "#f5e6c8",
    pulseColor: "#d4af37"
  },

  // Background Poster Adjustments (tune visual intensity easily)
  background: {
    image: "assets/background.jpg",
    opacity: 0.55,           // 0.0 (hidden) to 1.0 (fully visible)
    blur: "0px",              // e.g. "0px", "4px", "8px" (soft blur to help foreground text pop)
    position: "center 20%",   // "center 20%", "center top", "center center"
    size: "cover",            // "cover" or "contain"
    brightness: 0.90,         // 0.5 to 1.5
    contrast: 1.10,           // 0.8 to 1.5
    vignetteOpacity: 0.75     // 0.0 (no dark edge) to 1.0 (strong dark edge)
  },

  // Event Schedule Teaser
  schedule: [
    {
      day: "Segment 01",
      title: "The Warmup & Acoustic Jam",
      date: "Nov 20, 2026 • 5:00 PM",
      events: ["Acoustic Solo Performers", "Open Mic Unplugged", "Audience Warmup"]
    },
    {
      day: "Segment 02",
      title: "Karaoke Battle Royale",
      date: "Nov 20, 2026 • 7:00 PM",
      events: ["Duet Showdown", "Genre Roulette", "Crowd Favorite Vote"]
    },
    {
      day: "Segment 03",
      title: "The Grand Chorus & After-Jam",
      date: "Nov 20, 2026 • 9:30 PM",
      events: ["Community All-Singalong", "Live Band Jam", "Awards & Mementos"]
    }
  ],

  // Highlights & Attractions
  highlights: [
    {
      icon: "🎤",
      title: "Karaoke Showdown",
      desc: "Take the mic! Sing your heart out with state-of-the-art acoustics and stage lighting."
    },
    {
      icon: "🎶",
      title: "Live Band & Acoustic Sets",
      desc: "Soulful acoustic accompaniment and student band jam sessions all evening."
    },
    {
      icon: "🏆",
      title: "Golden Mic Trophy",
      desc: "Win the audience choice award with live real-time crowd decibel cheers."
    },
    {
      icon: "✨",
      title: "Open Mic Stage",
      desc: "Step up for impromptu solos, beatboxing, rap verses, and group harmonies."
    },
    {
      icon: "☕",
      title: "Warm Brews & Snacks",
      desc: "Gourmet coffee, hot chocolate, mocktails, and fresh artisanal snacks."
    },
    {
      icon: "📸",
      title: "Rhythm Photobooth",
      desc: "Retro stage photobooth with instant prints and digital keepsake frames."
    }
  ],

  // Frequently Asked Questions
  faq: [
    {
      q: "Who is eligible to attend Rhythm Karaoke Night?",
      a: "The event is organized by Northern Uni Student Community and is open to all students, faculty, and invited guests with valid ID cards."
    },
    {
      q: "Do I have to register in advance to sing?",
      a: "Yes! Slot registration for performers is limited to ensure everyone gets stage time. Click 'Register / Get Pass' above to reserve your slot."
    },
    {
      q: "Can I perform solo or with a partner/group?",
      a: "Both solo singers and duets/groups are welcome! Backing tracks or acoustic instruments can be plugged into our soundboard."
    },
    {
      q: "Is there an entry fee?",
      a: "General entry passes are completely free for all Northern Uni students with prior registration."
    }
  ],

  // Social Channels & Contact Links
  socials: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    spotify: "https://spotify.com",
    discord: "https://discord.com"
  },

  // Contact / Helpdesk
  contact: {
    email: "northernuni.rhythm@gmail.com",
    phone: "+1 (800) 555-RHYTHM"
  }
};
