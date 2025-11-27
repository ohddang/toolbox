import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isKorean = locale === "ko";

  return {
    title: isKorean ? "사다리 게임 - Toolbox" : "Ladder Game - Toolbox",
    description: isKorean
      ? "공정한 추첨과 선택을 위한 사다리 게임! 참가자 이름과 결과를 설정하고 랜덤 사다리를 생성하세요. 애니메이션으로 재미있게 결과를 확인할 수 있습니다."
      : "Fair lottery and choice with Ladder Game! Set participant names and results, generate random ladders. Watch animated results for fun!",
    keywords: isKorean
      ? ["사다리 게임", "사다리타기", "추첨", "랜덤 선택", "공정 추첨", "온라인 사다리", "무료 게임", "파티 게임"]
      : ["ladder game", "ghost leg", "lottery", "random choice", "fair draw", "online ladder", "free game", "party game"],
    openGraph: {
      title: isKorean ? "사다리 게임 - Toolbox" : "Ladder Game - Toolbox",
      description: isKorean
        ? "공정한 추첨, 재미있는 선택! 사다리 타기로 결정하세요"
        : "Fair lottery, fun choice! Decide with ladder game",
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      siteName: "Toolbox",
      images: [
        {
          url: "https://images.unsplash.com/photo-1522158637959-30385a09e0da?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 630,
          alt: isKorean ? "사다리 게임" : "Ladder Game",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isKorean ? "사다리 게임 - Toolbox" : "Ladder Game - Toolbox",
      description: isKorean
        ? "공정한 추첨, 재미있는 선택! 사다리 타기로 결정하세요"
        : "Fair lottery, fun choice! Decide with ladder game",
      images: ["https://images.unsplash.com/photo-1522158637959-30385a09e0da?auto=format&fit=crop&w=1200&q=80"],
    },
    alternates: {
      canonical: `/${locale}/games/ladder`,
      languages: {
        ko: "/ko/games/ladder",
        en: "/en/games/ladder",
      },
    },
  };
}

export default function LadderGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

