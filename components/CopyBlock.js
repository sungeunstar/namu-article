'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useReader } from './ArticleReader';

export default function CopyBlock({ text, children, kind = '문단' }) {
  const id = useId();
  const reader = useReader();
  const [status, setStatus] = useState('');
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const selected = reader?.selected.has(id);
  async function copy() {
    clearTimeout(timer.current);
    try { await navigator.clipboard.writeText(text); setStatus('복사됨'); }
    catch { setStatus('복사 실패: 글을 직접 선택해 복사해 주세요.'); }
    timer.current = setTimeout(() => setStatus(''), 3000);
  }
  return <div className={`copyBlock${reader?.selecting ? ' selectableParagraph' : ''}${selected ? ' selectedParagraph' : ''}`}
    data-copy-id={id} data-copy-text={text}
    onClick={event => { if (reader?.selecting && !event.target.closest('button, input, a, label')) reader.toggle(id); }}>
    {children}
    {reader?.selecting ? <label className="paragraphChoice"><input type="checkbox" checked={!!selected} onChange={() => reader.toggle(id)} aria-label={`${kind} 선택: ${text.slice(0, 45)}`} />선택</label>
      : <button className="paragraphCopy" type="button" onClick={copy} aria-label={`${kind} 복사: ${text.slice(0, 45)}`}>복사</button>}
    <span className="copyStatus" role="status">{status}</span>
  </div>;
}
