"use client";

import Clock from "@/app/components/Clock";
import Link from "next/link";
import Script from "next/script";
import { useParams } from "next/navigation";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";

export default function ClockPage() {
  const params = useParams();
  const locale = (params.locale as string) || "ko";
  const isKorean = locale === "ko";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: isKorean ? "시계 & 스톱워치" : "Clock & Stopwatch",
    description: isKorean
      ? "큰 화면의 디지털 시계와 정밀한 스톱워치. 모든 기기에서 사용 가능한 무료 온라인 도구"
      : "Large digital clock and precise stopwatch. Free online tool available on all devices",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1200",
    },
  };

  return (
    <>
      <Script
        id="structured-data-clock"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* 헤더 */}
        <header className="border-b border-purple-500/20 bg-slate-900/50 backdrop-blur-sm shadow-lg">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href={`/${locale}`} className="flex items-center gap-2 md:gap-3 group">
                <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 shadow-md group-hover:scale-110 transition-transform">
                  <span className="text-lg md:text-xl">🧰</span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Toolbag
                </h1>
              </Link>
              <div className="flex items-center gap-2 md:gap-4">
                <div className="hidden md:block">
                  <LanguageSwitcher />
                </div>
                <Link
                  href={`/${locale}`}
                  className="rounded-full bg-purple-500/20 px-3 py-2 md:px-5 text-xs md:text-sm font-bold text-purple-300 transition-all hover:bg-purple-500/30 hover:scale-105 backdrop-blur-sm"
                >
                  ← {isKorean ? "돌아가기" : "Back"}
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* 메인 컨텐츠 */}
        <Clock locale={locale} />
      </div>
    </>
  );
}

