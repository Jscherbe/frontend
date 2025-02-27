---
title: Menu Stack
intro: Vertical menu list (with optional checkboxes). Used in sidebar nav, popover menus, etc
---

<h2 class="h2">Basic Example</h2>

<div class="menu-stack">
  <h3 class="menu-stack__label">Example Label</h3>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#" >This is Example Menu Item</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link is-active" href="#">This is Example Menu Item with a really long title. It even has another sentence for checking line wrapping</a>
    </li>
    <li class="menu-stack__item menu-stack__item--separator-before">
      <a class="menu-stack__link" href="#">This is Example Menu Item</a>
    </li>
  </ul>
</div>

<h2 class="h2">Hanging with aria-current test</h2>

<div class="menu-stack menu-stack--hanging">
  <h3 class="menu-stack__label">Example Label</h3>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#" >This is Example Menu Item</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#" aria-current="page">This is Example Menu Item with a really long title</a>
    </li>
    <li class="menu-stack__item menu-stack__item--separator-before">
      <a class="menu-stack__link" href="#">This is Example Menu Item</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">This is Example Menu Item</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">This is Example Menu Item</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">This is Example Menu Item</a>
    </li>
  </ul>
</div>

<h2 class="h2">Multiple labels/lists</h2>

<div class="menu-stack menu-stack--separated">
  <h3 class="menu-stack__label">Section 1</h3>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <a class="menu-stack__link is-active" href="#" >This is Example Menu Item</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">This is Example Menu Item with a really long title</a>
    </li>
  </ul>
</div>
<div class="menu-stack menu-stack--hanging menu-stack--separated">
  <h3 class="menu-stack__label">Section 2</h3>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">This is Example Menu Item with a really long title</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">This is Example Menu Item</a>
    </li>
  </ul>
</div>



<h2 class="h2">Checkbox Menu</h2>

<div class="menu-stack form-theme">
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-1">
        <label for="cb-1"> Example Item that is very long and will wrap in menu </label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-2">
        <label for="cb-2">Example Item 2</label>
      </div>
    </li>
    <li class="menu-stack__item menu-stack__item--separator-before">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-3">
        <label for="cb-3">Example Item 3</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-4">
        <label for="cb-4">Example Item 4</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-5">
        <label for="cb-5">Example Item 5</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-6">
        <label for="cb-6">Example Item 6</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-7">
        <label for="cb-7">Example Item 7</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-8">
        <label for="cb-8">Example Item 8</label>
      </div>
    </li>
  </ul>
</div>

<h2 class="h2">With Icons</h2>

<div class="menu-stack">
  <h3 class="menu-stack__label">Example Label</h3>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#" >
        <span class="menu-stack__link-icon fas fa-house" aria-hidden="true"></span>
        <span class="menu-stack__link-text">Home</span>
      </a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link is-active" href="#" >
        <span class="menu-stack__link-icon fas fa-user" aria-hidden="true"></span>
        <span class="menu-stack__link-text">User Page</span>
      </a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#" >
        <span class="menu-stack__link-icon fas fa-music" aria-hidden="true"></span>
        <span class="menu-stack__link-text">Audio</span>
      </a>
    </li>
  </ul>
</div>