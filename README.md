# NAMU ARTICLE

A quiet article archive for sharing sermon notes and reflections.

## Content model
Articles live in `content/articles.js`. Add a new article object, push to `main`, and Vercel can redeploy automatically through Git integration.

The original reading rail, mobile progress bar, table of contents, and paragraph selection were recovered from the October 14, 2026 production deployment. Their implementation now lives in `components/ArticleReader.js`, `components/ParagraphSelection.js`, `components/CopyBlock.js`, and `components/ShareBar.js`, with styles in `app/globals.css`. Preserve these files when publishing articles; the older Git implementation did not contain the deployed reading experience.

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
```
