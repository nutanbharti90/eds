import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-article-card-image';
      else div.className = 'cards-article-card-body';
    });
    ul.append(li);
  });

  // Split the meta paragraph ("Category Words Month Day") into a category
  // pill + a secondary date, matching the source design.
  ul.querySelectorAll('.cards-article-card-body > p').forEach((p) => {
    const text = p.textContent.trim();
    const match = text.match(/^(.*?)\s+([A-Z][a-z]+ \d{1,2})$/);
    const meta = document.createElement('div');
    meta.className = 'cards-article-card-meta';
    if (match) {
      const [, category, dateText] = match;
      const tag = document.createElement('span');
      tag.className = 'cards-article-tag';
      tag.textContent = category;
      const date = document.createElement('span');
      date.className = 'cards-article-date';
      date.textContent = dateText;
      meta.append(tag, date);
    } else {
      const date = document.createElement('span');
      date.className = 'cards-article-date';
      date.textContent = text;
      meta.append(date);
    }
    p.replaceWith(meta);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
