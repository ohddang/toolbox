"use client";

import { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";

type Tile = {
  value: number;
  row: number;
  col: number;
  id: number;
  prevRow?: number;
  prevCol?: number;
  isNew?: boolean;
  mergedFrom?: number[];
};

type Direction = "up" | "down" | "left" | "right";

const GRID_SIZE = 4;
const TILE_SIZE = 100;
const TILE_GAP = 10;
const ANIMATION_DURATION = 150; // ms

const COLORS: Record<number, number> = {
  0: 0xcdc1b4,
  2: 0xeee4da,
  4: 0xede0c8,
  8: 0xf2b179,
  16: 0xf59563,
  32: 0xf67c5f,
  64: 0xf65e3b,
  128: 0xedcf72,
  256: 0xedcc61,
  512: 0xedc850,
  1024: 0xedc53f,
  2048: 0xedc22e,
};

export default function Game2048() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const tilesRef = useRef<Tile[]>([]);
  const tileSpritesRef = useRef<Map<number, PIXI.Container>>(new Map());
  const nextIdRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [scale, setScale] = useState(1);

  // 타일 좌표 계산
  const getTilePosition = (row: number, col: number) => {
    return {
      x: TILE_GAP + col * (TILE_SIZE + TILE_GAP) + TILE_SIZE / 2,
      y: TILE_GAP + row * (TILE_SIZE + TILE_GAP) + TILE_SIZE / 2,
    };
  };

  // 타일 스프라이트 생성
  const createTileSprite = (tile: Tile) => {
    const container = new PIXI.Container();
    
    const graphic = new PIXI.Graphics();
    graphic.roundRect(-TILE_SIZE / 2, -TILE_SIZE / 2, TILE_SIZE, TILE_SIZE, 5);
    graphic.fill(COLORS[tile.value] || 0x3c3a32);
    container.addChild(graphic);

    const text = new PIXI.Text({
      text: tile.value.toString(),
      style: {
        fontFamily: "Arial",
        fontSize: tile.value < 100 ? 48 : tile.value < 1000 ? 40 : 32,
        fill: tile.value <= 4 ? 0x776e65 : 0xf9f6f2,
        fontWeight: "bold",
      },
    });
    text.anchor.set(0.5);
    container.addChild(text);

    const pos = getTilePosition(tile.row, tile.col);
    container.x = pos.x;
    container.y = pos.y;

    // 새 타일 애니메이션
    if (tile.isNew) {
      container.scale.set(0);
    }

    return container;
  };

  // 게임 렌더링
  const renderGame = () => {
    const app = appRef.current;
    if (!app) return;

    app.stage.removeChildren();
    tileSpritesRef.current.clear();

    // 배경 그리드
    const gridSize = GRID_SIZE * TILE_SIZE + (GRID_SIZE + 1) * TILE_GAP;
    const background = new PIXI.Graphics();
    background.rect(0, 0, gridSize, gridSize);
    background.fill(0xbbada0);
    app.stage.addChild(background);

    // 빈 타일 칸
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const x = TILE_GAP + col * (TILE_SIZE + TILE_GAP);
        const y = TILE_GAP + row * (TILE_SIZE + TILE_GAP);

        const emptyTile = new PIXI.Graphics();
        emptyTile.roundRect(x, y, TILE_SIZE, TILE_SIZE, 5);
        emptyTile.fill(COLORS[0]);
        app.stage.addChild(emptyTile);
      }
    }

    // 타일 렌더링
    tilesRef.current.forEach((tile) => {
      const sprite = createTileSprite(tile);
      app.stage.addChild(sprite);
      tileSpritesRef.current.set(tile.id, sprite);
    });
  };

  // 타일 애니메이션
  const animateTiles = () => {
    return new Promise<void>((resolve) => {
      const app = appRef.current;
      if (!app) {
        resolve();
        return;
      }

      const startTime = Date.now();
      const animations: Array<{
        sprite: PIXI.Container;
        startX: number;
        startY: number;
        endX: number;
        endY: number;
        isNew: boolean;
      }> = [];

      // 애니메이션 설정
      tilesRef.current.forEach((tile) => {
        const sprite = tileSpritesRef.current.get(tile.id);
        if (!sprite) return;

        if (tile.isNew) {
          // 새 타일: 스케일 애니메이션
          animations.push({
            sprite,
            startX: sprite.x,
            startY: sprite.y,
            endX: sprite.x,
            endY: sprite.y,
            isNew: true,
          });
        } else if (tile.prevRow !== undefined && tile.prevCol !== undefined) {
          // 이동한 타일: 위치 애니메이션
          const startPos = getTilePosition(tile.prevRow, tile.prevCol);
          const endPos = getTilePosition(tile.row, tile.col);
          sprite.x = startPos.x;
          sprite.y = startPos.y;

          animations.push({
            sprite,
            startX: startPos.x,
            startY: startPos.y,
            endX: endPos.x,
            endY: endPos.y,
            isNew: false,
          });
        }
      });

      if (animations.length === 0) {
        resolve();
        return;
      }

      // 애니메이션 실행
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOut

        animations.forEach((anim) => {
          if (anim.isNew) {
            anim.sprite.scale.set(easeProgress);
          } else {
            anim.sprite.x = anim.startX + (anim.endX - anim.startX) * easeProgress;
            anim.sprite.y = anim.startY + (anim.endY - anim.startY) * easeProgress;
          }
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // 애니메이션 완료 후 정리
          tilesRef.current.forEach((tile) => {
            tile.isNew = false;
            tile.prevRow = undefined;
            tile.prevCol = undefined;
          });
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  };

  // 랜덤 타일 추가
  const addRandomTile = () => {
    const emptyCells: { row: number; col: number }[] = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (!tilesRef.current.find((t) => t.row === row && t.col === col)) {
          emptyCells.push({ row, col });
        }
      }
    }

    if (emptyCells.length > 0) {
      const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const value = Math.random() < 0.9 ? 2 : 4;
      tilesRef.current.push({
        value,
        row,
        col,
        id: nextIdRef.current++,
        isNew: true,
      });
    }
  };

  // 타일 이동 및 병합 로직 (개선)
  const moveTiles = (direction: Direction): boolean => {
    let moved = false;
    const newTiles: Tile[] = [];
    const merged = new Set<string>();

    // 이전 위치 저장
    tilesRef.current.forEach((tile) => {
      tile.prevRow = tile.row;
      tile.prevCol = tile.col;
    });

    // 방향에 따라 순회 순서 결정
    const getLines = () => {
      const lines: number[][] = [];
      if (direction === "left" || direction === "right") {
        for (let row = 0; row < GRID_SIZE; row++) {
          lines.push([row]);
        }
      } else {
        for (let col = 0; col < GRID_SIZE; col++) {
          lines.push([col]);
        }
      }
      return lines;
    };

    const lines = getLines();

    lines.forEach((lineKey) => {
      const isHorizontal = direction === "left" || direction === "right";
      const lineNum = lineKey[0];

      // 라인의 타일들 가져오기
      let lineTiles = tilesRef.current.filter((t) =>
        isHorizontal ? t.row === lineNum : t.col === lineNum
      );

      // 정렬
      lineTiles.sort((a, b) => {
        if (direction === "left" || direction === "up") {
          return isHorizontal ? a.col - b.col : a.row - b.row;
        } else {
          return isHorizontal ? b.col - a.col : b.row - a.row;
        }
      });

      let targetIndex = 0;

      for (let i = 0; i < lineTiles.length; i++) {
        const tile = lineTiles[i];
        let newRow = tile.row;
        let newCol = tile.col;

        // 목표 위치 계산
        if (direction === "left") {
          newCol = targetIndex;
        } else if (direction === "right") {
          newCol = GRID_SIZE - 1 - targetIndex;
        } else if (direction === "up") {
          newRow = targetIndex;
        } else if (direction === "down") {
          newRow = GRID_SIZE - 1 - targetIndex;
        }

        // 병합 체크
        const lastTile = newTiles[newTiles.length - 1];
        const canMerge =
          lastTile &&
          lastTile.value === tile.value &&
          !merged.has(`${lastTile.row},${lastTile.col}`) &&
          ((isHorizontal && lastTile.row === lineNum) ||
            (!isHorizontal && lastTile.col === lineNum));

        if (canMerge) {
          // 병합
          lastTile.value *= 2;
          merged.add(`${lastTile.row},${lastTile.col}`);
          setScore((s) => s + lastTile.value);
          moved = true;
        } else {
          // 새 위치에 타일 추가
          if (newRow !== tile.row || newCol !== tile.col) {
            moved = true;
          }

          newTiles.push({
            ...tile,
            row: newRow,
            col: newCol,
          });
          targetIndex++;
        }
      }
    });

    tilesRef.current = newTiles;
    return moved;
  };

  // 이동 가능 여부 확인
  const canMove = (): boolean => {
    if (tilesRef.current.length < GRID_SIZE * GRID_SIZE) return true;

    for (const tile of tilesRef.current) {
      const neighbors = tilesRef.current.filter(
        (t) =>
          (t.row === tile.row && Math.abs(t.col - tile.col) === 1) ||
          (t.col === tile.col && Math.abs(t.row - tile.row) === 1)
      );
      if (neighbors.some((n) => n.value === tile.value)) return true;
    }

    return false;
  };

  // 게임 초기화
  const initGame = () => {
    tilesRef.current = [];
    nextIdRef.current = 0;
    setScore(0);
    setGameOver(false);
    addRandomTile();
    addRandomTile();
    renderGame();
    animateTiles();
  };

  // 게임 이동 처리 (공통 함수)
  const handleMove = async (direction: Direction) => {
    if (gameOver || isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    const moved = moveTiles(direction);

    if (moved) {
      renderGame();
      await animateTiles();
      
      addRandomTile();
      renderGame();
      await animateTiles();

      if (!canMove()) {
        setGameOver(true);
      }
    }

    isAnimatingRef.current = false;
  };

  // 키보드 이벤트 핸들러
  const handleKeyDown = async (e: KeyboardEvent) => {
    let direction: Direction | null = null;

    switch (e.key) {
      case "ArrowUp":
      case "w":
      case "W":
        e.preventDefault(); // 즉시 기본 동작 차단
        direction = "up";
        break;
      case "ArrowDown":
      case "s":
      case "S":
        e.preventDefault(); // 즉시 기본 동작 차단
        direction = "down";
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        e.preventDefault(); // 즉시 기본 동작 차단
        direction = "left";
        break;
      case "ArrowRight":
      case "d":
      case "D":
        e.preventDefault(); // 즉시 기본 동작 차단
        direction = "right";
        break;
    }

    if (direction) {
      await handleMove(direction);
    }
  };

  // 터치 시작 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  // 터치 끝 핸들러 (스와이프 감지)
  const handleTouchEnd = async (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const minSwipeDistance = 30; // 최소 스와이프 거리

    // 수평/수직 중 더 큰 이동 방향 결정
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // 수평 스와이프
      if (Math.abs(deltaX) > minSwipeDistance) {
        await handleMove(deltaX > 0 ? "right" : "left");
      }
    } else {
      // 수직 스와이프
      if (Math.abs(deltaY) > minSwipeDistance) {
        await handleMove(deltaY > 0 ? "down" : "up");
      }
    }

    touchStartRef.current = null;
  };

  // 마우스 드래그 시작 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartRef.current = { x: e.clientX, y: e.clientY };
  };

  // 마우스 드래그 끝 핸들러
  const handleMouseUp = async (e: React.MouseEvent) => {
    if (!touchStartRef.current) return;

    const deltaX = e.clientX - touchStartRef.current.x;
    const deltaY = e.clientY - touchStartRef.current.y;
    const minSwipeDistance = 30;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        await handleMove(deltaX > 0 ? "right" : "left");
      }
    } else {
      if (Math.abs(deltaY) > minSwipeDistance) {
        await handleMove(deltaY > 0 ? "down" : "up");
      }
    }

    touchStartRef.current = null;
  };

  // PixiJS 초기화
  useEffect(() => {
    if (!canvasRef.current || appRef.current) return;

    const app = new PIXI.Application();
    const gridSize = GRID_SIZE * TILE_SIZE + (GRID_SIZE + 1) * TILE_GAP;

    app
      .init({
        width: gridSize,
        height: gridSize,
        backgroundColor: 0xfaf8ef,
        antialias: true,
      })
      .then(() => {
        if (canvasRef.current && !appRef.current) {
          canvasRef.current.appendChild(app.canvas);
          appRef.current = app;

          tilesRef.current = [];
          nextIdRef.current = 0;
          addRandomTile();
          addRandomTile();
          renderGame();
          animateTiles();
        }
      });

    return () => {
      if (appRef.current) {
        const canvas = appRef.current.canvas;
        if (canvas && canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }
    };
  }, []);

  // 키보드 이벤트 리스너
  useEffect(() => {
    // 방향키 기본 동작 차단을 위해 passive: false 옵션 사용
    const preventScroll = (e: KeyboardEvent) => {
      // 방향키, W/A/S/D 키의 경우 스크롤 방지
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "W", "a", "A", "s", "S", "d", "D"].includes(e.key)
      ) {
        e.preventDefault();
      }
    };

    // keydown 이벤트에 대해 passive: false로 설정
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("keydown", preventScroll, { passive: false });
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keydown", preventScroll);
    };
  }, [gameOver]);

  // 반응형 스케일 계산
  useEffect(() => {
    const CANVAS_SIZE = 450; // 4 * 100 + 5 * 10
    
    const updateScale = () => {
      const containerWidth = window.innerWidth - 48; // padding 고려
      const newScale = Math.min(1, containerWidth / CANVAS_SIZE);
      setScale(newScale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // 베스트 스코어 업데이트
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("2048-best-score", score.toString());
    }
  }, [score, bestScore]);

  // 베스트 스코어 로드
  useEffect(() => {
    const saved = localStorage.getItem("2048-best-score");
    if (saved) {
      setBestScore(parseInt(saved));
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-full overflow-x-auto px-4">
      {/* 스코어 보드 */}
      <div className="flex gap-4 flex-wrap justify-center">
        <div className="rounded-lg bg-amber-600 px-6 py-3 text-center">
          <div className="text-xs font-semibold uppercase text-amber-100">
            점수
          </div>
          <div className="text-2xl font-bold text-white">{score}</div>
        </div>
        <div className="rounded-lg bg-amber-700 px-6 py-3 text-center">
          <div className="text-xs font-semibold uppercase text-amber-100">
            최고점수
          </div>
          <div className="text-2xl font-bold text-white">{bestScore}</div>
        </div>
      </div>

      {/* 게임 캔버스 - 반응형 스케일링 */}
      <div 
        className="relative w-full flex justify-center"
        style={{ height: `${450 * scale}px` }}
      >
        <div 
          ref={canvasRef} 
          className="rounded-lg shadow-2xl touch-none select-none"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />

        {gameOver && (
          <div 
            className="absolute top-0 left-1/2 flex items-center justify-center rounded-lg bg-black/50"
            style={{
              width: `${450 * scale}px`,
              height: `${450 * scale}px`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="text-center">
              <div className="mb-4 text-2xl md:text-4xl font-bold text-white">
                게임 오버!
              </div>
              <button
                onClick={initGame}
                className="rounded-lg bg-amber-600 px-4 py-2 md:px-6 md:py-3 text-base md:text-lg font-semibold text-white transition-colors hover:bg-amber-700"
              >
                다시 시작
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 컨트롤 안내 */}
      <div className="text-center">
        <div className="mb-2 text-sm font-semibold text-slate-700">
          조작법
        </div>
        <div className="space-y-1 text-sm text-slate-600">
          <div className="hidden md:block">
            키보드 화살표 키 또는 W/A/S/D 키로 이동
          </div>
          <div className="md:hidden">
            화면을 스와이프하여 타일 이동
          </div>
          <div className="hidden md:block text-xs text-slate-500">
            또는 마우스로 드래그하세요
          </div>
        </div>
        <button
          onClick={initGame}
          className="mt-4 rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          새 게임
        </button>
      </div>
    </div>
  );
}
