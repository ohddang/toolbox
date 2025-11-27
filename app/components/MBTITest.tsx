"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

interface Question {
  id: number;
  dimension: "EI" | "SN" | "TF" | "JP";
  textKo: string;
  textEn: string;
  reverse?: boolean; // true면 점수 반대로
}

const questions: Question[] = [
  // E/I 차원
  { id: 1, dimension: "EI", textKo: "새로운 사람들을 만나는 것이 즐겁다", textEn: "I enjoy meeting new people" },
  { id: 2, dimension: "EI", textKo: "혼자 있는 시간이 필요하다", textEn: "I need time alone to recharge", reverse: true },
  { id: 3, dimension: "EI", textKo: "사교 모임에서 에너지를 얻는다", textEn: "I gain energy from social gatherings" },
  { id: 4, dimension: "EI", textKo: "말하기보다 듣는 것을 선호한다", textEn: "I prefer listening over talking", reverse: true },
  
  // S/N 차원
  { id: 5, dimension: "SN", textKo: "현실적이고 실용적인 것을 중요하게 생각한다", textEn: "I value practical and realistic things" },
  { id: 6, dimension: "SN", textKo: "상상력과 가능성에 끌린다", textEn: "I'm drawn to imagination and possibilities", reverse: true },
  { id: 7, dimension: "SN", textKo: "세부 사항에 주의를 기울인다", textEn: "I pay attention to details" },
  { id: 8, dimension: "SN", textKo: "큰 그림과 미래를 생각하는 것을 좋아한다", textEn: "I like thinking about the big picture and future", reverse: true },
  
  // T/F 차원
  { id: 9, dimension: "TF", textKo: "논리적 분석으로 결정을 내린다", textEn: "I make decisions through logical analysis" },
  { id: 10, dimension: "TF", textKo: "타인의 감정을 먼저 고려한다", textEn: "I consider others' feelings first", reverse: true },
  { id: 11, dimension: "TF", textKo: "객관적 사실이 주관적 감정보다 중요하다", textEn: "Objective facts are more important than subjective feelings" },
  { id: 12, dimension: "TF", textKo: "공감과 조화를 중시한다", textEn: "I value empathy and harmony", reverse: true },
  
  // J/P 차원
  { id: 13, dimension: "JP", textKo: "계획을 세우고 그대로 실행하는 것을 좋아한다", textEn: "I like making plans and following them" },
  { id: 14, dimension: "JP", textKo: "융통성 있게 상황에 맞춰 행동한다", textEn: "I act flexibly according to situations", reverse: true },
  { id: 15, dimension: "JP", textKo: "일을 미리 끝내는 것을 선호한다", textEn: "I prefer finishing tasks early" },
  { id: 16, dimension: "JP", textKo: "즉흥적이고 자유로운 것을 좋아한다", textEn: "I like being spontaneous and free", reverse: true },
];

const mbtiTypes = {
  INTJ: { ko: "전략가", en: "Architect", desc: "상상력이 풍부한 전략가" },
  INTP: { ko: "논리술사", en: "Logician", desc: "혁신적인 발명가" },
  ENTJ: { ko: "통솔자", en: "Commander", desc: "대담한 리더" },
  ENTP: { ko: "변론가", en: "Debater", desc: "영리한 사색가" },
  INFJ: { ko: "옹호자", en: "Advocate", desc: "이상주의적 조언자" },
  INFP: { ko: "중재자", en: "Mediator", desc: "이상주의적 치유자" },
  ENFJ: { ko: "선도자", en: "Protagonist", desc: "카리스마 있는 리더" },
  ENFP: { ko: "활동가", en: "Campaigner", desc: "열정적인 자유인" },
  ISTJ: { ko: "현실주의자", en: "Logistician", desc: "실용적 관리자" },
  ISFJ: { ko: "수호자", en: "Defender", desc: "헌신적 보호자" },
  ESTJ: { ko: "경영자", en: "Executive", desc: "효율적 관리자" },
  ESFJ: { ko: "집정관", en: "Consul", desc: "사교적 외교관" },
  ISTP: { ko: "장인", en: "Virtuoso", desc: "대담한 실험가" },
  ISFP: { ko: "모험가", en: "Adventurer", desc: "유연한 예술가" },
  ESTP: { ko: "사업가", en: "Entrepreneur", desc: "활동적 모험가" },
  ESFP: { ko: "연예인", en: "Entertainer", desc: "자유로운 연예인" },
};

export default function MBTITest() {
  const params = useParams();
  const locale = params.locale as string;
  const isKorean = locale === "ko";

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<string | null>(null);
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
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    questions.forEach((q) => {
      const answer = finalAnswers[q.id];
      const actualScore = q.reverse ? 6 - answer : answer;

      if (q.dimension === "EI") {
        if (actualScore > 3) scores.E += actualScore - 3;
        else scores.I += 3 - actualScore;
      } else if (q.dimension === "SN") {
        if (actualScore > 3) scores.S += actualScore - 3;
        else scores.N += 3 - actualScore;
      } else if (q.dimension === "TF") {
        if (actualScore > 3) scores.T += actualScore - 3;
        else scores.F += 3 - actualScore;
      } else if (q.dimension === "JP") {
        if (actualScore > 3) scores.J += actualScore - 3;
        else scores.P += 3 - actualScore;
      }
    });

    const mbtiType =
      (scores.E > scores.I ? "E" : "I") +
      (scores.S > scores.N ? "S" : "N") +
      (scores.T > scores.F ? "T" : "F") +
      (scores.J > scores.P ? "J" : "P");

    setResult(mbtiType as keyof typeof mbtiTypes);
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setShowTest(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  if (!showTest && !result) {
    return (
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">🧠</div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {isKorean ? "MBTI 성격 유형 테스트" : "MBTI Personality Test"}
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            {isKorean
              ? "16개 질문으로 알아보는 나의 성격 유형"
              : "Discover your personality type through 16 questions"}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            {isKorean ? "테스트 안내" : "Test Guide"}
          </h3>
          <div className="space-y-4 text-slate-700 mb-8">
            <p className="flex items-start gap-3">
              <span className="text-2xl">📝</span>
              <span>
                {isKorean
                  ? "총 16개의 질문이 제시됩니다"
                  : "Total of 16 questions will be presented"}
              </span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-2xl">⏱️</span>
              <span>
                {isKorean
                  ? "각 질문마다 자신의 성향에 맞게 답변해주세요"
                  : "Answer each question according to your tendencies"}
              </span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <span>
                {isKorean
                  ? "정답은 없으니 솔직하게 답변하는 것이 중요합니다"
                  : "There are no right answers, honesty is key"}
              </span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <span>
                {isKorean
                  ? "테스트 완료 후 16가지 유형 중 하나의 결과를 받게 됩니다"
                  : "You'll receive one of 16 personality types after completion"}
              </span>
            </p>
          </div>

          <button
            onClick={() => setShowTest(true)}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xl font-bold rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
          >
            {isKorean ? "테스트 시작하기" : "Start Test"}
          </button>
        </div>
      </div>
    );
  }

  if (result) {
    const resultType = mbtiTypes[result as keyof typeof mbtiTypes];
    return (
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {isKorean ? "테스트 완료!" : "Test Complete!"}
          </h2>
          <p className="text-slate-600">
            {isKorean ? "당신의 MBTI 유형은..." : "Your MBTI type is..."}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-xl p-8 border-4 border-purple-200 mb-6">
          <div className="text-center mb-6">
            <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl shadow-lg mb-4">
              <h3 className="text-5xl font-bold">{result}</h3>
            </div>
            <h4 className="text-3xl font-bold text-slate-900 mb-2">
              {isKorean ? resultType.ko : resultType.en}
            </h4>
            <p className="text-xl text-slate-600">{resultType.desc}</p>
          </div>

          <div className="bg-white rounded-xl p-6 mb-6">
            <h5 className="text-xl font-bold text-slate-900 mb-4">
              {isKorean ? "성격 특징" : "Personality Traits"}
            </h5>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-bold text-purple-600">
                  {result[0] === "E" ? (isKorean ? "외향적" : "Extraverted") : (isKorean ? "내향적" : "Introverted")}
                </span>
                <span className="text-slate-600">({result[0]})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-600">
                  {result[1] === "S" ? (isKorean ? "감각형" : "Sensing") : (isKorean ? "직관형" : "Intuitive")}
                </span>
                <span className="text-slate-600">({result[1]})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-green-600">
                  {result[2] === "T" ? (isKorean ? "사고형" : "Thinking") : (isKorean ? "감정형" : "Feeling")}
                </span>
                <span className="text-slate-600">({result[2]})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-orange-600">
                  {result[3] === "J" ? (isKorean ? "판단형" : "Judging") : (isKorean ? "인식형" : "Perceiving")}
                </span>
                <span className="text-slate-600">({result[3]})</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <p className="text-sm text-slate-700 leading-relaxed">
              {isKorean
                ? "이 결과는 간단한 테스트를 통한 참고용입니다. 더 정확한 결과를 원하신다면 전문 MBTI 검사를 받아보시는 것을 추천드립니다."
                : "This result is for reference through a simple test. For more accurate results, we recommend taking a professional MBTI assessment."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={resetTest}
            className="py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
          >
            {isKorean ? "🔄 다시 테스트하기" : "🔄 Test Again"}
          </button>
          <a
            href={`/${locale}?category=테스트`}
            className="py-3 bg-white border-2 border-purple-300 text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-all transform hover:scale-105 text-center"
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
          <span className="text-sm font-bold text-purple-600">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>
        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 질문 */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-100 mb-6">
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
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 border-2 border-purple-200 hover:border-purple-400 rounded-xl text-slate-800 font-semibold transition-all transform hover:scale-102 hover:shadow-md"
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

