import asteroid from "@/assets/space-asteroid.png";
import comet from "@/assets/space-comet.png";
import rocket from "@/assets/space-rocket.png";
import ufo from "@/assets/space-ufo.png";

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

      {/* Asteroids */}
      {ASTEROIDS.map((a, i) => (
        <img
          key={`as-${i}`}
          src={asteroid}
          alt=""
          aria-hidden
          className="absolute float-slow select-none"
          style={{
            left: a.left,
            top: a.top,
            width: a.size,
            height: a.size,
            opacity: a.opacity,
            transform: `rotate(${a.rotate}deg)`,
            animationDelay: `${a.delay}s`,
          }}
          width={120}
          height={120}
        />
      ))}

      {/* Comet (top right, drifting) */}
      <img
        src={comet}
        alt=""
        aria-hidden
        className="absolute drift select-none"
        style={{ right: "8%", top: "12%", width: "180px", opacity: 0.8 }}
        width={180}
        height={180}
      />

      {/* Rocket (top left area) */}
      <img
        src={rocket}
        alt=""
        aria-hidden
        className="absolute float-slow select-none"
        style={{
          left: "6%",
          top: "18%",
          width: "90px",
          transform: "rotate(-20deg)",
          opacity: 0.9,
        }}
        width={90}
        height={90}
      />

      {/* UFO (mid-right) */}
      <img
        src={ufo}
        alt=""
        aria-hidden
        className="absolute float select-none"
        style={{
          right: "5%",
          top: "55%",
          width: "80px",
          opacity: 0.85,
        }}
        width={80}
        height={80}
      />
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
];

type Sparkle = { left: string; top: string; size: number; delay: number };

const SPARKLES: Sparkle[] = [
  { left: "18%", top: "20%", size: 14, delay: 0.4 },
  { left: "40%", top: "45%", size: 10, delay: 1.3 },
  { left: "68%", top: "20%", size: 16, delay: 0.7 },
  { left: "85%", top: "75%", size: 12, delay: 2.0 },
  { left: "25%", top: "78%", size: 14, delay: 1.7 },
  { left: "58%", top: "68%", size: 10, delay: 0.9 },
];

type Asteroid = {
  left: string;
  top: string;
  size: number;
  opacity: number;
  rotate: number;
  delay: number;
};

const ASTEROIDS: Asteroid[] = [
  { left: "12%", top: "55%", size: 70, opacity: 0.85, rotate: 15, delay: 0 },
  { left: "85%", top: "20%", size: 55, opacity: 0.8, rotate: -25, delay: 1.2 },
  { left: "92%", top: "85%", size: 80, opacity: 0.9, rotate: 40, delay: 0.6 },
  { left: "3%", top: "82%", size: 50, opacity: 0.75, rotate: -10, delay: 2 },
  { left: "48%", top: "8%", size: 40, opacity: 0.7, rotate: 30, delay: 1.5 },
];
