'use client';

import { useState } from 'react';

export default function ShareBar({ title }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (_) {}
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button className="shareButton" onClick={share} aria-label="아티클 공유하기">
      {copied ? '링크 복사됨' : 'SHARE ARTICLE ↗'}
    </button>
  );
}
