import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isKorean = locale === "ko";

  return {
    title: isKorean ? "색상 찾기 게임 - Toolbox" : "Color Finder Game - Toolbox",
    description: isKorean
      ? "다른 색상의 칸을 찾는 재미있는 게임! 레벨이 올라갈수록 색상 구분이 어려워지는 중독성 있는 두뇌 트레이닝 게임입니다."
      : "Fun game to find the different colored square! Addictive brain training game where difficulty increases with each level.",
    keywords: isKorean
      ? ["색상 찾기", "색상 게임", "두뇌 게임", "브라우저 게임", "무료 게임", "집중력 게임", "색감 테스트", "온라인 게임"]
      : ["color finder", "color game", "brain game", "browser game", "free game", "concentration game", "color perception test", "online game"],
    openGraph: {
      title: isKorean ? "색상 찾기 게임 - Toolbox" : "Color Finder Game - Toolbox",
      description: isKorean
        ? "다른 색상의 칸을 찾아보세요! 중독성 있는 두뇌 트레이닝 게임"
        : "Find the different colored square! Addictive brain training game",
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      siteName: "Toolbox",
      images: [
        {
          url: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 630,
          alt: isKorean ? "색상 찾기 게임" : "Color Finder Game",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isKorean ? "색상 찾기 게임 - Toolbox" : "Color Finder Game - Toolbox",
      description: isKorean
        ? "다른 색상의 칸을 찾아보세요!"
        : "Find the different colored square!",
      images: ["https://images.unsplash.com/photo-1525909002-1b05e0c869d8?auto=format&fit=crop&w=1200&q=80"],
    },
    alternates: {
      canonical: `/${locale}/games/color-finder`,
      languages: {
        ko: "/ko/games/color-finder",
        en: "/en/games/color-finder",
      },
    },
  };
}

export default function ColorFinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

