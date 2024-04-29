import { useEffect, useState } from 'react'
import { socket } from '../lib/socket';

let moves = [];

export const useDraw = (
  options: CtxOptions,
  ctx?: CanvasRenderingContext2D
) => {
  const [drawing, setDrawing] = useState(false)

  useEffect(() => {
    if (ctx) {
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      ctx.lineWidth = options.lineWidth
      ctx.strokeStyle = options.lineColor
    }
  }, [])

  const handleStartDrawing = (x: number, y: number) => {
    if (!ctx) return

    moves = [[x,y]];
    setDrawing(true);

    ctx.beginPath();
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  const handleEndDrawing = () => {
  if (!ctx) return

  socket.emit("draw",moves,options);

  setDrawing(false);

  ctx.closePath();

  }
}
