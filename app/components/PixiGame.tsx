"use client";

import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

interface PixiGameProps {
  width?: number;
  height?: number;
}

export default function PixiGame({ 
  width = 800, 
  height = 600 
}: PixiGameProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // PixiJS 앱 생성
    const app = new PIXI.Application();
    
    // 초기화
    app.init({
      width,
      height,
      backgroundColor: 0x1099bb,
      antialias: true,
    }).then(() => {
      if (canvasRef.current) {
        canvasRef.current.appendChild(app.canvas);
      }

      // 예시: 회전하는 사각형 추가
      const graphics = new PIXI.Graphics();
      graphics.rect(0, 0, 100, 100);
      graphics.fill(0xff0000);
      graphics.x = width / 2 - 50;
      graphics.y = height / 2 - 50;
      graphics.pivot.set(50, 50);
      app.stage.addChild(graphics);

      // 예시: 텍스트 추가
      const text = new PIXI.Text({
        text: "PixiJS in Next.js!",
        style: {
          fontFamily: "Arial",
          fontSize: 36,
          fill: 0xffffff,
          align: "center",
        },
      });
      text.x = width / 2;
      text.y = 50;
      text.anchor.set(0.5);
      app.stage.addChild(text);

      // 애니메이션
      app.ticker.add(() => {
        graphics.rotation += 0.01;
      });
    });

    appRef.current = app;

    // 클린업
    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
      }
    };
  }, [width, height]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        ref={canvasRef} 
        className="rounded-lg shadow-lg overflow-hidden"
      />
    </div>
  );
}

