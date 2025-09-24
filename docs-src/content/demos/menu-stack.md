---
title: Menu Stack
intro: Vertical menu list (with optional checkboxes). Used in sidebar nav, popover menus, etc
---

<h2 class="h2">Basic Example</h2>

<div class="menu-stack">
  <h3 class="menu-stack__label">Table of Contents</h3>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#" >Chapter 1 : The Menu-Stack Item</a>
    </li>
    <li class="menu-stack__item">
      <details class="menu-stack__collapsible">
        <summary class="menu-stack__toggle">
          <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Chapter 2 : How to use a nested component.</span></span>
          <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
        </summary>
        <div class="menu-stack__collapsible-content">
          <ul class="menu-stack__list">
            <li class="menu-stack__item">
              <a class="menu-stack__link" href="#">Chapter 1.A : A Visual of a Link</a>
            </li>
            <li class="menu-stack__item">
              <details class="menu-stack__collapsible">
                <summary class="menu-stack__toggle">
                  <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Chapter 2.B : How to Use Menu-Stacks with More than 2 Levels.</span></span>
                  <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
                </summary>
                <div class="menu-stack__collapsible-content">
                  <ul class="menu-stack__list">
                    <li class="menu-stack__item"><a class="menu-stack__link" href="#">Chapter 2.B.i : A First Look at a Nested Item </a></li>
                    <li class="menu-stack__item">
                      <a class="menu-stack__link" href="#">Chapter 2.B.ii : How does Menu-Stack's Wrapping Affect the Layout of Each Individual Item as Well as the Menu-Stack as a Whole? A Visual Guide with Examples of Use Cases</a>
                    </li>
                  </ul>
                </div>
              </details>
            </li>
          </ul>
        </div>
      </details>
    </li>
    <li class="menu-stack__item menu-stack__item--separator-before">
      <a class="menu-stack__link" href="#">Chapter 3 : Using the 'separator-before' Modifier</a>
    </li>
  </ul>
</div>

<h2 class="h2">Compact Example</h2>

<div class="menu-stack menu-stack--compact">
  <h3 class="menu-stack__label">Table of Contents</h3>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#" >Chapter 1 : The Compact Menu-Stack Item</a>
    </li>
    <li class="menu-stack__item">
      <details class="menu-stack__collapsible">
        <summary class="menu-stack__toggle">
          <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Chapter 2 : How to use a nested component.</span></span>
          <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
        </summary>
        <div class="menu-stack__collapsible-content">
          <ul class="menu-stack__list">
            <li class="menu-stack__item">
              <a class="menu-stack__link" href="#">Chapter 1.A : A Visual of a Link</a>
            </li>
            <li class="menu-stack__item">
              <details class="menu-stack__collapsible">
                <summary class="menu-stack__toggle">
                  <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Chapter 2.B : How to Use Menu-Stacks with More than 2 Levels.</span></span>
                  <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
                </summary>
                <div class="menu-stack__collapsible-content">
                  <ul class="menu-stack__list">
                    <li class="menu-stack__item"><a class="menu-stack__link" href="#">Chapter 2.B.i : A First Look at a Nested Item </a></li>
                    <li class="menu-stack__item">
                      <a class="menu-stack__link" href="#">Chapter 2.B.ii : How does Menu-Stack's Wrapping Affect the Layout of Each Individual Item as Well as the Menu-Stack as a Whole? A Visual Guide with Examples of Use Cases</a>
                    </li>
                  </ul>
                </div>
              </details>
            </li>
          </ul>
        </div>
      </details>
    </li>
    <li class="menu-stack__item menu-stack__item--separator-before">
      <a class="menu-stack__link" href="#">Chapter 3 : Using the 'separator-before' Modifier</a>
    </li>
  </ul>
</div>

<h2 class="h2">Hanging with aria-current test</h2>

<div class="menu-stack menu-stack--hanging">
  <h3 class="menu-stack__label">Table of Contents</h3>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#" >Chapter 1 : The Hanging Menu-Stack Item</a>
    </li>
    <li class="menu-stack__item">
      <details class="menu-stack__collapsible">
        <summary class="menu-stack__toggle">
          <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Chapter 2 : How to use a nested component.</span></span>
          <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
        </summary>
        <div class="menu-stack__collapsible-content">
          <ul class="menu-stack__list">
            <li class="menu-stack__item">
              <a class="menu-stack__link" href="#">Chapter 1.A : A Visual of a Link</a>
            </li>
            <li class="menu-stack__item">
              <details class="menu-stack__collapsible">
                <summary class="menu-stack__toggle">
                  <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Chapter 2.B : How to Use Menu-Stacks with More than 2 Levels.</span></span>
                  <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
                </summary>
                <div class="menu-stack__collapsible-content">
                  <ul class="menu-stack__list">
                    <li class="menu-stack__item"><a class="menu-stack__link" href="#">Chapter 2.B.i : A First Look at a Nested Item </a></li>
                    <li class="menu-stack__item">
                      <a class="menu-stack__link" href="#">Chapter 2.B.ii : How does Menu-Stack's Wrapping Affect the Layout of Each Individual Item as Well as the Menu-Stack as a Whole? A Visual Guide with Examples of Use Cases</a>
                    </li>
                  </ul>
                </div>
              </details>
            </li>
          </ul>
        </div>
      </details>
    </li>
    <li class="menu-stack__item menu-stack__item--separator-before">
      <a class="menu-stack__link" href="#">Chapter 3 : Using the 'separator-before' Modifier</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">Chapter 4 : Further Study</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">Appendix</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">Glossary</a>
    </li>
  </ul>
</div>

<h2 class="h2">Plain Menu Stack Test</h2>

<div class="menu-stack menu-stack--plain">
  <h3 class="menu-stack__label">Table of Contents (Default Plain)</h3>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#" >Chapter 1 : The Hanging Menu-Stack Item</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#" aria-current="page">Chapter 2 : How does Menu-Stack's Wrapping Affect the Layout of Each Individual Item as Well as the Menu-Stack as a Whole? A Visual Guide with Examples of Use Cases</a>
    </li>
    <li class="menu-stack__item menu-stack__item--separator-before">
      <a class="menu-stack__link" href="#">Chapter 3 : Using the 'separator-before' Modifier</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">Chapter 4 : Further Study</a>
    </li>
  </ul>
</div>

<br>

<div class="menu-stack menu-stack--plain menu-stack--compact">
  <h3 class="menu-stack__label">Table of Contents (Compact Plain)</h3>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#" >Chapter 1 : The Hanging Menu-Stack Item</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#" aria-current="page">Chapter 2 : How does Menu-Stack's Wrapping Affect the Layout of Each Individual Item as Well as the Menu-Stack as a Whole? A Visual Guide with Examples of Use Cases</a>
    </li>
    <li class="menu-stack__item menu-stack__item--separator-before">
      <a class="menu-stack__link" href="#">Chapter 3 : Using the 'separator-before' Modifier</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">Chapter 4 : Further Study</a>
    </li>
  </ul>
</div>

<br>

<div class="menu-stack menu-stack--plain menu-stack--hanging">
  <h3 class="menu-stack__label">Table of Contents (Hanging Plain)</h3>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#" >Chapter 1 : The Hanging Menu-Stack Item</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#" aria-current="page">Chapter 2 : How does Menu-Stack's Wrapping Affect the Layout of Each Individual Item as Well as the Menu-Stack as a Whole? A Visual Guide with Examples of Use Cases</a>
    </li>
    <li class="menu-stack__item menu-stack__item--separator-before">
      <a class="menu-stack__link" href="#">Chapter 3 : Using the 'separator-before' Modifier</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">Chapter 4 : Further Study</a>
    </li>
  </ul>
</div>

<h2 class="h2">Multiple labels/lists</h2>

<div class="menu-stack menu-stack--separated">
  <h3 class="menu-stack__label">Table of Contents</h3>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <a class="menu-stack__link is-active" href="#" >Chapter 1 : The Menu-Stack Item</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">Chapter 2 : How does Menu-Stack's Wrapping Affect the Layout of Each Individual Item as Well as the Menu-Stack as a Whole? A Visual Guide with Examples of Use Cases</a>
    </li>
  </ul>
</div>
<div class="menu-stack menu-stack--hanging menu-stack--separated">
  <h3 class="menu-stack__label">Figures and Graph</h3>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">Figure 1 : A Visual of Hanging Menu-Stack Item</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">Figure 2 : How does Menu-Stack's Wrapping Affect the Layout of Each Individual Item as Well as the Menu-Stack as a Whole? A Visual Guide with Examples of Use Cases</a>
    </li>
  </ul>
</div>



<h2 class="h2">Checkbox Menu</h2>

<div class="menu-stack form-theme">
  <h3 class="menu-stack__label">Select A Few of Your Favorite Things</h3>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-1">
        <label for="cb-1">Raindrops on Roses</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-2">
        <label for="cb-2">Whiskers on Kittens</label>
      </div>
    </li>
    <li class="menu-stack__item menu-stack__item--separator-before">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-3">
        <label for="cb-3">Bright Copper Kettles</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-4">
        <label for="cb-4">Warm Woolen Mittens</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-5">
        <label for="cb-5">Brown Paper Packages Tied up with Strings</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-6">
        <label for="cb-6">Cream-colored ponies and crisp apple strudels. Doorbells and sleigh bells and schnitzel with noodles. Wild geese that fly with the moon on their wings</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-8">
        <label for="cb-8">When the dog bites, when the bee stings, or when I'm feeling sad</label>
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
        <label for="cb-c-1">Raindrops on Roses</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-c-2">
        <label for="cb-c-2">Whiskers on Kittens</label>
      </div>
    </li>
    <li class="menu-stack__item menu-stack__item--separator-before">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-c-3">
        <label for="cb-c-3">Bright Copper Kettles</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-c-4">
        <label for="cb-c-4">Warm Woolen Mittens</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-c-5">
        <label for="cb-c-5">Brown Paper Packages Tied up with Strings</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-c-6">
        <label for="cb-c-6">Cream-colored ponies and crisp apple strudels. Doorbells and sleigh bells and schnitzel with noodles. Wild geese that fly with the moon on their wings</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-c-7">
        <label for="cb-c-7">When the dog bites, when the bee stings, or when I'm feeling sad</label>
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
        <label for="cb-no-input-1">Raindrops on Roses</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-no-input-2" checked>
        <label for="cb-no-input-2">Whiskers on Kittens</label>
      </div>
    </li>
    <li class="menu-stack__item menu-stack__item--separator-before">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-no-input-3">
        <label for="cb-no-input-3">Bright Copper Kettles</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-no-input-4">
        <label for="cb-no-input-4">Warm Woolen Mittens</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-no-input-5">
        <label for="cb-no-input-5">Brown Paper Packages Tied up with Strings</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-no-input-6">
        <label for="cb-no-input-6">Cream-colored ponies and crisp apple strudels. Doorbells and sleigh bells and schnitzel with noodles. Wild geese that fly with the moon on their wings</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-no-input-7">
        <label for="cb-no-input-7">When the dog bites, when the bee stings, or when I'm feeling sad</label>
      </div>
    </li>
  </ul>
</div>

<h2 class="h2">Checkbox Menu (plain)</h2>

<div class="menu-stack form-theme menu-stack--plain">
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-plain-1">
        <label for="cb-plain-1">Raindrops on Roses</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-plain-2" checked>
        <label for="cb-plain-2">Whiskers on Kittens</label>
      </div>
    </li>
    <li class="menu-stack__item menu-stack__item--separator-before">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-plain-3">
        <label for="cb-plain-3">Bright Copper Kettles</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-plain-4">
        <label for="cb-plain-4">Warm Woolen Mittens</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-plain-5">
        <label for="cb-plain-5">Brown Paper Packages Tied up with Strings</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-plain-6">
        <label for="cb-plain-6">Cream-colored ponies and crisp apple strudels. Doorbells and sleigh bells and schnitzel with noodles. Wild geese that fly with the moon on their wings</label>
      </div>
    </li>
    <li class="menu-stack__item">
      <div class="menu-stack__selectable">
        <input type="checkbox" id="cb-plain-7">
        <label for="cb-plain-7">When the dog bites, when the bee stings, or when I'm feeling sad</label>
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

<h2 class="h2">Div Parent List Structure Testing</h2>

<section class="menu-stack">
  <h3 class="menu-stack__label">Menu Stack Example Label for Testing</h3>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <details class="menu-stack__collapsible">
        <summary class="menu-stack__toggle">
          <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Chapter 1 : How to use the Menu-Stack component.</span></span>
          <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
        </summary>
        <div class="menu-stack__collapsible-content">
          <div class="menu-stack__list menu-stack__list--parent">
            <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link" href="#">Overview</a></div>
          </div>
          <ul class="menu-stack__list">
            <li class="menu-stack__item">
              <a class="menu-stack__link" href="#">Chapter 1.A : A Visual of a Link</a>
            </li>
            <li class="menu-stack__item">
              <details class="menu-stack__collapsible">
                <summary class="menu-stack__toggle">
                  <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Chapter 1.B : How to Use Menu-Stacks with More than 2 Levels.</span></span>
                  <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
                </summary>
                <div class="menu-stack__collapsible-content">
                  <div class="menu-stack__list menu-stack__list--parent">
                    <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link" href="#">Overview</a></div>
                  </div>
                  <ul class="menu-stack__list">
                    <li class="menu-stack__item"><a class="menu-stack__link" href="#">Chapter 1.B.i : A First Look at a Nested Item </a></li>
                    <li class="menu-stack__item">
                      <a class="menu-stack__link" href="#">Chapter 1.B.ii : How does Menu-Stack's Wrapping Affect the Layout of Each Individual Item as Well as the Menu-Stack as a Whole? A Visual Guide with Examples of Use Cases</a>
                    </li>
                  </ul>
                </div>
              </details>
            </li>
          </ul>
        </div>
      </details>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">Glossary</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">Appendix</a>
    </li>
  </ul>
</section>

<h2 class="h2">Div Parent List Structure Testing (Hanging)</h2>

<section class="menu-stack menu-stack--hanging">
  <h3 class="menu-stack__label">Menu Stack Example Label for Testing</h3>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <details class="menu-stack__collapsible">
        <summary class="menu-stack__toggle">
          <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Chapter 1 : How to use the Menu-Stack component.</span></span>
          <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
        </summary>
        <div class="menu-stack__collapsible-content">
          <div class="menu-stack__list menu-stack__list--parent">
            <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link" href="#">Overview</a></div>
          </div>
          <ul class="menu-stack__list">
            <li class="menu-stack__item">
              <a class="menu-stack__link" href="#">Chapter 1.A : A Visual of a Link</a>
            </li>
            <li class="menu-stack__item">
              <details class="menu-stack__collapsible">
                <summary class="menu-stack__toggle">
                  <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Chapter 1.B : How to Use Menu-Stacks with More than 2 Levels.</span></span>
                  <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
                </summary>
                <div class="menu-stack__collapsible-content">
                  <div class="menu-stack__list menu-stack__list--parent">
                    <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link" href="#">Overview</a></div>
                  </div>
                  <ul class="menu-stack__list">
                    <li class="menu-stack__item"><a class="menu-stack__link" href="#">Chapter 1.B.i : A First Look at a Nested Item </a></li>
                    <li class="menu-stack__item">
                      <a class="menu-stack__link" href="#">Chapter 1.B.ii : How does Menu-Stack's Wrapping Affect the Layout of Each Individual Item as Well as the Menu-Stack as a Whole? A Visual Guide with Examples of Use Cases</a>
                    </li>
                  </ul>
                </div>
              </details>
            </li>
          </ul>
        </div>
      </details>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">Glossary</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">Appendix</a>
    </li>
  </ul>
</section>

<h2 class="h2">Div Parent List Structure Testing (Compact)</h2>

<section class="menu-stack menu-stack--compact">
  <h3 class="menu-stack__label">Menu Stack Example Label for Testing</h3>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <details class="menu-stack__collapsible">
        <summary class="menu-stack__toggle">
          <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Chapter 1 : How to use the Menu-Stack component.</span></span>
          <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
        </summary>
        <div class="menu-stack__collapsible-content">
          <div class="menu-stack__list menu-stack__list--parent">
            <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link" href="#">Overview</a></div>
          </div>
          <ul class="menu-stack__list">
            <li class="menu-stack__item">
              <a class="menu-stack__link" href="#">Chapter 1.A : A Visual of a Link</a>
            </li>
            <li class="menu-stack__item">
              <details class="menu-stack__collapsible">
                <summary class="menu-stack__toggle">
                  <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Chapter 1.B : How to Use Menu-Stacks with More than 2 Levels.</span></span>
                  <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
                </summary>
                <div class="menu-stack__collapsible-content">
                  <div class="menu-stack__list menu-stack__list--parent">
                    <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link" href="#">Overview</a></div>
                  </div>
                  <ul class="menu-stack__list">
                    <li class="menu-stack__item"><a class="menu-stack__link" href="#">Chapter 1.B.i : A First Look at a Nested Item </a></li>
                    <li class="menu-stack__item">
                      <a class="menu-stack__link" href="#">Chapter 1.B.ii : How does Menu-Stack's Wrapping Affect the Layout of Each Individual Item as Well as the Menu-Stack as a Whole? A Visual Guide with Examples of Use Cases</a>
                    </li>
                  </ul>
                </div>
              </details>
            </li>
          </ul>
        </div>
      </details>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">Glossary</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">Appendix</a>
    </li>
  </ul>
</section>

<h2 class="h2">Div Parent List Structure Testing (Plain)</h2>

<section class="menu-stack menu-stack--plain">
  <h3 class="menu-stack__label">Menu Stack Example Label for Testing</h3>
  <ul class="menu-stack__list">
    <li class="menu-stack__item">
      <details class="menu-stack__collapsible">
        <summary class="menu-stack__toggle">
          <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Chapter 1 : How to use the Menu-Stack component.</span></span>
          <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
        </summary>
        <div class="menu-stack__collapsible-content">
          <div class="menu-stack__list menu-stack__list--parent">
            <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link" href="#">Overview</a></div>
          </div>
          <ul class="menu-stack__list">
            <li class="menu-stack__item">
              <a class="menu-stack__link" href="#">Chapter 1.A : A Visual of a Link</a>
            </li>
            <li class="menu-stack__item">
              <details class="menu-stack__collapsible">
                <summary class="menu-stack__toggle">
                  <span class="menu-stack__toggle-content"><span class="menu-stack__link-text">Chapter 1.B : How to Use Menu-Stacks with More than 2 Levels.</span></span>
                  <span class="menu-stack__toggle-icon css-icon css-icon--angle-down-to-up" aria-hidden="true"></span>
                </summary>
                <div class="menu-stack__collapsible-content">
                  <div class="menu-stack__list menu-stack__list--parent">
                    <div class="menu-stack__item menu-stack__item--parent"><a class="menu-stack__link" href="#">Overview</a></div>
                  </div>
                  <ul class="menu-stack__list">
                    <li class="menu-stack__item"><a class="menu-stack__link" href="#">Chapter 1.B.i : A First Look at a Nested Item </a></li>
                    <li class="menu-stack__item">
                      <a class="menu-stack__link" href="#">Chapter 1.B.ii : How does Menu-Stack's Wrapping Affect the Layout of Each Individual Item as Well as the Menu-Stack as a Whole? A Visual Guide with Examples of Use Cases</a>
                    </li>
                  </ul>
                </div>
              </details>
            </li>
          </ul>
        </div>
      </details>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">Glossary</a>
    </li>
    <li class="menu-stack__item">
      <a class="menu-stack__link" href="#">Appendix</a>
    </li>
  </ul>
</section>

<!-- end tests -->