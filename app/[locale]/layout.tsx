import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { locales, type Locale } from "../i18n/settings";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const metadata: Record<Locale, Metadata> = {
    ko: {
      title:
        "Bullora - AI & Tech Innovation Platform | AI인프라, 데이터, 반도체 솔루션",
      description:
        "Bullora는 AI인프라, AI데이터, 반도체, 클라우드, 머신러닝, 딥러닝, 컴퓨터비전, 자연어처리 등 최첨단 AI 기술과 혁신적인 솔루션을 제공하는 선도적인 기술 플랫폼입니다.",
      keywords: [
        "AI인프라",
        "AI데이터",
        "반도체",
        "클라우드",
        "머신러닝",
        "딥러닝",
        "컴퓨터비전",
        "자연어처리",
        "로보틱스",
        "양자컴퓨팅",
        "블록체인",
        "AI솔루션",
        "기술혁신",
      ],
      openGraph: {
        title: "Bullora - AI & Tech Innovation Platform",
        description:
          "최첨단 AI 기술과 혁신적인 솔루션으로 비즈니스의 미래를 만들어갑니다",
        url: "https://bullora.com/ko",
        siteName: "Bullora",
        locale: "ko_KR",
        type: "website",
        images: [
          {
            url: "/og-image.jpg",
            width: 1200,
            height: 630,
            alt: "Bullora - AI & Tech Innovation Platform",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Bullora - AI & Tech Innovation Platform",
        description:
          "최첨단 AI 기술과 혁신적인 솔루션으로 비즈니스의 미래를 만들어갑니다",
        images: ["/og-image.jpg"],
      },
    },
    en: {
      title: "Bullora - AI & Tech Innovation Platform | AI Infrastructure, Data, Semiconductor Solutions",
      description:
        "Bullora is a leading technology platform providing cutting-edge AI technology and innovative solutions including AI infrastructure, AI data, semiconductors, cloud, machine learning, deep learning, computer vision, and natural language processing.",
      keywords: [
        "AI Infrastructure",
        "AI Data",
        "Semiconductor",
        "Cloud",
        "Machine Learning",
        "Deep Learning",
        "Computer Vision",
        "Natural Language Processing",
        "Robotics",
        "Quantum Computing",
        "Blockchain",
        "AI Solutions",
        "Tech Innovation",
      ],
      openGraph: {
        title: "Bullora - AI & Tech Innovation Platform",
        description:
          "Creating the future of business with cutting-edge AI technology and innovative solutions",
        url: "https://bullora.com/en",
        siteName: "Bullora",
        locale: "en_US",
        type: "website",
        images: [
          {
            url: "/og-image.jpg",
            width: 1200,
            height: 630,
            alt: "Bullora - AI & Tech Innovation Platform",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Bullora - AI & Tech Innovation Platform",
        description:
          "Creating the future of business with cutting-edge AI technology and innovative solutions",
        images: ["/og-image.jpg"],
      },
    },
  };

  return {
    ...metadata[locale],
    authors: [{ name: "Bullora" }],
    creator: "Bullora",
    publisher: "Bullora",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://bullora.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ko: "/ko",
        en: "/en",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "google-site-verification-code",
      yandex: "yandex-verification-code",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;

  // 유효한 로케일인지 확인
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <link rel="canonical" href={`https://bullora.com/${locale}`} />
        <link rel="alternate" hrefLang="ko" href="https://bullora.com/ko" />
        <link rel="alternate" hrefLang="en" href="https://bullora.com/en" />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://bullora.com/ko"
        />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

