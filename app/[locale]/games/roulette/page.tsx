"use client";

import RouletteGame from "../../../components/RouletteGame";
import Link from "next/link";
import { useParams } from "next/navigation";
import Script from "next/script";
import { LanguageSwitcher } from "../../../components/LanguageSwitcher";

export default function RouletteGamePage() {
  const params = useParams();
  const locale = params.locale as string;
  const isKorean = locale === "ko";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: isKorean ? "룰렛 게임" : "Roulette Game",
    description: isKorean
      ? "가중치 기반 공정한 룰렛 게임. 항목과 확률을 설정하고 멋진 애니메이션으로 결과를 확인하세요."
      : "Fair weighted roulette game. Set items and probabilities, watch stunning animations to see results.",
    genre: isKorean ? "추첨 게임" : "Lottery Game",
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
      ratingCount: "950",
    },
  };

  return (
    <>
      <Script
        id="structured-data-roulette"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50">
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
            <div className="mb-4 text-6xl">🎰</div>
            <h2 className="mb-3 text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              {isKorean ? "룰렛 게임" : "Roulette Game"}
            </h2>
            <p className="text-lg font-medium text-slate-600">
              {isKorean ? "가중치 기반 공정한 추첨! 확률을 조정하고 운을 시험하세요" : "Fair weighted lottery! Adjust probabilities and test your luck"}
            </p>
          </div>

          {/* 게임 영역 */}
          <div className="rounded-3xl bg-white p-8 shadow-2xl border-4 border-orange-100">
            <RouletteGame locale={locale} />
          </div>

          {/* 게임 설명 */}
          <div className="mt-8 rounded-3xl bg-gradient-to-br from-orange-50 to-pink-50 p-8 shadow-lg border-2 border-orange-100">
            <h3 className="mb-4 text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              {isKorean ? "🎯 사용 방법" : "🎯 How to Use"}
            </h3>
            <div className="space-y-3 text-slate-700 font-medium">
              <p className="flex items-start gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-sm font-bold text-white shadow-md">
                  1
                </span>
                <span>
                  {isKorean ? "각 항목의 이름과 가중치를 설정하세요" : "Set name and weight for each item"}
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-sm font-bold text-white shadow-md">
                  2
                </span>
                <span>
                  {isKorean ? "가중치가 높을수록 당첨 확률이 높아집니다" : "Higher weight means higher winning probability"}
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-sm font-bold text-white shadow-md">
                  3
                </span>
                <span>
                  {isKorean ? '"룰렛 시작하기" 버튼으로 룰렛 화면을 생성하세요' : 'Click "Start Roulette" to generate the wheel'}
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-sm font-bold text-white shadow-md">
                  4
                </span>
                <span>
                  {isKorean ? '"룰렛 돌리기" 버튼을 클릭하여 추첨을 시작하세요' : 'Click "Spin the Wheel" to start the draw'}
                </span>
              </p>
            </div>

            <div className="mt-6 rounded-2xl bg-white/60 p-4 border border-orange-200">
              <div className="font-bold text-orange-600 mb-2">
                {isKorean ? "💡 팁" : "💡 Tips"}
              </div>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>{isKorean ? "• 최소 2개, 최대 12개의 항목을 설정할 수 있습니다" : "• Min 2, Max 12 items allowed"}</li>
                <li>{isKorean ? "• 가중치는 1-100 사이의 값으로 설정하세요" : "• Set weight between 1-100"}</li>
                <li>{isKorean ? "• 이모지를 사용하여 항목을 더 재미있게 만들어보세요!" : "• Use emojis to make items more fun!"}</li>
              </ul>
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

