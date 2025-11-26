"use client";

import LadderGame from "../../../components/LadderGame";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function LadderGamePage() {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50">
      {/* 헤더 */}
      <header className="border-b border-orange-100 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/${locale}`} className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 shadow-md group-hover:scale-110 transition-transform">
                <span className="text-xl">🧰</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Toolbox
              </h1>
            </Link>
            <Link
              href={`/${locale}`}
              className="rounded-full bg-orange-50 px-5 py-2 text-sm font-bold text-orange-600 transition-all hover:bg-orange-100 hover:scale-105"
            >
              ← 돌아가기
            </Link>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* 게임 소개 */}
        <div className="mb-8 text-center">
          <div className="mb-4 text-6xl">🪜</div>
          <h2 className="mb-3 text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            사다리 게임
          </h2>
          <p className="text-lg font-medium text-slate-600">
            공정한 추첨, 재미있는 선택! 사다리 타기로 결정하세요
          </p>
        </div>

        {/* 게임 영역 */}
        <div className="rounded-3xl bg-white p-8 shadow-2xl border-4 border-orange-100">
          <LadderGame />
        </div>

        {/* 게임 설명 */}
        <div className="mt-8 rounded-3xl bg-gradient-to-br from-orange-50 to-pink-50 p-8 shadow-lg border-2 border-orange-100">
          <h3 className="mb-4 text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            🎯 사용 방법
          </h3>
          <div className="space-y-3 text-slate-700 font-medium">
            <p className="flex items-start gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-sm font-bold text-white shadow-md">
                1
              </span>
              <span>
                참가자 수를 선택하세요 (2~8명)
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-sm font-bold text-white shadow-md">
                2
              </span>
              <span>
                각 결과 칸에 원하는 내용을 입력하세요 (당첨,꽝, 상품명 등)
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-sm font-bold text-white shadow-md">
                3
              </span>
              <span>
                "사다리 생성하기" 버튼을 클릭하여 랜덤 사다리를 만드세요
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-sm font-bold text-white shadow-md">
                4
              </span>
              <span>
                시작 번호를 클릭하면 자동으로 경로를 따라 이동하여 결과를 보여줍니다
              </span>
            </p>
          </div>

          <div className="mt-6 rounded-2xl bg-white/60 p-4 border border-orange-200">
            <div className="font-bold text-orange-600 mb-2">💡 팁</div>
            <ul className="space-y-1 text-sm text-slate-600">
              <li>• 이모지를 사용하면 더 재미있게 꾸밀 수 있어요!</li>
              <li>• "새로운 사다리" 버튼으로 같은 설정의 다른 사다리를 만들 수 있습니다</li>
              <li>• 여러 번 클릭해도 경로는 항상 동일합니다</li>
            </ul>
          </div>
        </div>

        {/* 다른 게임 둘러보기 */}
        <div className="mt-8 text-center">
          <Link
            href={`/${locale}?category=게임`}
            className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            🎮 다른 게임 둘러보기
          </Link>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="mt-12 border-t border-orange-100 bg-gradient-to-b from-orange-50 to-white py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm font-medium text-slate-500">
          © 2024 Toolbox. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

