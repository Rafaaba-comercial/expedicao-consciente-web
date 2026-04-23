import { Team } from "@/data/game";
import { cn } from "@/lib/utils";

interface TeamPanelProps {
  teams: Team[];
}

export const TeamPanel = ({ teams }: TeamPanelProps) => {
  const uniqueScores = Array.from(new Set(teams.map((t) => t.score))).sort((a, b) => b - a);
  const maxScore = uniqueScores[0];

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div className="halftone absolute inset-0 rounded-2xl opacity-40" />
      <div className="relative rounded-2xl border-2 border-foreground/10 bg-card p-4 shadow-[var(--shadow-panel)]">
        {/* Top label strip */}
        <div className="mb-3 flex items-center justify-between border-b border-card-foreground/15 pb-2">
          <span className="font-display text-[10px] tracking-widest text-card-foreground/70 sm:text-xs">
            ★ TRIPULAÇÃO
          </span>
          <span className="font-retro text-[10px] tracking-widest text-card-foreground/50 sm:text-xs">
            PLACAR DA EXPEDIÇÃO
          </span>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {teams.map((team) => {
            const isLeader = team.score === maxScore;
            const rank = uniqueScores.indexOf(team.score) + 1;
            return (
              <li
                key={team.id}
                className={cn(
                  "group flex items-center gap-3 rounded-xl border-2 px-3 py-2 transition-colors",
                  isLeader
                    ? "border-primary bg-primary/10"
                    : "border-card-foreground/10 bg-card-foreground/[0.03] hover:bg-card-foreground/[0.06]",
                )}
              >
                {/* Circular avatar frame */}
                <div className="relative shrink-0">
                  <div
                    className={cn(
                      "h-12 w-12 overflow-hidden rounded-full border-2 bg-secondary/20",
                      isLeader ? "border-primary" : "border-card-foreground/20",
                    )}
                  >
                    <img
                      src={team.avatar}
                      alt={`Avatar de ${team.name}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      width={512}
                      height={512}
                    />
                  </div>
                  <span
                    className={cn(
                      "absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shadow-md",
                      isLeader
                        ? "bg-mustard text-mustard-foreground"
                        : "bg-muted text-foreground border border-border/50"
                    )}
                  >
                    {rank}º
                  </span>
                </div>

                {/* Name + score */}
                <div className="min-w-0 flex-1">
                  <p className="font-display truncate text-sm uppercase text-card-foreground">
                    {team.name}
                  </p>
                  <p className="font-retro text-lg font-bold leading-tight text-secondary">
                    {team.score.toLocaleString("pt-BR")}
                    <span className="ml-1 text-[10px] font-medium tracking-wider text-card-foreground/50">
                      PTS
                    </span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
