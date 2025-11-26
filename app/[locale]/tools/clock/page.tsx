"use client";

import Clock from "@/app/components/Clock";
import Script from "next/script";
import { useParams } from "next/navigation";

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
      <Clock locale={locale} />
    </>
  );
}

