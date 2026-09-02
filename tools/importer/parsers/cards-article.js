/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-article. Base: cards.
 * Source: https://wknd-trendsetters.site/
 * Generated: 2026-09-02
 *
 * Block library: 2 columns. First row = block name. Each subsequent row is one
 * card: cell 1 = image, cell 2 = text content (title, description, optional CTA).
 * Source: each card is an <a class="article-card card-link"> wrapping an image
 * (.article-card-image img) and a body (.article-card-body) with meta + heading.
 * The card's href is preserved as a CTA link.
 */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll(':scope > a.article-card, :scope > a.card-link, :scope > .article-card');
  const cells = [];

  cards.forEach((card) => {
    const img = card.querySelector('.article-card-image img, img');

    const textCell = [];
    const meta = card.querySelector('.article-card-meta');
    if (meta) textCell.push(meta);
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6, [class*="heading"]');
    const href = card.getAttribute('href');
    if (heading) {
      // Preserve the card link by wrapping the heading text in an anchor
      // (avoids duplicating the title text as a separate CTA line).
      if (href) {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = heading.textContent.trim();
        heading.textContent = '';
        heading.appendChild(link);
      }
      textCell.push(heading);
    }

    if (!img && textCell.length === 0) return;
    cells.push([img || '', textCell.length ? textCell : '']);
  });

  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
