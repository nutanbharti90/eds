/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq. Base: accordion.
 * Source: https://wknd-trendsetters.site/
 * Generated: 2026-09-02
 *
 * Block library: 2 columns. First row = block name. Each subsequent row is an
 * accordion item with a Title cell (clickable label) and a Content cell (body).
 * Source uses <details class="faq-item"> with a <summary class="faq-question">
 * (title text in a <span>, plus a decorative SVG icon we drop) and a
 * <div class="faq-answer"> body.
 */
export default function parse(element, { document }) {
  const items = element.querySelectorAll('details.faq-item, details, .faq-item');
  const cells = [];

  items.forEach((item) => {
    // Title: prefer the span text inside summary; fall back to summary text.
    const summary = item.querySelector('summary.faq-question, summary');
    let titleContent = null;
    if (summary) {
      const titleSpan = summary.querySelector('span');
      if (titleSpan) {
        titleContent = titleSpan;
      } else {
        // Clone summary and strip the decorative icon.
        const clone = summary.cloneNode(true);
        clone.querySelectorAll('svg').forEach((svg) => svg.remove());
        titleContent = clone;
      }
    }

    // Content: the answer body.
    const answer = item.querySelector('.faq-answer, div');

    if (!titleContent && !answer) return;
    cells.push([titleContent || '', answer || '']);
  });

  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
