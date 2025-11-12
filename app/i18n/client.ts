'use client';

import { useParams } from 'next/navigation';
import type { Locale } from './settings';
import ko from './locales/ko.json';
import en from './locales/en.json';

const translations = {
  ko,
  en,
} as const;

export function useTranslation() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'ko';

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return { t, locale };
}

