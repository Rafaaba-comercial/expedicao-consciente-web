import { useState } from "react";

export const TextInteraction = () => {
  const [content, setContent] = useState("");

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <label className="mb-2 block text-sm font-medium text-foreground/80">Sua Reflexão (Texto)</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escreva sua resposta para o desafio aqui..."
        className="h-48 w-full resize-none rounded-lg border border-input bg-background/50 p-4 leading-relaxed outline-none transition-colors focus:border-primary"
      />
      <div className="mt-2 text-right text-xs text-muted-foreground">
        {content.length} caracteres
      </div>
    </div>
  );
};
