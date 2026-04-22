import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eraser, Trash2 } from "lucide-react";

export const CanvasInteraction = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#FFFFFF");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set proper resolution for canvas
    if (canvas.width === 0) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 4;
    }
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) canvas.getContext("2d")?.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.strokeStyle = color;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex animate-in flex-col space-y-4 fade-in slide-in-from-bottom-2 duration-500 min-h-[300px]">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground/80">Lousa Criativa</label>
        <div className="flex gap-2">
          {['#FFFFFF', '#F47E5B', '#3B9B8B', '#F1C40F'].map(c => (
            <button 
              key={c}
              onClick={() => setColor(c)}
              className={`h-6 w-6 rounded-full border-2 ${color === c ? 'border-primary scale-110' : 'border-transparent'}`}
              style={{ backgroundColor: c }}
            />
          ))}
          <div className="ml-4 flex gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setColor("#000000")} title="Borracha">
              <Eraser className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="icon" className="h-8 w-8" onClick={clearCanvas} title="Limpar Tudo">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="relative flex-1 overflow-hidden rounded-lg border border-primary/30 bg-black/60 shadow-inner">
        <canvas
          ref={canvasRef}
          className="h-full w-full touch-none cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchCancel={stopDrawing}
          onTouchMove={draw}
        />
      </div>
    </div>
  );
};
