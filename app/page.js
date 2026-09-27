import Link from 'next/link';
import { articles } from '../content/articles';

export default function Home() {
  const featured = articles[0];
  return (
    <main>
      <header className="masthead shell">
        <Link href="/" className="brand">NAMU<span>ARTICLE</span></Link>
        <div className="mastMeta">WORDS TO KEEP · VOL. 01</div>
      </header>

      <section className="hero shell">
        <div className="heroTopline"><span>TODAY&apos;S MESSAGE</span><span>{featured.date}</span></div>
        <div className="heroGrid">
          <div>
            <p className="eyebrow">{featured.eyebrow}</p>
            <h1>{featured.title}</h1>
            <p className="deck">{featured.subtitle}</p>
            <Link className="readLink" href={`/articles/${featured.slug}`}>READ THE ARTICLE <span>→</span></Link>
          </div>
          <aside className="verseCard">
            <span>THE VERSE</span>
            <strong>“너는 네 하나님 여호와의 이름을 망령되게 부르지 말라.”</strong>
            <small>— {featured.verse}</small>
          </aside>
        </div>
      </section>

      <section className="latest shell">
        <div className="sectionHead"><span>THE LATEST</span><span>01 STORY</span></div>
        {articles.map((article, index) => (
          <Link className="storyRow" href={`/articles/${article.slug}`} key={article.slug}>
            <span className="storyIndex">0{index + 1}</span>
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
