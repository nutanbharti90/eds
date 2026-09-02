/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-gallery. Base: cards.
 * Source: https://wknd-trendsetters.site/
 * Generated: 2026-09-02
 *
 * Block library: 2 columns. First row = block name. Each subsequent row is one
 * card: cell 1 = image, cell 2 = text content. This gallery variant is
 * image-only, so the text cell is left empty to keep a consistent 2-column table.
 * Source: sequence of <div class="utility-aspect-1x1"> each wrapping an <img>.
 */
export default function parse(element, { document }) {
  const imgs = element.querySelectorAll(':scope > div img, :scope > img, img');
  const cells = [];

  imgs.forEach((img) => {
    cells.push([img, '']);
  });

  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
