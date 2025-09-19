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

<h2 class="h2">Compact Example</h2>

<div class="menu-stack menu-stack--compact">
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
        <label for="cb-1">Example Item that is very long and will wrap in menu. Example Item that is very long and will wrap in menu. Example Item that is very long and will wrap in menu</label>
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

<h2 class="h2">Checkbox Menu (compact modifier)</h2>

<div class="menu-stack menu-stack--compact form-theme">
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-c-1">
        <label for="cb-c-1">Example Item that is very long and will wrap in menu. Example Item that is very long and will wrap in menu. Example Item that is very long and will wrap in menu</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-c-2">
        <label for="cb-c-2">Example Item 2</label>
      </div>
    </li>
    <li class="menu-stack__item menu-stack__item--separator-before">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-c-3">
        <label for="cb-c-3">Example Item 3</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-c-4">
        <label for="cb-c-4">Example Item 4</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-c-5">
        <label for="cb-c-5">Example Item 5</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-c-6">
        <label for="cb-c-6">Example Item 6</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-c-7">
        <label for="cb-c-7">Example Item 7</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-c-8">
        <label for="cb-c-8">Example Item 8</label>
      </div>
    </li>
  </ul>
</div>

<h2 class="h2">Checkbox Menu (hide-inputs)</h2>

<div class="menu-stack form-theme menu-stack--hide-inputs">
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-no-input-1">
        <label for="cb-no-input-1"> Example Item that is very long and will wrap in menu </label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-no-input-2" checked>
        <label for="cb-no-input-2">Example Item 2 (checked)</label>
      </div>
    </li>
    <li class="menu-stack__item menu-stack__item--separator-before">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-no-input-3">
        <label for="cb-no-input-3">Example Item 3</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-no-input-4">
        <label for="cb-no-input-4">Example Item 4</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-no-input-5">
        <label for="cb-no-input-5">Example Item 5</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-no-input-6">
        <label for="cb-no-input-6">Example Item 6</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-no-input-7">
        <label for="cb-no-input-7">Example Item 7</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-no-input-8">
        <label for="cb-no-input-8">Example Item 8</label>
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

<!-- begin tests move to the bottom at the end -->
<!-- modifiers
--separated ✔
--hanging ✔
--compact ✔
--hide-inputs 
 -->


<h2 class="h2">Div Parent List Structure Testing</h2>

<section class="menu-stack">
  <h3 class="menu-stack__label">Menu Stack Example Label for Testing</h3>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <details class="menu-stack__collapsible">
        <summary class="menu-stack__toggle">
          <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Menu Stack Parent Item of Collapsible</span></span>
          <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
        </summary>
        <div>
          <div class="menu-stack__list menu-stack__list-pseudo">
          <!-- if the parent link receives different styling, should it have a fully unique class name? -->
            <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link menu-stack__link--parent" href="#">Link of the Parent Item</a></div>
            <div class="menu-stack__item">
              <a class="menu-stack__link" href="#">First Child of Parent Item</a>
            </div>
            <div class="menu-stack__item">
              <details class="menu-stack__collapsible">
              <summary class="menu-stack__toggle">
                <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Second Child that is a Nested Parent Item</span></span>
                <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
              </summary>
              <div>
                <div class="menu-stack__list menu-stack__list-pseudo">
                  <div class="menu-stack__item"><a class="menu-stack__link menu-stack__link--parent" href="#">Link to the Nested Parent Item</a></div>
                  <div class="menu-stack__item">
                    <a class="menu-stack__link" href="#">First Child of the Nested Parent Item</a>
                  </div>
                  <div class="menu-stack__item">
                    <a class="menu-stack__link" href="#">Second Child of the Nested Parent Item with a longer amount of text. Everything written from this point on is to allow the text to wrap and make sure the styling doesn't break when the wrapping occurs.</a>
                  </div>
                </div>
              </div>
            </details>
            </div>
          </div>
        </div>
      </details>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">List item that is not collapsible. This is a second sentence to test wrapping at smaller screens</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">List item that is not collapsible. This is a second sentence to test wrapping at smaller screens</a>
    </li>
  </ul>
</section>

<h3 class="h3 margin-top">Separated Menu Stack with Div Structure</h3>

<section class="menu-stack menu-stack--separated">
  <h4 class="menu-stack__label">Separated Menu Stack Example Label for Testing</h4>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <details class="menu-stack__collapsible">
        <summary class="menu-stack__toggle">
          <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Menu Stack Parent Item of Collapsible</span></span>
          <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
        </summary>
        <div>
          <div class="menu-stack__list menu-stack__list-pseudo">
          <!-- if the parent link receives different styling, should it have a fully unique class name? -->
            <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link menu-stack__link--parent" href="#">Link of the Parent Item</a></div>
            <div class="menu-stack__item">
              <a class="menu-stack__link" href="#">First Child of Parent Item</a>
            </div>
            <div class="menu-stack__item">
              <details class="menu-stack__collapsible">
              <summary class="menu-stack__toggle">
                <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Second Child that is a Nested Parent Item</span></span>
                <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
              </summary>
              <div>
                <div class="menu-stack__list menu-stack__list-pseudo">
                  <div class="menu-stack__item"><a class="menu-stack__link menu-stack__link--parent" href="#">Link to the Nested Parent Item</a></div>
                  <div class="menu-stack__item">
                    <a class="menu-stack__link" href="#">First Child of the Nested Parent Item</a>
                  </div>
                  <div class="menu-stack__item">
                    <a class="menu-stack__link" href="#">Second Child of the Nested Parent Item with a longer amount of text. Everything written from this point on is to allow the text to wrap and make sure the styling doesn't break when the wrapping occurs.</a>
                  </div>
                </div>
              </div>
            </details>
            </div>
          </div>
        </div>
      </details>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">List item that is not collapsible. This is a second sentence to test wrapping at smaller screens</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">List item that is not collapsible. This is a second sentence to test wrapping at smaller screens</a>
    </li>
  </ul>
</section>

<h3 class="h3 margin-top">Hanging Menu Stack with Div Structure</h3>

<section class="menu-stack menu-stack--hanging">
  <h4 class="menu-stack__label">Hanging Menu Stack Example Label for Testing</h4>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <details class="menu-stack__collapsible">
        <summary class="menu-stack__toggle">
          <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Menu Stack Parent Item of Collapsible</span></span>
          <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
        </summary>
        <div>
          <div class="menu-stack__list menu-stack__list-pseudo">
          <!-- if the parent link receives different styling, should it have a fully unique class name? -->
            <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link menu-stack__link--parent" href="#">Link of the Parent Item</a></div>
            <div class="menu-stack__item">
              <a class="menu-stack__link" href="#">First Child of Parent Item</a>
            </div>
            <div class="menu-stack__item">
              <details class="menu-stack__collapsible">
              <summary class="menu-stack__toggle">
                <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Second Child that is a Nested Parent Item</span></span>
                <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
              </summary>
              <div>
                <div class="menu-stack__list menu-stack__list-pseudo">
                  <div class="menu-stack__item"><a class="menu-stack__link menu-stack__link--parent" href="#">Link to the Nested Parent Item</a></div>
                  <div class="menu-stack__item">
                    <a class="menu-stack__link" href="#">First Child of the Nested Parent Item</a>
                  </div>
                  <div class="menu-stack__item">
                    <a class="menu-stack__link" href="#">Second Child of the Nested Parent Item with a longer amount of text. Everything written from this point on is to allow the text to wrap and make sure the styling doesn't break when the wrapping occurs.</a>
                  </div>
                </div>
              </div>
            </details>
            </div>
          </div>
        </div>
      </details>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">List item that is not collapsible. This is a second sentence to test wrapping at smaller screens</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">List item that is not collapsible. This is a second sentence to test wrapping at smaller screens</a>
    </li>
  </ul>
</section>

<h3 class="h3 margin-top">Compact Menu Stack with Div Structure</h3>

<section class="menu-stack menu-stack--compact">
  <h4 class="menu-stack__label">Compact Menu Stack Example Label for Testing</h4>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <details class="menu-stack__collapsible">
        <summary class="menu-stack__toggle">
          <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Menu Stack Parent Item of Collapsible</span></span>
          <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
        </summary>
        <div>
          <div class="menu-stack__list menu-stack__list-pseudo">
          <!-- if the parent link receives different styling, should it have a fully unique class name? -->
            <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link menu-stack__link--parent" href="#">Link of the Parent Item</a></div>
            <div class="menu-stack__item">
              <a class="menu-stack__link" href="#">First Child of Parent Item</a>
            </div>
            <div class="menu-stack__item">
              <details class="menu-stack__collapsible">
              <summary class="menu-stack__toggle">
                <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Second Child that is a Nested Parent Item</span></span>
                <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
              </summary>
              <div>
                <div class="menu-stack__list menu-stack__list-pseudo">
                  <div class="menu-stack__item"><a class="menu-stack__link menu-stack__link--parent" href="#">Link to the Nested Parent Item</a></div>
                  <div class="menu-stack__item">
                    <a class="menu-stack__link" href="#">First Child of the Nested Parent Item</a>
                  </div>
                  <div class="menu-stack__item">
                    <a class="menu-stack__link" href="#">Second Child of the Nested Parent Item with a longer amount of text. Everything written from this point on is to allow the text to wrap and make sure the styling doesn't break when the wrapping occurs.</a>
                  </div>
                </div>
              </div>
            </details>
            </div>
          </div>
        </div>
      </details>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">List item that is not collapsible. This is a second sentence to test wrapping at smaller screens</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">List item that is not collapsible. This is a second sentence to test wrapping at smaller screens</a>
    </li>
  </ul>
</section>

<h3 class="h3 margin-top">Anchor Style Menu Stack with Div Structure</h3>

<section class="menu-stack menu-stack--anchor-style">
  <h4 class="menu-stack__label">Compact Menu Stack Example Label for Testing</h4>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <details class="menu-stack__collapsible">
        <summary class="menu-stack__toggle">
          <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Menu Stack Parent Item of Collapsible</span></span>
          <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
        </summary>
        <div>
          <div class="menu-stack__list menu-stack__list-pseudo">
          <!-- if the parent link receives different styling, should it have a fully unique class name? -->
            <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link menu-stack__link--parent" href="#">Link of the Parent Item</a></div>
            <div class="menu-stack__item">
              <a class="menu-stack__link" href="#">First Child of Parent Item</a>
            </div>
            <div class="menu-stack__item">
              <details class="menu-stack__collapsible">
              <summary class="menu-stack__toggle">
                <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Second Child that is a Nested Parent Item</span></span>
                <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
              </summary>
              <div>
                <div class="menu-stack__list menu-stack__list-pseudo">
                  <div class="menu-stack__item"><a class="menu-stack__link menu-stack__link--parent" href="#">Link to the Nested Parent Item</a></div>
                  <div class="menu-stack__item">
                    <a class="menu-stack__link" href="#">First Child of the Nested Parent Item</a>
                  </div>
                  <div class="menu-stack__item">
                    <a class="menu-stack__link" href="#">Second Child of the Nested Parent Item with a longer amount of text. Everything written from this point on is to allow the text to wrap and make sure the styling doesn't break when the wrapping occurs.</a>
                  </div>
                </div>
              </div>
            </details>
            </div>
          </div>
        </div>
      </details>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">List item that is not collapsible. This is a second sentence to test wrapping at smaller screens</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">List item that is not collapsible. This is a second sentence to test wrapping at smaller screens</a>
    </li>
  </ul>
</section>

<!-- end tests -->