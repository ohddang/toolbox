import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './app/i18n/settings';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 정적 파일이나 API 경로는 무시
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('/favicon.ico') ||
    pathname.includes('/robots.txt') ||
    pathname.includes('/sitemap.xml') ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|css|js)$/)
  ) {
    return;
  }

  // 이미 로케일이 URL에 포함되어 있는지 확인
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return;
  }

  // Accept-Language 헤더로 사용자 선호 언어 감지
  let locale = defaultLocale;
  const acceptLanguage = request.headers.get('accept-language');

  if (acceptLanguage) {
    // 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7' 형식 파싱
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [code, qValue] = lang.trim().split(';');
        const quality = qValue ? parseFloat(qValue.split('=')[1]) : 1.0;
        return { code: code.split('-')[0], quality };
      })
      .sort((a, b) => b.quality - a.quality);

    // 지원하는 언어 중 우선순위가 가장 높은 것 선택
    for (const { code } of languages) {
      if (locales.includes(code as any)) {
        locale = code as typeof defaultLocale;
        break;
      }
    }
  }

  // 쿠키에 저장된 언어 설정이 있으면 우선 사용
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale as any)) {
    locale = cookieLocale as typeof defaultLocale;
  }

  // 로케일을 포함한 URL로 리다이렉트
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  const response = NextResponse.redirect(newUrl);

  // 선택된 언어를 쿠키에 저장
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 60 * 60 * 24 * 365, // 1년
    path: '/',
  });

  return response;
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)'],
};

