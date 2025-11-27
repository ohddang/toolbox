import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { locales, type Locale } from "../i18n/settings";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { Analytics } from "../components/Analytics";

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
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params as { locale: Locale };

  const metadata: Record<Locale, Metadata> = {
    ko: {
      title:
        "Toolbag - 유틸리티 소프트웨어 모음 | 게임, 유틸리티, 최신 정보",
      description:
        "Toolbag는 게임 도구, 시스템 유틸리티, 생산성 소프트웨어 등 다양한 유용한 프로그램을 한 곳에서 찾을 수 있는 플랫폼입니다. 무료 및 유료 소프트웨어를 쉽게 다운로드하고 최신 정보를 확인하세요.",
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
        title: "Toolbag - 유틸리티 소프트웨어 모음",
        description:
          "유용한 소프트웨어를 한 곳에서 찾아보세요. 게임 도구부터 유틸리티까지!",
        url: "https://toolbag.vercel.app/ko",
        siteName: "Toolbag",
        locale: "ko_KR",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Toolbag - 유틸리티 소프트웨어 모음",
        description:
          "유용한 소프트웨어를 한 곳에서 찾아보세요. 게임 도구부터 유틸리티까지!",
      },
    },
    en: {
      title: "Toolbag - Utility Software Collection | Games, Utilities, Latest News",
      description:
        "Toolbag is a platform where you can find various useful programs including game tools, system utilities, and productivity software in one place. Easily download free and paid software and check the latest information.",
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
        title: "Toolbag - Utility Software Collection",
        description:
          "Find useful software in one place. From game tools to utilities!",
        url: "https://toolbag.vercel.app/en",
        siteName: "Toolbag",
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Toolbag - Utility Software Collection",
        description:
          "Find useful software in one place. From game tools to utilities!",
      },
    },
  };

  return {
    ...metadata[locale],
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
      apple: "/favicon.svg",
    },
    authors: [{ name: "Toolbag" }],
    creator: "Toolbag",
    publisher: "Toolbag",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://toolbag.vercel.app"),
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
  params: Promise<{ locale: string }>;
}>): Promise<ReactElement> {
  const { locale } = await params;

  // 유효한 로케일인지 확인
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MWXHCWGP6N" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-MWXHCWGP6N');`,
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TXH4PD5T');`,
          }}
        />
        <link rel="canonical" href={`https://toolbag.vercel.app/${locale}`} />
        <link rel="alternate" hrefLang="ko" href="https://toolbag.vercel.app/ko" />
        <link rel="alternate" hrefLang="en" href="https://toolbag.vercel.app/en" />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://toolbag.vercel.app/ko"
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TXH4PD5T"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Analytics />
        {children}
      </body>
    </html>
  );
}

