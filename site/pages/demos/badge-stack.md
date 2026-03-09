---
title: Badge Stack
intro: A component for displaying a group of overlapping badges, commonly used to represent a list of users, participants, or contributors.
---

<h2 class="h2">Basic Example</h2>

<p>The badge stack visually groups multiple badges together by partially overlapping them. This is often used in UIs to show "who is currently active" or "recent contributors".</p>

{% CodePreview %}

<ul class="badge-stack">
  <li class="badge-stack__item">
    <span class="badge badge--small">
      <span class="badge__inner">
        <span>JD</span>
      </span>
    </span>
  </li>
  <li class="badge-stack__item">
    <span class="badge badge--small">
      <span class="badge__inner">
        <span>MS</span>
      </span>
    </span>
  </li>
  <li class="badge-stack__item">
    <span class="badge badge--small">
      <span class="badge__inner">
        <span>AJ</span>
      </span>
    </span>
  </li>
  <li class="badge-stack__item">
    <span class="badge badge--small">
      <span class="badge__inner">
        <span>+3</span>
      </span>
    </span>
  </li>
</ul>

{% endCodePreview %}

<h2 class="h2">Clickable Badges</h2>

<p>You can make individual badges within the stack clickable by using the <code>badge--clickable</code> modifier on an anchor tag.</p>

{% CodePreview %}

<ul class="badge-stack">
  <li class="badge-stack__item">
    <a href="#" class="badge badge--small badge--clickable" aria-label="View profile for Jane Doe">
      <div class="badge__inner">
        <img src="https://picsum.photos/id/64/100/100" alt="Jane Doe">
      </div>
    </a>
  </li>
  <li class="badge-stack__item">
    <a href="#" class="badge badge--small badge--clickable" aria-label="View profile for Michael Smith">
      <div class="badge__inner">
        <img src="https://picsum.photos/id/65/100/100" alt="Michael Smith">
      </div>
    </a>
  </li>
  <li class="badge-stack__item">
    <a href="#" class="badge badge--small badge--clickable" aria-label="View profile for Alice Johnson">
      <div class="badge__inner">
        <img src="https://picsum.photos/id/66/100/100" alt="Alice Johnson">
      </div>
    </a>
  </li>
</ul>

{% endCodePreview %}
