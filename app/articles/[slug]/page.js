import Link from 'next/link';
import { notFound } from 'next/navigation';
import ShareBar from '../../../components/ShareBar';
import { articles, getArticle } from '../../../content/articles';

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: `${article.title} — NAMU ARTICLE`, description: article.subtitle };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <main>
      <header className="masthead shell">
        <Link href="/" className="brand">NAMU<span>ARTICLE</span></Link>
        <ShareBar title={article.title} />
      </header>

      <article className="article shell">
        <div className="articleMeta">
          <span>{article.eyebrow}</span>
          <span>{article.date} · {article.readTime}</span>
        </div>
        <h1>{article.title}</h1>
        <p className="articleDeck">{article.subtitle}</p>
        <div className="rule" />
        <p className="lead">{article.lead}</p>

        {article.sections.map((section) => (
          <section className="articleSection" key={section.kicker}>
            <div className="sectionKicker">{section.kicker}</div>
            <div className="sectionBody">
              <h2>{section.title}</h2>
              {section.paragraphs.map((p) => <p key={p}>{p}</p>)}
              <blockquote>{section.quote}</blockquote>
            </div>
          </section>
        ))}

        <section className="takeawayBlock">
          <div className="sectionKicker">TO REMEMBER</div>
          <div>
            <h2>이번 주, 기억할 다섯 문장</h2>
            <ol>
              {article.takeaways.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </div>
        </section>

        <div className="closingQuote">{article.footer}</div>
        <div className="backRow"><Link href="/">← BACK TO ALL STORIES</Link></div>
      </article>

      <footer className="siteFooter shell">
        <span>NAMU ARTICLE</span>
        <p>말씀을 지나치지 않고, 오래 기억하기 위해.</p>
      </footer>
    </main>
  );
}
