"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
} from "../structured-data";
import { useTranslation } from "../i18n/client";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { DisplayAd, InFeedAd } from "../components/AdSense";
import { StructuredData } from "../components/StructuredData";

type MainCategory = "전체" | "게임" | "유틸리티" | "테스트";

interface Tool {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  mainCategory: MainCategory;
  tags: string[];
  price: "무료" | "유료" | "프리미엄";
  downloadUrl?: string;
  gameUrl?: string;
  date: string;
}

const tools: Tool[] = [
  // 게임 카테고리
  {
    id: 1,
    title: "2048 게임",
    description:
      "중독성 있는 퍼즐 게임! 같은 숫자를 합쳐서 2048 타일을 만드세요. 간단하지만 전략적인 사고가 필요한 클래식 게임입니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "게임",
    tags: ["퍼즐", "전략", "클래식"],
    price: "무료",
    gameUrl: "/games/2048",
    date: "2024-11-26",
  },
  {
    id: 2,
    title: "사다리 게임",
    description:
      "공정한 추첨이 필요할 때! 참가자와 결과를 설정하고 사다리를 타세요. 애니메이션으로 재미있게 결과를 확인할 수 있습니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1522158637959-30385a09e0da?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "게임",
    tags: ["추첨", "사다리타기", "공정"],
    price: "무료",
    gameUrl: "/games/ladder",
    date: "2024-11-26",
  },
  {
    id: 16,
    title: "룰렛 게임",
    description:
      "가중치 기반 공정한 룰렛! 항목과 확률을 자유롭게 설정하고 멋진 애니메이션으로 추첨하세요. 경품, 팀 나누기, 랜덤 선택 등 다양하게 활용 가능합니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "게임",
    tags: ["룰렛", "추첨", "가중치"],
    price: "무료",
    gameUrl: "/games/roulette",
    date: "2024-11-26",
  },
  {
    id: 17,
    title: "색상 찾기 게임",
    description:
      "다른 색상의 칸을 찾는 두뇌 트레이닝 게임! 레벨이 올라갈수록 그리드가 커지고 색상 차이가 줄어들어 난이도가 증가합니다. 집중력과 색감을 테스트해보세요!",
    imageUrl:
      "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "게임",
    tags: ["두뇌게임", "색감", "집중력"],
    price: "무료",
    gameUrl: "/games/color-finder",
    date: "2024-11-27",
  },
  {
    id: 100,
    title: "시계 & 스톱워치",
    description:
      "큰 화면의 디지털 시계와 정밀한 스톱워치! 현재 시간을 한눈에 보거나 시간을 측정하세요. 모바일과 PC 모두 최적화되어 있습니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "유틸리티",
    tags: ["시계", "스톱워치", "타이머"],
    price: "무료",
    gameUrl: "/tools/clock",
    date: "2024-11-26",
  },

  // 테스트 카테고리
  {
    id: 12,
    title: "IQ 테스트",
    description:
      "당신의 지능 지수를 측정해보세요! 논리, 수리, 공간 지각 능력을 종합적으로 평가하는 전문 IQ 테스트입니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "테스트",
    tags: ["IQ", "지능", "논리"],
    price: "무료",
    gameUrl: "/tests/iq",
    date: "2024-11-27",
  },
  {
    id: 13,
    title: "MBTI 성격 테스트",
    description:
      "16가지 성격 유형 중 나는 어떤 유형일까요? 세계에서 가장 신뢰받는 성격 유형 검사를 경험해보세요.",
    imageUrl:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "테스트",
    tags: ["MBTI", "성격", "유형"],
    price: "무료",
    gameUrl: "/tests/mbti",
    date: "2024-11-27",
  },
  {
    id: 20,
    title: "에겐지수 테토지수 테스트",
    description:
      "나의 에겐 성향과 테토 성향은? 감성적인 에겐 지수와 논리적인 테토 지수를 측정하는 재미있는 성격 테스트!",
    imageUrl:
      "https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "테스트",
    tags: ["에겐", "테토", "성향"],
    price: "무료",
    gameUrl: "/tests/estrogen-testosterone",
    date: "2024-11-27",
  },
];

export default function Home() {
  const { t, locale } = useTranslation();
  const isKorean = locale === "ko";
  const searchParams = useSearchParams();
  const [selectedMainCategory, setSelectedMainCategory] =
    useState<MainCategory>("전체");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // 언어에 따라 mainCategories 필터링
  const mainCategories: MainCategory[] = ["전체", "게임", "유틸리티", "테스트"];

  // URL 파라미터에서 카테고리 읽기
  useEffect(() => {
    const category = searchParams.get("category");
    if (category && mainCategories.includes(category as MainCategory)) {
      setSelectedMainCategory(category as MainCategory);
    } else if (!category) {
      // 파라미터가 없으면 전체로 설정
      setSelectedMainCategory("전체");
    }
  }, [searchParams]);

  // 현재 카테고리에 맞는 태그만 추출
  const categoryTools = tools.filter((tool) => 
    selectedMainCategory === "전체" || tool.mainCategory === selectedMainCategory
  );
  
  const allTags = Array.from(
    new Set(
      categoryTools.flatMap((tool) => {
        // @ts-expect-error - returnObjects option is valid but not in type definition
        const tags = t(`tools.${tool.id}.tags`, { returnObjects: true }) as unknown as string[];
        return tags;
      })
    )
  ).sort();

  const filteredTools = tools.filter((tool) => {
    // 메인 카테고리 필터
    if (selectedMainCategory !== "전체" && tool.mainCategory !== selectedMainCategory) {
      return false;
    }
    
    // 태그 필터
    if (selectedTag) {
      // @ts-expect-error - returnObjects option is valid but not in type definition
      const toolTags = t(`tools.${tool.id}.tags`, { returnObjects: true }) as unknown as string[];
      if (!toolTags.includes(selectedTag)) {
        return false;
      }
    }
    
    return true;
  });

  const handleMainCategoryChange = (category: MainCategory) => {
    setSelectedMainCategory(category);
    setSelectedTag(null);
  };

  return (
    <>
      {/* Structured Data - 클라이언트에서만 주입 */}
      <StructuredData data={generateOrganizationSchema()} id="organization-schema" />
      <StructuredData data={generateWebSiteSchema()} id="website-schema" />
      <StructuredData data={generateBreadcrumbSchema()} id="breadcrumb-schema" />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-orange-100 bg-white/90 backdrop-blur-sm shadow-sm">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href={`/${locale}`} className="flex items-center gap-3 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                  <span className="text-2xl font-bold text-white">🧰</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Toolbox
                </h1>
              </Link>
              <nav
                className="hidden items-center gap-6 md:flex"
                aria-label="Main navigation"
              >
                {mainCategories.slice(1).map((category) => (
                  <Link
                    key={category}
                    href={`/${locale}?category=${category}`}
                    scroll={false}
                    className={`text-sm font-bold transition-all rounded-full px-4 py-2 ${
                      selectedMainCategory === category
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md"
                        : "text-slate-600 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                  >
                    {category === "게임"
                      ? t("header.games")
                      : category === "유틸리티"
                        ? t("header.utilities")
                        : t("header.tests")}
                  </Link>
                ))}
                <LanguageSwitcher />
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="border-b border-orange-100 bg-gradient-to-r from-orange-400 via-pink-400 to-rose-400">
          <div className="mx-auto max-w-7xl px-6 py-20 text-center">
            <div className="mb-4 flex justify-center gap-3 text-5xl">
              <span className="animate-bounce">🎮</span>
              <span className="animate-bounce delay-100">🛠️</span>
              <span className="animate-bounce delay-200">✨</span>
            </div>
            <h2 className="mb-4 text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
              {t("hero.title")}
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-white/95 font-medium">
              {t("hero.subtitle")}
            </p>
          </div>

          {/* Top Banner Ad (Below Hero) */}
          <div className="mx-auto max-w-7xl px-6 pb-8">
            <DisplayAd adSlot="1234567890" />
          </div>
        </section>

        {/* Category Filter */}
        <div className="sticky top-[73px] z-20 border-b border-orange-100 bg-white/95 shadow-md backdrop-blur-md">
          {/* Main Category Tabs */}
          <div className="mx-auto max-w-7xl border-b border-orange-50">
            <div className="flex gap-2 px-6">
              {mainCategories.map((category) => (
                <Link
                  key={category}
                  href={category === "전체" ? `/${locale}` : `/${locale}?category=${category}`}
                  scroll={false}
                  className={`relative px-6 py-4 text-sm font-bold transition-all ${
                    selectedMainCategory === category
                      ? "text-orange-600 bg-orange-50"
                      : "text-slate-600 hover:text-orange-500 hover:bg-orange-50/50"
                  }`}
                >
                  {category === "전체"
                    ? t("categories.all")
                    : category === "게임"
                      ? t("header.games")
                      : category === "유틸리티"
                        ? t("header.utilities")
                        : t("header.tests")}
                  {selectedMainCategory === category && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full" />
                  )}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-6 py-12">
          {/* 태그 필터 */}
          {allTags.length > 0 && (
          <div className="mb-8 rounded-2xl bg-gradient-to-r from-orange-50 to-pink-50 p-6 shadow-md border border-orange-100">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-lg font-bold text-slate-900">
                🏷️ {isKorean ? "태그" : "Tags"}
              </span>
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(null)}
                  className="text-xs px-3 py-1 bg-white rounded-full text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  ✕ {isKorean ? "필터 해제" : "Clear Filter"}
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    selectedTag === tag
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg scale-105"
                      : "bg-white text-slate-700 hover:bg-orange-100 hover:scale-105 border border-orange-200"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
          )}

          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              {t("main.total")}{" "}
              <span className="font-semibold text-slate-900">
                {filteredTools.length}
              </span>
              {t("main.totalTools")}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool, index) => (
              <React.Fragment key={tool.id}>
                <Link
                  href={tool.gameUrl ? `/${locale}${tool.gameUrl}` : "#"}
                  className={tool.gameUrl ? "" : "pointer-events-none"}
                >
                  <article
                    className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white to-orange-50/30 shadow-lg border-2 border-orange-100 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-orange-300 h-[420px] flex flex-col ${tool.gameUrl ? "cursor-pointer" : ""}`}
                    itemScope
                    itemType="https://schema.org/SoftwareApplication"
                  >
                    {/* 배경 장식 효과 */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/20 to-pink-200/20 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full blur-2xl -z-10 group-hover:scale-150 transition-transform duration-500"></div>

                    <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
                      <Image
                        src={tool.imageUrl}
                        alt={t(`tools.${tool.id}.title`)}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        itemProp="image"
                      />
                      {/* 오버레이 그라데이션 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="p-5 relative flex-1 flex flex-col">
                      {/* 상단 라인 장식 */}
                      <div className="absolute top-0 left-5 right-5 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <h3
                        className="mb-3 text-xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:via-pink-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 line-clamp-2 min-h-[56px]"
                        itemProp="name"
                      >
                        {t(`tools.${tool.id}.title`)}
                      </h3>

                      <div className="mb-3 flex flex-wrap gap-1.5 min-h-[32px]">
                        {/* @ts-expect-error - returnObjects option is valid but not in type definition */}
                        {(t(`tools.${tool.id}.tags`, { returnObjects: true }) as unknown as string[]).map((tag: string, tagIndex: number) => {
                          const tagColors = [
                            { bg: "from-orange-200 to-white", text: "text-orange-800" },
                            { bg: "from-pink-200 to-white", text: "text-pink-800" },
                            { bg: "from-purple-200 to-white", text: "text-purple-800" },
                          ];
                          const colorIndex = tagIndex % tagColors.length;
                          
                          return (
                            <button
                              key={tag}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedTag(tag === selectedTag ? null : tag);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold transition-all duration-300 hover:scale-110 hover:shadow-md bg-gradient-to-br ${tagColors[colorIndex].bg} ${tagColors[colorIndex].text} cursor-pointer`}
                              style={{ transitionDelay: `${tagIndex * 50}ms` }}
                              itemProp="keywords"
                            >
                              #{tag}
                            </button>
                          );
                        })}
                      </div>

                      <p
                        className="text-sm leading-relaxed text-slate-600 line-clamp-3 group-hover:text-slate-700 transition-colors duration-300 flex-1"
                        itemProp="description"
                      >
                        {t(`tools.${tool.id}.description`)}
                      </p>

                      {/* 하단 호버 인디케이터 */}
                      <div className="mt-4 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="h-1 w-1 rounded-full bg-orange-400 animate-pulse"></div>
                        <div className="h-1 w-1 rounded-full bg-pink-400 animate-pulse delay-75"></div>
                        <div className="h-1 w-1 rounded-full bg-purple-400 animate-pulse delay-150"></div>
                      </div>
                    </div>

                    {/* 코너 장식 */}
                    <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-orange-300/50 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-pink-300/50 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </article>
                </Link>

                {/* In-Feed Ad after every 6 tools */}
                {(index + 1) % 6 === 0 && index !== filteredTools.length - 1 && (
                  <div className="sm:col-span-2 lg:col-span-3">
                    <InFeedAd adSlot="0987654321" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Bottom Ad */}
          <DisplayAd adSlot="1357924680" />
        </main>

        {/* Footer */}
        <footer className="border-t border-orange-100 bg-gradient-to-b from-orange-50 to-white">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="grid gap-8 md:grid-cols-4">
              <div className="md:col-span-2">
                <Link href={`/${locale}`} className="mb-4 flex items-center gap-3 group w-fit">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 shadow-md group-hover:scale-110 transition-transform">
                    <span className="text-xl">🧰</span>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                    Toolbox
                  </span>
                </Link>
                <p className="text-sm text-slate-600">
                  {t("footer.company.description")}
                </p>
              </div>
              <nav aria-label={t("footer.services.title")}>
                <h4 className="mb-3 font-semibold text-slate-900">
                  {t("footer.services.title")}
                </h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>
                    <Link
                      href={`/${locale}?category=게임`}
                      scroll={false}
                      className="hover:text-slate-900"
                    >
                      {t("footer.services.games")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}?category=유틸리티`}
                      scroll={false}
                      className="hover:text-slate-900"
                    >
                      {t("footer.services.utilities")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}?category=테스트`}
                      scroll={false}
                      className="hover:text-slate-900"
                    >
                      {t("footer.services.tests")}
                    </Link>
                  </li>
                </ul>
              </nav>
              <address className="not-italic">
                <h4 className="mb-3 font-semibold text-slate-900">
                  {t("footer.contact.title")}
                </h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>
                    <a
                      href="mailto:ohddang509@gmail.com"
                      className="hover:text-slate-900"
                    >
                      ohddang509@gmail.com
                    </a>
                  </li>
                </ul>
              </address>
            </div>
            <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
              {t("footer.copyright")}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
