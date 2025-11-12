import { MetadataRoute } from "next";
import { type Locale } from "../i18n/settings";

export default async function manifest({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<MetadataRoute.Manifest> {
  const { locale } = await params;

  const manifestData: Record<
    Locale,
    {
      name: string;
      short_name: string;
      description: string;
    }
  > = {
    ko: {
      name: "Bullora - AI & Tech Innovation Platform",
      short_name: "Bullora",
      description:
        "최첨단 AI 기술과 혁신적인 솔루션을 제공하는 선도적인 기술 플랫폼",
    },
    en: {
      name: "Bullora - AI & Tech Innovation Platform",
      short_name: "Bullora",
      description:
        "A leading technology platform providing cutting-edge AI technology and innovative solutions",
    },
  };

  return {
    name: manifestData[locale].name,
    short_name: manifestData[locale].short_name,
    description: manifestData[locale].description,
    start_url: `/${locale}`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    lang: locale,
    dir: "ltr",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

