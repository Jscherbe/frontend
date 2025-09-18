export default function() {

  return `
<section class="menu-stack">
  <h2 class="menu-stack__label">label</h2>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <details class="menu-stack__collapsible">
        <summary class="menu-stack__toggle">
          <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Summary</span></span>
          <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
        </summary>
        <div>
          <div class="menu-stack__parent">
            <div class="menu-stack__item"><a class="menu-stack__link--parent" href="#">Parent link</a></div>
          </div>
          <ul class="menu-stack__list">
            <li class="menu-stack__item">
              <a class="menu-stack__link" href="#">list item</a>
            </li>
            <li class="menu-stack__item">
              <a class="menu-stack__link" href="#">list item</a>
            </li>
          </ul>
        </div>
      </details>
    </li>
    <li class="menu-stack__item">
      <details class="menu-stack__collapsible">
        <summary class="menu-stack__toggle">
          <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Summary</span></span>
          <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
        </summary>
        <div>
          <div class="menu-stack__item"><a class="menu-stack__link" href="#">Parent link</a></div>
          <ul class="menu-stack__list">
            <li class="menu-stack__item">
              <a class="menu-stack__link" href="#">list item</a>
            </li>
            <li class="menu-stack__item">
              <a class="menu-stack__link" href="#">list item</a>
            </li>
          </ul>
        </div>
      </details>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">list item</a>
    </li>
  </ul>
</section>
  `;
}