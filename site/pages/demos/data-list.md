---
title: Data List
layout: unformatted
intro: A highly flexible list layout that uses CSS Subgrid to perfectly align columns on desktop, while gracefully stacking related data on smaller screens. 
---

<h2 class="h2 margin-top">1. Basic Document List</h2>
<p>This example demonstrates the core functionality. The parent defines a grid with 4 tracks (<code>auto 1fr auto auto</code>). The middle column spans 2 tracks (<code>--span-2</code>) and acts as a Subgrid automatically because it contains other <code>.data-list__column</code> children. On mobile, the title and metadata will stack vertically.</p>

<ul class="data-list" style="--data-list-columns: auto 1fr auto auto;">
  <li class="data-list__item">
    <div class="data-list__column data-list__column--shrink">
      <div style="font-size: 1.5rem;" aria-hidden="true">📄</div>
    </div>
    <div class="data-list__column data-list__column--fluid data-list__column--span-2">
      <div class="data-list__column">
        <strong>Annual Report 2024.pdf</strong>
      </div>
      <div class="data-list__column">
        <small class="type-type-tertiary">Added: Jan 1, 2024</small>
      </div>
    </div>
    <div class="data-list__column data-list__column--shrink data-list__column--justify-end">
      <button type="button" class="button button--small button--outline">Download</button>
    </div>
  </li>
  <li class="data-list__item">
    <div class="data-list__column data-list__column--shrink">
      <div style="font-size: 1.5rem;" aria-hidden="true">📄</div>
    </div>
    <div class="data-list__column data-list__column--fluid data-list__column--span-2">
      <div class="data-list__column">
        <strong>Q3 Financials.xlsx</strong>
      </div>
      <div class="data-list__column">
        <small class="type-type-tertiary">Added: Oct 14, 2023</small>
      </div>
    </div>
    <div class="data-list__column data-list__column--shrink data-list__column--justify-end">
      <button type="button" class="button button--small button--outline">Download</button>
    </div>
  </li>
</ul>

<hr class="rule rule--margin-large">

<h2 class="h2 margin-top">2. Directory with Visual Header</h2>
<p>This example adds an optional header row. The header is purely visual (hidden from screen readers) to help alignment on desktop. On mobile, the header disappears (`display: none`) and the columns stack. We use <code>--hide-small</code> on non-critical columns ("Role", "Last Active") to keep the mobile view clean.</p>

<div class="data-list" style="--data-list-columns: auto 1fr auto auto auto;">
  
  <!-- Visual Header Row (Hidden from AT, disappears on mobile) -->
  <div class="data-list__header" aria-hidden="true">
    <div class="data-list__item">
      <div class="data-list__column data-list__column--shrink"></div> <!-- Icon space -->
      <div class="data-list__column data-list__column--fluid data-list__column--span-2">
        <div class="data-list__column">Name</div>
        <div class="data-list__column data-list__column--hide-small">Role</div>
      </div>
      <div class="data-list__column data-list__column--hide-small">Last Active</div>
      <div class="data-list__column data-list__column--shrink"></div> <!-- Action space -->
    </div>
  </div>

  <!-- List Items -->
  <div class="data-list__item">
    <div class="data-list__column data-list__column--shrink">
      <div class="badge badge--small">
        <div class="badge__inner"><span>JD</span></div>
      </div>
    </div>
    <div class="data-list__column data-list__column--fluid data-list__column--span-2">
      <div class="data-list__column">
        <strong>Jane Doe</strong>
      </div>
      <div class="data-list__column data-list__column--hide-small">
        <span class="tag tag--outline tag--small">Admin</span>
      </div>
    </div>
    <div class="data-list__column data-list__column--hide-small">
      <small>Active 2h ago</small>
    </div>
    <div class="data-list__column data-list__column--shrink data-list__column--justify-end">
      <button type="button" class="button button--small">Edit</button>
    </div>
  </div>

  <div class="data-list__item">
    <div class="data-list__column data-list__column--shrink">
      <div class="badge badge--small">
        <div class="badge__inner"><span>BS</span></div>
      </div>
    </div>
    <div class="data-list__column data-list__column--fluid data-list__column--span-2">
      <div class="data-list__column">
        <strong>Bob Smith</strong>
      </div>
      <div class="data-list__column data-list__column--hide-small">
        <span class="tag tag--outline tag--small">Editor</span>
      </div>
    </div>
    <div class="data-list__column data-list__column--hide-small">
      <small>Active 1d ago</small>
    </div>
    <div class="data-list__column data-list__column--shrink data-list__column--justify-end">
      <button type="button" class="button button--small">Edit</button>
    </div>
  </div>

</div>

<hr class="rule rule--margin-large">

<h2 class="h2 margin-top">3. Mobile Overrides (Wrap instead of Stack)</h2>
<p>By default, nested columns stack vertically on mobile. Using <code>--wrap-small</code> overrides this, allowing nested items (like tags) to flow naturally inline on small screens.</p>

<ul class="data-list" style="--data-list-columns: auto 1fr auto;">
  <li class="data-list__item">
    <div class="data-list__column data-list__column--align-start">
      <strong>Task #1024</strong>
    </div>
    
    <div class="data-list__column data-list__column--fluid data-list__column--span-2">
      <!-- Standard stacked meta data -->
      <div class="data-list__column">
        <small>Assigned to: <strong>Dev Team</strong></small>
      </div>
      <div class="data-list__column">
        <small class="type-type-tertiary">Due: Oct 12, 2024</small>
      </div>

      <!-- Wrapper for tags (Wraps on mobile instead of stacking) -->
      <div class="data-list__column data-list__column--wrap-small">
        <div class="data-list__column">
          <span class="tag tag--small tag--danger">Urgent</span>
        </div>
        <div class="data-list__column">
          <span class="tag tag--small">Frontend</span>
        </div>
        <div class="data-list__column">
          <span class="tag tag--small">Bug</span>
        </div>
      </div>
    </div>
  </li>
</ul>