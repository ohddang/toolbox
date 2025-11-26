export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Toolbox",
    url: "https://toolbox.com",
    logo: "https://toolbox.com/logo.png",
    description:
      "유용한 소프트웨어와 게임 도구를 제공하는 플랫폼",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+82-2-1234-5678",
      contactType: "Customer Service",
      email: "contact@toolbox.com",
      areaServed: "KR",
      availableLanguage: ["Korean", "English"],
    },
    sameAs: [
      "https://twitter.com/toolbox",
      "https://www.linkedin.com/company/toolbox",
      "https://github.com/toolbox",
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Toolbox",
    url: "https://toolbox.com",
    description:
      "게임, 유틸리티, 최신 소프트웨어 정보를 한 곳에서",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://toolbox.com/search?q={search_term_string}",
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
        item: "https://toolbox.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "서비스",
        item: "https://toolbox.com/#services",
      },
    ],
  };
}
