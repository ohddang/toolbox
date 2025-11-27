"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

interface Question {
  id: number;
  type: "estrogen" | "testosterone";
  textKo: string;
  textEn: string;
}

const questions: Question[] = [
  { id: 1, type: "estrogen", textKo: "다른 사람의 감정을 잘 읽는 편이다", textEn: "I'm good at reading others' emotions" },
  { id: 2, type: "testosterone", textKo: "경쟁심이 강하고 이기는 것을 좋아한다", textEn: "I'm competitive and like winning" },
  { id: 3, type: "estrogen", textKo: "공감을 잘하고 위로를 잘한다", textEn: "I empathize well and comfort others" },
  { id: 4, type: "testosterone", textKo: "논리적이고 분석적으로 생각한다", textEn: "I think logically and analytically" },
  { id: 5, type: "estrogen", textKo: "섬세하고 세심한 편이다", textEn: "I'm delicate and meticulous" },
  { id: 6, type: "testosterone", textKo: "리더십을 발휘하고 주도하는 편이다", textEn: "I demonstrate leadership and take initiative" },
  { id: 7, type: "estrogen", textKo: "대화할 때 감정 표현을 자주 한다", textEn: "I express emotions frequently in conversations" },
  { id: 8, type: "testosterone", textKo: "직설적이고 솔직하게 말한다", textEn: "I speak directly and honestly" },
  { id: 9, type: "estrogen", textKo: "귀엽고 예쁜 것을 좋아한다", textEn: "I like cute and pretty things" },
  { id: 10, type: "testosterone", textKo: "모험적이고 도전을 즐긴다", textEn: "I'm adventurous and enjoy challenges" },
  { id: 11, type: "estrogen", textKo: "협력하고 조화를 이루는 것을 중요하게 생각한다", textEn: "I value cooperation and harmony" },
  { id: 12, type: "testosterone", textKo: "독립적이고 자립적인 성향이다", textEn: "I'm independent and self-reliant" },
  { id: 13, type: "estrogen", textKo: "부드럽고 따뜻한 성격이다", textEn: "I have a soft and warm personality" },
  { id: 14, type: "testosterone", textKo: "목표 지향적이고 성취욕이 강하다", textEn: "I'm goal-oriented with strong achievement drive" },
  { id: 15, type: "estrogen", textKo: "사람들과의 관계를 중요하게 여긴다", textEn: "I value relationships with people" },
  { id: 16, type: "testosterone", textKo: "감정보다 이성을 앞세운다", textEn: "I prioritize reason over emotion" },
];

export default function EstrogenTestosteroneTest() {
  const params = useParams();
  const locale = params.locale as string;
  const isKorean = locale === "ko";

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<{ estrogen: number; testosterone: number } | null>(null);
  const [showTest, setShowTest] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: score };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, number>) => {
    let estrogenTotal = 0;
    let testosteroneTotal = 0;

    questions.forEach((q) => {
      const answer = finalAnswers[q.id];
      if (q.type === "estrogen") {
        estrogenTotal += answer;
      } else {
        testosteroneTotal += answer;
      }
    });

    // 백분율로 변환 (8문항 * 5점 = 40점 만점)
    const estrogenPercent = Math.round((estrogenTotal / 40) * 100);
    const testosteronePercent = Math.round((testosteroneTotal / 40) * 100);

    setResult({ estrogen: estrogenPercent, testosterone: testosteronePercent });
  };

  const getPersonalityType = (estrogen: number, testosterone: number) => {
    if (estrogen >= 70 && testosterone >= 70) {
      return { 
        ko: "완벽한 밸런스형", 
        en: "Perfect Balance",
        emoji: "⚖️",
        desc: isKorean ? "에겐, 테토 특성을 모두 갖춘 이상적 균형" : "Ideal balance with both estrogen and testosterone traits"
      };
    } else if (estrogen >= 70) {
      return { 
        ko: "에겐 우세형", 
        en: "Estrogen Dominant",
        emoji: "💖",
        desc: isKorean ? "감성적이고 섬세한 에겐 매력이 강함" : "Strong estrogen charm with sensitivity and delicacy"
      };
    } else if (testosterone >= 70) {
      return { 
        ko: "테토 우세형", 
        en: "Testosterone Dominant",
        emoji: "💪",
        desc: isKorean ? "논리적이고 주도적인 테토 카리스마" : "Logical and leading testosterone charisma"
      };
    } else if (estrogen >= 50 && testosterone >= 50) {
      return { 
        ko: "중성적 밸런스형", 
        en: "Neutral Balance",
        emoji: "🌈",
        desc: isKorean ? "에겐과 테토 특성이 고르게 나타남" : "Estrogen and testosterone traits appear evenly"
      };
    } else if (estrogen > testosterone) {
      return { 
        ko: "에겐 성향", 
        en: "Estrogen Tendency",
        emoji: "🌸",
        desc: isKorean ? "에겐 특성이 상대적으로 강함" : "Relatively stronger estrogen characteristics"
      };
    } else if (testosterone > estrogen) {
      return { 
        ko: "테토 성향", 
        en: "Testosterone Tendency",
        emoji: "🔥",
        desc: isKorean ? "테토 특성이 상대적으로 강함" : "Relatively stronger testosterone characteristics"
      };
    } else {
      return { 
        ko: "균형형", 
        en: "Balanced",
        emoji: "⭐",
        desc: isKorean ? "양쪽 특성이 비슷한 수준" : "Similar levels of both traits"
      };
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setShowTest(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  if (!showTest && result === null) {
    return (
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">💖💪</div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {isKorean ? "에겐지수 테토지수 테스트" : "Estrogen/Testosterone Test"}
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            {isKorean
              ? "나의 에겐 성향과 테토 성향을 측정해보세요!"
              : "Measure your estrogen and testosterone tendencies!"}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-pink-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            {isKorean ? "테스트 안내" : "Test Guide"}
          </h3>
          <div className="space-y-4 text-slate-700 mb-8">
            <p className="flex items-start gap-3">
              <span className="text-2xl">💖</span>
              <span>
                {isKorean
                  ? "에겐지수: 감성적이고 섬세한 에겐 성향 측정"
                  : "Estrogen Index: Measures emotional and delicate estrogen tendencies"}
              </span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-2xl">💪</span>
              <span>
                {isKorean
                  ? "테토지수: 논리적이고 주도적인 테토 성향 측정"
                  : "Testosterone Index: Measures logical and leading testosterone tendencies"}
              </span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-2xl">📊</span>
              <span>
                {isKorean
                  ? "총 16개 질문으로 두 가지 지수를 동시에 측정합니다"
                  : "Measures both indices with 16 total questions"}
              </span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <span>
                {isKorean
                  ? "이 테스트는 생물학적 성별이 아닌 성격 성향을 측정합니다"
                  : "This test measures personality tendencies, not biological gender"}
              </span>
            </p>
          </div>

          <button
            onClick={() => setShowTest(true)}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xl font-bold rounded-xl hover:from-pink-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
          >
            {isKorean ? "테스트 시작하기" : "Start Test"}
          </button>
        </div>
      </div>
    );
  }

  if (result !== null) {
    const personalityType = getPersonalityType(result.estrogen, result.testosterone);

    return (
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{personalityType.emoji}</div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {isKorean ? personalityType.ko : personalityType.en}
          </h2>
          <p className="text-slate-600">{personalityType.desc}</p>
        </div>

        {/* 에겐지수 */}
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl shadow-xl p-8 border-4 border-pink-200 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">💖</span>
            <h3 className="text-2xl font-bold text-slate-900">
              {isKorean ? "에겐지수 (에겐 성향)" : "Estrogen Index"}
            </h3>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-3xl font-bold text-pink-600">{result.estrogen}%</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-2xl ${i < Math.ceil(result.estrogen / 20) ? "opacity-100" : "opacity-20"}`}>
                    💖
                  </span>
                ))}
              </div>
            </div>
            <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-rose-400 transition-all duration-1000"
                style={{ width: `${result.estrogen}%` }}
              ></div>
            </div>
            <div className="mt-3 text-sm text-slate-600 space-y-1">
              <p>✨ {isKorean ? "감성적, 섬세함, 공감능력" : "Emotional, Delicate, Empathy"}</p>
              <p>🌸 {isKorean ? "협력적, 관계 중시" : "Cooperative, Relationship-focused"}</p>
            </div>
          </div>
        </div>

        {/* 테토지수 */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 border-4 border-blue-200 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">💪</span>
            <h3 className="text-2xl font-bold text-slate-900">
              {isKorean ? "테토지수 (테토 성향)" : "Testosterone Index"}
            </h3>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-3xl font-bold text-blue-600">{result.testosterone}%</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-2xl ${i < Math.ceil(result.testosterone / 20) ? "opacity-100" : "opacity-20"}`}>
                    💪
                  </span>
                ))}
              </div>
            </div>
            <div className="h-6 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-1000"
                style={{ width: `${result.testosterone}%` }}
              ></div>
            </div>
            <div className="mt-3 text-sm text-slate-600 space-y-1">
              <p>🔥 {isKorean ? "논리적, 주도적, 경쟁심" : "Logical, Leading, Competitive"}</p>
              <p>⚡ {isKorean ? "독립적, 목표 지향" : "Independent, Goal-oriented"}</p>
            </div>
          </div>
        </div>

        {/* 균형 차트 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-slate-200 mb-6">
          <h4 className="text-xl font-bold text-slate-900 mb-4 text-center">
            {isKorean ? "📊 성향 밸런스" : "📊 Tendency Balance"}
          </h4>
          <div className="relative h-8 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 h-full w-1 bg-slate-800"
              style={{ 
                left: `${(() => {
                  const total = result.estrogen + result.testosterone;
                  return total > 0 ? (result.testosterone / total) * 100 : 50;
                })()}%` 
              }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                {isKorean ? "현재 위치" : "You"}
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm font-bold">
            <span className="text-pink-600">💖 {isKorean ? "에겐형" : "Estrogen"}</span>
            <span className="text-blue-600">💪 {isKorean ? "테토형" : "Testosterone"}</span>
          </div>
          
          <p className="text-sm text-slate-600 mt-4 text-center">
            {isKorean
              ? "모든 사람은 에겐/테토 특성을 다양한 비율로 가지고 있습니다. 어느 쪽이든 좋고 나쁨이 없어요!"
              : "Everyone has various ratios of estrogen/testosterone traits. Neither side is better!"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={resetTest}
            className="py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold rounded-xl hover:from-pink-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
          >
            {isKorean ? "🔄 다시 테스트하기" : "🔄 Test Again"}
          </button>
          <a
            href={`/${locale}?category=테스트`}
            className="py-3 bg-white border-2 border-pink-300 text-pink-600 font-bold rounded-xl hover:bg-pink-50 transition-all transform hover:scale-105 text-center"
          >
            {isKorean ? "🎯 다른 테스트 보기" : "🎯 Other Tests"}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      {/* 진행 상황 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-slate-600">
            {isKorean ? "진행 상황" : "Progress"}
          </span>
          <span className="text-sm font-bold text-pink-600">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>
        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 질문 */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-pink-100 mb-6">
        <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
          {isKorean ? currentQ.textKo : currentQ.textEn}
        </h3>

        <div className="space-y-3">
          {[
            { value: 5, labelKo: "매우 그렇다", labelEn: "Strongly Agree" },
            { value: 4, labelKo: "그렇다", labelEn: "Agree" },
            { value: 3, labelKo: "보통이다", labelEn: "Neutral" },
            { value: 2, labelKo: "아니다", labelEn: "Disagree" },
            { value: 1, labelKo: "전혀 아니다", labelEn: "Strongly Disagree" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="w-full py-4 px-6 bg-gradient-to-r from-pink-50 to-blue-50 hover:from-pink-100 hover:to-blue-100 border-2 border-pink-200 hover:border-pink-400 rounded-xl text-slate-800 font-semibold transition-all transform hover:scale-102 hover:shadow-md"
            >
              {isKorean ? option.labelKo : option.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* 이전 버튼 */}
      {currentQuestion > 0 && (
        <button
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          className="w-full py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-all"
        >
          {isKorean ? "← 이전 질문" : "← Previous Question"}
        </button>
      )}
    </div>
  );
}

