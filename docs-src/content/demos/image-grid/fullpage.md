---
title: "Image Grid (fullpage example)"
layout: fullpage
---

<ul class="image-grid">
  {% for i in (1..5) -%}
    <li class="image-grid__item">
      <img src="https://picsum.photos/400/300" alt=""> 
    </li>
  {%- endfor %}
</ul>