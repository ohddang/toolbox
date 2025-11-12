"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
} from "../structured-data";
import { useTranslation } from "../i18n/client";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { DisplayAd, InFeedAd } from "../components/AdSense";

type Category =
  | "전체"
  | "AI인프라"
  | "AI데이터"
  | "반도체"
  | "클라우드"
  | "머신러닝"
  | "딥러닝"
  | "컴퓨터비전"
  | "자연어처리"
  | "로보틱스"
  | "양자컴퓨팅"
  | "블록체인";

interface Card {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: Category;
  tags: string[];
  author: string;
  date: string;
}

const categoryKeys: Record<Category, string> = {
  전체: "all",
  AI인프라: "aiInfra",
  AI데이터: "aiData",
  반도체: "semiconductor",
  클라우드: "cloud",
  머신러닝: "machineLearning",
  딥러닝: "deepLearning",
  컴퓨터비전: "computerVision",
  자연어처리: "nlp",
  로보틱스: "robotics",
  양자컴퓨팅: "quantum",
  블록체인: "blockchain",
};

const categories: Category[] = [
  "전체",
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
];

const cards: Card[] = [
  {
    id: 1,
    title: "차세대 AI 학습 플랫폼",
    description:
      "대규모 언어 모델 학습을 위한 최적화된 인프라로 빠르고 효율적인 AI 개발 환경을 제공합니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    category: "AI인프라",
    tags: ["LLM", "GPU클러스터", "분산학습"],
    author: "김태현",
    date: "2024-11-10",
  },
  {
    id: 2,
    title: "고품질 데이터셋 구축",
    description:
      "정제된 라벨링 데이터와 다양한 도메인의 데이터셋으로 AI 모델의 성능을 극대화합니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    category: "AI데이터",
    tags: ["데이터라벨링", "품질관리", "대규모"],
    author: "이서연",
    date: "2024-11-09",
  },
  {
    id: 3,
    title: "7nm 공정 반도체 칩",
    description:
      "최첨단 미세 공정 기술로 제작된 고성능 반도체 칩은 전력 효율과 연산 능력을 동시에 향상시킵니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    category: "반도체",
    tags: ["7nm", "저전력", "고성능"],
    author: "박준서",
    date: "2024-11-08",
  },
  {
    id: 4,
    title: "멀티 클라우드 솔루션",
    description:
      "AWS, Azure, GCP를 통합 관리하며 최적의 비용과 성능으로 클라우드 인프라를 운영합니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    category: "클라우드",
    tags: ["멀티클라우드", "비용최적화", "통합관리"],
    author: "최민지",
    date: "2024-11-07",
  },
  {
    id: 5,
    title: "실시간 AI 추론 엔진",
    description:
      "밀리초 단위의 낮은 지연시간으로 대용량 실시간 추론을 처리하는 고성능 AI 인프라입니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    category: "AI인프라",
    tags: ["실시간", "저지연", "고성능"],
    author: "정우진",
    date: "2024-11-06",
  },
  {
    id: 6,
    title: "합성 데이터 생성 시스템",
    description:
      "프라이버시 보호와 데이터 부족 문제를 해결하는 고품질 합성 데이터를 자동으로 생성합니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
    category: "AI데이터",
    tags: ["합성데이터", "프라이버시", "자동화"],
    author: "강수아",
    date: "2024-11-05",
  },
  {
    id: 7,
    title: "강화학습 기반 자동화",
    description:
      "복잡한 의사결정 프로세스를 강화학습 알고리즘으로 최적화하여 자동으로 학습합니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    category: "머신러닝",
    tags: ["강화학습", "자동화", "최적화"],
    author: "윤도현",
    date: "2024-11-04",
  },
  {
    id: 8,
    title: "신경망 아키텍처 탐색",
    description:
      "최신 딥러닝 아키텍처를 자동으로 탐색하고 최적의 모델 구조를 찾아냅니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    category: "딥러닝",
    tags: ["NAS", "AutoML", "모델탐색"],
    author: "한지우",
    date: "2024-11-03",
  },
  {
    id: 9,
    title: "실시간 객체 인식 시스템",
    description:
      "고해상도 영상에서 실시간으로 객체를 탐지하고 분류하는 컴퓨터 비전 솔루션입니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80",
    category: "컴퓨터비전",
    tags: ["객체인식", "실시간", "영상처리"],
    author: "오서준",
    date: "2024-11-02",
  },
  {
    id: 10,
    title: "다국어 번역 엔진",
    description:
      "100개 이상의 언어를 지원하는 고품질 신경망 기반 번역 시스템으로 문맥을 이해합니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80",
    category: "자연어처리",
    tags: ["번역", "다국어", "NLP"],
    author: "임하은",
    date: "2024-11-01",
  },
  {
    id: 11,
    title: "자율주행 로봇 플랫폼",
    description:
      "SLAM 기술과 경로 계획 알고리즘을 통합하여 다양한 환경에서 자율 주행이 가능합니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=1200&q=80",
    category: "로보틱스",
    tags: ["자율주행", "SLAM", "경로계획"],
    author: "신예준",
    date: "2024-10-31",
  },
  {
    id: 12,
    title: "양자 암호화 통신",
    description:
      "양자역학 원리를 활용한 해킹 불가능한 차세대 보안 통신 시스템을 구축합니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
    category: "양자컴퓨팅",
    tags: ["양자암호", "보안", "통신"],
    author: "조시현",
    date: "2024-10-30",
  },
  {
    id: 13,
    title: "탈중앙화 AI 마켓플레이스",
    description:
      "블록체인 기술로 AI 모델과 데이터를 안전하게 거래하는 분산형 플랫폼입니다.",
    imageUrl:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
    category: "블록체인",
    tags: ["블록체인", "마켓플레이스", "탈중앙화"],
    author: "배윤서",
    date: "2024-10-29",
  },
];

export default function Home() {
  const { t, locale } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<Category>("전체");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const filteredCards =
    selectedCategory === "전체"
      ? cards
      : cards.filter((card) => card.category === selectedCategory);

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
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600">
                  <span className="text-lg font-bold text-white">B</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Bullora</h1>
              </div>
              <nav
                className="hidden items-center gap-8 md:flex"
                aria-label={t("header.services")}
              >
                <a
                  href="#about"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  {t("header.about")}
                </a>
                <a
                  href="#services"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  {t("header.services")}
                </a>
                <a
                  href="#contact"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  {t("header.contact")}
                </a>
                <LanguageSwitcher />
                <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
                  {t("header.getStarted")}
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 text-center">
            <h2 className="mb-4 text-5xl font-extrabold tracking-tight text-slate-900">
              {t("hero.title")}
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-600">
              {t("hero.subtitle")}
            </p>
          </div>

          {/* Top Banner Ad (Below Hero) */}
          <div className="mx-auto max-w-7xl px-6 pb-8">
            <DisplayAd adSlot="1234567890" />
          </div>
        </section>

        {/* Category Filter */}
        <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
          <div className="mx-auto max-w-7xl">
            <div className="relative">
              {/* Left Gradient Fade & Arrow */}
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

              {/* Right Gradient Fade & Arrow */}
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

              {/* Scrollable Category Buttons */}
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="scrollbar-hide flex gap-2 overflow-x-auto px-6 py-4 scroll-smooth"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {t(`categories.${categoryKeys[category]}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main id="services" className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              {t("main.total")}{" "}
              <span className="font-semibold text-slate-900">
                {filteredCards.length}
              </span>
              {t("main.totalSolutions")}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCards.map((card, index) => (
              <>
                <article
                  key={card.id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl"
                  itemScope
                  itemType="https://schema.org/Article"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-slate-200">
                    <Image
                      src={card.imageUrl}
                      alt={`${card.title} - ${card.category}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      itemProp="image"
                    />
                    <div className="absolute right-3 top-3 rounded-lg bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur-sm">
                      {t(`categories.${categoryKeys[card.category]}`)}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                          itemProp="keywords"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3
                      className="mb-3 text-xl font-bold text-slate-900 group-hover:text-blue-600"
                      itemProp="headline"
                    >
                      {card.title}
                    </h3>

                    <p
                      className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600"
                      itemProp="description"
                    >
                      {card.description}
                    </p>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-xs font-semibold text-white">
                          {card.author.charAt(0)}
                        </div>
                        <span
                          className="text-sm font-medium text-slate-700"
                          itemProp="author"
                        >
                          {card.author}
                        </span>
                      </div>
                      <time
                        className="text-xs text-slate-500"
                        dateTime={card.date}
                        itemProp="datePublished"
                      >
                        {card.date}
                      </time>
                    </div>
                  </div>
                </article>

                {/* In-Feed Ad after every 6 cards */}
                {(index + 1) % 6 === 0 && index !== filteredCards.length - 1 && (
                  <div className="sm:col-span-2 lg:col-span-3">
                    <InFeedAd adSlot="0987654321" />
                  </div>
                )}
              </>
            ))}
          </div>

          {/* Bottom Ad */}
          <DisplayAd adSlot="1357924680" />
        </main>

        {/* Footer */}
        <footer id="contact" className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="grid gap-8 md:grid-cols-4">
              <div className="md:col-span-2">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600">
                    <span className="text-lg font-bold text-white">B</span>
                  </div>
                  <span className="text-xl font-bold text-slate-900">
                    Bullora
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
                    <a
                      href="#ai-infrastructure"
                      className="hover:text-slate-900"
                    >
                      {t("footer.services.aiInfra")}
                    </a>
                  </li>
                  <li>
                    <a href="#data-solution" className="hover:text-slate-900">
                      {t("footer.services.dataSolution")}
                    </a>
                  </li>
                  <li>
                    <a href="#cloud-service" className="hover:text-slate-900">
                      {t("footer.services.cloudService")}
                    </a>
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

