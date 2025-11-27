"use client";

import { useEffect } from "react";

interface StructuredDataProps {
  data: object;
  id: string;
}

export function StructuredData({ data, id }: StructuredDataProps) {
  useEffect(() => {
    // 이미 존재하는지 확인
    if (document.getElementById(id)) return;

    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    // Cleanup
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [data, id]);

  // 클라이언트에서만 스크립트를 추가하므로 아무것도 렌더링하지 않음
  return null;
}

