import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleReader from '../../../components/ArticleReader';
import CopyBlock from '../../../components/CopyBlock';
import ParagraphSelection from '../../../components/ParagraphSelection';
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

function InlineText({ text }) {
  return text.split(/(\*\*.+?\*\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={index}>{part.slice(2, -2)}</strong> : part);
}

function BlockContent({ block }) {
  if (block.type === 'p') return <p><InlineText text={block.text} /></p>;
  if (block.type === 'quote') {
    return (
      <blockquote className="sermonQuote">
        <p>{block.text}</p>
        {block.cite ? <cite>— {block.cite}</cite> : null}
      </blockquote>
    );
  }
  if (block.type === 'list') {
    const List = block.ordered ? 'ol' : 'ul';
    return (
      <List className={`sermonList${block.ordered ? ' orderedSermonList' : ''}`}>
        {block.items.map((item) => <li key={item}><InlineText text={item} /></li>)}
      </List>
    );
  }
  if (block.type === 'table') {
    return (
      <div className="sermonTableWrap">
        <table className="sermonTable">
          <thead><tr>{block.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead>
          <tbody>{block.rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}><InlineText text={cell} /></td>)}</tr>)}</tbody>
        </table>
      </div>
    );
  }
  if (block.type === 'emphasis') return <p className="emphasis">{block.text}</p>;
  if (block.type === 'important') return <div className="importantCallout">{block.text}</div>;
  if (block.type === 'subheading') {
    const Heading = block.level === 4 ? 'h4' : 'h3';
    return <Heading>{block.text}</Heading>;
  }
  if (block.type === 'divider') return <hr className="innerDivider" />;
  return null;
}

function Block({ block }) {
  if (block.type === 'divider') return <BlockContent block={block} />;
  const text = (block.type === 'table' ? [block.headers, ...block.rows].map((row) => row.join('\t')).join('\n')
    : block.type === 'list' ? block.items.map((item, index) => block.ordered ? `${index + 1}. ${item}` : item).join('\n')
    : `${block.text || ''}${block.cite ? `\n${block.cite}` : ''}`).replace(/\*\*(.+?)\*\*/g, '$1');
  return <CopyBlock text={text}><BlockContent block={block} /></CopyBlock>;
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const contents = [
    ...article.sections.map((section) => ({ id: `section-${section.number}`, label: section.title, number: section.number })),
    ...(article.flow.length ? [{ id: 'message-flow', label: '오늘 말씀 전체 흐름', number: '' }] : []),
    ...(article.remember.length ? [{ id: 'remember', label: '기억할 문장', number: '' }] : []),
    ...(article.finalSummary.length ? [{ id: 'final-summary', label: '최종 정리', number: '' }] : []),
  ];

  return (
    <ParagraphSelection key={slug}><main>
      <header className="masthead shell">
        <Link href="/" className="brand">NAMU <span>ARTICLE</span></Link>
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
              <ArticleReader items={contents} title={article.title} />
              <div className="railRule" />
              <p className="railCaption">말씀을 지나치지 않고,<br />오래 기억하기 위해.</p>
            </div>
          </aside>

          <div className="articleMain">
            <div id="readingBody">
            <CopyBlock text={article.lead}><p className="lead">{article.lead}</p></CopyBlock>

            {article.sections.map((section) => (
              <section className="articleSection" key={section.number} id={`section-${section.number}`} tabIndex={-1} aria-labelledby={`heading-${section.number}`}>
                <div className="sectionNumber">{section.number}</div>
                <div className="sectionContent">
                  <CopyBlock text={section.title} kind="제목" className="copyHeading"><h2 id={`heading-${section.number}`}>{section.title}</h2></CopyBlock>
                  <div className="sectionBlocks">
                    {section.blocks.map((block, index) => <Block block={block} key={`${section.number}-${index}`} />)}
                  </div>
                </div>
              </section>
            ))}

            {article.flow.length > 0 && <section className="specialSection flowSection" id="message-flow" tabIndex={-1} aria-labelledby="heading-flow">
              <div className="specialEyebrow">TODAY&apos;S MESSAGE FLOW</div>
              <CopyBlock text="🧭 오늘 말씀 전체 흐름" kind="제목" className="copyHeading"><h2 id="heading-flow">🧭 오늘 말씀 전체 흐름</h2></CopyBlock>
              <ol className="flowList">
                {article.flow.map((item, index) => (
                  <li key={item}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <CopyBlock text={item}><p>{item}</p></CopyBlock>
                  </li>
                ))}
              </ol>
            </section>}

            {article.remember.length > 0 && <section className="specialSection rememberSection" id="remember" tabIndex={-1} aria-labelledby="heading-remember">
              <div className="specialEyebrow">TO REMEMBER</div>
              <CopyBlock text="기억할 문장" kind="제목" className="copyHeading"><h2 id="heading-remember">기억할 문장</h2></CopyBlock>
              <div className="rememberList">
                {article.remember.map((item, index) => (
                  <blockquote key={item}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <CopyBlock text={item}><p>{item}</p></CopyBlock>
                  </blockquote>
                ))}
              </div>
            </section>}

            {article.finalSummary.length > 0 && <section className="specialSection finalSection" id="final-summary" tabIndex={-1} aria-labelledby="heading-summary">
              <div className="specialEyebrow">FINAL SUMMARY</div>
              <CopyBlock text="최종 정리" kind="제목" className="copyHeading"><h2 id="heading-summary">최종 정리</h2></CopyBlock>
              <div className="sectionBlocks finalBlocks">
                {article.finalSummary.map((block, index) => <Block block={block} key={`final-${index}`} />)}
              </div>
            </section>}
            </div>

            <div className="backRow"><Link href="/">← 모든 아티클 보기</Link></div>
          </div>
        </div>
      </article>

      <footer className="siteFooter shell">
        <span>NAMU ARTICLE</span>
        <p>말씀을 지나치지 않고, 오래 기억하기 위해.</p>
      </footer>
    </main></ParagraphSelection>
  );
}
