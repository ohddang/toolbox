'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, type Locale } from '../i18n/settings';

export function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = (params?.locale as Locale) || 'ko';

  const switchLanguage = (newLocale: Locale) => {
    if (currentLocale === newLocale) return;

    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    
    // 쿠키에 언어 설정 저장
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLanguage(locale)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            currentLocale === locale
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          aria-label={`Switch to ${localeNames[locale]}`}
        >
          {localeNames[locale]}
        </button>
      ))}
    </div>
  );
}

