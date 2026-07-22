// ─── Greeting Utility ────────────────────────────────────────────────────────
// Returns a time-aware greeting object based on the visitor's local time.
// Refreshes automatically when used with the `useGreeting` hook.

export interface GreetingData {
  greeting: string;
  message: string;
  emoji: string;
}

/**
 * Returns a warm, happy, human greeting based on the current local hour.
 *
 * Time ranges:
 *  23:00 – 03:59  → Night owl energy 🦉
 *  04:00 – 06:59  → Early bird energy 🌅
 *  07:00 – 11:59  → Bright morning ☀️
 *  12:00 – 15:59  → Sunny afternoon 🌞
 *  16:00 – 18:59  → Golden hour 🌇
 *  19:00 – 22:59  → Chill evening ✨
 */
export function getGreetingData(): GreetingData {
  const hour = new Date().getHours();

  // 11 PM – 4 AM  →  Night owl vibes, warm & fun
  if (hour >= 23 || hour < 4) {
    return {
      emoji: '🦉',
      greeting: 'Burning the midnight oil?',
      message: "Night owls build the best things. Welcome! 🌙",
    };
  }

  // 4 AM – 7 AM  →  Early bird, high-energy
  if (hour < 7) {
    return {
      emoji: '🌅',
      greeting: 'Rise & shine, early bird!',
      message: "Up early and already winning. Let's go! ☕",
    };
  }

  // 7 AM – 12 PM  →  Bright & optimistic morning
  if (hour < 12) {
    return {
      emoji: '☀️',
      greeting: 'Good morning, sunshine!',
      message: "Fresh day. Big ideas. Let's explore! 🚀",
    };
  }

  // 12 PM – 4 PM  →  Energetic afternoon
  if (hour < 16) {
    return {
      emoji: '🌞',
      greeting: 'Hey there, afternoon adventurer!',
      message: "Grab a coffee — cool things await! ☕",
    };
  }

  // 4 PM – 7 PM  →  Golden hour, warm & inviting
  if (hour < 19) {
    return {
      emoji: '🌇',
      greeting: 'Golden hour vibes! 🎉',
      message: "Perfect hour to discover something great. ✨",
    };
  }

  // 7 PM – 11 PM  →  Chill evening, relaxed & fun
  return {
    emoji: '✨',
    greeting: 'Hey, good evening!',
    message: "Cozy vibes, great work — enjoy the browse. 🍵",
  };
}
