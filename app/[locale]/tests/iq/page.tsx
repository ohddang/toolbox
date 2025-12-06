"use client";

import IQTest from "@/app/components/IQTest";
import Link from "next/link";
import { useParams } from "next/navigation";
import Script from "next/script";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";

export default function IQTestPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isKorean = locale === "ko";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: isKorean ? "IQ 테스트" : "IQ Test",
    description: isKorean
      ? "논리, 수리, 패턴 인식 능력을 측정하는 IQ 테스트"
      : "IQ test measuring logic, math, and pattern recognition abilities",
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
        id="structured-data-iq-test"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
        {/* 헤더 */}
        <header className="border-b border-blue-100 bg-white/90 backdrop-blur-sm shadow-sm">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href={`/${locale}`} className="flex items-center gap-2 md:gap-3 group">
                <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 shadow-md group-hover:scale-110 transition-transform">
                  <span className="text-lg md:text-xl">🧰</span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Toolbag
                </h1>
              </Link>
              <div className="flex items-center gap-2 md:gap-4">
                <div className="hidden md:block">
                  <LanguageSwitcher />
                </div>
                <Link
                  href={`/${locale}`}
                  className="rounded-full bg-blue-50 px-3 py-2 md:px-5 text-xs md:text-sm font-bold text-blue-600 transition-all hover:bg-blue-100 hover:scale-105"
                >
                  ← {isKorean ? "돌아가기" : "Back"}
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* 메인 컨텐츠 */}
        <main>
          <IQTest />
        </main>

        {/* 푸터 */}
        <footer className="mt-12 border-t border-blue-100 bg-gradient-to-b from-blue-50 to-white py-8">
          <div className="mx-auto max-w-7xl px-6 text-center text-sm font-medium text-slate-500">
            © 2025 Toolbag. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}

