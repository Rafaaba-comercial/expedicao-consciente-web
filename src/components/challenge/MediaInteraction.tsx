import { Mic, Video, Square } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const MediaInteraction = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mode, setMode] = useState<"audio" | "video">("audio");

  return (
    <div className="flex animate-in flex-col items-center justify-center space-y-6 fade-in slide-in-from-bottom-2 duration-500 min-h-[250px]">
      <div className="flex gap-4">
        <Button 
          variant={mode === "audio" ? "default" : "outline"} 
          onClick={() => setMode("audio")}
          className="rounded-full"
        >
          <Mic className="mr-2 h-4 w-4" /> Áudio
        </Button>
        <Button 
          variant={mode === "video" ? "default" : "outline"}
          onClick={() => setMode("video")}
          className="rounded-full"
        >
          <Video className="mr-2 h-4 w-4" /> Vídeo
        </Button>
      </div>

      <div className={`relative flex h-32 w-32 items-center justify-center rounded-full transition-colors ${isRecording ? 'bg-red-500/20' : 'bg-primary/10'}`}>
        <Button
           size="icon"
           className={`h-20 w-20 rounded-full shadow-lg transition-transform ${isRecording ? 'bg-red-500 hover:bg-red-600 scale-110' : 'bg-primary hover:bg-primary/90'} `}
           onClick={() => setIsRecording(!isRecording)}
        >
          {isRecording ? <Square className="h-8 w-8 fill-white" /> : (mode === "audio" ? <Mic className="h-8 w-8" /> : <Video className="h-8 w-8" />)}
        </Button>
        
        {isRecording && (
          <div className="absolute -inset-4 rounded-full border-2 border-red-500/50 animate-ping" />
        )}
      </div>

      <p className="text-sm font-medium text-muted-foreground">
        {isRecording ? "Gravando... Clique no botão para parar." : "Clique no botão acima para iniciar a gravação"}
      </p>
    </div>
  );
};
