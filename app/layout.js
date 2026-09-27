import './globals.css';

export const metadata = {
  title: 'NAMU ARTICLE',
  description: '말씀을 오래 기억하기 위한 작은 아티클 아카이브',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
