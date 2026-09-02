/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs-profile. Base: tabs.
 * Source: https://wknd-trendsetters.site/
 * Generated: 2026-09-02
 *
 * Block library: 2 columns. First row = block name. Each subsequent row is one
 * tab: cell 1 = tab label, cell 2 = tab content.
 * Source: a .tabs-wrapper with a .tabs-content holding .tab-pane panels and a
 * .tab-menu holding .tab-menu-link buttons (avatar + name + role) that label
 * each pane. Pair each menu button (label) with its pane (content) by index.
 */
export default function parse(element, { document }) {
  const panes = element.querySelectorAll('.tabs-content .tab-pane, .tab-pane');
  const menuLinks = element.querySelectorAll('.tab-menu .tab-menu-link, .tab-menu-link, [role="tab"]');
  const cells = [];

  panes.forEach((pane, i) => {
    const menu = menuLinks[i];

    // Label cell: prefer the button's inner content (avatar + name + role).
    let labelContent = '';
    if (menu) {
      const inner = menu.querySelector(':scope > div') || menu;
      labelContent = inner;
    }

    // Content cell: the full pane content (image + name/role + quote).
    const contentInner = pane.querySelector(':scope > .grid-layout') || pane;

    cells.push([labelContent, contentInner]);
  });

  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-profile', cells });
  element.replaceWith(block);
}
