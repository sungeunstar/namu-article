'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

const ReaderContext = createContext(null);
export const useReader = () => useContext(ReaderContext);

export default function ArticleReader({ children }) {
  const [progress, setProgress] = useState(0);
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState(new Set());
  const [status, setStatus] = useState('');
  const [copying, setCopying] = useState(false);
  const root = useRef(null);
  const toggleButton = useRef(null);
  const session = useRef(0);

  useEffect(() => {
    let frame;
    const update = () => {
      const body = root.current?.querySelector('.articleMain');
      if (!body) return;
      const rect = body.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const distance = rect.height - window.innerHeight;
      setProgress(distance <= 0 ? (rect.bottom <= window.innerHeight ? 100 : 0)
        : Math.round(Math.max(0, Math.min(1, (window.scrollY - top) / distance)) * 100));
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = new ResizeObserver(schedule);
    if (root.current) observer.observe(root.current);
    document.fonts?.ready.then(schedule);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);

  function close() {
    session.current += 1;
    setSelecting(false); setSelected(new Set()); setStatus(''); setCopying(false);
    toggleButton.current?.focus({ preventScroll: true });
  }
  useEffect(() => {
    if (!selecting) return;
    const onKey = (event) => { if (event.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selecting]);

  function toggle(id) {
    setSelected(previous => { const next = new Set(previous); next.has(id) ? next.delete(id) : next.add(id); return next; });
    setStatus('');
  }
  async function copySelected() {
    if (!selected.size || copying) return;
    const version = session.current;
    const text = Array.from(root.current.querySelectorAll('[data-copy-id]'))
      .filter(node => selected.has(node.dataset.copyId)).map(node => node.dataset.copyText).join('\n\n');
    setCopying(true);
    try {
      await navigator.clipboard.writeText(text);
      if (session.current === version) setStatus(`${selected.size}개 문단 복사됨`);
    } catch {
      if (session.current === version) setStatus('복사하지 못했어요. 브라우저 권한을 확인하거나 글을 직접 선택해 복사해 주세요.');
    } finally { if (session.current === version) setCopying(false); }
  }

  return <ReaderContext.Provider value={{ selecting, selected, toggle }}>
    <div ref={root} className="readerRoot">
      <div className="readingProgress" role="progressbar" aria-label="읽기 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
        <div style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
      <div className="readerTools" aria-label="아티클 읽기 도구">
        <span className="readerPercent">{progress}% 읽음</span>
        <button ref={toggleButton} type="button" aria-pressed={selecting} onClick={() => { if (selecting) close(); else { session.current += 1; setSelecting(true); } }}>문단 선택{selecting ? ' 해제' : ' · 복사'}</button>
        {selecting && <>
          <button type="button" disabled={!selected.size || copying} onClick={copySelected}>{copying ? '복사 중…' : `선택한 ${selected.size}개 복사`}</button>
          <button type="button" disabled={!selected.size} onClick={() => { setSelected(new Set()); setStatus(''); }}>초기화</button>
          <button type="button" onClick={close}>닫기</button>
        </>}
        <span className="readerStatus" role="status">{status || (selecting ? '원하는 문단을 눌러 선택하세요.' : '')}</span>
      </div>
      {children}
    </div>
  </ReaderContext.Provider>;
}
