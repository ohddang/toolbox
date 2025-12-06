# 배포 가이드 (Deployment Guide)

## 🚀 배포 전 체크리스트

### 1. 환경 변수 설정

프로젝트 루트에 `.env.production` 파일을 생성하고 다음 값들을 설정하세요:

```env
# Google AdSense (실제 값으로 교체)
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX

# Google Analytics (선택사항)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Site URL
NEXT_PUBLIC_SITE_URL=https://toolbox.com

# Environment
NODE_ENV=production
```

### 2. Google 인증 코드 업데이트

#### Google AdSense
1. `app/[locale]/layout.tsx` 파일 열기
2. 197번째 줄의 `ca-pub-XXXXXXXXXXXXXXXX`를 실제 AdSense ID로 교체

#### Google Search Console
1. `app/[locale]/layout.tsx` 파일 열기
2. 163번째 줄의 `google-site-verification-code`를 실제 인증 코드로 교체
3. Yandex를 사용하지 않는다면 164번째 줄 삭제

### 3. 도메인 변경 (필요시)

현재 도메인: `toolbox.com`

도메인을 변경하려면 다음 파일들을 수정:
- `app/sitemap.ts` (4번째 줄)
- `app/[locale]/layout.tsx` (60, 110, 143, 186-192번째 줄)
- `public/robots.txt` (6번째 줄)

### 4. 빌드 테스트

```bash
# 타입 체크
npm run type-check

# 린트 체크
npm run lint

# 프로덕션 빌드
npm run build

# 로컬에서 프로덕션 모드 실행
npm run start
```

## 📦 배포 플랫폼별 가이드

### Vercel (권장)

1. GitHub에 코드 푸시
2. Vercel에 로그인 후 Import Project
3. 환경 변수 설정
4. Deploy 버튼 클릭

**환경 변수:**
- `NEXT_PUBLIC_ADSENSE_ID`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_SITE_URL`

### Netlify

1. GitHub에 코드 푸시
2. Netlify에 로그인 후 New site from Git
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. 환경 변수 설정 (Vercel과 동일)

### AWS / DigitalOcean / 기타

```bash
# 1. 서버에 Node.js 설치 (v20 이상)

# 2. 프로젝트 클론
git clone [repository-url]
cd toolbox

# 3. 의존성 설치
npm install

# 4. 환경 변수 설정
nano .env.production
# (위의 환경 변수 입력)

# 5. 빌드
npm run build

# 6. PM2로 실행 (권장)
npm install -g pm2
pm2 start npm --name "toolbox" -- start
pm2 save
pm2 startup
```

## ✅ 배포 후 확인사항

### SEO 체크
- [ ] Google Search Console에 sitemap 제출: `https://toolbox.com/sitemap.xml`
- [ ] robots.txt 접근 확인: `https://toolbox.com/robots.txt`
- [ ] 파비콘 표시 확인
- [ ] OpenGraph 이미지 확인 (SNS 공유 테스트)

### 성능 체크
- [ ] Lighthouse 점수 확인 (90+ 목표)
- [ ] Core Web Vitals 확인
- [ ] 이미지 최적화 작동 확인

### 기능 체크
- [ ] 모든 게임 작동 확인
  - 2048 게임
  - 룰렛 게임
  - 색상 찾기 게임
- [ ] 모든 유틸리티 작동 확인
  - 시계 & 스톱워치
- [ ] 모든 테스트 작동 확인
  - IQ 테스트
  - MBTI 테스트
  - 에겐/테토 테스트
- [ ] 언어 전환 (한국어/영어) 작동 확인
- [ ] 태그 필터링 작동 확인
- [ ] 카테고리 필터링 작동 확인

### 보안 체크
- [ ] HTTPS 적용 확인
- [ ] 보안 헤더 확인 (https://securityheaders.com)
- [ ] 취약점 스캔

### 모니터링 설정
- [ ] Google Analytics 데이터 수집 확인
- [ ] 에러 모니터링 도구 설정 (Sentry 등)
- [ ] 업타임 모니터링 설정

## 🔧 최적화 설정 완료

### 이미지 최적화
- ✅ AVIF, WebP 포맷 지원
- ✅ 반응형 이미지 사이즈 설정
- ✅ 외부 이미지 최적화 (Unsplash)

### 보안 헤더
- ✅ HSTS (Strict-Transport-Security)
- ✅ X-Frame-Options (SAMEORIGIN)
- ✅ X-Content-Type-Options (nosniff)
- ✅ X-XSS-Protection
- ✅ Referrer-Policy
- ✅ Permissions-Policy
- ✅ DNS Prefetch Control

### 캐싱
- ✅ 정적 파일 1년 캐싱
- ✅ 폰트 파일 영구 캐싱
- ✅ 이미지 파일 1년 캐싱

### PWA 지원
- ✅ manifest.json 설정
- ✅ 앱 아이콘 설정
- ✅ 테마 컬러 설정

## 📊 성능 목표

- Lighthouse Performance: 90+
- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.8s
- Cumulative Layout Shift: < 0.1

## 🆘 문제 해결

### 빌드 에러
```bash
# 캐시 삭제 후 재시도
rm -rf .next
npm run build
```

### 환경 변수가 적용되지 않음
- Vercel: 환경 변수 변경 후 재배포 필요
- 로컬: 서버 재시작 필요

### 이미지가 로드되지 않음
- `next.config.ts`의 `remotePatterns` 확인
- 이미지 URL 프로토콜(https) 확인

## 📝 배포 후 작업

1. **Google Search Console 설정**
   - 사이트 소유권 확인
   - Sitemap 제출
   - 크롤링 요청

2. **Google Analytics 설정**
   - 목표 설정
   - 전환 추적 설정
   - 이벤트 추적 설정

3. **모니터링 설정**
   - Uptime 모니터링
   - 에러 추적
   - 성능 모니터링

4. **백업 설정**
   - 데이터베이스 백업 (필요시)
   - 코드 버전 관리
   - 환경 변수 백업

## 📞 지원

문제가 발생하면 다음을 확인하세요:
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Vercel 배포 가이드](https://vercel.com/docs)
- 프로젝트 이슈 트래커

