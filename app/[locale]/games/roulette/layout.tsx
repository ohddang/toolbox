import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKorean = locale === "ko";

  const title = isKorean ? "룰렛 게임 - Toolbox" : "Roulette Game - Toolbox";
  const description = isKorean
    ? "가중치 기반 공정한 룰렛 게임. 항목과 확률을 설정하고 멋진 애니메이션으로 결과를 확인하세요. 추첨, 경품, 팀 나누기 등 다양한 용도로 활용 가능!"
    : "Fair weighted roulette game. Set items and probabilities, watch stunning animations to see results. Perfect for draws, prizes, team splitting and more!";

  return {
    title,
    description,
    keywords: isKorean
      ? "룰렛, 룰렛게임, 추첨, 가중치 룰렛, 확률 룰렛, 경품 추첨, 랜덤 선택, 온라인 룰렛, 무료 룰렛"
      : "roulette, roulette game, lottery, weighted roulette, probability roulette, prize draw, random picker, online roulette, free roulette",
    openGraph: {
      title,
      description,
      type: "website",
      locale: isKorean ? "ko_KR" : "en_US",
      siteName: "Toolbox",
      images: [
        {
          url: "/images/roulette-og.png",
          width: 1200,
          height: 630,
          alt: isKorean ? "룰렛 게임" : "Roulette Game",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/roulette-og.png"],
    },
    alternates: {
      canonical: `/${locale}/games/roulette`,
      languages: {
        ko: "/ko/games/roulette",
        en: "/en/games/roulette",
      },
    },
  };
}

export default function RouletteGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

