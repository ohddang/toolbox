"use client";

import ColorGame from "../../../components/ColorGame";
import Link from "next/link";
import { useParams } from "next/navigation";
import Script from "next/script";
import { LanguageSwitcher } from "../../../components/LanguageSwitcher";

export default function ColorFinderPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isKorean = locale === "ko";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: isKorean ? "색상 찾기 게임" : "Color Finder Game",
    description: isKorean
      ? "다른 색상의 칸을 찾는 재미있는 게임. 레벨이 올라갈수록 난이도가 증가합니다."
      : "Fun game to find the different colored square. Difficulty increases with each level.",
    genre: isKorean ? "두뇌 게임" : "Brain Game",
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
      ratingCount: "850",
    },
  };

  return (
    <>
      <Script
        id="structured-data-color-finder"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      {/* 헤더 */}
      <header className="border-b border-purple-100 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/${locale}`} className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-blue-500 shadow-md group-hover:scale-110 transition-transform">
                <span className="text-xl">🧰</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Toolbox
              </h1>
            </Link>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Link
                href={`/${locale}`}
                className="rounded-full bg-purple-50 px-5 py-2 text-sm font-bold text-purple-600 transition-all hover:bg-purple-100 hover:scale-105"
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
          <div className="mb-4 text-6xl">🎨</div>
          <h2 className="mb-3 text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {isKorean ? "색상 찾기 게임" : "Color Finder Game"}
          </h2>
          <p className="text-lg font-medium text-slate-600">
            {isKorean ? "다른 색상의 칸을 찾아보세요!" : "Find the different colored square!"}
          </p>
        </div>

        {/* 게임 영역 */}
        <div className="rounded-3xl bg-white p-8 shadow-2xl border-4 border-purple-100">
          <ColorGame />
        </div>

        {/* 게임 설명 */}
        <div className="mt-8 rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 p-8 shadow-lg border-2 border-purple-100">
          <h3 className="mb-4 text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {isKorean ? "🎯 게임 방법" : "🎯 How to Play"}
          </h3>
          <div className="space-y-3 text-slate-700 font-medium">
            <p className="flex items-start gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-blue-500 text-sm font-bold text-white shadow-md">
                1
              </span>
              <span>
                {isKorean 
                  ? "N×N 그리드에서 색상이 약간 다른 칸을 찾아 클릭하세요."
                  : "Find and click the square with a slightly different color in the N×N grid."}
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-blue-500 text-sm font-bold text-white shadow-md">
                2
              </span>
              <span>
                {isKorean
                  ? "제한 시간 내에 정답을 찾아야 합니다. 빠르게 찾을수록 보너스 점수!"
                  : "Find the answer within the time limit. Faster completion gives bonus points!"}
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-blue-500 text-sm font-bold text-white shadow-md">
                3
              </span>
              <span>
                {isKorean
                  ? "레벨이 올라갈수록 그리드가 커지고, 색상 차이가 줄어들며, 시간이 감소합니다."
                  : "As levels increase, grid size grows, color difference decreases, and time reduces."}
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-blue-500 text-sm font-bold text-white shadow-md">
                4
              </span>
              <span>
                {isKorean
                  ? "오답을 선택하거나 시간이 초과되면 게임이 종료됩니다."
                  : "The game ends when you select the wrong square or time runs out."}
              </span>
            </p>
          </div>

          {/* 팁 */}
          <div className="mt-6 rounded-2xl bg-blue-50 p-4 border border-blue-200">
            <p className="text-sm text-blue-800 font-medium">
              💡 {isKorean ? "팁: " : "Tip: "}
              {isKorean
                ? "화면을 약간 멀리하거나 눈을 가늘게 뜨면 색상 차이를 더 쉽게 찾을 수 있어요!"
                : "Try squinting or viewing from a distance to spot the color difference more easily!"}
            </p>
          </div>
        </div>

        {/* 다른 게임 둘러보기 */}
        <div className="mt-8 text-center">
          <Link
            href={`/${locale}?category=게임`}
            className="inline-block rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            {isKorean ? "🎮 다른 게임 둘러보기" : "🎮 Explore More Games"}
          </Link>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="mt-12 border-t border-purple-100 bg-gradient-to-b from-purple-50 to-white py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm font-medium text-slate-500">
          © 2024 Toolbox. All rights reserved.
        </div>
      </footer>
      </div>
    </>
  );
}

