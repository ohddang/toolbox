import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isKorean = locale === "ko";

  return {
    title: isKorean ? "에겐지수 테토지수 테스트 - Toolbox" : "Estrogen/Testosterone Test - Toolbox",
    description: isKorean
      ? "나의 에겐 성향과 테토 성향은? 감성적인 에겐 지수와 논리적인 테토 지수를 측정하는 재미있는 성격 테스트입니다."
      : "What's your estrogen and testosterone tendencies? Fun personality test measuring emotional estrogen and logical testosterone indices.",
    keywords: isKorean
      ? ["에겐지수", "테토지수", "에스트로겐", "테스토스테론", "성격 테스트", "무료 테스트", "밈 테스트"]
      : ["estrogen index", "testosterone index", "personality test", "gender traits", "free test", "meme test"],
    openGraph: {
      title: isKorean ? "에겐지수 테토지수 테스트 - Toolbox" : "Estrogen/Testosterone Test - Toolbox",
      description: isKorean
        ? "나의 에겐 성향과 테토 성향은?"
        : "What's your estrogen and testosterone tendencies?",
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      siteName: "Toolbox",
      images: [
        {
          url: "https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 630,
          alt: isKorean ? "에겐지수 테토지수 테스트" : "Estrogen/Testosterone Test",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isKorean ? "에겐지수 테토지수 테스트 - Toolbox" : "Estrogen/Testosterone Test - Toolbox",
      description: isKorean
        ? "나의 에겐 성향과 테토 성향은?"
        : "What's your estrogen and testosterone tendencies?",
      images: ["https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=1200&q=80"],
    },
    alternates: {
      canonical: `/${locale}/tests/estrogen-testosterone`,
      languages: {
        ko: "/ko/tests/estrogen-testosterone",
        en: "/en/tests/estrogen-testosterone",
      },
    },
  };
}

export default function EstrogenTestosteroneTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

