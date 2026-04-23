import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PLANETS, TEAMS } from "@/data/game";
import { cn } from "@/lib/utils";

// Importando os assets exportados pelo usuário
import FerramentasImg from "@/assets/desafio-criatividade/Ferramentas.png";
import FundoTimerImg from "@/assets/desafio-criatividade/fundo timer e configurações.png";
import PlacarImg from "@/assets/desafio-criatividade/Placar.png";
import FundoEnviarImg from "@/assets/desafio-criatividade/Fundo botão enviar.png";
import BotaoEnviarImg from "@/assets/desafio-criatividade/Botão enviar.png";
import SetaVermelhaImg from "@/assets/desafio-criatividade/Seta fundo vermelho.png";
import FundoRegrasLogoImg from "@/assets/desafio-criatividade/Fundo regras e logo.png";
import BotaoRegrasImg from "@/assets/desafio-criatividade/Botão regras.png";
import BotaoConfiguracoesImg from "@/assets/desafio-criatividade/Botão configurações.png";

const Challenge = () => {
  const { planetId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lógica de placar idêntica a do TeamPanel
  const uniqueScores = Array.from(new Set(TEAMS.map((t) => t.score))).sort((a, b) => b - a);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#F5EFE6] text-slate-800">
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-multiply" 
        style={{
          backgroundImage: "linear-gradient(to right, #d1c8b8 1px, transparent 1px), linear-gradient(to bottom, #d1c8b8 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />
      <div className="absolute inset-0 grain opacity-20 pointer-events-none" />

      {/* Botão de Regras Superior Esquerdo */}
      <div className="absolute top-10 left-[380px] z-30">
        <img 
          src={BotaoRegrasImg} 
          alt="Regras" 
          className="w-[80px] hover:scale-110 cursor-pointer transition-transform drop-shadow-xl" 
        />
      </div>

      {/* Painel Esquerdo: Ferramentas e Enviar */}
      <div className="absolute top-0 left-0 h-full w-[380px] z-20 flex flex-col pointer-events-none justify-between">
        <div className="relative w-full pointer-events-auto">
          <img src={FerramentasImg} alt="Ferramentas" className="w-[110%] max-w-none object-contain object-left-top drop-shadow-2xl" />
        </div>
        
        <div className="relative w-[130%] -ml-[5%] mb-[-5%] pointer-events-auto mt-auto">
          <img src={FundoEnviarImg} alt="Fundo Enviar" className="w-full object-contain object-bottom drop-shadow-2xl" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-[15%] pl-[10%]">
            <button className="hover:scale-110 transition-transform active:scale-95 mb-4 group relative">
              <div className="absolute inset-0 rounded-full bg-red-500/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src={SetaVermelhaImg} alt="Baixar/Ação" className="w-[80px] relative z-10 drop-shadow-lg" />
            </button>
            <button className="hover:scale-105 transition-transform active:scale-95 group relative">
              <div className="absolute inset-0 bg-orange-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src={BotaoEnviarImg} alt="Enviar" className="w-[180px] relative z-10 drop-shadow-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Painel Direito: Timer, Config e Placar */}
      <div className="absolute top-0 right-0 h-full w-[350px] z-20 flex flex-col items-end pointer-events-none justify-between">
        <div className="relative w-[110%] pointer-events-auto">
          <img src={FundoTimerImg} alt="Timer Panel" className="w-full object-contain object-right-top drop-shadow-2xl" />
          {/* O display do timer (a posição pode precisar de ajuste dependendo do corte exato da imagem) */}
          <div className="absolute top-[35%] right-[15%] font-display text-5xl tracking-widest text-[#FF4500] drop-shadow-[0_0_12px_rgba(255,69,0,0.8)]">
            0:29
          </div>
          <button className="absolute bottom-[5%] right-[15%] hover:scale-105 transition-transform">
            <img src={BotaoConfiguracoesImg} alt="Configurações ON/OFF" className="w-[100px] drop-shadow-lg" />
          </button>
        </div>
        
        <div className="relative w-[100%] mb-[5%] pointer-events-auto mt-auto">
          <img src={PlacarImg} alt="Placar" className="w-full object-contain object-right-bottom drop-shadow-2xl" />
          
          {/* Lista de Tripulação do Placar */}
          <div className="absolute top-[20%] bottom-[10%] left-[20%] right-[10%] flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
            {TEAMS.map((team) => {
              const rank = uniqueScores.indexOf(team.score) + 1;
              return (
                <div key={team.id} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors p-2 rounded-lg border border-white/10 backdrop-blur-sm">
                  <div className="relative shrink-0">
                    <img src={team.avatar} alt={team.name} className="h-8 w-8 rounded-full border border-white/20 object-cover" />
                    <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500/80 text-[8px] font-bold text-white shadow-md">
                      {rank}º
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display truncate text-[10px] uppercase text-white/90 leading-none">
                      {team.name}
                    </p>
                    <p className="font-retro text-xs font-bold text-cyan-300">
                      {team.score.toLocaleString("pt-BR")} <span className="text-[8px] opacity-60">PTS</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Barra de Progresso Inferior */}
      <div className="absolute bottom-0 left-[380px] right-[350px] h-[70px] bg-[#1B233A] border-t-4 border-l-4 border-r-4 border-[#2A3B5C] rounded-t-3xl z-10 flex items-center justify-center px-10 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
         <div className="w-full max-w-2xl h-4 bg-black/80 rounded-full overflow-hidden border-2 border-white/10 p-[2px]">
            <div className="h-full w-[65%] bg-gradient-to-r from-[#00E5FF] to-[#FF4500] rounded-full shadow-[0_0_10px_rgba(255,69,0,0.5)]" />
         </div>
      </div>

      {/* Área Central: Logo, Texto e Botão */}
      <div className="relative z-0 h-full w-full flex flex-col items-center justify-center pt-4 px-[400px]">
        {/* Título animado exportado */}
        <img 
          src={FundoRegrasLogoImg} 
          alt="Desafio de Criatividade" 
          className="w-[450px] object-contain mb-6 drop-shadow-xl hover:scale-105 transition-transform duration-700" 
        />
        
        {/* Texto descritivo */}
        <div className="text-center font-retro text-base text-slate-800 max-w-2xl bg-white/60 p-8 rounded-2xl shadow-lg border border-slate-300/50 backdrop-blur-md mb-8">
          <p className="mb-6 font-bold text-lg leading-relaxed">
            Desenhe algo que represente um limite que você precisa atravessar neste momento da sua vida.
          </p>
          
          <div className="text-left mb-6 bg-slate-100/80 p-5 rounded-xl border border-dashed border-slate-400">
            <h4 className="font-display text-xs uppercase tracking-widest mb-3 opacity-70 text-slate-900">Regras</h4>
            <ul className="list-none space-y-2 font-medium text-slate-800">
              <li className="flex items-start gap-2">
                <span className="text-[#FF4500] mt-1">✦</span>
                <span>Não use palavras, apenas formas, símbolos ou traços.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF4500] mt-1">✦</span>
                <span>Não tente "fazer bonito".</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF4500] mt-1">✦</span>
                <span>Confie no gesto, não no controle.</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-300 flex items-center justify-center gap-2 flex-wrap">
            <span className="font-display uppercase text-[9px] tracking-widest opacity-60">Avaliação:</span>
            <span className="text-xs font-bold text-slate-700">profundidade simbólica</span>
            <span className="text-[#FF4500]">•</span>
            <span className="text-xs font-bold text-slate-700">criatividade</span>
            <span className="text-[#FF4500]">•</span>
            <span className="text-xs font-bold text-slate-700">coerência emocional</span>
            <span className="text-[#FF4500]">•</span>
            <span className="text-xs font-bold text-slate-700">ousadia expressiva</span>
          </div>
        </div>

        {/* Botão Começar */}
        <button 
          className="px-14 py-4 bg-[#1B233A] text-white font-display text-xl tracking-[0.2em] rounded-full shadow-[0_8px_30px_rgba(27,35,58,0.6)] border-2 border-slate-600 hover:scale-105 hover:bg-[#FF4500] hover:border-[#FF4500] transition-all duration-300"
        >
          COMEÇAR
        </button>
      </div>

    </div>
  );
};

export default Challenge;
