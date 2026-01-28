---
title: Scrollpoints
intro: Utility for scroll based active classes, anchor menus, etc in traditional site (non-app)
---

**Scroll down to use/test**

{% render "demo/spacer.njk", size: "large" %}

{{ placeholder.text }}

<div class="demo-scrollpoint" data-ulu-scrollpoint>
  Test Enter/Exit
</div>

{{ placeholder.text }}

{% render "demo/spacer.njk", size: "large" %}

<div 
  class="demo-scrollpoint" 
  data-ulu-scrollpoint='{ 
    "marginStart" : "-10%", 
    "marginEnd" : "-10%"
  }'
  style="height: 200vh;"
>
  Test Enter/Exit
</div>

{{ placeholder.text }}

{% render "demo/spacer.njk", size: "large" %}
{% render "demo/spacer.njk", size: "large" %}

<div id="scrollpoint-demo-horizontal" style="overflow: auto; background-color: gray; display: flex;">
  <div style="flex: 0 0 250%;">Space</div>
  <div 
    class="demo-scrollpoint" 
    data-ulu-scrollpoint='{ 
      "horizontal" : true,
      "rootSelector" : "#scrollpoint-demo-horizontal"
    }'
    style="height: 100%;"
  >
    Test Enter/Exit
  </div>
  <div style="flex: 0 0 250%;">Space</div>
</div>


