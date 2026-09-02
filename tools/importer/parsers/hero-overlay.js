/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-overlay. Base: hero.
 * Source: https://wknd-trendsetters.site/
 * Generated: 2026-09-02
 *
 * Block library: 1 column, 3 rows. Row 1 = block name. Row 2 = background image
 * (single cell). Row 3 = content cell (title, subheading, CTA).
 * Source: a relative container with a background <img class="cover-image"> and a
 * .card-body holding an h2 heading, a subheading paragraph, and a button group.
 */
export default function parse(element, { document }) {
  const bgImage = element.querySelector('img.cover-image, img[class*="overlay"], img');
  const heading = element.querySelector('h1, h2, h3, [class*="heading"]');
  const subheading = element.querySelector('p.subheading, p');
  const ctaLinks = Array.from(element.querySelectorAll('.button-group a, a.button'));

  const cells = [];

  // Row 2: background image (single cell). Add only if present.
  if (bgImage) cells.push([bgImage]);

  // Row 3: content (single cell holding all content elements).
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  contentCell.push(...ctaLinks);

  if (!bgImage && contentCell.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-overlay', cells });
  element.replaceWith(block);
}
