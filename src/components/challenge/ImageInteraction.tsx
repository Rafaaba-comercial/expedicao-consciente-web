import { ImagePlus } from "lucide-react";
import { useState } from "react";

export const ImageInteraction = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div className="flex animate-in flex-col items-center justify-center space-y-4 fade-in slide-in-from-bottom-2 duration-500 min-h-[250px] w-full">
      {!preview ? (
        <label className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/10 transition-colors hover:border-primary/50 hover:bg-muted/20">
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <div className="mb-4 rounded-full bg-primary/20 p-4">
              <ImagePlus className="h-8 w-8 text-primary" />
            </div>
            <p className="mb-2 text-sm font-semibold text-foreground/80">Clique para enviar uma foto do dispositivo</p>
            <p className="text-xs text-muted-foreground">PNG, JPG ou GIF (Max. 5MB)</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      ) : (
        <div className="relative h-48 w-full overflow-hidden rounded-xl border border-primary/30">
          <img src={preview} alt="Preview" className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-center backdrop-blur-sm">
            <label className="cursor-pointer text-xs font-semibold text-white hover:underline">
              Trocar imagem
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
