import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { PLANETS } from "@/data/game";
import { SpaceBackground } from "@/components/dashboard/SpaceBackground";
import { CanvasInteraction } from "@/components/challenge/CanvasInteraction";
import { TextInteraction } from "@/components/challenge/TextInteraction";
import { MediaInteraction } from "@/components/challenge/MediaInteraction";
import { ImageInteraction } from "@/components/challenge/ImageInteraction";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export type InteractionType = "text" | "media" | "canvas" | "image";

const Challenge = () => {
  const { planetId } = useParams();
  const navigate = useNavigate();
  const planet = PLANETS.find((p) => p.id === planetId) || PLANETS[0];
  
  // For prototyping, we allow toggling the interaction type.
  const [interactionType, setInteractionType] = useState<InteractionType>("text");
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simple scroll-to-top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Por favor, adicione um título para o seu desafio!");
      return;
    }
    setIsSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      // For now, redirect to dashboard manually. Later this will go to Gallery.
      navigate("/");
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-background">
      {/* Decorative Background */}
      <div className="fixed inset-0 z-0">
        <SpaceBackground />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 mx-auto max-w-4xl px-4 py-8 sm:px-8">
        
        {/* Header Block */}
        <header className="mb-8 flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="rounded-full bg-background/20 text-foreground backdrop-blur-md hover:bg-background/40"
            size="icon"
            onClick={() => navigate("/")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <img 
               src={planet.image} 
               alt={planet.name} 
               className="h-10 w-10 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" 
            />
            <div>
              <span className="font-display text-[10px] tracking-widest text-primary">PLANETA ATUAL</span>
              <h1 className="font-display text-xl uppercase tracking-wider text-foreground">{planet.name}</h1>
            </div>
          </div>
        </header>

        {/* Challenge Description Card */}
        <div className="mb-8 rounded-xl border border-border/50 bg-card/80 p-6 shadow-xl backdrop-blur-md">
          <h2 className="mb-2 text-2xl font-bold">O Chamado da Missão</h2>
          <p className="mb-4 text-muted-foreground">
            Descreva como você encararia um desafio imprevisto e conecte suas experiências passadas 
            à emoção deste Planeta. É o momento de externalizar aquilo que geralmente guardamos apenas 
            na mente. Como a energia de {planet.name} afeta sua perspectiva hoje?
          </p>
          <div className="rounded-lg bg-orange-900/20 p-4 border border-orange-500/20 text-sm text-orange-200">
            <strong>Regra Especial:</strong> Você deve responder a esse desafio utilizando a modalidade abaixo. 
            Todas as respostas ficarão visíveis para a votação da tripulação no mural.
          </div>
        </div>

        {/* Challenge Interaction Interface */}
        <div className="mb-6 rounded-xl border border-primary/20 bg-background/90 p-6 shadow-2xl backdrop-blur-xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
            <h3 className="font-display text-lg tracking-wider">Sua Resposta</h3>
            
            {/* DEV TOOL: Mode Switcher (para visualização do protótipo) */}
            <div className="flex items-center gap-2 rounded-lg bg-background/50 p-1 font-display text-xs">
              <button onClick={() => setInteractionType('text')} className={`rounded-md px-3 py-1 ${interactionType === 'text' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>Texto</button>
              <button onClick={() => setInteractionType('media')} className={`rounded-md px-3 py-1 ${interactionType === 'media' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>Mídia</button>
              <button onClick={() => setInteractionType('canvas')} className={`rounded-md px-3 py-1 ${interactionType === 'canvas' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>Desenho</button>
              <button onClick={() => setInteractionType('image')} className={`rounded-md px-3 py-1 ${interactionType === 'image' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>Imagem</button>
            </div>
          </div>

          {/* Common Input: Title */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-foreground/80">Título da Resposta</label>
            <input 
              type="text"
              placeholder="Dê um título criativo..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-lg outline-none transition-colors focus:border-primary"
            />
          </div>

          {/* Dynamic Interaction Render */}
          <div className="min-h-[250px]">
            {interactionType === "text" && <TextInteraction />}
            {interactionType === "media" && <MediaInteraction />}
            {interactionType === "canvas" && <CanvasInteraction />}
            {interactionType === "image" && <ImageInteraction />}
          </div>

        </div>

        {/* Submit Actions */}
        <div className="flex justify-end pb-12">
          <Button 
            size="lg" 
            className="w-full sm:w-auto h-14 px-12 text-lg font-bold shadow-[0_4px_14px_0_hsl(var(--primary)/0.39)] transition-transform hover:scale-105"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "ENVIANDO..." : "ENVIAR RESPOSTA"}
          </Button>
        </div>

      </main>

      {/* Fade submission overlay */}
      <div className={`pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000 ${isSubmitting ? "opacity-100" : "opacity-0"}`}>
        <span className="font-display text-sm tracking-[0.4em] text-foreground/60 animate-pulse">TRANSMITINDO DADOS...</span>
      </div>

    </div>
  );
};

export default Challenge;
