import { MetadataRoute } from "next";
import { locales } from "./i18n/settings";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://toolbox.com";

  // 게임 페이지들
  const games = [
    "/games/2048",
    "/games/ladder",
    "/games/roulette",
    "/games/color-finder",
  ];

  // 유틸리티 페이지들
  const tools = [
    "/tools/clock",
  ];

  // 테스트 페이지들
  const tests = [
    "/tests/iq",
    "/tests/mbti",
    "/tests/estrogen-testosterone",
  ];

  const routes = locales.flatMap((locale) => [
    // 메인 페이지
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}`])
        ),
      },
    },
    // 게임 페이지들
    ...games.map((game) => ({
      url: `${baseUrl}/${locale}${game}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${game}`])
        ),
      },
    })),
    // 유틸리티 페이지들
    ...tools.map((tool) => ({
      url: `${baseUrl}/${locale}${tool}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${tool}`])
        ),
      },
    })),
    // 테스트 페이지들
    ...tests.map((test) => ({
      url: `${baseUrl}/${locale}${test}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${test}`])
        ),
      },
    })),
  ]);

  return routes;
}

