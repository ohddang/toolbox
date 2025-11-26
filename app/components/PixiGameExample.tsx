"use client";

import { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";

interface Bunny {
  sprite: PIXI.Sprite;
  speedX: number;
  speedY: number;
}

export default function PixiGameExample() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const bunniesRef = useRef<Bunny[]>([]);
  const [bunnyCount, setBunnyCount] = useState(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const app = new PIXI.Application();
    
    app.init({
      width: 800,
      height: 600,
      backgroundColor: 0x2c3e50,
      antialias: true,
    }).then(async () => {
      if (!canvasRef.current) return;
      canvasRef.current.appendChild(app.canvas);

      // 텍스처 로드 (PixiJS 기본 bunny 이미지 사용)
      const texture = await PIXI.Assets.load(
        "https://pixijs.com/assets/bunny.png"
      );

      // 초기 토끼 몇 마리 추가
      for (let i = 0; i < 5; i++) {
        addBunny(app, texture);
      }

      // 애니메이션 루프
      app.ticker.add(() => {
        bunniesRef.current.forEach((bunny) => {
          bunny.sprite.x += bunny.speedX;
          bunny.sprite.y += bunny.speedY;
          bunny.sprite.rotation += 0.1;

          // 벽 충돌 처리
          if (bunny.sprite.x > app.screen.width) {
            bunny.sprite.x = 0;
          } else if (bunny.sprite.x < 0) {
            bunny.sprite.x = app.screen.width;
          }

          if (bunny.sprite.y > app.screen.height) {
            bunny.sprite.y = 0;
          } else if (bunny.sprite.y < 0) {
            bunny.sprite.y = app.screen.height;
          }
        });

        setBunnyCount(bunniesRef.current.length);
      });

      // 클릭으로 토끼 추가
      app.canvas.addEventListener("click", () => {
        addBunny(app, texture);
      });
    });

    appRef.current = app;

    // 클린업
    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        bunniesRef.current = [];
      }
    };
  }, []);

  const addBunny = (app: PIXI.Application, texture: PIXI.Texture) => {
    const bunny = new PIXI.Sprite(texture);
    bunny.anchor.set(0.5);
    bunny.x = Math.random() * app.screen.width;
    bunny.y = Math.random() * app.screen.height;
    bunny.scale.set(0.5 + Math.random() * 0.5);

    const speedX = (Math.random() - 0.5) * 4;
    const speedY = (Math.random() - 0.5) * 4;

    app.stage.addChild(bunny);
    bunniesRef.current.push({ sprite: bunny, speedX, speedY });
  };

  const clearBunnies = () => {
    if (appRef.current) {
      bunniesRef.current.forEach((bunny) => {
        bunny.sprite.destroy();
      });
      bunniesRef.current = [];
      setBunnyCount(0);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4 items-center">
        <div className="text-sm font-medium text-slate-700">
          토끼 개수: <span className="font-bold text-indigo-600">{bunnyCount}</span>
        </div>
        <button
          onClick={clearBunnies}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
        >
          모두 지우기
        </button>
      </div>
      <div 
        ref={canvasRef} 
        className="rounded-lg shadow-lg overflow-hidden cursor-pointer"
      />
      <p className="text-sm text-slate-600">
        클릭하여 토끼 추가하기
      </p>
    </div>
  );
}

