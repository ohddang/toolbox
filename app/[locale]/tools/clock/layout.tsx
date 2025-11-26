import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isKorean = locale === "ko";

  return {
    title: isKorean ? "시계 & 스톱워치 - Toolbox" : "Clock & Stopwatch - Toolbox",
    description: isKorean
      ? "큰 화면의 디지털 시계와 정밀한 스톱워치! 현재 시간을 한눈에 보거나 시간을 정확하게 측정하세요. 모바일, 태블릿, PC 모두 최적화되어 있습니다."
      : "Large digital clock and precise stopwatch! Check the current time at a glance or measure time accurately. Optimized for mobile, tablet, and PC.",
    keywords: isKorean
      ? ["시계", "스톱워치", "타이머", "디지털 시계", "온라인 시계", "무료 시계", "대형 시계", "시간 측정"]
      : ["clock", "stopwatch", "timer", "digital clock", "online clock", "free clock", "large clock", "time measurement"],
    openGraph: {
      title: isKorean ? "시계 & 스톱워치 - Toolbox" : "Clock & Stopwatch - Toolbox",
      description: isKorean
        ? "큰 화면의 디지털 시계와 정밀한 스톱워치"
        : "Large digital clock and precise stopwatch",
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      siteName: "Toolbox",
      images: [
        {
          url: "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 630,
          alt: isKorean ? "시계 & 스톱워치" : "Clock & Stopwatch",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isKorean ? "시계 & 스톱워치 - Toolbox" : "Clock & Stopwatch - Toolbox",
      description: isKorean
        ? "큰 화면의 디지털 시계와 정밀한 스톱워치"
        : "Large digital clock and precise stopwatch",
      images: ["https://images.unsplash.com/photo-1495364141860-b0d03eccd065?auto=format&fit=crop&w=1200&q=80"],
    },
    alternates: {
      canonical: `/${locale}/tools/clock`,
      languages: {
        ko: "/ko/tools/clock",
        en: "/en/tools/clock",
      },
    },
  };
}

export default function ClockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

