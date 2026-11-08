"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Share2 } from "lucide-react";

export default function ShareBar({ title, variant = "text" }) {
  const [status, setStatus] = useState("");
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setStatus("링크 복사됨");
    } catch (_) {
      setStatus("링크를 복사하지 못했어요. 주소창의 링크를 복사해주세요.");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 2500);
  };

  return (
    <>
      <button
        className={variant === "rail" ? "railShareButton" : "shareButton"}
        onClick={share}
        aria-label="아티클 공유하기"
        title="아티클 공유하기"
      >
        {variant === "rail" ? (
          status === "링크 복사됨" ? (
            <Check size={20} aria-hidden="true" />
          ) : (
            <Share2 size={20} aria-hidden="true" />
          )
        ) : (
          status || "SHARE ARTICLE ↗"
        )}
      </button>
      <span
        role="status"
        className={
          status && variant === "rail" ? "railShareFeedback" : "srOnly"
        }
      >
        {status}
      </span>
    </>
  );
}
