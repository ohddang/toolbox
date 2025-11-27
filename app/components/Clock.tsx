"use client";

import { useEffect, useState } from "react";

interface ClockProps {
  locale?: string;
}

export default function Clock({ locale = "ko" }: ClockProps) {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"clock" | "stopwatch">("clock");
  const [language, setLanguage] = useState<"ko" | "en">(locale === "ko" ? "ko" : "en");

  // 클라이언트 마운트 확인
  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
  }, []);

  // locale 변경 감지
  useEffect(() => {
    setLanguage(locale === "ko" ? "ko" : "en");
  }, [locale]);

  // 현재 시간 업데이트
  useEffect(() => {
    if (!mounted) return;
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [mounted]);

  // 스톱워치
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && mode === "stopwatch") {
      interval = setInterval(() => {
        setStopwatchTime((prev) => prev + 10);
      }, 10);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, mode]);

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return { hours, minutes, seconds };
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const weekdayKo = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    const weekdayEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
    return { year, month, day, weekday: language === "ko" ? weekdayKo : weekdayEn };
  };

  const labels = {
    ko: {
      clock: "🕐 시계",
      stopwatch: "⏱️ 스톱워치",
      hours: "시",
      minutes: "분",
      seconds: "초",
      start: "▶️ 시작",
      stop: "⏸️ 정지",
      reset: "🔄 리셋",
      year: "년",
      month: "월",
      day: "일",
      dayOfWeek: "요일",
    },
    en: {
      clock: "🕐 Clock",
      stopwatch: "⏱️ Stopwatch",
      hours: "H",
      minutes: "M",
      seconds: "S",
      start: "▶️ Start",
      stop: "⏸️ Stop",
      reset: "🔄 Reset",
      year: "",
      month: "/",
      day: "",
      dayOfWeek: "",
    },
  };

  const t = labels[language];

  const formatStopwatch = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
      milliseconds: String(milliseconds).padStart(2, "0"),
    };
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setStopwatchTime(0);
  };

  const time = formatTime(currentTime);
  const date = formatDate(currentTime);
  const stopwatch = formatStopwatch(stopwatchTime);

  // 클라이언트 마운트 전까지 로딩 표시
  if (!mounted) {
    return (
      <div className="flex min-h-[calc(100vh-73px)] w-full items-center justify-center">
        <div className="text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 3rem)' }}>⏳ Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-73px)] w-full flex-col items-center justify-center p-[1vw] relative">

      {/* 모드 전환 버튼 */}
      <div className="mb-[5vh] flex rounded-full bg-white/10 p-[0.5vw] backdrop-blur-lg">
        <button
          onClick={() => setMode("clock")}
          className={`flex-1 rounded-full px-[4vw] py-[2vh] font-bold transition-all duration-300 whitespace-nowrap ${
            mode === "clock"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl scale-105"
              : "text-white/60 hover:text-white"
          }`}
          style={{ fontSize: 'clamp(1rem, 2vw, 2.5rem)' }}
        >
          {t.clock}
        </button>
        <button
          onClick={() => setMode("stopwatch")}
          className={`flex-1 rounded-full px-[4vw] py-[2vh] font-bold transition-all duration-300 whitespace-nowrap ${
            mode === "stopwatch"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl scale-105"
              : "text-white/60 hover:text-white"
          }`}
          style={{ fontSize: 'clamp(1rem, 2vw, 2.5rem)' }}
        >
          {t.stopwatch}
        </button>
      </div>

      {/* 시계 모드 */}
      {mode === "clock" && (
        <div className="flex flex-col items-center justify-center w-full max-w-[95vw]">
          {/* 시간 표시 */}
          <div className="flex flex-nowrap items-center justify-center gap-[1vw]">
            <div className="flex flex-col items-center">
              <div className="rounded-3xl bg-white/10 px-[2vw] py-[3vh] backdrop-blur-lg shadow-2xl">
                <span className="font-mono font-bold text-white" style={{ fontSize: 'clamp(3rem, 12vw, 24rem)' }}>
                  {time.hours}
                </span>
              </div>
              <span className="mt-[2vh] font-bold text-white/70 whitespace-nowrap" style={{ fontSize: 'clamp(1rem, 2.5vw, 4rem)' }}>{t.hours}</span>
            </div>

            <span className="mb-[4vh] font-mono font-bold text-white/50" style={{ fontSize: 'clamp(2rem, 9vw, 20rem)' }}>
              :
            </span>

            <div className="flex flex-col items-center">
              <div className="rounded-3xl bg-white/10 px-[2vw] py-[3vh] backdrop-blur-lg shadow-2xl">
                <span className="font-mono font-bold text-white" style={{ fontSize: 'clamp(3rem, 12vw, 24rem)' }}>
                  {time.minutes}
                </span>
              </div>
              <span className="mt-[2vh] font-bold text-white/70 whitespace-nowrap" style={{ fontSize: 'clamp(1rem, 2.5vw, 4rem)' }}>{t.minutes}</span>
            </div>

            <span className="mb-[4vh] font-mono font-bold text-white/50" style={{ fontSize: 'clamp(2rem, 9vw, 20rem)' }}>
              :
            </span>

            <div className="flex flex-col items-center">
              <div className="rounded-3xl bg-white/10 px-[2vw] py-[3vh] backdrop-blur-lg shadow-2xl">
                <span className="font-mono font-bold text-white" style={{ fontSize: 'clamp(3rem, 12vw, 24rem)' }}>
                  {time.seconds}
                </span>
              </div>
              <span className="mt-[2vh] font-bold text-white/70 whitespace-nowrap" style={{ fontSize: 'clamp(1rem, 2.5vw, 4rem)' }}>{t.seconds}</span>
            </div>
          </div>

          {/* 날짜 표시 */}
          <div className="mt-[5vh] rounded-2xl bg-white/10 px-[3vw] py-[2vh] backdrop-blur-lg shadow-xl">
            <p className="text-center font-bold text-white whitespace-nowrap" style={{ fontSize: 'clamp(1.25rem, 3.5vw, 5rem)' }}>
              {language === "ko" 
                ? `${date.year}${t.year} ${date.month}${t.month} ${date.day}${t.day} ${date.weekday}${t.dayOfWeek}`
                : `${date.weekday}, ${date.month}${t.month}${date.day}${t.day} ${date.year}`
              }
            </p>
          </div>
        </div>
      )}

      {/* 스톱워치 모드 */}
      {mode === "stopwatch" && (
        <div className="flex flex-col items-center justify-center w-full max-w-[95vw]">
          {/* 스톱워치 표시 */}
          <div className="mb-[6vh] flex flex-col items-center">
            <div className="flex flex-nowrap items-center justify-center gap-[0.5vw] overflow-hidden">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="rounded-3xl bg-white/10 px-[1.5vw] py-[2.5vh] backdrop-blur-lg shadow-2xl">
                  <span className="font-mono font-bold text-white" style={{ fontSize: 'clamp(2rem, 9vw, 20rem)' }}>
                    {stopwatch.hours}
                  </span>
                </div>
                <span className="mt-[1.5vh] font-bold text-white/70 whitespace-nowrap" style={{ fontSize: 'clamp(0.75rem, 1.8vw, 3.5rem)' }}>{t.hours}</span>
              </div>

              <span className="mb-[3vh] font-mono font-bold text-white/50 flex-shrink-0" style={{ fontSize: 'clamp(1.5rem, 7vw, 18rem)' }}>
                :
              </span>

              <div className="flex flex-col items-center flex-shrink-0">
                <div className="rounded-3xl bg-white/10 px-[1.5vw] py-[2.5vh] backdrop-blur-lg shadow-2xl">
                  <span className="font-mono font-bold text-white" style={{ fontSize: 'clamp(2rem, 9vw, 20rem)' }}>
                    {stopwatch.minutes}
                  </span>
                </div>
                <span className="mt-[1.5vh] font-bold text-white/70 whitespace-nowrap" style={{ fontSize: 'clamp(0.75rem, 1.8vw, 3.5rem)' }}>{t.minutes}</span>
              </div>

              <span className="mb-[3vh] font-mono font-bold text-white/50 flex-shrink-0" style={{ fontSize: 'clamp(1.5rem, 7vw, 18rem)' }}>
                :
              </span>

              <div className="flex flex-col items-center flex-shrink-0">
                <div className="rounded-3xl bg-white/10 px-[1.5vw] py-[2.5vh] backdrop-blur-lg shadow-2xl">
                  <span className="font-mono font-bold text-white" style={{ fontSize: 'clamp(2rem, 9vw, 20rem)' }}>
                    {stopwatch.seconds}
                  </span>
                </div>
                <span className="mt-[1.5vh] font-bold text-white/70 whitespace-nowrap" style={{ fontSize: 'clamp(0.75rem, 1.8vw, 3.5rem)' }}>{t.seconds}</span>
              </div>
            </div>

            {/* 밀리초 */}
            <div className="mt-[3vh] rounded-2xl bg-white/10 px-[3vw] py-[1.5vh] backdrop-blur-lg shadow-xl">
              <span className="font-mono font-bold text-white/90" style={{ fontSize: 'clamp(1.5rem, 5vw, 10rem)' }}>
                .{stopwatch.milliseconds}
              </span>
            </div>
          </div>

          {/* 컨트롤 버튼 */}
          <div className="flex flex-wrap gap-[2vw] justify-center">
            <button
              onClick={handleStartStop}
              className={`rounded-full px-[4vw] py-[2.5vh] font-bold text-white shadow-2xl transition-all hover:scale-105 whitespace-nowrap ${
                isRunning
                  ? "bg-gradient-to-r from-red-500 to-pink-500"
                  : "bg-gradient-to-r from-green-500 to-emerald-500"
              }`}
              style={{ fontSize: 'clamp(1.25rem, 2.5vw, 4rem)' }}
            >
              {isRunning ? t.stop : t.start}
            </button>

            <button
              onClick={handleReset}
              disabled={stopwatchTime === 0 && !isRunning}
              className={`rounded-full px-[4vw] py-[2.5vh] font-bold shadow-2xl transition-all whitespace-nowrap ${
                stopwatchTime === 0 && !isRunning
                  ? "cursor-not-allowed bg-white/20 text-white/40"
                  : "bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:scale-105"
              }`}
              style={{ fontSize: 'clamp(1.25rem, 2.5vw, 4rem)' }}
            >
              {t.reset}
            </button>
          </div>
        </div>
      )}

      {/* 장식 효과 */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/4 top-1/4 animate-pulse rounded-full bg-purple-500/20 blur-3xl" style={{ width: 'clamp(15rem, 25vw, 40rem)', height: 'clamp(15rem, 25vw, 40rem)' }}></div>
        <div className="absolute bottom-1/4 right-1/4 animate-pulse rounded-full bg-pink-500/20 blur-3xl" style={{ width: 'clamp(15rem, 25vw, 40rem)', height: 'clamp(15rem, 25vw, 40rem)' }}></div>
      </div>
    </div>
  );
}

