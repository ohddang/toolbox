"use client";

import Game2048 from "../../../components/Game2048";
import Link from "next/link";
import { useParams } from "next/navigation";
import Script from "next/script";
import { LanguageSwitcher } from "../../../components/LanguageSwitcher";

export default function Game2048Page() {
  const params = useParams();
  const locale = params.locale as string;
  const isKorean = locale === "ko";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: isKorean ? "2048 게임" : "2048 Game",
    description: isKorean
      ? "같은 숫자를 합쳐서 2048 타일을 만드는 중독성 있는 퍼즐 게임"
      : "Addictive puzzle game where you merge same numbers to create the 2048 tile",
    genre: isKorean ? "퍼즐" : "Puzzle",
    gamePlatform: "Web Browser",
    operatingSystem: "Any",
    applicationCategory: "Game",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1000",
    },
  };

  return (
    <>
      <Script
        id="structured-data-2048"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* 헤더 */}
      <header className="border-b border-orange-100 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/${locale}`} className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 shadow-md group-hover:scale-110 transition-transform">
                <span className="text-xl">🧰</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Toolbox
              </h1>
            </Link>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Link
                href={`/${locale}`}
                className="rounded-full bg-orange-50 px-5 py-2 text-sm font-bold text-orange-600 transition-all hover:bg-orange-100 hover:scale-105"
              >
                ← {isKorean ? "돌아가기" : "Back"}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* 게임 소개 */}
        <div className="mb-8 text-center">
          <div className="mb-4 text-6xl">🎮</div>
          <h2 className="mb-3 text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            {isKorean ? "2048 게임" : "2048 Game"}
          </h2>
          <p className="text-lg font-medium text-slate-600">
            {isKorean ? "같은 숫자를 합쳐서 2048을 만드세요!" : "Merge same numbers to create 2048!"}
          </p>
        </div>

        {/* 게임 영역 */}
        <div className="rounded-3xl bg-white p-8 shadow-2xl border-4 border-orange-100">
          <Game2048 />
        </div>

        {/* 게임 설명 */}
        <div className="mt-8 rounded-3xl bg-gradient-to-br from-orange-50 to-pink-50 p-8 shadow-lg border-2 border-orange-100">
          <h3 className="mb-4 text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            {isKorean ? "🎯 게임 방법" : "🎯 How to Play"}
          </h3>
          <div className="space-y-3 text-slate-700 font-medium">
            <p className="flex items-start gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-sm font-bold text-white shadow-md">
                1
              </span>
              <span>
                {isKorean 
                  ? "키보드의 화살표 키 (↑↓←→) 또는 W/A/S/D 키를 사용하여 타일을 이동하세요."
                  : "Use arrow keys (↑↓←→) or W/A/S/D keys to move tiles."}
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-sm font-bold text-white shadow-md">
                2
              </span>
              <span>
                {isKorean
                  ? "같은 숫자의 타일이 만나면 하나로 합쳐지며 숫자가 두 배가 됩니다."
                  : "When two tiles with the same number touch, they merge into one and double."}
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-sm font-bold text-white shadow-md">
                3
              </span>
              <span>
                {isKorean
                  ? "타일을 합쳐서 2048 타일을 만드는 것이 목표입니다!"
                  : "The goal is to create the 2048 tile!"}
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-sm font-bold text-white shadow-md">
                4
              </span>
              <span>
                {isKorean
                  ? "더 이상 이동할 수 없게 되면 게임이 종료됩니다."
                  : "The game ends when no more moves are possible."}
              </span>
            </p>
          </div>
        </div>

        {/* 다른 게임 둘러보기 */}
        <div className="mt-8 text-center">
          <Link
            href={`/${locale}?category=게임`}
            className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            {isKorean ? "🎮 다른 게임 둘러보기" : "🎮 Explore More Games"}
          </Link>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="mt-12 border-t border-orange-100 bg-gradient-to-b from-orange-50 to-white py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm font-medium text-slate-500">
          © 2024 Toolbox. All rights reserved.
        </div>
      </footer>
      </div>
    </>
  );
}

