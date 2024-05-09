
import { useDraw } from "@/global/hooks/drawing";
import { Inter } from "next/font/google";
import { useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D>();

  const [size, setSize] = useState({width:0,height:0});
  const [options, setOptions] = useState<CtxOptions>({
    lineColor:"#000",
    lineWidth:5,
  })

  const {drawing,handleDraw,handleStartDrawing,handleEndDrawing} = useDraw(options,ctxRef.current);


  return (
   <>
   
   </>
  );
}
