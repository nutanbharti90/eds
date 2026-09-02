/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-article. Base: columns.
 * Source: https://wknd-trendsetters.site/
 * Generated: 2026-09-02
 *
 * Block library: multiple columns. First row = block name. Second row holds one
 * cell per column. Source: a grid with two direct-child <div>s — first is the
 * image, second is the text content (breadcrumbs, heading, author/meta). Map
 * each top-level column div to a cell in a single content row.
 */
export default function parse(element, { document }) {
  const columns = element.querySelectorAll(':scope > div');
  const cells = [];
  const row = [];

  columns.forEach((col) => {
    row.push(col);
  });

  if (row.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  cells.push(row);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-article', cells });
  element.replaceWith(block);
}
