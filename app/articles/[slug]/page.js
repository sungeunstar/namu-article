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

function Block({ block }) {
  if (block.type === 'p') return <p>{block.text}</p>;
  if (block.type === 'quote') {
    return (
      <blockquote className="sermonQuote">
        <p>{block.text}</p>
        {block.cite ? <cite>— {block.cite}</cite> : null}
      </blockquote>
    );
  }
  if (block.type === 'list') {
    return (
      <ul className="sermonList">
        {block.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    );
  }
  if (block.type === 'emphasis') return <p className="emphasis">{block.text}</p>;
  if (block.type === 'important') return <div className="importantCallout">{block.text}</div>;
  if (block.type === 'subheading') return <h3>{block.text}</h3>;
  if (block.type === 'divider') return <hr className="innerDivider" />;
  return null;
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <main>
      <header className="masthead shell">
        <Link href="/" className="brand">NAMU <span>ARTICLE</span></Link>
        <ShareBar title={article.title} />
      </header>

      <article className="article shell">
        <div className="articleHero">
          <div className="articleMeta">
            <span>{article.eyebrow}</span>
            <span>{article.date} · {article.readTime}</span>
          </div>
          <h1>{article.title}</h1>
          <p className="articleDeck">{article.subtitle}</p>
          <div className="articleInfo">
            <span>본문</span>
            <strong>{article.verse}</strong>
          </div>
        </div>

        <div className="articleLayout">
          <aside className="articleRail">
            <div className="railSticky">
              <span className="railLabel">SERMON NOTE</span>
              <p>{article.date}</p>
              <p>{article.sections.length} sections</p>
              <p>{article.readTime}</p>
              <div className="railRule" />
              <p className="railCaption">말씀을 지나치지 않고,<br />오래 기억하기 위해.</p>
            </div>
          </aside>

          <div className="articleMain">
            <p className="lead">{article.lead}</p>

            {article.sections.map((section) => (
              <section className="articleSection" key={section.number}>
                <div className="sectionNumber">{section.number}</div>
                <div className="sectionContent">
                  <h2>{section.title}</h2>
                  <div className="sectionBlocks">
                    {section.blocks.map((block, index) => <Block block={block} key={`${section.number}-${index}`} />)}
                  </div>
                </div>
              </section>
            ))}

            <section className="specialSection flowSection">
              <div className="specialEyebrow">TODAY&apos;S MESSAGE FLOW</div>
              <h2>🧭 오늘 말씀 전체 흐름</h2>
              <ol className="flowList">
                {article.flow.map((item, index) => (
                  <li key={item}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="specialSection rememberSection">
              <div className="specialEyebrow">TO REMEMBER</div>
              <h2>기억할 문장</h2>
              <div className="rememberList">
                {article.remember.map((item, index) => (
                  <blockquote key={item}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{item}</p>
                  </blockquote>
                ))}
              </div>
            </section>

            <section className="specialSection finalSection">
              <div className="specialEyebrow">FINAL SUMMARY</div>
              <h2>최종 정리</h2>
              <div className="sectionBlocks finalBlocks">
                {article.finalSummary.map((block, index) => <Block block={block} key={`final-${index}`} />)}
              </div>
            </section>

            <div className="backRow"><Link href="/">← 모든 아티클 보기</Link></div>
          </div>
        </div>
      </article>

      <footer className="siteFooter shell">
        <span>NAMU ARTICLE</span>
        <p>말씀을 지나치지 않고, 오래 기억하기 위해.</p>
      </footer>
    </main>
  );
}
