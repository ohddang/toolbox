"use client";

import { useState } from "react";
import PixiGame from "../../components/PixiGame";
import PixiGameExample from "../../components/PixiGameExample";

export default function GameTestPage() {
  const [activeTab, setActiveTab] = useState<"basic" | "interactive">("basic");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12">
      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-slate-900">
            PixiJS 테스트 페이지
          </h1>
          <p className="text-slate-600">
            Next.js 환경에서 PixiJS가 정상적으로 작동하는지 확인합니다
          </p>
        </header>

        {/* 탭 네비게이션 */}
        <div className="mb-6 flex gap-2 rounded-lg bg-white p-2 shadow-sm">
          <button
            onClick={() => setActiveTab("basic")}
            className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
              activeTab === "basic"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            기본 예시
          </button>
          <button
            onClick={() => setActiveTab("interactive")}
            className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
              activeTab === "interactive"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            인터랙티브 예시
          </button>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          {activeTab === "basic" ? (
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                기본 예시
              </h2>
              <p className="mb-6 text-slate-600">
                회전하는 사각형과 텍스트가 표시됩니다.
              </p>
              <PixiGame width={800} height={600} />
            </div>
          ) : (
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                인터랙티브 예시
              </h2>
              <p className="mb-6 text-slate-600">
                캔버스를 클릭하면 토끼가 추가됩니다. 토끼들은 화면을 돌아다닙니다.
              </p>
              <PixiGameExample />
            </div>
          )}
        </div>

        {/* 코드 설명 */}
        <div className="mt-8 rounded-2xl bg-slate-800 p-8 text-white">
          <h3 className="mb-4 text-xl font-bold">사용 방법</h3>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="mb-2 font-semibold text-indigo-300">
                1. 컴포넌트 import
              </h4>
              <pre className="rounded bg-slate-900 p-3 text-green-400">
{`import PixiGame from "@/app/components/PixiGame";
import PixiGameExample from "@/app/components/PixiGameExample";`}
              </pre>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-indigo-300">
                2. 페이지에서 사용
              </h4>
              <pre className="rounded bg-slate-900 p-3 text-green-400">
{`"use client";

export default function Page() {
  return (
    <div>
      <PixiGame width={800} height={600} />
    </div>
  );
}`}
              </pre>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-indigo-300">
                3. 주의사항
              </h4>
              <ul className="list-inside list-disc space-y-1 text-slate-300">
                <li>"use client" 지시어 필수 (클라이언트 컴포넌트)</li>
                <li>useEffect로 앱 초기화 (SSR 방지)</li>
                <li>컴포넌트 언마운트 시 destroy() 호출 (메모리 누수 방지)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 홈으로 돌아가기 */}
        <div className="mt-8 text-center">
          <a
            href="/ko"
            className="inline-block rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
}

