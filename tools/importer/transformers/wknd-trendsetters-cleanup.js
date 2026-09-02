/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters site-wide cleanup.
 * Removes non-authorable site chrome. All selectors verified against
 * migration-work/cleaned.html.
 *
 * NOTE: Do NOT remove bare `header`/`footer` — on this site the hero intro
 * section is authored as `#main-content > header.section.secondary-section`
 * (authorable content). Only site chrome is targeted by specific class.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    WebImporter.DOMUtils.remove(element, [
      '.skip-link',      // "Skip to main content" link (cleaned.html line 1)
      '.navbar',         // top navigation / mega menu shell (cleaned.html line 1)
      'footer.footer',   // site footer (cleaned.html line 98)
      '.breadcrumbs',    // breadcrumb nav inside featured-article section (cleaned.html)
    ]);
  }
}
