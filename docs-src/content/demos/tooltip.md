---
title: Tooltip
layout: default
intro: Tooltips contain a brief bit of text like a speech bubble. They typically appear when you hover your cursor over an element on the screen, like a button or icon. Their purpose is to give you a quick hint about what that element does.
---


## Basic Example

<div>
  <p>
    Lorem ipsum <span class="tooltip-demo" data-ulu-tooltip="This is some more information">"Lorem Ipsum" <span class="fas fa-circle-info" aria-hidden="true"></span></span> , consectetur adipiscing elit. In euismod diam purus, vel condimentum nibh sollicitudin eget. Sed efficitur augue eu urna egestas, eget condimentum nisl tempus. Curabitur maximus risus eget rutrum egestas. Vivamus lectus velit, rhoncus quis fringilla non, maximus sed lectus. Ut hendrerit arcu in felis varius condimentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi quis dolor laoreet, vehicula diam sed, lobortis leo. Ut consequat justo ac ante commodo, eu posuere sem commodo. Praesent vestibulum scelerisque turpis, eget sodales nunc iaculis quis. Etiam pretium sit amet lorem ac suscipit. Mauris pretium tellus at turpis ullamcorper, eu faucibus arcu cursus. Vestibulum ut mollis dui, non laoreet ligula. Quisque viverra lacus finibus ex pharetra suscipit. In ac ligula mauris.
  </p>
</div>

## With parameters (fromElement)

<div>
  <p>
    Lorem ipsum 
    <span 
      class="tooltip-demo" 
      data-ulu-tooltip='{
        fromElement: "#tooltip-element-demo"
      }'
    >
      "Lorem Ipsum" <span class="fas fa-circle-info" aria-hidden="true"></span>
    </span>, consectetur adipiscing elit. In euismod diam purus, vel condimentum nibh sollicitudin eget. Sed efficitur augue eu urna egestas, eget condimentum nisl tempus. Curabitur maximus risus eget rutrum egestas. Vivamus lectus velit, rhoncus quis fringilla non, maximus sed lectus. Ut hendrerit arcu in felis varius condimentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi quis dolor laoreet, vehicula diam sed, lobortis leo. Ut consequat justo ac ante commodo, eu posuere sem commodo. Praesent vestibulum scelerisque turpis, eget sodales nunc iaculis quis. Etiam pretium sit amet lorem ac suscipit. Mauris pretium tellus at turpis ullamcorper, eu faucibus arcu cursus. Vestibulum ut mollis dui, non laoreet ligula. Quisque viverra lacus finibus ex pharetra suscipit. In ac ligula mauris.
  </p>
</div>

<div hidden id="tooltip-element-demo">My tooltip <em>has italic</em> content from another element</div>


## With Parameter

<div>
  <p>
    Lorem ipsum 
    <span 
      class="tooltip-demo" 
      data-ulu-tooltip='{
        "content" : "Hello World"
      }'
    >
      "Lorem Ipsum" <span class="fas fa-circle-info" aria-hidden="true"></span>
    </span>, consectetur adipiscing elit. In euismod diam purus, vel condimentum nibh sollicitudin eget. Sed efficitur augue eu urna egestas, eget condimentum nisl tempus. Curabitur maximus risus eget rutrum egestas. Vivamus lectus velit, rhoncus quis fringilla non, maximus sed lectus. Ut hendrerit arcu in felis varius condimentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi quis dolor laoreet, vehicula diam sed, lobortis leo. Ut consequat justo ac ante commodo, eu posuere sem commodo. Praesent vestibulum scelerisque turpis, eget sodales nunc iaculis quis. Etiam pretium sit amet lorem ac suscipit. Mauris pretium tellus at turpis ullamcorper, eu faucibus arcu cursus. Vestibulum ut mollis dui, non laoreet ligula. Quisque viverra lacus finibus ex pharetra suscipit. In ac ligula mauris.
  </p>
</div>

<div hidden id="tooltip-element-demo">My tooltip <em>has italic</em> content from another element</div>