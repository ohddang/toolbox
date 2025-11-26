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
        "Toolbox - 유틸리티 소프트웨어 모음 | 게임, 유틸리티, 최신 정보",
      description:
        "Toolbox는 게임 도구, 시스템 유틸리티, 생산성 소프트웨어 등 다양한 유용한 프로그램을 한 곳에서 찾을 수 있는 플랫폼입니다. 무료 및 유료 소프트웨어를 쉽게 다운로드하고 최신 정보를 확인하세요.",
      keywords: [
        "유틸리티 소프트웨어",
        "게임 도구",
        "시스템 최적화",
        "파일 관리",
        "생산성",
        "미디어 도구",
        "개발 도구",
        "무료 소프트웨어",
        "게임 오버레이",
        "녹화 프로그램",
        "스트리밍",
        "소프트웨어 다운로드",
      ],
      openGraph: {
        title: "Toolbox - 유틸리티 소프트웨어 모음",
        description:
          "유용한 소프트웨어를 한 곳에서 찾아보세요. 게임 도구부터 유틸리티까지!",
        url: "https://toolbox.com/ko",
        siteName: "Toolbox",
        locale: "ko_KR",
        type: "website",
        images: [
          {
            url: "/og-image.jpg",
            width: 1200,
            height: 630,
            alt: "Toolbox - 유틸리티 소프트웨어 모음",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Toolbox - 유틸리티 소프트웨어 모음",
        description:
          "유용한 소프트웨어를 한 곳에서 찾아보세요. 게임 도구부터 유틸리티까지!",
        images: ["/og-image.jpg"],
      },
    },
    en: {
      title: "Toolbox - Utility Software Collection | Games, Utilities, Latest News",
      description:
        "Toolbox is a platform where you can find various useful programs including game tools, system utilities, and productivity software in one place. Easily download free and paid software and check the latest information.",
      keywords: [
        "Utility Software",
        "Game Tools",
        "System Optimization",
        "File Management",
        "Productivity",
        "Media Tools",
        "Developer Tools",
        "Free Software",
        "Game Overlay",
        "Recording Software",
        "Streaming",
        "Software Download",
      ],
      openGraph: {
        title: "Toolbox - Utility Software Collection",
        description:
          "Find useful software in one place. From game tools to utilities!",
        url: "https://toolbox.com/en",
        siteName: "Toolbox",
        locale: "en_US",
        type: "website",
        images: [
          {
            url: "/og-image.jpg",
            width: 1200,
            height: 630,
            alt: "Toolbox - Utility Software Collection",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Toolbox - Utility Software Collection",
        description:
          "Find useful software in one place. From game tools to utilities!",
        images: ["/og-image.jpg"],
      },
    },
  };

  return {
    ...metadata[locale],
    authors: [{ name: "Toolbox" }],
    creator: "Toolbox",
    publisher: "Toolbox",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://toolbox.com"),
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
        <link rel="canonical" href={`https://toolbox.com/${locale}`} />
        <link rel="alternate" hrefLang="ko" href="https://toolbox.com/ko" />
        <link rel="alternate" hrefLang="en" href="https://toolbox.com/en" />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://toolbox.com/ko"
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

