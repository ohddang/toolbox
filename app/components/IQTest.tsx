"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

interface Question {
  id: number;
  type: "logic" | "math" | "pattern" | "spatial";
  textKo: string;
  textEn: string;
  options: { ko: string; en: string; correct: boolean }[];
}

const questions: Question[] = [
  {
    id: 1,
    type: "pattern",
    textKo: "다음 수열에서 ?에 들어갈 숫자는? 2, 4, 8, 16, ?",
    textEn: "What number fits in ? 2, 4, 8, 16, ?",
    options: [
      { ko: "20", en: "20", correct: false },
      { ko: "24", en: "24", correct: false },
      { ko: "32", en: "32", correct: true },
      { ko: "30", en: "30", correct: false },
    ],
  },
  {
    id: 2,
    type: "logic",
    textKo: "모든 고양이는 동물이다. 모든 동물은 생명체다. 따라서?",
    textEn: "All cats are animals. All animals are living things. Therefore?",
    options: [
      { ko: "모든 고양이는 생명체다", en: "All cats are living things", correct: true },
      { ko: "모든 생명체는 고양이다", en: "All living things are cats", correct: false },
      { ko: "일부 고양이는 동물이 아니다", en: "Some cats are not animals", correct: false },
      { ko: "모든 동물은 고양이다", en: "All animals are cats", correct: false },
    ],
  },
  {
    id: 3,
    type: "math",
    textKo: "12 × 8 - 36 ÷ 4 = ?",
    textEn: "12 × 8 - 36 ÷ 4 = ?",
    options: [
      { ko: "87", en: "87", correct: true },
      { ko: "60", en: "60", correct: false },
      { ko: "93", en: "93", correct: false },
      { ko: "81", en: "81", correct: false },
    ],
  },
  {
    id: 4,
    type: "pattern",
    textKo: "다음 중 다른 것은? 사과, 바나나, 당근, 포도",
    textEn: "Which one is different? Apple, Banana, Carrot, Grape",
    options: [
      { ko: "사과", en: "Apple", correct: false },
      { ko: "바나나", en: "Banana", correct: false },
      { ko: "당근", en: "Carrot", correct: true },
      { ko: "포도", en: "Grape", correct: false },
    ],
  },
  {
    id: 5,
    type: "logic",
    textKo: "어떤 숫자에 3을 더하고 2를 곱하면 20이 된다. 이 숫자는?",
    textEn: "If you add 3 to a number and multiply by 2, you get 20. What's the number?",
    options: [
      { ko: "5", en: "5", correct: false },
      { ko: "7", en: "7", correct: true },
      { ko: "8", en: "8", correct: false },
      { ko: "10", en: "10", correct: false },
    ],
  },
  {
    id: 6,
    type: "pattern",
    textKo: "A:1, B:2, C:3 이면 Z는?",
    textEn: "If A:1, B:2, C:3, then Z is?",
    options: [
      { ko: "24", en: "24", correct: false },
      { ko: "25", en: "25", correct: false },
      { ko: "26", en: "26", correct: true },
      { ko: "27", en: "27", correct: false },
    ],
  },
  {
    id: 7,
    type: "spatial",
    textKo: "정육면체의 면은 몇 개인가?",
    textEn: "How many faces does a cube have?",
    options: [
      { ko: "4", en: "4", correct: false },
      { ko: "6", en: "6", correct: true },
      { ko: "8", en: "8", correct: false },
      { ko: "12", en: "12", correct: false },
    ],
  },
  {
    id: 8,
    type: "math",
    textKo: "25% of 80 = ?",
    textEn: "25% of 80 = ?",
    options: [
      { ko: "15", en: "15", correct: false },
      { ko: "20", en: "20", correct: true },
      { ko: "25", en: "25", correct: false },
      { ko: "30", en: "30", correct: false },
    ],
  },
  {
    id: 9,
    type: "logic",
    textKo: "'책'과 '독서'의 관계는 '음식'과 무엇의 관계와 같은가?",
    textEn: "The relationship between 'book' and 'reading' is like 'food' and?",
    options: [
      { ko: "요리", en: "Cooking", correct: false },
      { ko: "식사", en: "Eating", correct: true },
      { ko: "재료", en: "Ingredients", correct: false },
      { ko: "맛", en: "Taste", correct: false },
    ],
  },
  {
    id: 10,
    type: "pattern",
    textKo: "3, 6, 12, 24, ?",
    textEn: "3, 6, 12, 24, ?",
    options: [
      { ko: "36", en: "36", correct: false },
      { ko: "48", en: "48", correct: true },
      { ko: "30", en: "30", correct: false },
      { ko: "42", en: "42", correct: false },
    ],
  },
  {
    id: 11,
    type: "spatial",
    textKo: "시계가 3시 15분을 가리킬 때, 시침과 분침의 각도는?",
    textEn: "When the clock shows 3:15, what's the angle between hour and minute hands?",
    options: [
      { ko: "0°", en: "0°", correct: false },
      { ko: "7.5°", en: "7.5°", correct: true },
      { ko: "15°", en: "15°", correct: false },
      { ko: "90°", en: "90°", correct: false },
    ],
  },
  {
    id: 12,
    type: "math",
    textKo: "한 책의 가격이 20% 할인되어 8,000원이다. 원래 가격은?",
    textEn: "A book is 20% off and costs 8,000. What's the original price?",
    options: [
      { ko: "9,600원", en: "9,600", correct: false },
      { ko: "10,000원", en: "10,000", correct: true },
      { ko: "12,000원", en: "12,000", correct: false },
      { ko: "16,000원", en: "16,000", correct: false },
    ],
  },
  {
    id: 13,
    type: "logic",
    textKo: "A > B, B > C 이면?",
    textEn: "If A > B and B > C, then?",
    options: [
      { ko: "A = C", en: "A = C", correct: false },
      { ko: "A > C", en: "A > C", correct: true },
      { ko: "A < C", en: "A < C", correct: false },
      { ko: "알 수 없다", en: "Cannot determine", correct: false },
    ],
  },
  {
    id: 14,
    type: "pattern",
    textKo: "월, 화, 수, 목, ?",
    textEn: "Mon, Tue, Wed, Thu, ?",
    options: [
      { ko: "금", en: "Fri", correct: true },
      { ko: "토", en: "Sat", correct: false },
      { ko: "일", en: "Sun", correct: false },
      { ko: "월", en: "Mon", correct: false },
    ],
  },
  {
    id: 15,
    type: "math",
    textKo: "5명이 각각 악수를 한 번씩 할 때 총 악수 횟수는?",
    textEn: "If 5 people each shake hands once, how many handshakes total?",
    options: [
      { ko: "5", en: "5", correct: false },
      { ko: "10", en: "10", correct: true },
      { ko: "15", en: "15", correct: false },
      { ko: "20", en: "20", correct: false },
    ],
  },
  {
    id: 16,
    type: "logic",
    textKo: "100m를 10초에 뛰는 사람의 속력은? (km/h)",
    textEn: "What's the speed of someone running 100m in 10 seconds? (km/h)",
    options: [
      { ko: "10 km/h", en: "10 km/h", correct: false },
      { ko: "36 km/h", en: "36 km/h", correct: true },
      { ko: "60 km/h", en: "60 km/h", correct: false },
      { ko: "100 km/h", en: "100 km/h", correct: false },
    ],
  },
];

export default function IQTest() {
  const params = useParams();
  const locale = params.locale as string;
  const isKorean = locale === "ko";

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [result, setResult] = useState<number | null>(null);
  const [showTest, setShowTest] = useState(false);

  const handleAnswer = (isCorrect: boolean) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: isCorrect };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, boolean>) => {
    const correctCount = Object.values(finalAnswers).filter((a) => a).length;
    const totalQuestions = questions.length;
    
    // IQ 계산: 정답률에 따라 70~140 범위로 매핑
    // 0% = 70, 50% = 100, 100% = 140
    const rawScore = (correctCount / totalQuestions) * 100;
    const iqScore = Math.round(70 + (rawScore * 0.7));
    
    setResult(iqScore);
  };

  const getIQLevel = (iq: number) => {
    if (iq >= 130) return { ko: "매우 우수", en: "Very Superior", color: "from-purple-500 to-indigo-500" };
    if (iq >= 120) return { ko: "우수", en: "Superior", color: "from-blue-500 to-cyan-500" };
    if (iq >= 110) return { ko: "평균 상", en: "High Average", color: "from-green-500 to-emerald-500" };
    if (iq >= 90) return { ko: "평균", en: "Average", color: "from-yellow-500 to-amber-500" };
    if (iq >= 80) return { ko: "평균 하", en: "Low Average", color: "from-orange-500 to-red-500" };
    return { ko: "노력 필요", en: "Needs Improvement", color: "from-red-500 to-pink-500" };
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
          <div className="text-6xl mb-6">🧠</div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {isKorean ? "IQ 테스트" : "IQ Test"}
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            {isKorean
              ? "논리, 수리, 패턴 인식 능력을 측정하세요!"
              : "Measure your logic, math, and pattern recognition abilities!"}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            {isKorean ? "테스트 안내" : "Test Guide"}
          </h3>
          <div className="space-y-4 text-slate-700 mb-8">
            <p className="flex items-start gap-3">
              <span className="text-2xl">📝</span>
              <span>
                {isKorean
                  ? "총 16개의 다양한 유형의 문제가 출제됩니다"
                  : "16 questions of various types will be presented"}
              </span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-2xl">🔢</span>
              <span>
                {isKorean
                  ? "논리 추론, 수리 계산, 패턴 인식, 공간 지각 능력을 평가합니다"
                  : "Evaluates logical reasoning, math, pattern recognition, and spatial perception"}
              </span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-2xl">⏱️</span>
              <span>
                {isKorean
                  ? "시간 제한은 없으니 천천히 생각하고 답하세요"
                  : "No time limit, think carefully before answering"}
              </span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <span>
                {isKorean
                  ? "테스트 완료 후 예상 IQ 점수를 확인할 수 있습니다"
                  : "You'll see your estimated IQ score after completion"}
              </span>
            </p>
          </div>

          <button
            onClick={() => setShowTest(true)}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xl font-bold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all transform hover:scale-105 shadow-lg"
          >
            {isKorean ? "테스트 시작하기" : "Start Test"}
          </button>
        </div>
      </div>
    );
  }

  if (result !== null) {
    const level = getIQLevel(result);
    const correctCount = Object.values(answers).filter((a) => a).length;

    return (
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {isKorean ? "테스트 완료!" : "Test Complete!"}
          </h2>
          <p className="text-slate-600">
            {isKorean ? "당신의 예상 IQ는..." : "Your estimated IQ is..."}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 border-4 border-blue-200 mb-6">
          <div className="text-center mb-6">
            <div className={`inline-block bg-gradient-to-r ${level.color} text-white px-12 py-6 rounded-2xl shadow-lg mb-4`}>
              <h3 className="text-6xl font-bold">{result}</h3>
            </div>
            <h4 className="text-3xl font-bold text-slate-900 mb-2">
              {isKorean ? level.ko : level.en}
            </h4>
            <p className="text-lg text-slate-600">
              {isKorean ? `정답률: ${correctCount}/${questions.length} (${Math.round((correctCount / questions.length) * 100)}%)` : `Correct: ${correctCount}/${questions.length} (${Math.round((correctCount / questions.length) * 100)}%)`}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 mb-6">
            <h5 className="text-xl font-bold text-slate-900 mb-4">
              {isKorean ? "IQ 분포도" : "IQ Distribution"}
            </h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">{isKorean ? "천재 (140+)" : "Genius (140+)"}</span>
                <div className={`h-2 rounded-full ${result >= 140 ? 'bg-purple-500' : 'bg-slate-200'}`} style={{ width: '60px' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">{isKorean ? "매우 우수 (130-139)" : "Very Superior (130-139)"}</span>
                <div className={`h-2 rounded-full ${result >= 130 && result < 140 ? 'bg-indigo-500' : 'bg-slate-200'}`} style={{ width: '80px' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">{isKorean ? "우수 (120-129)" : "Superior (120-129)"}</span>
                <div className={`h-2 rounded-full ${result >= 120 && result < 130 ? 'bg-blue-500' : 'bg-slate-200'}`} style={{ width: '100px' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-600">{isKorean ? "평균 (90-119)" : "Average (90-119)"}</span>
                <div className={`h-2 rounded-full ${result >= 90 && result < 120 ? 'bg-green-500' : 'bg-slate-200'}`} style={{ width: '150px' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">{isKorean ? "평균 하 (80-89)" : "Low Average (80-89)"}</span>
                <div className={`h-2 rounded-full ${result >= 80 && result < 90 ? 'bg-orange-500' : 'bg-slate-200'}`} style={{ width: '100px' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <p className="text-sm text-slate-700 leading-relaxed">
              {isKorean
                ? "이 결과는 간단한 테스트를 통한 예상 수치입니다. 정확한 IQ 측정을 원하신다면 전문 기관의 공식 검사를 받아보시는 것을 추천드립니다."
                : "This result is an estimate from a simple test. For accurate IQ measurement, we recommend taking an official test at a professional institution."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={resetTest}
            className="py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all transform hover:scale-105 shadow-lg"
          >
            {isKorean ? "🔄 다시 테스트하기" : "🔄 Test Again"}
          </button>
          <a
            href={`/${locale}?category=테스트`}
            className="py-3 bg-white border-2 border-blue-300 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 text-center"
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
          <span className="text-sm font-bold text-blue-600">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>
        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 질문 */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100 mb-6">
        <div className="text-center mb-2">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-4">
            {currentQ.type === "logic" 
              ? (isKorean ? "논리" : "Logic")
              : currentQ.type === "math"
              ? (isKorean ? "수리" : "Math")
              : currentQ.type === "pattern"
              ? (isKorean ? "패턴" : "Pattern")
              : (isKorean ? "공간" : "Spatial")}
          </span>
        </div>
        
        <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
          {isKorean ? currentQ.textKo : currentQ.textEn}
        </h3>

        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.correct)}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-2 border-blue-200 hover:border-blue-400 rounded-xl text-slate-800 font-semibold transition-all transform hover:scale-102 hover:shadow-md text-left"
            >
              <span className="inline-block w-8 h-8 bg-blue-200 rounded-full text-center leading-8 mr-3 font-bold text-blue-700">
                {String.fromCharCode(65 + index)}
              </span>
              {isKorean ? option.ko : option.en}
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

