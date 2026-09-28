import Link from 'next/link';
import { articles } from '../content/articles';

export default function Home() {
  const featured = articles[0];
  return (
    <main>
      <header className="masthead shell">
        <Link href="/" className="brand">NAMU <span>ARTICLE</span></Link>
        <div className="mastMeta">WORDS TO KEEP · VOL. 01</div>
      </header>

      <section className="homeHero shell">
        <div className="homeHeroMeta">
          <span>TODAY&apos;S MESSAGE</span>
          <span>{featured.date}</span>
        </div>

        <div className="homeHeroGrid">
          <div>
            <p className="eyebrow">{featured.eyebrow}</p>
            <h1>{featured.title}</h1>
            <p className="deck">{featured.subtitle}</p>
            <Link className="readLink" href={`/articles/${featured.slug}`}>
              말씀 전문 읽기 <span>→</span>
            </Link>
          </div>

          <aside className="verseCard">
            <span>KEY MESSAGE</span>
            <strong>“하나님의 이름을 지닌 백성의 말과 삶은 그 이름에 대한 증언이다.”</strong>
            <small>— {featured.verse}</small>
          </aside>
        </div>
      </section>

      <section className="latest shell">
        <div className="sectionHead">
          <span>THE LATEST</span>
          <span>{String(articles.length).padStart(2, '0')} STORY</span>
        </div>

        {articles.map((article, index) => (
          <Link className="storyRow" href={`/articles/${article.slug}`} key={article.slug}>
            <span className="storyIndex">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h2>{article.title}</h2>
              <p>{article.subtitle}</p>
            </div>
            <span className="storyDate">{article.date}<br />{article.readTime}</span>
          </Link>
        ))}
      </section>

      <footer className="siteFooter shell">
        <span>NAMU ARTICLE</span>
        <p>말씀을 지나치지 않고, 오래 기억하기 위해.</p>
      </footer>
    </main>
  );
}
