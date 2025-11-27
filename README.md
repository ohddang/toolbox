# 🧰 Toolbag

유용한 게임, 유틸리티, 테스트를 한 곳에서 제공하는 웹 플랫폼

## 🚀 시작하기

### 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 프로덕션 빌드

```bash
npm run build
npm run start
```

## 📦 주요 기능

### 게임 🎮
- **2048 게임** - 클래식 퍼즐 게임
- **사다리 게임** - 공정한 추첨 도구
- **룰렛 게임** - 가중치 기반 룰렛
- **색상 찾기 게임** - 두뇌 트레이닝

### 유틸리티 🛠️
- **시계 & 스톱워치** - 대형 디지털 시계

### 테스트 📊
- **IQ 테스트** - 지능 지수 측정
- **MBTI 테스트** - 성격 유형 검사
- **에겐/테토 테스트** - 성향 분석

## 🌍 다국어 지원

- 🇰🇷 한국어 (Korean)
- 🇺🇸 영어 (English)

## 🛠️ 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **i18n**: Custom i18n implementation
- **Graphics**: PixiJS (게임용)
- **SEO**: Structured Data, Sitemap, Robots.txt
- **Analytics**: Google Analytics (선택)
- **Ads**: Google AdSense (선택)

## 📁 프로젝트 구조

```
app/
├── [locale]/          # 언어별 라우팅
│   ├── games/         # 게임 페이지들
│   ├── tools/         # 유틸리티 페이지들
│   ├── tests/         # 테스트 페이지들
│   └── page.tsx       # 메인 페이지
├── components/        # 재사용 가능한 컴포넌트
├── i18n/             # 다국어 번역 파일
└── ...
```

## 📄 문서

- **배포 가이드**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **AdSense 설정**: [ADSENSE_SETUP.md](./ADSENSE_SETUP.md)

## 🔧 설정

### 환경 변수

`.env.production` 파일 생성:

```env
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://toolbox.com
```

### Google 서비스 설정

1. **AdSense**: `app/[locale]/layout.tsx`에서 Publisher ID 교체
2. **Analytics**: 환경 변수에 GA ID 설정
3. **Search Console**: 사이트 소유권 확인 코드 교체

## 📊 SEO 최적화

- ✅ Structured Data (Schema.org)
- ✅ Sitemap.xml 자동 생성
- ✅ Robots.txt
- ✅ OpenGraph & Twitter Cards
- ✅ 다국어 hreflang 태그
- ✅ 파비콘 & PWA Manifest
- ✅ 보안 헤더 (HSTS, CSP 등)

## 🚀 배포

자세한 배포 가이드는 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참고하세요.

### Vercel (권장)

```bash
vercel --prod
```

### 기타 플랫폼

```bash
npm run build
npm run start
```

## 📝 라이선스

Private Project

## 👨‍💻 개발자

Toolbox Team
