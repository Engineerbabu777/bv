import { useEffect, useState } from 'react'

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
}
