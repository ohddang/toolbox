"use client";

import { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";

interface LadderLine {
  from: number;
  to: number;
  row: number;
}

interface LadderGameProps {
  locale?: string;
}

export default function LadderGame({ locale = "ko" }: LadderGameProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const ladderContainerRef = useRef<PIXI.Container | null>(null);
  const animationContainerRef = useRef<PIXI.Container | null>(null);
  
  const isKorean = locale === "ko";
  
  const [players, setPlayers] = useState(4);
  const [startNames, setStartNames] = useState(
    isKorean ? ["민수", "영희", "철수", "지현"] : ["Player 1", "Player 2", "Player 3", "Player 4"]
  );
  const [results, setResults] = useState(
    isKorean ? ["🎁 선물", "💎 보석", "🍀 행운", "🎉 축하"] : ["🎁 Gift", "💎 Gem", "🍀 Luck", "🎉 Party"]
  );
  const [gameStarted, setGameStarted] = useState(false);
  const [animatingStarts, setAnimatingStarts] = useState<Set<number>>(new Set());
  const [clickedStarts, setClickedStarts] = useState<Set<number>>(new Set());
  
  const ladderLinesRef = useRef<LadderLine[]>([]);
  const pathResultsRef = useRef<Map<number, number>>(new Map());
  const animationFramesRef = useRef<Map<number, number>>(new Map());

  // 상수
  const SPACING = 100;
  const LADDER_HEIGHT = 500;
  const ROWS = 15;
  const START_Y = 80;

  // 사다리 생성
  const generateLadder = () => {
    const lines: LadderLine[] = [];
    
    for (let row = 0; row < ROWS; row++) {
      const usedCols = new Set<number>();
      
      for (let col = 0; col < players - 1; col++) {
        if (!usedCols.has(col) && !usedCols.has(col + 1) && Math.random() > 0.5) {
          lines.push({ from: col, to: col + 1, row });
          usedCols.add(col);
          usedCols.add(col + 1);
        }
      }
    }
    
    ladderLinesRef.current = lines;
    console.log("사다리 생성됨:", lines.length, "개의 가로선");
  };

  // 경로 계산
  const calculatePath = (startIndex: number): { end: number; path: { x: number; y: number }[] } => {
    let currentCol = startIndex;
    const path: { x: number; y: number }[] = [];
    const rowHeight = LADDER_HEIGHT / ROWS;

    path.push({
      x: currentCol * SPACING + SPACING / 2,
      y: START_Y,
    });

    for (let row = 0; row < ROWS; row++) {
      const y = START_Y + row * rowHeight + rowHeight / 2;

      const leftLine = ladderLinesRef.current.find(
        (l) => l.to === currentCol && l.row === row
      );
      const rightLine = ladderLinesRef.current.find(
        (l) => l.from === currentCol && l.row === row
      );

      if (leftLine) {
        path.push({ x: currentCol * SPACING + SPACING / 2, y });
        currentCol = leftLine.from;
        path.push({ x: currentCol * SPACING + SPACING / 2, y });
      } else if (rightLine) {
        path.push({ x: currentCol * SPACING + SPACING / 2, y });
        currentCol = rightLine.to;
        path.push({ x: currentCol * SPACING + SPACING / 2, y });
      }
    }

    path.push({
      x: currentCol * SPACING + SPACING / 2,
      y: START_Y + LADDER_HEIGHT,
    });

    return { end: currentCol, path };
  };

  // 사다리 렌더링
  const renderLadder = () => {
    const app = appRef.current;
    const ladderContainer = ladderContainerRef.current;
    if (!app || !ladderContainer) {
      console.log("앱이 준비되지 않음");
      return;
    }

    console.log("사다리 렌더링 시작");
    ladderContainer.removeChildren();

    const width = players * SPACING;
    const height = LADDER_HEIGHT + 200;
    const rowHeight = LADDER_HEIGHT / ROWS;

    // 배경
    const bg = new PIXI.Graphics();
    bg.rect(0, 0, width, height);
    bg.fill(0xfff5eb);
    ladderContainer.addChild(bg);

    // 세로선
    for (let i = 0; i < players; i++) {
      const x = i * SPACING + SPACING / 2;
      const line = new PIXI.Graphics();
      line.moveTo(x, START_Y);
      line.lineTo(x, START_Y + LADDER_HEIGHT);
      line.stroke({ width: 4, color: 0xd4d4d4 });
      ladderContainer.addChild(line);
    }

    // 가로선
    ladderLinesRef.current.forEach((ladder) => {
      const x1 = ladder.from * SPACING + SPACING / 2;
      const x2 = ladder.to * SPACING + SPACING / 2;
      const y = START_Y + ladder.row * rowHeight + rowHeight / 2;

      const line = new PIXI.Graphics();
      line.moveTo(x1, y);
      line.lineTo(x2, y);
      line.stroke({ width: 4, color: 0xffa500 });
      ladderContainer.addChild(line);
    });

    console.log("가로선", ladderLinesRef.current.length, "개 렌더링");

    // 시작점
    for (let i = 0; i < players; i++) {
      const x = i * SPACING + SPACING / 2;
      const y = START_Y - 35;

      const circle = new PIXI.Graphics();
      circle.circle(0, 0, 25);
      circle.fill(clickedStarts.has(i) ? 0x95a5a6 : 0xff9a56);
      circle.x = x;
      circle.y = y;
      circle.eventMode = "static";
      circle.cursor = clickedStarts.has(i) ? "not-allowed" : "pointer";
      circle.on("pointerdown", () => handleStartClick(i));
      ladderContainer.addChild(circle);

      const text = new PIXI.Text({
        text: startNames[i] || `${i + 1}`,
        style: {
          fontSize: 16,
          fill: 0xffffff,
          fontWeight: "bold",
        },
      });
      text.anchor.set(0.5);
      text.x = x;
      text.y = y;
      
      if (text.width > 45) {
        text.scale.set(45 / text.width);
      }
      ladderContainer.addChild(text);
    }

    // 도착점
    for (let i = 0; i < players; i++) {
      const x = i * SPACING + SPACING / 2;
      const y = START_Y + LADDER_HEIGHT + 35;

      const box = new PIXI.Graphics();
      box.roundRect(-45, -20, 90, 40, 8);
      box.fill(0xfeca57);
      box.x = x;
      box.y = y;
      ladderContainer.addChild(box);

      const border = new PIXI.Graphics();
      border.roundRect(-45, -20, 90, 40, 8);
      border.stroke({ width: 2, color: 0xffffff, alpha: 0.5 });
      border.x = x;
      border.y = y;
      ladderContainer.addChild(border);

      const resultText = new PIXI.Text({
        text: results[i] || "?",
        style: {
          fontSize: 14,
          fill: 0xffffff,
          fontWeight: "bold",
        },
      });
      resultText.anchor.set(0.5);
      resultText.x = x;
      resultText.y = y;
      
      if (resultText.width > 85) {
        resultText.scale.set(85 / resultText.width);
      }
      ladderContainer.addChild(resultText);
    }

    // 결과 패널
    clickedStarts.forEach((startIdx) => {
      const endIdx = pathResultsRef.current.get(startIdx);
      if (endIdx !== undefined) {
        const x = endIdx * SPACING + SPACING / 2;
        const y = START_Y + LADDER_HEIGHT + 95;

        const box = new PIXI.Graphics();
        box.roundRect(-45, -18, 90, 36, 8);
        box.fill(0xff6b6b);
        box.x = x;
        box.y = y;
        ladderContainer.addChild(box);

        const border = new PIXI.Graphics();
        border.roundRect(-45, -18, 90, 36, 8);
        border.stroke({ width: 2, color: 0xffffff });
        border.x = x;
        border.y = y;
        ladderContainer.addChild(border);

        const nameText = new PIXI.Text({
          text: startNames[startIdx] || `${startIdx + 1}`,
          style: {
            fontSize: 16,
            fill: 0xffffff,
            fontWeight: "bold",
          },
        });
        nameText.anchor.set(0.5);
        nameText.x = x;
        nameText.y = y;
        
        if (nameText.width > 85) {
          nameText.scale.set(85 / nameText.width);
        }
        ladderContainer.addChild(nameText);
      }
    });

    console.log("사다리 렌더링 완료");
  };

  // 시작점 클릭
  const handleStartClick = (startIdx: number) => {
    if (animatingStarts.has(startIdx) || clickedStarts.has(startIdx)) return;

    const pathData = calculatePath(startIdx);
    pathResultsRef.current.set(startIdx, pathData.end);
    
    setAnimatingStarts(prev => new Set([...prev, startIdx]));
    animateSinglePath(startIdx, pathData);
  };

  // 단일 경로 애니메이션
  const animateSinglePath = (startIdx: number, pathData: { end: number; path: { x: number; y: number }[] }) => {
    const app = appRef.current;
    const animationContainer = animationContainerRef.current;
    if (!app || !animationContainer) return;

    const colors = [0xff6b6b, 0x4ecdc4, 0xf7b731, 0x5f27cd, 0x00d2d3, 0xee5a6f, 0x2bcbba, 0xfd79a8];
    const color = colors[startIdx % colors.length];

    const ball = new PIXI.Graphics();
    ball.circle(0, 0, 12);
    ball.fill(color);
    animationContainer.addChild(ball);

    const pathLine = new PIXI.Graphics();
    animationContainer.addChild(pathLine);

    const duration = 2500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const path = pathData.path;
      const totalLength = path.length - 1;
      const currentSegment = Math.floor(progress * totalLength);
      const segmentProgress = (progress * totalLength) % 1;

      if (currentSegment < totalLength) {
        const start = path[currentSegment];
        const end = path[currentSegment + 1];
        
        ball.x = start.x + (end.x - start.x) * segmentProgress;
        ball.y = start.y + (end.y - start.y) * segmentProgress;

        pathLine.clear();
        pathLine.moveTo(path[0].x, path[0].y);
        for (let i = 1; i <= currentSegment; i++) {
          pathLine.lineTo(path[i].x, path[i].y);
        }
        pathLine.lineTo(ball.x, ball.y);
        pathLine.stroke({ width: 3, color, alpha: 0.6 });
      }

      if (progress < 1) {
        const frameId = requestAnimationFrame(animate);
        animationFramesRef.current.set(startIdx, frameId);
      } else {
        animationFramesRef.current.delete(startIdx);
        
        setTimeout(() => {
          if (animationContainer) {
            animationContainer.removeChild(ball);
            animationContainer.removeChild(pathLine);
          }
          
          setClickedStarts(prev => new Set([...prev, startIdx]));
          setAnimatingStarts(prev => {
            const newSet = new Set(prev);
            newSet.delete(startIdx);
            return newSet;
          });
        }, 300);
      }
    };

    const frameId = requestAnimationFrame(animate);
    animationFramesRef.current.set(startIdx, frameId);
  };

  // 모든 경로 동시 애니메이션
  const animateAllPaths = () => {
    const app = appRef.current;
    const animationContainer = animationContainerRef.current;
    if (!app || !animationContainer || animatingStarts.size > 0) return;

    const allPaths: { start: number; data: { end: number; path: { x: number; y: number }[] } }[] = [];
    for (let i = 0; i < players; i++) {
      const pathData = calculatePath(i);
      allPaths.push({ start: i, data: pathData });
      pathResultsRef.current.set(i, pathData.end);
    }

    setAnimatingStarts(new Set(allPaths.map(p => p.start)));

    const colors = [0xff6b6b, 0x4ecdc4, 0xf7b731, 0x5f27cd, 0x00d2d3, 0xee5a6f, 0x2bcbba, 0xfd79a8];
    
    const balls: PIXI.Graphics[] = [];
    const lines: PIXI.Graphics[] = [];

    allPaths.forEach((item, idx) => {
      const ball = new PIXI.Graphics();
      ball.circle(0, 0, 10);
      ball.fill(colors[idx % colors.length]);
      ball.x = item.data.path[0].x;
      ball.y = item.data.path[0].y;
      animationContainer.addChild(ball);
      balls.push(ball);

      const line = new PIXI.Graphics();
      animationContainer.addChild(line);
      lines.push(line);
    });

    const duration = 3000;
    const startTime = Date.now();
    let frameId: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      allPaths.forEach((item, idx) => {
        const path = item.data.path;
        const totalLength = path.length - 1;
        const currentSegment = Math.floor(progress * totalLength);
        const segmentProgress = (progress * totalLength) % 1;

        if (currentSegment < totalLength) {
          const start = path[currentSegment];
          const end = path[currentSegment + 1];
          
          const ball = balls[idx];
          ball.x = start.x + (end.x - start.x) * segmentProgress;
          ball.y = start.y + (end.y - start.y) * segmentProgress;

          const line = lines[idx];
          line.clear();
          line.moveTo(path[0].x, path[0].y);
          for (let i = 1; i <= currentSegment; i++) {
            line.lineTo(path[i].x, path[i].y);
          }
          line.lineTo(ball.x, ball.y);
          line.stroke({ width: 2, color: colors[idx % colors.length], alpha: 0.5 });
        }
      });

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          if (animationContainer) {
            balls.forEach((ball) => animationContainer.removeChild(ball));
            lines.forEach((line) => animationContainer.removeChild(line));
          }
          
          setClickedStarts(new Set(allPaths.map((p) => p.start)));
          setAnimatingStarts(new Set());
        }, 300);
      }
    };

    frameId = requestAnimationFrame(animate);
  };

  // 게임 시작
  const startGame = () => {
    console.log("게임 시작, appRef:", appRef.current);
    
    generateLadder();
    pathResultsRef.current.clear();
    setClickedStarts(new Set());
    setGameStarted(true);
  };

  // 플레이어 수 변경
  const handlePlayersChange = (num: number) => {
    setPlayers(num);
    
    const newStartNames = Array(num).fill("").map((_, i) => 
      startNames[i] || (isKorean ? `${i + 1}번` : `Player ${i + 1}`)
    );
    setStartNames(newStartNames);
    
    const newResults = Array(num).fill("").map((_, i) => 
      results[i] || (isKorean ? `${i + 1}번` : `Result ${i + 1}`)
    );
    setResults(newResults);
    
    setGameStarted(false);
    setClickedStarts(new Set());
    setAnimatingStarts(new Set());
    pathResultsRef.current.clear();
  };

  // PixiJS 초기화
  useEffect(() => {
    if (!canvasRef.current || appRef.current) return;

    const app = new PIXI.Application();
    const width = 800;
    const height = 700;

    console.log("PixiJS 초기화 시작");

    app
      .init({
        width,
        height,
        backgroundColor: 0xfff5eb,
        antialias: true,
      })
      .then(() => {
        if (canvasRef.current && !appRef.current) {
          canvasRef.current.appendChild(app.canvas);
          appRef.current = app;
          
          // 사다리용 컨테이너 (맨 아래)
          const ladderContainer = new PIXI.Container();
          app.stage.addChild(ladderContainer);
          ladderContainerRef.current = ladderContainer;
          
          // 애니메이션용 컨테이너 (위에)
          const animationContainer = new PIXI.Container();
          app.stage.addChild(animationContainer);
          animationContainerRef.current = animationContainer;
          
          console.log("PixiJS 초기화 완료", app);
        }
      })
      .catch((error) => {
        console.error("PixiJS 초기화 실패:", error);
      });

    return () => {
      animationFramesRef.current.forEach((frameId) => {
        cancelAnimationFrame(frameId);
      });
      animationFramesRef.current.clear();
      
      if (appRef.current) {
        const canvas = appRef.current.canvas;
        if (canvas?.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
        appRef.current.destroy(true);
        appRef.current = null;
        ladderContainerRef.current = null;
        animationContainerRef.current = null;
      }
    };
  }, []);

  // 게임 시작 시 렌더링
  useEffect(() => {
    if (!gameStarted || !appRef.current || !ladderContainerRef.current) {
      console.log("렌더링 스킵:", { 
        gameStarted, 
        hasApp: !!appRef.current, 
        hasLadderContainer: !!ladderContainerRef.current 
      });
      return;
    }

    console.log("렌더링 트리거");
    const width = Math.min(800, players * SPACING);
    const height = LADDER_HEIGHT + 200;
    
    appRef.current.renderer.resize(width, height);
    renderLadder();
  }, [gameStarted, players, clickedStarts]);

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* PixiJS 캔버스 (항상 마운트, 게임 시작 전에는 숨김) */}
      <div 
        ref={canvasRef} 
        className={gameStarted ? "rounded-3xl shadow-2xl border-4 border-orange-100" : "hidden"}
      />
      
      {!gameStarted ? (
        <div className="w-full max-w-2xl space-y-6">
          <div>
            <label className="mb-3 block text-sm font-bold text-slate-700">
              {isKorean ? "참가자 수" : "Number of Participants"}
            </label>
            <div className="flex gap-2">
              {[2, 3, 4, 5, 6, 7, 8].map((num) => (
                <button
                  key={num}
                  onClick={() => handlePlayersChange(num)}
                  className={`flex-1 rounded-full px-4 py-3 text-sm font-bold transition-all ${
                    players === num
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg scale-105"
                      : "bg-orange-50 text-orange-600 hover:bg-orange-100"
                  }`}
                >
                  {num}{isKorean ? "명" : ""}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-bold text-slate-700">
              {isKorean ? "참가자 이름" : "Participant Names"}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {startNames.map((name, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={name}
                  onChange={(e) => {
                    const newNames = [...startNames];
                    newNames[idx] = e.target.value;
                    setStartNames(newNames);
                  }}
                  placeholder={isKorean ? `${idx + 1}번 참가자` : `Participant ${idx + 1}`}
                  className="rounded-xl border-2 border-blue-100 bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"
                />
              ))}
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-bold text-slate-700">
              {isKorean ? "도착지 결과" : "Results"}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {results.map((result, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={result}
                  onChange={(e) => {
                    const newResults = [...results];
                    newResults[idx] = e.target.value;
                    setResults(newResults);
                  }}
                  placeholder={isKorean ? `${idx + 1}번 결과` : `Result ${idx + 1}`}
                  className="rounded-xl border-2 border-orange-100 bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none"
                />
              ))}
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full rounded-full bg-gradient-to-r from-orange-500 to-pink-500 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105"
          >
            {isKorean ? "🎲 사다리 생성하기" : "🎲 Generate Ladder"}
          </button>
        </div>
      ) : (
        <>
          <div className="relative">
            {animatingStarts.size === 0 && clickedStarts.size < players && (
              <div className="mt-4 text-center text-sm font-medium text-slate-600 animate-bounce">
                {isKorean 
                  ? `👆 시작 번호를 클릭하세요! (${clickedStarts.size}/${players})`
                  : `👆 Click a start number! (${clickedStarts.size}/${players})`
                }
              </div>
            )}
            
            {animatingStarts.size > 0 && (
              <div className="mt-4 text-center text-sm font-medium text-blue-600 animate-pulse">
                {isKorean 
                  ? `🎲 애니메이션 진행 중... (${animatingStarts.size}개)`
                  : `🎲 Animating... (${animatingStarts.size})`
                }
              </div>
            )}
            
            {animatingStarts.size === 0 && clickedStarts.size === players && (
              <div className="mt-4 text-center text-sm font-bold text-green-600">
                {isKorean ? "✅ 모든 결과를 확인했습니다!" : "✅ All results checked!"}
              </div>
            )}
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={animateAllPaths}
              disabled={animatingStarts.size > 0}
              className={`rounded-full px-6 py-3 text-sm font-bold transition-all ${
                animatingStarts.size > 0
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md hover:scale-105"
              }`}
            >
              {isKorean ? "📊 모든 결과 한번에 보기" : "📊 Show All Results"}
            </button>
            
            <button
              onClick={() => {
                setGameStarted(false);
                setClickedStarts(new Set());
                setAnimatingStarts(new Set());
                pathResultsRef.current.clear();
              }}
              disabled={animatingStarts.size > 0}
              className={`rounded-full px-6 py-3 text-sm font-bold transition-all ${
                animatingStarts.size > 0
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {isKorean ? "⚙️ 설정 변경" : "⚙️ Settings"}
            </button>
            
            <button
              onClick={startGame}
              disabled={animatingStarts.size > 0}
              className={`rounded-full px-6 py-3 text-sm font-bold transition-all ${
                animatingStarts.size > 0
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md hover:scale-105"
              }`}
            >
              {isKorean ? "🔄 새로운 사다리" : "🔄 New Ladder"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
