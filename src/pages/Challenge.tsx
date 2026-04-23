import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TEAMS } from "@/data/game";
import { cn } from "@/lib/utils";

import TelaCriatividadeImg from "@/assets/desafio-criatividade/Tela Criatividade.png";

const Challenge = () => {
  const { planetId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const uniqueScores = Array.from(new Set(TEAMS.map((t) => t.score))).sort((a, b) => b - a);

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-[#F5EFE6] flex items-center justify-center">
      
      {/* Container que mantém o aspect ratio da imagem original (2752 x 1318) */}
      <div 
        className="relative w-full max-w-[1920px] shadow-2xl" 
        style={{ 
          aspectRatio: "2752/1318", 
          backgroundImage: `url("${TelaCriatividadeImg}")`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        
        {/* TIMER TEXT */}
        <div className="absolute top-[13.5%] right-[7%] w-[12%] flex justify-center items-center font-display text-[#FF4500] text-[4vw] xl:text-[4.5rem] tracking-widest drop-shadow-[0_0_15px_rgba(255,69,0,0.8)]">
          0:29
        </div>

        {/* ÁREA CENTRAL DE TEXTO (Abaixo do logo, dentro da caixa branca) */}
        {/* Título Principal */}
        <div className="absolute top-[40%] left-[28%] w-[44%] text-center px-4">
          <p className="font-bold text-[1.4vw] xl:text-[22px] leading-relaxed text-slate-800">
            Desenhe algo que represente um limite que você precisa atravessar neste momento da sua vida.
          </p>
        </div>

        {/* Regras */}
        <div className="absolute top-[56%] left-[29%] w-[42%] text-slate-800">
          <ul className="list-none space-y-[1.5vh] font-medium text-[1.1vw] xl:text-[18px]">
            <li className="flex items-start gap-3">
              <span className="text-[#FF4500] mt-1 text-[1.2vw] xl:text-[20px]">✦</span>
              <span>Não use palavras, apenas formas, símbolos ou traços.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#FF4500] mt-1 text-[1.2vw] xl:text-[20px]">✦</span>
              <span>Não tente "fazer bonito".</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#FF4500] mt-1 text-[1.2vw] xl:text-[20px]">✦</span>
              <span>Confie no gesto, não no controle.</span>
            </li>
          </ul>
        </div>

        {/* Avaliação */}
        <div className="absolute top-[75%] left-[28%] w-[44%] border-t-2 border-slate-200 pt-4 flex items-center justify-center gap-2 flex-wrap">
          <span className="font-display uppercase text-[0.8vw] xl:text-[12px] tracking-widest opacity-60 text-slate-900">Avaliação:</span>
          <span className="text-[1vw] xl:text-[14px] font-bold text-slate-700">profundidade simbólica</span>
          <span className="text-[#FF4500]">•</span>
          <span className="text-[1vw] xl:text-[14px] font-bold text-slate-700">criatividade</span>
          <span className="text-[#FF4500]">•</span>
          <span className="text-[1vw] xl:text-[14px] font-bold text-slate-700">coerência emocional</span>
          <span className="text-[#FF4500]">•</span>
          <span className="text-[1vw] xl:text-[14px] font-bold text-slate-700">ousadia expressiva</span>
        </div>

        {/* Botão COMEÇAR */}
        <div className="absolute top-[85%] left-[28%] w-[44%] flex justify-center">
          <button 
            className="px-[3vw] py-[1vh] xl:px-14 xl:py-4 bg-[#1B233A] text-white font-display text-[1.5vw] xl:text-xl tracking-[0.2em] rounded-full shadow-[0_8px_30px_rgba(27,35,58,0.6)] border-2 border-slate-600 hover:scale-105 hover:bg-[#FF4500] hover:border-[#FF4500] transition-all duration-300"
          >
            COMEÇAR
          </button>
        </div>

        {/* LISTA DE JOGADORES DITOS PELO REACT (Cobre a lista estática da imagem) */}
        {/* A caixa na imagem vai de top 40% a 92%, right 4% a 20%. Ajustando com container flex. */}
        <div className="absolute top-[39%] right-[4%] bottom-[5%] w-[15.5%] flex flex-col justify-start gap-[1.5vh] overflow-hidden py-4 px-2 bg-[#2a3b5c]/80 backdrop-blur-md rounded-2xl border border-white/10 z-10">
          {TEAMS.map((team) => {
            const rank = uniqueScores.indexOf(team.score) + 1;
            return (
              <div key={team.id} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors p-[1vh] rounded-xl border border-white/10 relative">
                <div className="relative shrink-0">
                  <img src={team.avatar} alt={team.name} className="h-[2.5vw] w-[2.5vw] xl:h-10 xl:w-10 rounded-full border-2 border-white/20 object-cover bg-black" />
                  <span className="absolute -right-2 -top-1 flex h-[1.2vw] w-[1.2vw] xl:h-5 xl:w-5 items-center justify-center rounded-full bg-cyan-500 text-[0.6vw] xl:text-[10px] font-bold text-white shadow-md">
                    {rank}º
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display truncate text-[0.8vw] xl:text-xs uppercase text-white/90 leading-none mb-1">
                    {team.name}
                  </p>
                  <p className="font-retro text-[1vw] xl:text-sm font-bold text-cyan-300">
                    {team.score.toLocaleString("pt-BR")} <span className="text-[0.6vw] xl:text-[10px] opacity-60">PTS</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Challenge;
