"use client";

import MBTITest from "@/app/components/MBTITest";
import Link from "next/link";
import { useParams } from "next/navigation";
import Script from "next/script";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";

export default function MBTITestPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isKorean = locale === "ko";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: isKorean ? "MBTI 성격 테스트" : "MBTI Personality Test",
    description: isKorean
      ? "16가지 성격 유형 중 나는 어떤 유형일까요? 간단한 질문으로 알아보는 MBTI 성격 테스트"
      : "Which of the 16 personality types are you? Discover through simple MBTI personality test",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <Script
        id="structured-data-mbti-test"
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
        <main>
          <MBTITest />
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

