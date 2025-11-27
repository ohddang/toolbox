import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isKorean = locale === "ko";

  return {
    title: isKorean ? "IQ 테스트 - Toolbox" : "IQ Test - Toolbox",
    description: isKorean
      ? "당신의 지능 지수를 측정해보세요! 논리, 수리, 공간 지각 능력을 종합적으로 평가하는 전문 IQ 테스트입니다."
      : "Measure your intelligence quotient! Professional IQ test that comprehensively evaluates logic, math, and spatial perception.",
    keywords: isKorean
      ? ["IQ 테스트", "지능 테스트", "IQ", "논리 테스트", "수리 능력", "무료 테스트", "지능 지수"]
      : ["IQ test", "intelligence test", "IQ", "logic test", "math ability", "free test", "intelligence quotient"],
    openGraph: {
      title: isKorean ? "IQ 테스트 - Toolbox" : "IQ Test - Toolbox",
      description: isKorean
        ? "당신의 지능 지수를 측정해보세요!"
        : "Measure your intelligence quotient!",
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      siteName: "Toolbox",
      images: [
        {
          url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 630,
          alt: isKorean ? "IQ 테스트" : "IQ Test",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isKorean ? "IQ 테스트 - Toolbox" : "IQ Test - Toolbox",
      description: isKorean
        ? "당신의 지능 지수를 측정해보세요!"
        : "Measure your intelligence quotient!",
      images: ["https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80"],
    },
    alternates: {
      canonical: `/${locale}/tests/iq`,
      languages: {
        ko: "/ko/tests/iq",
        en: "/en/tests/iq",
      },
    },
  };
}

export default function IQTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

