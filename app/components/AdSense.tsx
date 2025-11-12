'use client';

import { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
}

export function AdSense({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = { display: 'block' },
}: AdSenseProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // 실제 애드센스 클라이언트 ID로 교체 필요
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
    />
  );
}

// 디스플레이 광고 (자동 크기)
export function DisplayAd({ adSlot }: { adSlot: string }) {
  return (
    <div className="my-8">
      <p className="mb-2 text-center text-xs text-slate-400">Advertisement</p>
      <AdSense adSlot={adSlot} />
    </div>
  );
}

// 인피드 광고 (콘텐츠 사이)
export function InFeedAd({ adSlot }: { adSlot: string }) {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <p className="mb-4 text-center text-xs text-slate-400">Sponsored</p>
      <AdSense
        adSlot={adSlot}
        adFormat="fluid"
        style={{ display: 'block', minHeight: '250px' }}
      />
    </div>
  );
}

// 사이드바 광고
export function SidebarAd({ adSlot }: { adSlot: string }) {
  return (
    <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="mb-2 text-center text-xs text-slate-400">Advertisement</p>
      <AdSense
        adSlot={adSlot}
        adFormat="vertical"
        style={{ display: 'block', minHeight: '600px' }}
      />
    </div>
  );
}

