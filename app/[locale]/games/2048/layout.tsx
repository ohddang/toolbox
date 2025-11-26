import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isKorean = locale === "ko";

  return {
    title: isKorean ? "2048 게임 - Toolbox" : "2048 Game - Toolbox",
    description: isKorean
      ? "중독성 있는 2048 퍼즐 게임을 무료로 즐기세요! 같은 숫자를 합쳐서 2048 타일을 만드는 전략 퍼즐 게임입니다. 키보드나 터치로 간편하게 플레이하세요."
      : "Play the addictive 2048 puzzle game for free! Merge same numbers to create the 2048 tile. Strategic puzzle game with keyboard and touch controls.",
    keywords: isKorean
      ? ["2048", "2048 게임", "퍼즐 게임", "브라우저 게임", "무료 게임", "숫자 게임", "전략 게임", "온라인 게임"]
      : ["2048", "2048 game", "puzzle game", "browser game", "free game", "number game", "strategy game", "online game"],
    openGraph: {
      title: isKorean ? "2048 게임 - Toolbox" : "2048 Game - Toolbox",
      description: isKorean
        ? "같은 숫자를 합쳐서 2048을 만드세요! 중독성 있는 퍼즐 게임"
        : "Merge same numbers to create 2048! Addictive puzzle game",
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      siteName: "Toolbox",
      images: [
        {
          url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 630,
          alt: isKorean ? "2048 게임" : "2048 Game",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isKorean ? "2048 게임 - Toolbox" : "2048 Game - Toolbox",
      description: isKorean
        ? "같은 숫자를 합쳐서 2048을 만드세요!"
        : "Merge same numbers to create 2048!",
      images: ["https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80"],
    },
    alternates: {
      canonical: `/${locale}/games/2048`,
      languages: {
        ko: "/ko/games/2048",
        en: "/en/games/2048",
      },
    },
  };
}

export default function Game2048Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

