import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isKorean = locale === "ko";

  return {
    title: isKorean ? "MBTI 성격 테스트 - Toolbox" : "MBTI Personality Test - Toolbox",
    description: isKorean
      ? "16가지 성격 유형 중 나는 어떤 유형일까요? 간단한 질문으로 알아보는 MBTI 성격 테스트. 외향형/내향형, 감각형/직관형, 사고형/감정형, 판단형/인식형을 분석합니다."
      : "Which of the 16 personality types are you? Discover through simple questions. Analyzes Extraverted/Introverted, Sensing/Intuitive, Thinking/Feeling, Judging/Perceiving.",
    keywords: isKorean
      ? ["MBTI", "성격 테스트", "성격 유형", "16가지 성격", "심리 테스트", "MBTI 검사", "무료 테스트"]
      : ["MBTI", "personality test", "personality type", "16 personalities", "psychology test", "MBTI assessment", "free test"],
    openGraph: {
      title: isKorean ? "MBTI 성격 테스트 - Toolbox" : "MBTI Personality Test - Toolbox",
      description: isKorean
        ? "16가지 성격 유형 중 나는 어떤 유형일까요?"
        : "Which of the 16 personality types are you?",
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      siteName: "Toolbox",
      images: [
        {
          url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 630,
          alt: isKorean ? "MBTI 성격 테스트" : "MBTI Personality Test",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isKorean ? "MBTI 성격 테스트 - Toolbox" : "MBTI Personality Test - Toolbox",
      description: isKorean
        ? "16가지 성격 유형 중 나는 어떤 유형일까요?"
        : "Which of the 16 personality types are you?",
      images: ["https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80"],
    },
    alternates: {
      canonical: `/${locale}/tests/mbti`,
      languages: {
        ko: "/ko/tests/mbti",
        en: "/en/tests/mbti",
      },
    },
  };
}

export default function MBTITestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

