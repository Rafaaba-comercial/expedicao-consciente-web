

/**
 * Decorative deep-space layer: large stars, asteroids, comets, ships.
 * Pointer-events disabled so it never blocks clicks on planets / panels.
 */
export const SpaceBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Big glowing stars (CSS dots so they tint with the foreground token) */}
      {BIG_STARS.map((s, i) => (
        <span
          key={`bs-${i}`}
          className="absolute rounded-full bg-foreground twinkle-slow"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            boxShadow: `0 0 ${s.glow}px hsl(var(--foreground) / 0.6)`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Cross-shaped sparkles using CSS */}
      {SPARKLES.map((s, i) => (
        <span
          key={`sp-${i}`}
          className="sparkle absolute twinkle-slow"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

    </div>
  );
};

// --- Static decoration data (kept outside component for clarity) -----------

type Star = {
  left: string;
  top: string;
  size: number;
  opacity: number;
  glow: number;
  delay: number;
};

const BIG_STARS: Star[] = [
  // Original stars
  { left: "8%", top: "10%", size: 4, opacity: 0.9, glow: 8, delay: 0 },
  { left: "22%", top: "32%", size: 3, opacity: 0.7, glow: 6, delay: 0.5 },
  { left: "14%", top: "70%", size: 5, opacity: 0.95, glow: 10, delay: 1.2 },
  { left: "33%", top: "8%", size: 3, opacity: 0.8, glow: 6, delay: 2 },
  { left: "45%", top: "22%", size: 4, opacity: 0.9, glow: 8, delay: 0.8 },
  { left: "62%", top: "12%", size: 3, opacity: 0.7, glow: 6, delay: 1.6 },
  { left: "78%", top: "30%", size: 5, opacity: 1, glow: 12, delay: 0.3 },
  { left: "88%", top: "8%", size: 3, opacity: 0.7, glow: 6, delay: 2.2 },
  { left: "92%", top: "48%", size: 4, opacity: 0.85, glow: 8, delay: 1 },
  { left: "70%", top: "75%", size: 5, opacity: 0.95, glow: 10, delay: 0.6 },
  { left: "55%", top: "82%", size: 3, opacity: 0.7, glow: 6, delay: 1.8 },
  { left: "30%", top: "85%", size: 4, opacity: 0.85, glow: 8, delay: 2.4 },
  { left: "5%", top: "45%", size: 3, opacity: 0.7, glow: 6, delay: 1.4 },
  { left: "48%", top: "55%", size: 2, opacity: 0.6, glow: 4, delay: 0.2 },
  { left: "82%", top: "62%", size: 3, opacity: 0.75, glow: 6, delay: 1.1 },
  // Extra stars
  { left: "12%", top: "25%", size: 3, opacity: 0.8, glow: 5, delay: 0.7 },
  { left: "28%", top: "60%", size: 4, opacity: 0.9, glow: 7, delay: 1.9 },
  { left: "75%", top: "15%", size: 3, opacity: 0.75, glow: 6, delay: 0.4 },
  { left: "85%", top: "80%", size: 4, opacity: 0.85, glow: 8, delay: 2.1 },
  { left: "40%", top: "90%", size: 5, opacity: 0.95, glow: 10, delay: 1.5 },
  { left: "65%", top: "40%", size: 3, opacity: 0.7, glow: 5, delay: 0.9 },
  { left: "50%", top: "35%", size: 2, opacity: 0.6, glow: 4, delay: 2.3 },
  { left: "2%", top: "80%", size: 4, opacity: 0.8, glow: 7, delay: 1.1 },
  { left: "95%", top: "25%", size: 3, opacity: 0.9, glow: 6, delay: 0.8 },
  { left: "60%", top: "65%", size: 5, opacity: 1, glow: 11, delay: 2.5 },
  { left: "18%", top: "95%", size: 3, opacity: 0.85, glow: 6, delay: 1.3 },
  { left: "35%", top: "50%", size: 4, opacity: 0.75, glow: 8, delay: 0.6 },
  { left: "80%", top: "50%", size: 3, opacity: 0.7, glow: 5, delay: 1.7 },
  { left: "50%", top: "5%", size: 4, opacity: 0.9, glow: 9, delay: 2.0 },
  { left: "90%", top: "65%", size: 2, opacity: 0.65, glow: 4, delay: 1.2 },
];

type Sparkle = { left: string; top: string; size: number; delay: number };

const SPARKLES: Sparkle[] = [
  // Original
  { left: "18%", top: "20%", size: 14, delay: 0.4 },
  { left: "40%", top: "45%", size: 10, delay: 1.3 },
  { left: "68%", top: "20%", size: 16, delay: 0.7 },
  { left: "85%", top: "75%", size: 12, delay: 2.0 },
  { left: "25%", top: "78%", size: 14, delay: 1.7 },
  { left: "58%", top: "68%", size: 10, delay: 0.9 },
  // Extra sparkles
  { left: "10%", top: "60%", size: 12, delay: 0.2 },
  { left: "30%", top: "30%", size: 15, delay: 1.1 },
  { left: "50%", top: "15%", size: 10, delay: 2.5 },
  { left: "75%", top: "45%", size: 14, delay: 0.8 },
  { left: "90%", top: "30%", size: 16, delay: 1.5 },
  { left: "45%", top: "85%", size: 12, delay: 2.2 },
  { left: "8%", top: "85%", size: 10, delay: 1.9 },
  { left: "70%", top: "90%", size: 15, delay: 0.5 },
];
