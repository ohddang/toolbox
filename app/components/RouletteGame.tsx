"use client";

import { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";

interface RouletteItem {
  id: number;
  name: string;
  weight: number;
  color: number;
}

interface RouletteGameProps {
  locale?: string;
}

const DEFAULT_COLORS = [
  0xff6b6b, 0x4ecdc4, 0xf7b731, 0x5f27cd, 
  0x00d2d3, 0xee5a6f, 0x2bcbba, 0xfd79a8,
  0xff9ff3, 0x54a0ff, 0x48dbfb, 0xff6348
];

export default function RouletteGame({ locale = "ko" }: RouletteGameProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const rouletteContainerRef = useRef<PIXI.Container | null>(null);
  const arrowRef = useRef<PIXI.Graphics | null>(null);
  
  const isKorean = locale === "ko";
  const [items, setItems] = useState<RouletteItem[]>([
    { id: 1, name: isKorean ? "🎁 1등 상품" : "🎁 1st Prize", weight: 10, color: DEFAULT_COLORS[0] },
    { id: 2, name: isKorean ? "🎉 2등 상품" : "🎉 2nd Prize", weight: 20, color: DEFAULT_COLORS[1] },
    { id: 3, name: isKorean ? "🍀 3등 상품" : "🍀 3rd Prize", weight: 30, color: DEFAULT_COLORS[2] },
    { id: 4, name: isKorean ? "💝 참가상" : "💝 Participation", weight: 40, color: DEFAULT_COLORS[3] },
  ]);
  
  const [gameStarted, setGameStarted] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<RouletteItem | null>(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  
  const nextIdRef = useRef(5);
  const animationFrameRef = useRef<number | null>(null);

  // 항목 추가
  const addItem = () => {
    if (items.length >= 12) return;
    
    const newItem: RouletteItem = {
      id: nextIdRef.current++,
      name: isKorean ? `항목 ${items.length + 1}` : `Item ${items.length + 1}`,
      weight: 10,
      color: DEFAULT_COLORS[items.length % DEFAULT_COLORS.length],
    };
    setItems([...items, newItem]);
  };

  // 항목 삭제
  const removeItem = (id: number) => {
    if (items.length <= 2) return;
    setItems(items.filter(item => item.id !== id));
  };

  // 항목 수정
  const updateItem = (id: number, field: 'name' | 'weight', value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // 룰렛 렌더링
  const renderRoulette = () => {
    const app = appRef.current;
    const container = rouletteContainerRef.current;
    if (!app || !container) return;

    container.removeChildren();
    arrowRef.current = null; // 화살표 ref 초기화

    const centerX = 400;
    const centerY = 400;
    const radius = 280;

    // 전체 가중치 합계
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    
    if (totalWeight === 0) return;

    // 배경 원
    const bgCircle = new PIXI.Graphics();
    bgCircle.circle(centerX, centerY, radius + 20);
    bgCircle.fill(0xffffff);
    bgCircle.circle(centerX, centerY, radius + 15);
    bgCircle.fill(0xf0f0f0);
    container.addChild(bgCircle);

    // 섹터 그리기
    // 시작 각도: 12시 방향(-Math.PI/2) + 현재 회전 각도
    let currentAngle = -Math.PI / 2 + currentRotation;

    items.forEach((item) => {
      const angleSize = (item.weight / totalWeight) * Math.PI * 2;
      
      // 섹터
      const sector = new PIXI.Graphics();
      sector.moveTo(centerX, centerY);
      
      const steps = 100;
      for (let i = 0; i <= steps; i++) {
        const angle = currentAngle + (angleSize * i / steps);
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        sector.lineTo(x, y);
      }
      sector.lineTo(centerX, centerY);
      sector.fill(item.color);
      
      // 테두리
      sector.moveTo(centerX, centerY);
      for (let i = 0; i <= steps; i++) {
        const angle = currentAngle + (angleSize * i / steps);
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        sector.lineTo(x, y);
      }
      sector.lineTo(centerX, centerY);
      sector.stroke({ width: 3, color: 0xffffff, alpha: 0.5 });
      
      container.addChild(sector);

      // 텍스트
      const textAngle = currentAngle + angleSize / 2;
      const textRadius = radius * 0.65;
      const textX = centerX + Math.cos(textAngle) * textRadius;
      const textY = centerY + Math.sin(textAngle) * textRadius;

      const text = new PIXI.Text({
        text: item.name,
        style: {
          fontSize: Math.min(24, 300 / items.length),
          fill: 0xffffff,
          fontWeight: "bold",
          align: "center",
          dropShadow: {
            color: 0x000000,
            blur: 4,
            alpha: 0.5,
            distance: 2,
          },
        },
      });
      text.anchor.set(0.5);
      text.x = textX;
      text.y = textY;
      text.rotation = textAngle + Math.PI / 2;
      
      if (text.width > angleSize * radius * 0.8) {
        text.scale.set((angleSize * radius * 0.8) / text.width);
      }
      
      container.addChild(text);

      currentAngle += angleSize;
    });

    // 중앙 원
    const centerCircle = new PIXI.Graphics();
    centerCircle.circle(centerX, centerY, 40);
    centerCircle.fill(0xffffff);
    centerCircle.circle(centerX, centerY, 35);
    centerCircle.fill(0xffd700);
    container.addChild(centerCircle);

    const centerText = new PIXI.Text({
      text: "SPIN",
      style: {
        fontSize: 18,
        fill: 0xffffff,
        fontWeight: "bold",
      },
    });
    centerText.anchor.set(0.5);
    centerText.x = centerX;
    centerText.y = centerY;
    container.addChild(centerText);

    // 화살표 (고정) - 위쪽 12시 방향, 뾰족한 부분만 살짝 원판에 들어감
    const arrow = new PIXI.Graphics();
    
    // 화살표 크기 설정 (뾰족한 부분만 원판에 살짝 들어가도록)
    const arrowTipDepth = 30; // 원판 안으로 들어가는 깊이
    const arrowTipY = centerY - radius + arrowTipDepth; // 원판 가장자리에서 살짝 안쪽
    const arrowBaseY = centerY - radius - 40; // 화살표 밑변
    const arrowWidth = 25; // 화살표 너비
    
    // 화살표 그림자
    const arrowShadow = new PIXI.Graphics();
    arrowShadow.moveTo(centerX, arrowTipY + 3);
    arrowShadow.lineTo(centerX - arrowWidth, arrowBaseY + 3);
    arrowShadow.lineTo(centerX + arrowWidth, arrowBaseY + 3);
    arrowShadow.lineTo(centerX, arrowTipY + 3);
    arrowShadow.fill({ color: 0x000000, alpha: 0.2 });
    container.addChild(arrowShadow);
    
    // 화살표 본체 (외곽선 없이)
    arrow.moveTo(centerX, arrowTipY);
    arrow.lineTo(centerX - arrowWidth, arrowBaseY);
    arrow.lineTo(centerX + arrowWidth, arrowBaseY);
    arrow.lineTo(centerX, arrowTipY);
    arrow.fill(0xff0000);
    
    container.addChild(arrow);
    arrowRef.current = arrow;
    
    // 화살표 표시 텍스트
    const arrowLabel = new PIXI.Text({
      text: "당첨",
      style: {
        fontSize: 16,
        fill: 0xff0000,
        fontWeight: "bold",
        dropShadow: {
          color: 0xffffff,
          blur: 3,
          alpha: 0.9,
          distance: 2,
        },
      },
    });
    arrowLabel.anchor.set(0.5);
    arrowLabel.x = centerX;
    arrowLabel.y = arrowBaseY - 20;
    container.addChild(arrowLabel);
  };

  // 룰렛 돌리기
  const spinRoulette = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    // 랜덤하게 회전 각도만 결정 (당첨은 나중에 계산)
    const spins = 5 + Math.random() * 3; // 5-8바퀴
    const extraRotation = Math.random() * Math.PI * 2; // 0 ~ 2π 랜덤
    const finalRotation = spins * Math.PI * 2 + extraRotation;
    
    console.log("🔄 회전 시작! 각도:", finalRotation, "라디안 | 바퀴수:", finalRotation / (Math.PI * 2));
    
    // 회전 시작 (당첨 항목은 회전 완료 후 계산)
    startSpinAnimation(finalRotation);
  };

  // 회전 완료 후 당첨 항목 찾기
  const findWinningItem = (finalRotation: number): RouletteItem => {
    // 화살표는 12시 방향 = -Math.PI/2
    const arrowAngle = -Math.PI / 2;
    
    // 각 섹터를 확인하며 화살표가 가리키는 섹터 찾기
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    let sectorStartAngle = -Math.PI / 2; // 12시 방향부터 시작
    
    console.log("🎯 당첨 찾기 시작!");
    
    for (const item of items) {
      const angleSize = (item.weight / totalWeight) * Math.PI * 2;
      const sectorEndAngle = sectorStartAngle + angleSize;
      
      // 회전 후 이 섹터의 위치
      let rotatedStart = (sectorStartAngle + finalRotation) % (Math.PI * 2);
      let rotatedEnd = (sectorEndAngle + finalRotation) % (Math.PI * 2);
      
      // 음수 각도를 양수로 변환
      if (rotatedStart < 0) rotatedStart += Math.PI * 2;
      if (rotatedEnd < 0) rotatedEnd += Math.PI * 2;
      
      // 화살표 각도도 양수로 변환
      let normalizedArrow = arrowAngle;
      if (normalizedArrow < 0) normalizedArrow += Math.PI * 2;
      
      console.log(`  섹터 "${item.name}": 시작=${rotatedStart.toFixed(3)}, 끝=${rotatedEnd.toFixed(3)}, 화살표=${normalizedArrow.toFixed(3)}`);
      
      // 화살표가 이 섹터 범위 안에 있는지 확인
      let isInSector = false;
      if (rotatedStart <= rotatedEnd) {
        // 일반적인 경우
        isInSector = normalizedArrow >= rotatedStart && normalizedArrow <= rotatedEnd;
      } else {
        // 2π를 넘어가는 경우 (0을 지나는 경우)
        isInSector = normalizedArrow >= rotatedStart || normalizedArrow <= rotatedEnd;
      }
      
      if (isInSector) {
        console.log(`✅ 당첨! "${item.name}"`);
        return item;
      }
      
      sectorStartAngle += angleSize;
    }
    
    // 만약 못 찾으면 첫 번째 항목 반환 (안전장치)
    console.warn("⚠️ 당첨 섹터를 찾지 못했습니다. 첫 번째 항목 반환");
    return items[0];
  };

  // 회전 애니메이션 실행
  const startSpinAnimation = (finalRotation: number) => {
    const duration = 4000;
    const startTime = Date.now();
    const startRotation = currentRotation; // 현재 위치에서 시작

    const spinAnimate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      
      // 현재 위치에서 추가 회전
      const newRotation = startRotation + finalRotation * eased;
      setCurrentRotation(newRotation);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(spinAnimate);
      } else {
        animationFrameRef.current = null;
        const totalRotation = startRotation + finalRotation;
        console.log("🎉 회전 완료! 최종 각도:", totalRotation);
        
        // 최종 회전 각도 유지
        setCurrentRotation(totalRotation);
        
        // 회전 완료 후 당첨 항목 찾기
        const winningItem = findWinningItem(totalRotation);
        setResult(winningItem);
        setIsSpinning(false);
      }
    };

    animationFrameRef.current = requestAnimationFrame(spinAnimate);
  };

  // 게임 시작
  const startGame = () => {
    if (items.length < 2) return;
    setGameStarted(true);
    setResult(null);
    setCurrentRotation(0);
  };

  // PixiJS 초기화
  useEffect(() => {
    if (!canvasRef.current || appRef.current) return;

    const app = new PIXI.Application();

    app
      .init({
        width: 800,
        height: 800,
        backgroundColor: 0xfff5eb,
        antialias: true,
      })
      .then(() => {
        if (canvasRef.current && !appRef.current) {
          canvasRef.current.appendChild(app.canvas);
          appRef.current = app;
          
          const container = new PIXI.Container();
          app.stage.addChild(container);
          rouletteContainerRef.current = container;
        }
      });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (appRef.current) {
        const canvas = appRef.current.canvas;
        if (canvas?.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
        appRef.current.destroy(true);
        appRef.current = null;
        rouletteContainerRef.current = null;
        arrowRef.current = null;
      }
    };
  }, []);

  // 룰렛 렌더링
  useEffect(() => {
    if (!gameStarted || !appRef.current || !rouletteContainerRef.current) return;
    renderRoulette();
  }, [gameStarted, items, currentRotation]);

  return (
    <div className="flex flex-col items-center gap-6 p-4 w-full max-w-full overflow-x-auto">
      {/* PixiJS 캔버스 */}
      <div 
        ref={canvasRef} 
        className={gameStarted ? "rounded-3xl shadow-2xl border-4 border-orange-100 scale-[0.6] sm:scale-[0.8] md:scale-100 origin-top" : "hidden"}
      />
      
      {!gameStarted ? (
        <div className="w-full max-w-2xl space-y-6">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="block text-sm font-bold text-slate-700">
                {isKorean ? "룰렛 항목" : "Roulette Items"} ({items.length}/12)
              </label>
              <button
                onClick={addItem}
                disabled={items.length >= 12}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                  items.length >= 12
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md hover:scale-105"
                }`}
              >
                ➕ {isKorean ? "항목 추가" : "Add Item"}
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: `#${item.color.toString(16).padStart(6, '0')}` }}
                  />
                  
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    placeholder={isKorean ? `항목 ${idx + 1}` : `Item ${idx + 1}`}
                    className="flex-1 rounded-xl border-2 border-blue-100 bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"
                  />
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600 whitespace-nowrap">
                      {isKorean ? "가중치:" : "Weight:"}
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={item.weight}
                      onChange={(e) => updateItem(item.id, 'weight', Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 rounded-lg border-2 border-orange-100 bg-white px-3 py-2 text-sm font-medium text-slate-900 focus:border-orange-400 focus:outline-none"
                    />
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={items.length <= 2}
                    className={`rounded-full p-2 transition-all ${
                      items.length <= 2
                        ? "text-slate-300 cursor-not-allowed"
                        : "text-red-500 hover:bg-red-50 hover:scale-110"
                    }`}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl bg-blue-50 p-4 border-2 border-blue-100">
              <div className="text-sm font-bold text-blue-700 mb-2">
                💡 {isKorean ? "가중치 설명" : "Weight Info"}
              </div>
              <p className="text-sm text-blue-600">
                {isKorean 
                  ? "가중치가 높을수록 당첨 확률이 높아집니다. 예: 가중치 20은 가중치 10보다 2배 확률"
                  : "Higher weight = higher probability. Example: weight 20 is 2x more likely than weight 10"}
              </p>
              <div className="mt-2 text-xs text-blue-500">
                {isKorean ? "전체 가중치 합계:" : "Total Weight:"} <span className="font-bold">{items.reduce((sum, item) => sum + item.weight, 0)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={startGame}
            disabled={items.length < 2}
            className={`w-full rounded-full py-4 text-lg font-bold text-white shadow-lg transition-all ${
              items.length < 2
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-pink-500 hover:scale-105"
            }`}
          >
            {isKorean ? "🎰 룰렛 시작하기" : "🎰 Start Roulette"}
          </button>
        </div>
      ) : (
        <>
          <div className="relative mb-8">
            {result && (
              <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 z-10 rounded-3xl bg-white/95 px-16 py-8 shadow-2xl border-4 border-yellow-400 min-w-[400px] max-w-[600px] animate-bounce">
                <div className="text-center">
                  <div className="text-5xl mb-3">🎊</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {isKorean ? "당첨!" : "Winner!"}
                  </div>
                  <div className="text-2xl font-bold text-slate-800 break-words px-4">
                    {result.name}
                  </div>
                  <div 
                    className="mt-4 w-12 h-12 mx-auto rounded-full border-4 border-white shadow-lg"
                    style={{ backgroundColor: `#${result.color.toString(16).padStart(6, '0')}` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={spinRoulette}
              disabled={isSpinning}
              className={`rounded-full px-16 py-6 text-2xl font-bold text-white shadow-2xl transition-all ${
                isSpinning
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-110 animate-pulse"
              }`}
            >
              {isSpinning 
                ? (isKorean ? "🎲 회전 중..." : "🎲 Spinning...") 
                : (isKorean ? "🎲 룰렛 돌리기!" : "🎲 Spin the Wheel!")}
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setGameStarted(false);
                  setResult(null);
                  setCurrentRotation(0);
                }}
                disabled={isSpinning}
                className={`rounded-full px-6 py-3 text-sm font-bold transition-all ${
                  isSpinning
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {isKorean ? "⚙️ 항목 수정" : "⚙️ Edit Items"}
              </button>

              <button
                onClick={() => {
                  setResult(null);
                  setCurrentRotation(0);
                  renderRoulette();
                }}
                disabled={isSpinning}
                className={`rounded-full px-6 py-3 text-sm font-bold transition-all ${
                  isSpinning
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md hover:scale-105"
                }`}
              >
                {isKorean ? "🔄 다시 시작" : "🔄 Reset"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

