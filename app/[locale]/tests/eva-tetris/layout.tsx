import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isKorean = locale === "ko";

  return {
    title: isKorean ? "에겐지수 테토지수 테스트 - Toolbox" : "EVA Sync & Tetris Test - Toolbox",
    description: isKorean
      ? "나의 사회 동조율과 상황 적응력은? 에반게리온의 동조율처럼 사회적 상황 적응도를 측정하고, 테트리스처럼 상황에 얼마나 유연하게 적응하는지 알아보세요!"
      : "What's your social sync rate and adaptability? Measure social adaptation like Evangelion's sync rate and how flexibly you adapt like Tetris!",
    keywords: isKorean
      ? ["에겐지수", "테토지수", "동조율", "적응력", "심리 테스트", "무료 테스트", "밈 테스트"]
      : ["EVA index", "Tetris index", "sync rate", "adaptability", "psychology test", "free test", "meme test"],
    openGraph: {
      title: isKorean ? "에겐지수 테토지수 테스트 - Toolbox" : "EVA Sync & Tetris Test - Toolbox",
      description: isKorean
        ? "나의 사회 동조율과 상황 적응력은?"
        : "What's your social sync rate and adaptability?",
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      siteName: "Toolbox",
      images: [
        {
          url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 630,
          alt: isKorean ? "에겐지수 테토지수 테스트" : "EVA Sync & Tetris Test",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isKorean ? "에겐지수 테토지수 테스트 - Toolbox" : "EVA Sync & Tetris Test - Toolbox",
      description: isKorean
        ? "나의 사회 동조율과 상황 적응력은?"
        : "What's your social sync rate and adaptability?",
      images: ["https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80"],
    },
    alternates: {
      canonical: `/${locale}/tests/eva-tetris`,
      languages: {
        ko: "/ko/tests/eva-tetris",
        en: "/en/tests/eva-tetris",
      },
    },
  };
}

export default function EvaTetrisTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

