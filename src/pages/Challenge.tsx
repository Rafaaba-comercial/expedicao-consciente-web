import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TEAMS } from "@/data/game";
import { cn } from "@/lib/utils";
import { 
  Settings, Brush, Eraser, PenTool, 
  SlidersHorizontal, PaintBucket, Crop, Undo2, Redo2, 
  ArrowDown, HelpCircle, Palette
} from "lucide-react";

const Challenge = () => {
  const { planetId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const uniqueScores = Array.from(new Set(TEAMS.map((t) => t.score))).sort((a, b) => b - a);

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-[#F5EFE6] text-slate-800 p-4 lg:p-8">
      {/* Background Dot Grid */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" 
        style={{
          backgroundImage: "linear-gradient(to right, #d1c8b8 1px, transparent 1px), linear-gradient(to bottom, #d1c8b8 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />
      <div className="absolute inset-0 grain opacity-20 pointer-events-none" />

      {/* Main Layout Container */}
      <div className="relative z-10 flex h-full w-full gap-6">
        
        {/* LEFT PANEL (Ferramentas) */}
        <aside className="relative flex w-[320px] shrink-0 flex-col rounded-[2.5rem] bg-[#111827] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-[#1e293b] overflow-hidden">
          {/* Subtle noise/texture */}
          <div className="absolute inset-0 grain opacity-10 pointer-events-none mix-blend-overlay" />
          
          <div className="flex-1 p-6 flex flex-col gap-8 relative z-10">
            {/* Tool Grid */}
            <div className="grid grid-cols-3 gap-y-8 gap-x-4 border-b-2 border-slate-700/50 pb-8">
              {[Palette, Eraser, PenTool, SlidersHorizontal, PaintBucket, Crop].map((Icon, i) => (
                <button key={i} className="flex justify-center text-[#d1c8b8] hover:text-white hover:scale-110 transition-all">
                  <Icon size={32} strokeWidth={1.5} />
                </button>
              ))}
            </div>

            {/* Undo / Color / Redo */}
            <div className="flex items-center justify-between px-2">
              <button className="text-[#d1c8b8] hover:text-white hover:-translate-x-1 transition-all"><Undo2 size={32} /></button>
              <div className="h-20 w-20 rounded-xl shadow-inner border-2 border-slate-700" style={{ background: "conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)" }}>
                {/* Center dot */}
                <div className="h-full w-full flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-black/50" />
                </div>
              </div>
              <button className="text-[#d1c8b8] hover:text-white hover:translate-x-1 transition-all"><Redo2 size={32} /></button>
            </div>

            {/* Color Palette */}
            <div className="mt-4 flex flex-col gap-4 items-center">
              <div className="flex gap-4">
                <button className="h-10 w-10 rounded-full bg-[#F5EFE6] shadow-inner border-2 border-slate-600 hover:scale-110 transition-transform" />
                <button className="h-10 w-10 rounded-full bg-[#111827] shadow-inner border-2 border-slate-600 hover:scale-110 transition-transform" />
              </div>
              <div className="grid grid-cols-5 gap-3">
                {['#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef', '#facc15', '#f97316', '#ef4444', '#f43f5e', '#ec4899'].map((c, i) => (
                  <button key={i} className="h-8 w-8 rounded-full shadow-inner border border-slate-600/50 hover:scale-110 transition-transform" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action Area (Stripes + Buttons) */}
          <div 
            className="relative h-[220px] w-full border-t-4 border-[#1e293b]"
            style={{
              background: "repeating-linear-gradient(45deg, #111827, #111827 20px, #facc15 20px, #facc15 40px)"
            }}
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <button className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-[#ef4444] border-4 border-[#991b1b] shadow-[0_5px_15px_rgba(0,0,0,0.5)] hover:bg-[#dc2626] active:translate-y-1 transition-all">
                <ArrowDown size={32} className="text-white drop-shadow-md group-hover:animate-bounce" />
              </button>
              
              <button className="rounded-xl border-4 border-[#1e293b] bg-[#111827] px-8 py-3 font-display text-xl tracking-[0.2em] text-white shadow-[0_5px_15px_rgba(0,0,0,0.5)] hover:bg-[#1e293b] active:translate-y-1 transition-all">
                ENVIAR
              </button>
            </div>
          </div>

          {/* Help button overlayed on the top right edge of the left panel */}
          <button className="absolute -right-6 top-6 z-30 flex h-16 w-16 items-center justify-center rounded-full bg-[#ef4444] border-4 border-[#1e293b] shadow-xl hover:scale-110 transition-transform text-white">
            <HelpCircle size={32} className="fill-white text-[#ef4444]" />
          </button>
        </aside>

        {/* CENTER AREA */}
        <main className="flex-1 flex flex-col items-center pt-8 relative">
          
          {/* Logo Title */}
          <div className="flex flex-col items-center mb-12 drop-shadow-xl relative">
            <h1 className="font-display text-5xl md:text-6xl text-[#FF4500] tracking-wider relative z-10" style={{ textShadow: "4px 4px 0px #1e293b" }}>
              DESAFIO DE
            </h1>
            <div className="flex items-center gap-4 -mt-2">
              <h1 className="font-display text-6xl md:text-7xl text-[#00E5FF] tracking-widest relative z-10" style={{ textShadow: "4px 4px 0px #1e293b" }}>
                CRIATIVIDADE
              </h1>
              <Brush size={56} className="text-[#facc15] -rotate-12 drop-shadow-[2px_2px_0px_#1e293b]" strokeWidth={2.5} />
            </div>
          </div>

          {/* Text Box */}
          <div className="w-full max-w-2xl rounded-3xl bg-white/70 backdrop-blur-md p-8 shadow-2xl border-2 border-white/50 text-slate-800">
            <p className="mb-8 text-center font-bold text-xl leading-relaxed">
              Desenhe algo que represente um limite que você precisa atravessar neste momento da sua vida.
            </p>
            
            <div className="mb-8 rounded-2xl border border-dashed border-slate-300 bg-white/50 p-6">
              <h4 className="mb-4 font-display text-sm uppercase tracking-widest text-slate-500">Regras</h4>
              <ul className="space-y-4 font-medium text-lg">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-2xl text-[#FF4500]">✦</span>
                  <span>Não use palavras, apenas formas, símbolos ou traços.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-2xl text-[#FF4500]">✦</span>
                  <span>Não tente "fazer bonito".</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-2xl text-[#FF4500]">✦</span>
                  <span>Confie no gesto, não no controle.</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 border-t-2 border-slate-200/60 pt-6">
              <span className="font-display text-xs uppercase tracking-widest text-slate-500">Avaliação:</span>
              <span className="font-bold text-slate-700">profundidade simbólica</span>
              <span className="text-[#FF4500]">•</span>
              <span className="font-bold text-slate-700">criatividade</span>
              <span className="text-[#FF4500]">•</span>
              <span className="font-bold text-slate-700">coerência emocional</span>
              <span className="text-[#FF4500]">•</span>
              <span className="font-bold text-slate-700">ousadia expressiva</span>
            </div>
          </div>

          {/* Start Button */}
          <button className="mt-12 rounded-full border-4 border-[#1e293b] bg-[#111827] px-16 py-5 font-display text-3xl tracking-[0.2em] text-white shadow-[0_15px_30px_rgba(0,0,0,0.3)] transition-all hover:scale-105 hover:bg-[#FF4500] hover:border-[#991b1b]">
            COMEÇAR
          </button>
          
          {/* Progress Bar (Bottom Center) */}
          <div className="absolute bottom-0 left-0 right-0 h-16 rounded-t-3xl border-t-4 border-l-4 border-r-4 border-[#1e293b] bg-[#111827] shadow-[0_-10px_30px_rgba(0,0,0,0.2)] px-8 flex items-center justify-center">
             <div className="w-full max-w-lg h-5 rounded-full border-2 border-white/10 bg-black/80 p-[2px]">
                <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-[#00E5FF] to-[#FF4500] shadow-[0_0_15px_rgba(255,69,0,0.5)]" />
             </div>
          </div>
        </main>

        {/* RIGHT PANEL (Status / Placar) */}
        <aside className="relative flex w-[320px] shrink-0 flex-col gap-6">
          
          {/* Top Timer Panel */}
          <div className="relative flex h-[180px] w-full flex-col items-center justify-center rounded-[2.5rem] border-4 border-[#1e293b] bg-[#111827] shadow-2xl overflow-hidden">
            <div className="absolute inset-0 grain opacity-10 pointer-events-none mix-blend-overlay" />
            
            {/* Gear Icon */}
            <div className="absolute -bottom-4 -right-4 text-slate-500 opacity-50">
              <Settings size={120} strokeWidth={1} />
            </div>

            {/* Timer Screen */}
            <div className="relative z-10 flex h-24 w-48 items-center justify-center rounded-2xl border-2 border-slate-700 bg-[#0B1021] shadow-inner">
              <span className="font-display text-5xl tracking-widest text-[#FF4500] drop-shadow-[0_0_12px_rgba(255,69,0,0.8)]">
                0:29
              </span>
            </div>
            
            {/* ON/OFF Switches */}
            <div className="absolute bottom-4 left-6 flex gap-2">
              <div className="flex h-8 w-14 items-center justify-center rounded-full border-2 border-slate-700 bg-[#ef4444] shadow-inner">
                <span className="font-display text-[10px] text-white">ON</span>
              </div>
              <div className="flex h-8 w-14 items-center justify-center rounded-full border-2 border-slate-700 bg-[#facc15] shadow-inner">
                <span className="font-display text-[10px] text-slate-900">OFF</span>
              </div>
            </div>
          </div>

          {/* Bottom Scoreboard Panel */}
          <div className="relative flex flex-1 w-full flex-col rounded-[2.5rem] border-4 border-[#1e293b] bg-[#111827] shadow-2xl p-6 overflow-hidden">
            <div className="absolute inset-0 grain opacity-10 pointer-events-none mix-blend-overlay" />
            
            <h3 className="mb-6 font-display text-center text-lg tracking-widest text-slate-400 border-b-2 border-slate-700 pb-2">
              TRIPULAÇÃO
            </h3>

            <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-2 relative z-10">
              {TEAMS.map((team) => {
                const rank = uniqueScores.indexOf(team.score) + 1;
                return (
                  <div key={team.id} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-3 transition-colors hover:bg-white/10">
                    <div className="relative shrink-0">
                      <img src={team.avatar} alt={team.name} className="h-12 w-12 rounded-full border-2 border-white/20 bg-black object-cover" />
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#00E5FF] text-[10px] font-bold text-[#111827] shadow-md">
                        {rank}º
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-xs uppercase leading-none text-white/90 mb-1">
                        {team.name}
                      </p>
                      <p className="font-retro text-sm font-bold text-[#00E5FF]">
                        {team.score.toLocaleString("pt-BR")} <span className="text-[10px] opacity-60">PTS</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
};

export default Challenge;
