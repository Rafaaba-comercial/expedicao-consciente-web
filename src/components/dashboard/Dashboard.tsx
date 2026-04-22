import { useEffect, useState } from "react";
import { Planet, PLANETS, TEAMS } from "@/data/game";
import { TeamPanel } from "./TeamPanel";
import { SpaceBackground } from "./SpaceBackground";
import { cn } from "@/lib/utils";
import logoExpedicao from "@/assets/logo-expedicao.png";

type ZoomStage = "idle" | "centered" | "fullscreen" | "fade";

interface PlanetSlot extends Planet {
  /** Horizontal position as % of universe area */
  xPct: number;
  /** Vertical position as % of universe area */
  yPct: number;
  /** Base scale for visual variance */
  baseScale: number;
}

/**
 * Arrange planets in two vertical columns (4 left + 4 right),
 * matching the reference layout. Center column is reserved for the logo.
 */
const arrangePlanets = (planets: Planet[]): PlanetSlot[] => {
  // Y positions for the 4 stops in each column (top to bottom)
  const ys = [8, 27, 46, 65];

  // Arched X positions (curving around the center text)
  const leftXs = [24, 14, 13, 22];
  const rightXs = [76, 86, 87, 78];

  // Base scales for visual variation
  const leftScales = [0.85, 1.15, 0.9, 0.75];
  const rightScales = [0.95, 0.8, 1.2, 0.85];

  return planets.map((p, i) => {
    const isLeft = i < 4;
    const yIndex = i % 4;
    return {
      ...p,
      xPct: isLeft ? leftXs[yIndex] : rightXs[yIndex],
      yPct: ys[yIndex],
      baseScale: isLeft ? leftScales[yIndex] : rightScales[yIndex],
    };
  });
};

export const Dashboard = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [stage, setStage] = useState<ZoomStage>("idle");

  const slots = arrangePlanets(PLANETS);

  const handlePlanetClick = (id: string) => {
    if (stage === "idle") {
      setSelectedId(id);
      setStage("centered");
      return;
    }
    if (stage === "centered" && id === selectedId) {
      setStage("fullscreen");
      window.setTimeout(() => setStage("fade"), 900);
      return;
    }
    if (stage === "centered" && id !== selectedId) {
      setSelectedId(id);
    }
  };

  const handleBackdropClick = () => {
    if (stage === "centered") {
      setSelectedId(null);
      setStage("idle");
    }
  };

  // Import useNavigate at the top implicitly or just use window.location if router context issue
  // But wait, there is no useNavigate here. Let's add it.

  // Actually, I can use window.location.href or useNavigate.
  // Wait, I need to add import { useNavigate } from "react-router-dom"; at the top. Let's do that with multi_replace.
  // But for now, since it's a simple replace, let's just use it here or update imports.
  // Since I am replacing only these lines, I can't easily add the import.
  // "react-router-dom" is available, so `window.location.assign` works fine for a prototype if it's identical, but `useNavigate` is better.
  // Let me just replace the whole file or use multi_replace. Let's fallback to window.location.assign just for simplicity, or I can abort this tool call.
  // Wait, I can use a global `window.location.href = "/challenge/" + selectedId` for now and it's 100% fine.

  // After fade completes, transition to Challenge screen
  useEffect(() => {
    if (stage !== "fade") return;
    const t = window.setTimeout(() => {
      // Navegando para o modulo de desafio com o planeta selecionado
      window.location.href = `/challenge/${selectedId}`;
    }, 2400);
    return () => window.clearTimeout(t);
  }, [stage, selectedId]);

  const isAnyZoomed = stage !== "idle";

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Starfield background */}
      <div className="starfield twinkle absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-space)" }}
      />
      {/* Subtle grain */}
      <div className="grain absolute inset-0 opacity-60" />

      {/* Decorative space layer (asteroids, comet, ufo, big stars) */}
      <SpaceBackground />

      <div className="relative flex h-full w-full flex-col">
        {/* Top brand strip */}
        <header className="relative z-30 flex items-center justify-between px-4 pt-4 sm:px-8 sm:pt-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="font-display text-[10px] tracking-[0.3em] text-foreground/60 sm:text-xs">
              MISSÃO 001
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display text-[10px] tracking-[0.3em] text-foreground/60 sm:text-xs">
              UNIVERSO
            </span>
            <span className="h-2 w-2 rounded-full bg-accent" />
          </div>
        </header>

        {/* Universe area */}
        <div className="relative flex-1" onClick={handleBackdropClick}>
          <UniverseStage
            slots={slots}
            selectedId={selectedId}
            stage={stage}
            onPlanetClick={handlePlanetClick}
          />

          {/* Logo (hidden when zoomed) */}
          <div
            className={cn(
              "pointer-events-none absolute left-1/2 top-1/2 z-10 w-[min(46vw,420px)] -translate-x-1/2 -translate-y-1/2 transition-all duration-700",
              isAnyZoomed ? "scale-90 opacity-0" : "scale-100 opacity-100",
            )}
          >
            <img
              src={logoExpedicao}
              alt="Logo Expedição Consciente"
              className="float h-auto w-full drop-shadow-[0_8px_24px_hsl(230_50%_2%/0.6)]"
              width={1024}
              height={1024}
            />
          </div>
        </div>

        {/* Bottom team panel */}
        <footer
          className={cn(
            "relative z-20 px-4 pb-4 transition-all duration-500 sm:px-8 sm:pb-6",
            isAnyZoomed && "pointer-events-none translate-y-2 opacity-30",
          )}
        >
          <TeamPanel teams={TEAMS} />
        </footer>
      </div>

      {/* Black fade overlay */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-50 bg-black transition-opacity duration-1000",
          stage === "fade" ? "opacity-100" : "opacity-0",
        )}
        aria-hidden
      >
        <div
          className={cn(
            "flex h-full w-full items-center justify-center transition-opacity duration-700",
            stage === "fade" ? "opacity-100 delay-500" : "opacity-0",
          )}
        >
          <span className="font-display text-xs tracking-[0.4em] text-foreground/60">
            PREPARANDO DESAFIO...
          </span>
        </div>
      </div>
    </div>
  );
};

interface UniverseStageProps {
  slots: PlanetSlot[];
  selectedId: string | null;
  stage: ZoomStage;
  onPlanetClick: (id: string) => void;
}

const UniverseStage = ({ slots, selectedId, stage, onPlanetClick }: UniverseStageProps) => {
  return (
    <div className="absolute inset-0">
      {slots.map((p) => (
        <PlanetNode
          key={p.id}
          planet={p}
          stage={stage}
          isSelected={selectedId === p.id}
          isAnySelected={selectedId !== null}
          onClick={(e) => {
            e.stopPropagation();
            onPlanetClick(p.id);
          }}
        />
      ))}
    </div>
  );
};

interface PlanetNodeProps {
  planet: PlanetSlot;
  stage: ZoomStage;
  isSelected: boolean;
  isAnySelected: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const PlanetNode = ({ planet, stage, isSelected, isAnySelected, onClick }: PlanetNodeProps) => {
  // Default position based on column layout
  let leftStyle = `${planet.xPct}%`;
  let topStyle = `${planet.yPct}%`;
  let scale = planet.baseScale;
  let opacity = 1;
  let zIndex = 5;

  if (stage === "centered") {
    if (isSelected) {
      leftStyle = "50%";
      topStyle = "50%";
      scale = 2.4;
      zIndex = 30;
    } else {
      // Keep all other planets visible at their positions (slightly dimmed)
      opacity = 0.75;
    }
  } else if (stage === "fullscreen" || stage === "fade") {
    if (isSelected) {
      leftStyle = "50%";
      topStyle = "50%";
      scale = 18;
      zIndex = 30;
    } else {
      // Fade out non-selected only when going fullscreen
      opacity = 0;
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Planeta ${planet.name}`}
      className={cn(
        "group absolute flex flex-col items-center justify-center focus:outline-none",
        !isAnySelected && "float",
      )}
      style={{
        left: leftStyle,
        top: topStyle,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        zIndex,
        transition:
          "left 900ms var(--transition-planet), top 900ms var(--transition-planet), transform 900ms var(--transition-planet), opacity 500ms ease",
      }}
    >
      <div
        className="relative"
        style={{
          width: "clamp(64px, 11vmin, 120px)",
          height: "clamp(64px, 11vmin, 120px)",
        }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            background: `hsl(${planet.color} / 0.5)`,
            opacity: isSelected ? 0.9 : 0.35,
          }}
        />
        <img
          src={planet.image}
          alt={planet.name}
          className="relative h-full w-full select-none object-contain drop-shadow-[var(--shadow-planet)] transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Label */}
      <span
        className={cn(
          "font-display absolute top-full mt-2 whitespace-nowrap rounded-full border border-foreground/10 bg-background/70 px-3 py-1 text-[10px] uppercase tracking-widest text-foreground/80 backdrop-blur-sm transition-opacity duration-300 sm:text-xs",
          isAnySelected ? "opacity-0" : "opacity-100",
        )}
      >
        {planet.name}
      </span>
    </button>
  );
};
