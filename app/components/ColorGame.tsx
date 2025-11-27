"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";

export default function ColorGame() {
  const params = useParams();
  const locale = params.locale as string;
  const isKorean = locale === "ko";

  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [grid, setGrid] = useState<string[]>([]);
  const [differentIndex, setDifferentIndex] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // 레벨에 따른 설정
  const getGridSize = (lvl: number) => Math.min(2 + lvl, 8); // 최대 8×8
  const getColorDifference = (lvl: number) => {
    // 순차적으로 색상 차이 감소: 65 -> 60 -> 55 -> 50 -> 45 -> ... (최소 5)
    // 약 13단계까지 플레이 가능
    return Math.max(65 - (lvl - 1) * 5, 5);
  };
  const getTimeLimit = () => 10; // 모든 레벨 10초 고정

  // 게임 초기화
  const initializeGame = useCallback(() => {
    const gridSize = getGridSize(level);
    const totalCells = gridSize * gridSize;
    const colorDiff = getColorDifference(level);

    // 베이스 색상을 중간 범위(128 ± 64)에서 생성하여 양방향 변화 가능
    const r = Math.floor(Math.random() * 128) + 64; // 64~191
    const g = Math.floor(Math.random() * 128) + 64; // 64~191
    const b = Math.floor(Math.random() * 128) + 64; // 64~191
    const baseColor = `rgb(${r}, ${g}, ${b})`;

    // 다른 색상 생성 (RGB 중 하나를 일정하게 변경)
    const channel = Math.floor(Math.random() * 3);
    
    // colorDiff가 충분히 적용될 수 있는 방향 선택
    let diffR = r, diffG = g, diffB = b;
    
    if (channel === 0) {
      // R 채널 변경 - 범위를 벗어나지 않도록
      if (r + colorDiff <= 255) {
        diffR = r + colorDiff;
      } else {
        diffR = r - colorDiff;
      }
    } else if (channel === 1) {
      // G 채널 변경
      if (g + colorDiff <= 255) {
        diffG = g + colorDiff;
      } else {
        diffG = g - colorDiff;
      }
    } else {
      // B 채널 변경
      if (b + colorDiff <= 255) {
        diffB = b + colorDiff;
      } else {
        diffB = b - colorDiff;
      }
    }

    const differentColor = `rgb(${diffR}, ${diffG}, ${diffB})`;

    // 그리드 생성
    const newGrid = Array(totalCells).fill(baseColor);
    const randomIndex = Math.floor(Math.random() * totalCells);
    newGrid[randomIndex] = differentColor;

    setGrid(newGrid);
    setDifferentIndex(randomIndex);
    setTimeLeft(getTimeLimit());
  }, [level]);

  // 게임 시작
  const startGame = () => {
    setLevel(1);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  // 타이머
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          setIsPlaying(false);
          if (score > bestScore) {
            setBestScore(score);
            localStorage.setItem("colorGameBestScore", score.toString());
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, gameOver, score, bestScore]);

  // 레벨 변경 시 게임 초기화
  useEffect(() => {
    if (isPlaying) {
      initializeGame();
    }
  }, [isPlaying, level, initializeGame]);

  // 베스트 스코어 로드
  useEffect(() => {
    const saved = localStorage.getItem("colorGameBestScore");
    if (saved) {
      setBestScore(parseInt(saved));
    }
  }, []);

  // 칸 클릭 처리
  const handleCellClick = (index: number) => {
    if (!isPlaying || gameOver) return;

    if (index === differentIndex) {
      // 정답
      const timeBonus = timeLeft * 10;
      setScore((prev) => prev + 100 + timeBonus);
      setLevel((prev) => prev + 1);
    } else {
      // 오답
      setGameOver(true);
      setIsPlaying(false);
      if (score > bestScore) {
        setBestScore(score);
        localStorage.setItem("colorGameBestScore", score.toString());
      }
    }
  };

  const gridSize = getGridSize(level);

  return (
    <div className="w-full">
      {/* 게임 정보 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
        <div>
          <p className="text-sm text-slate-500">
            {isKorean ? "레벨" : "Level"}
          </p>
          <p className="text-3xl font-bold text-purple-600">
            {level}
          </p>
        </div>
        <div>
          <p className="text-sm text-slate-500">
            {isKorean ? "점수" : "Score"}
          </p>
          <p className="text-3xl font-bold text-blue-600">
            {score}
          </p>
        </div>
        <div>
          <p className="text-sm text-slate-500">
            {isKorean ? "시간" : "Time"}
          </p>
          <p
            className={`text-3xl font-bold ${
              timeLeft <= 3
                ? "text-red-600 animate-pulse"
                : "text-green-600"
            }`}
          >
            {timeLeft}s
          </p>
        </div>
        <div>
          <p className="text-sm text-slate-500">
            {isKorean ? "최고 기록" : "Best"}
          </p>
          <p className="text-3xl font-bold text-amber-600">
            {bestScore}
          </p>
        </div>
      </div>

      {/* 게임 영역 */}
      {!isPlaying ? (
        <div className="text-center py-16">
          {gameOver && (
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                {isKorean ? "게임 종료!" : "Game Over!"}
              </h2>
              <p className="text-xl text-slate-600 mb-2">
                {isKorean ? "최종 점수" : "Final Score"}: {score}
              </p>
              <p className="text-lg text-slate-500">
                {isKorean ? "레벨" : "Level"}: {level}
              </p>
            </div>
          )}
          <button
            onClick={startGame}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xl font-bold rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
          >
            {gameOver
              ? isKorean
                ? "다시 시작"
                : "Play Again"
              : isKorean
              ? "게임 시작"
              : "Start Game"}
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center py-8">
          <div
            className="grid gap-1 md:gap-2"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              maxWidth: "600px",
              width: "100%",
            }}
          >
            {grid.map((color, index) => (
              <button
                key={index}
                onClick={() => handleCellClick(index)}
                className="aspect-square rounded-md transition-transform hover:scale-95 active:scale-90 shadow-md"
                style={{
                  backgroundColor: color,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

