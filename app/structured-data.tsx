export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bullora",
    url: "https://bullora.com",
    logo: "https://bullora.com/logo.png",
    description:
      "최첨단 AI 기술과 혁신적인 솔루션을 제공하는 선도적인 기술 플랫폼",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+82-2-1234-5678",
      contactType: "Customer Service",
      email: "contact@bullora.com",
      areaServed: "KR",
      availableLanguage: ["Korean", "English"],
    },
    sameAs: [
      "https://twitter.com/bullora",
      "https://www.linkedin.com/company/bullora",
      "https://github.com/bullora",
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Bullora",
    url: "https://bullora.com",
    description:
      "AI인프라, AI데이터, 반도체, 클라우드 등 최첨단 기술 솔루션 제공",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://bullora.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: "https://bullora.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "서비스",
        item: "https://bullora.com/#services",
      },
    ],
  };
}

