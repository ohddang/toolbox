"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef } from "react";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
} from "../structured-data";
import { useTranslation } from "../i18n/client";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { DisplayAd, InFeedAd } from "../components/AdSense";

type MainCategory = "전체" | "게임" | "유틸리티" | "최신정보";

type SubCategory =
  | "전체"
  | "게임 오버레이"
  | "성능 최적화"
  | "녹화/스트리밍"
  | "게임 런처"
  | "시스템 도구"
  | "파일 관리"
  | "생산성"
  | "미디어 도구"
  | "개발 도구"
  | "업데이트"
  | "뉴스"
  | "팁 & 트릭";

interface Tool {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  mainCategory: MainCategory;
  subCategory: SubCategory;
  tags: string[];
  price: "무료" | "유료" | "프리미엄";
  downloadUrl?: string;
  gameUrl?: string;
  date: string;
}

const categoryKeys: Record<SubCategory, string> = {
  전체: "all",
  "게임 오버레이": "gameOverlay",
  "성능 최적화": "performance",
  "녹화/스트리밍": "recording",
  "게임 런처": "gameLauncher",
  "시스템 도구": "systemTools",
  "파일 관리": "fileManager",
  생산성: "productivity",
  "미디어 도구": "mediaTools",
  "개발 도구": "devTools",
  업데이트: "updates",
  뉴스: "newsArticles",
  "팁 & 트릭": "tips",
};

const mainCategories: MainCategory[] = ["전체", "게임", "유틸리티", "최신정보"];

const subCategoriesByMain: Record<MainCategory, SubCategory[]> = {
  전체: ["전체"],
  게임: ["전체", "게임 오버레이", "성능 최적화", "녹화/스트리밍", "게임 런처"],
  유틸리티: [
    "전체",
    "시스템 도구",
    "파일 관리",
    "생산성",
    "미디어 도구",
    "개발 도구",
  ],
  최신정보: ["전체", "업데이트", "뉴스", "팁 & 트릭"],
};

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
    subCategory: "게임 런처",
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
      "https://images.unsplash.com/photo-1606868306217-dbf5046868d2?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "게임",
    subCategory: "게임 런처",
    tags: ["추첨", "사다리타기", "공정"],
    price: "무료",
    gameUrl: "/games/ladder",
    date: "2024-11-26",
  },
  {
    id: 3,
    title: "GameOverlay Pro",
    description:
      "실시간 FPS, CPU, GPU 사용률을 게임 화면에 오버레이로 표시하는 강력한 도구입니다. 커스터마이징 가능한 위젯으로 완벽한 모니터링을 제공합니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "게임",
    subCategory: "게임 오버레이",
    tags: ["FPS표시", "모니터링", "커스터마이징"],
    price: "무료",
    date: "2024-11-20",
  },
  {
    id: 4,
    title: "BoostFX",
    description:
      "게임 성능을 최적화하여 낮은 사양에서도 부드러운 게임플레이를 경험하세요. AI 기반 설정 최적화로 최고의 성능을 제공합니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "게임",
    subCategory: "성능 최적화",
    tags: ["최적화", "FPS향상", "저사양"],
    price: "프리미엄",
    date: "2024-11-19",
  },
  {
    id: 5,
    title: "StreamCapture",
    description:
      "고품질 게임 녹화와 라이브 스트리밍을 한 번에! 낮은 CPU 사용률로 4K 60FPS 녹화를 지원합니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "게임",
    subCategory: "녹화/스트리밍",
    tags: ["녹화", "스트리밍", "4K"],
    price: "유료",
    date: "2024-11-18",
  },
  {
    id: 6,
    title: "GameHub Launcher",
    description:
      "모든 게임 플랫폼을 하나로 통합! Steam, Epic, Origin 등 모든 게임을 한 곳에서 실행하세요.",
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "게임",
    subCategory: "게임 런처",
    tags: ["통합런처", "멀티플랫폼", "관리"],
    price: "무료",
    date: "2024-11-17",
  },

  // 유틸리티 카테고리
  {
    id: 7,
    title: "SystemCleaner Pro",
    description:
      "불필요한 파일을 삭제하고 시스템을 최적화합니다. 레지스트리 정리, 임시 파일 삭제, 시작 프로그램 관리까지 한 번에!",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "유틸리티",
    subCategory: "시스템 도구",
    tags: ["시스템정리", "최적화", "속도향상"],
    price: "프리미엄",
    date: "2024-11-16",
  },
  {
    id: 8,
    title: "FileManager X",
    description:
      "강력한 파일 관리 도구로 대용량 파일 찾기, 중복 파일 삭제, 고급 검색 기능을 제공합니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "유틸리티",
    subCategory: "파일 관리",
    tags: ["파일관리", "중복삭제", "검색"],
    price: "무료",
    date: "2024-11-15",
  },
  {
    id: 9,
    title: "TaskMaster",
    description:
      "생산성을 극대화하는 올인원 작업 관리 도구. 할 일 관리, 포모도로 타이머, 프로젝트 트래킹을 지원합니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "유틸리티",
    subCategory: "생산성",
    tags: ["작업관리", "포모도로", "생산성"],
    price: "프리미엄",
    date: "2024-11-14",
  },
  {
    id: 10,
    title: "MediaConverter Plus",
    description:
      "비디오, 오디오, 이미지를 빠르게 변환하세요. 100개 이상의 포맷을 지원하며 배치 변환 기능을 제공합니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "유틸리티",
    subCategory: "미디어 도구",
    tags: ["변환", "비디오", "오디오"],
    price: "유료",
    date: "2024-11-13",
  },
  {
    id: 11,
    title: "CodeEditor Pro",
    description:
      "가볍고 빠른 코드 에디터로 개발자를 위한 필수 도구입니다. 문법 강조, 자동완성, Git 통합을 지원합니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "유틸리티",
    subCategory: "개발 도구",
    tags: ["코드에디터", "개발", "Git"],
    price: "무료",
    date: "2024-11-12",
  },

  // 최신정보 카테고리
  {
    id: 12,
    title: "Windows 12 주요 기능 업데이트",
    description:
      "Windows 12의 새로운 기능들을 살펴보세요. AI 통합, 향상된 성능, 그리고 혁신적인 UI 디자인까지!",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "최신정보",
    subCategory: "업데이트",
    tags: ["Windows", "업데이트", "신기능"],
    price: "무료",
    date: "2024-11-26",
  },
  {
    id: 13,
    title: "2024년 최고의 무료 소프트웨어 TOP 10",
    description:
      "올해 가장 인기 있는 무료 소프트웨어를 소개합니다. 생산성부터 엔터테인먼트까지 모두 포함!",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "최신정보",
    subCategory: "뉴스",
    tags: ["리뷰", "무료", "추천"],
    price: "무료",
    date: "2024-11-25",
  },
  {
    id: 14,
    title: "PC 성능 10배 높이는 숨은 설정",
    description:
      "대부분의 사용자가 모르는 Windows 숨은 설정으로 컴퓨터 성능을 극대화하는 방법을 알려드립니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "최신정보",
    subCategory: "팁 & 트릭",
    tags: ["팁", "성능", "최적화"],
    price: "무료",
    date: "2024-11-24",
  },
  {
    id: 15,
    title: "GPU Driver 최신 버전 출시",
    description:
      "NVIDIA와 AMD에서 새로운 드라이버를 출시했습니다. 최대 20% 성능 향상과 버그 수정이 포함되어 있습니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80",
    mainCategory: "최신정보",
    subCategory: "업데이트",
    tags: ["GPU", "드라이버", "업데이트"],
    price: "무료",
    date: "2024-11-23",
  },
];

export default function Home() {
  const { t, locale } = useTranslation();
  const [selectedMainCategory, setSelectedMainCategory] =
    useState<MainCategory>("전체");
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory>("전체");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const filteredTools = tools.filter((tool) => {
    if (selectedMainCategory === "전체") return true;
    if (tool.mainCategory !== selectedMainCategory) return false;
    if (selectedSubCategory === "전체") return true;
    return tool.subCategory === selectedSubCategory;
  });

  const organizationSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();
  const breadcrumbSchema = generateBreadcrumbSchema();

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  const handleMainCategoryChange = (category: MainCategory) => {
    setSelectedMainCategory(category);
    setSelectedSubCategory("전체");
  };

  const getPriceColor = (price: string) => {
    switch (price) {
      case "무료":
        return "bg-green-50 text-green-700";
      case "유료":
        return "bg-blue-50 text-blue-700";
      case "프리미엄":
        return "bg-purple-50 text-purple-700";
      default:
        return "bg-slate-50 text-slate-700";
    }
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-orange-100 bg-white/90 backdrop-blur-sm shadow-sm">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 shadow-lg rotate-3 hover:rotate-0 transition-transform">
                  <span className="text-2xl font-bold text-white">🧰</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Toolbox
                </h1>
              </div>
              <nav
                className="hidden items-center gap-6 md:flex"
                aria-label="Main navigation"
              >
                {mainCategories.slice(1).map((category) => (
                  <button
                    key={category}
                    onClick={() => handleMainCategoryChange(category)}
                    className={`text-sm font-medium transition-colors ${
                      selectedMainCategory === category
                        ? "text-indigo-600"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {category === "게임"
                      ? t("header.games")
                      : category === "유틸리티"
                        ? t("header.utilities")
                        : t("header.news")}
                  </button>
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
                <button
                  key={category}
                  onClick={() => handleMainCategoryChange(category)}
                  className={`relative px-6 py-4 text-sm font-bold transition-all rounded-t-xl ${
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
                        : t("header.news")}
                  {selectedMainCategory === category && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sub Category Pills */}
          {selectedMainCategory !== "전체" && (
            <div className="mx-auto max-w-7xl">
              <div className="relative">
                {showLeftArrow && (
                  <>
                    <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white/95 to-transparent" />
                    <button
                      onClick={() => scroll("left")}
                      className="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110 hover:bg-slate-50"
                      aria-label="Scroll left"
                    >
                      <svg
                        className="h-5 w-5 text-slate-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                  </>
                )}

                {showRightArrow && (
                  <>
                    <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white/95 to-transparent" />
                    <button
                      onClick={() => scroll("right")}
                      className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110 hover:bg-slate-50"
                      aria-label="Scroll right"
                    >
                      <svg
                        className="h-5 w-5 text-slate-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}

                <div
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  className="scrollbar-hide flex gap-2 overflow-x-auto px-6 py-4 scroll-smooth"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {subCategoriesByMain[selectedMainCategory].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedSubCategory(category)}
                    className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                      selectedSubCategory === category
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-200"
                        : "bg-orange-50 text-orange-700 hover:bg-orange-100"
                    }`}
                  >
                    {t(`categories.${categoryKeys[category]}`)}
                  </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-6 py-12">
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
                    className={`group overflow-hidden rounded-3xl bg-white shadow-md transition-all hover:shadow-2xl hover:-translate-y-1 ${tool.gameUrl ? "cursor-pointer" : ""}`}
                    itemScope
                    itemType="https://schema.org/SoftwareApplication"
                  >
                    <div className="relative h-56 w-full overflow-hidden bg-slate-200">
                      <Image
                        src={tool.imageUrl}
                        alt={`${tool.title} - ${tool.subCategory}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        itemProp="image"
                      />
                      <div
                        className={`absolute right-3 top-3 rounded-lg px-3 py-1 text-xs font-semibold backdrop-blur-sm ${getPriceColor(tool.price)}`}
                      >
                        {t(`main.${tool.price === "무료" ? "free" : tool.price === "유료" ? "paid" : "freemium"}`)}
                      </div>
                      {tool.gameUrl && (
                        <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 px-3 py-1 text-xs font-bold text-white shadow-lg animate-pulse">
                          ▶ 플레이 가능
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="mb-3 flex flex-wrap gap-2">
                        {tool.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600"
                            itemProp="keywords"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <h3
                        className="mb-3 text-xl font-bold text-slate-900 group-hover:text-orange-600"
                        itemProp="name"
                      >
                        {tool.title}
                      </h3>

                      <p
                        className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600"
                        itemProp="description"
                      >
                        {tool.description}
                      </p>

                      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="text-xs text-slate-500">{tool.date}</span>
                        {tool.gameUrl && (
                          <span className="rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-5 py-2 text-xs font-bold text-white shadow-md transition-all group-hover:shadow-lg group-hover:scale-105">
                            지금 플레이 ▶
                          </span>
                        )}
                        {!tool.gameUrl && (
                          <span className="rounded-full bg-slate-300 px-5 py-2 text-xs font-bold text-slate-600">
                            준비 중 ⏳
                          </span>
                        )}
                      </div>
                    </div>
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
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 shadow-md">
                    <span className="text-xl">🧰</span>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                    Toolbox
                  </span>
                </div>
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
                    <button
                      onClick={() => handleMainCategoryChange("게임")}
                      className="hover:text-slate-900"
                    >
                      {t("footer.services.games")}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleMainCategoryChange("유틸리티")}
                      className="hover:text-slate-900"
                    >
                      {t("footer.services.utilities")}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleMainCategoryChange("최신정보")}
                      className="hover:text-slate-900"
                    >
                      {t("footer.services.news")}
                    </button>
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
                      href="mailto:contact@bullora.com"
                      className="hover:text-slate-900"
                    >
                      contact@bullora.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+82212345678" className="hover:text-slate-900">
                      02-1234-5678
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
