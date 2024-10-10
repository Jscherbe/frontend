---
title: Flip Card
intro: Flip Card Intro
---
{% flipcard %}
{% flipcard '2' true %}
{% flipcard '3' false true %}
{% flipcard '4' true true %}
<div class="flipcard-grid">
  {% for i in (1..4) -%}
  <div class="flipcard-grid__item">
    {% flipcard i %}
  </div>
  {%- endfor %}
</div>
<div class="flipcard flipcard--w-image" data-ulu-flipcard>
    <h3 class="flipcard__front" data-ulu-flipcard-front>
      <span class="flipcard__front-image"><img src="/assets/placeholder/image-1.jpg" /></span>
      <span class="flipcard__front-content">
        <div>This is the front</div>
        <span class="flipcard__icon flipcard__icon--front" aria-hidden="true"></span>
      </span>
    </h3>
    <div class="flipcard__back" data-ulu-flipcard-back>
      <div class="flipcard__back-content">
        <div>This is the back</div>
      </div>
      <span class="flipcard__icon flipcard__icon--back" aria-hidden="true"></span>
    </div>
    <div class="flipcard__icon-footer">
      <span class="flipcard__icon flipcard__icon--footer"  aria-hidden="true"></span>
    </div>
  </div>

<div class="flipcard-grid">
  <div class="flipcard-grid__item">
    <div class="flipcard" data-ulu-flipcard>
    <h3 class="flipcard__front" data-ulu-flipcard-front>
      <span class="flipcard__front-content">
        <div>This is the front</div>
        <span class="flipcard__icon flipcard__icon--front" aria-hidden="true"></span>
      </span>
    </h3>
    <div class="flipcard__back" data-ulu-flipcard-back>
      <div class="flipcard__back-content">
        <div>This is the back</div>
      </div>
      <span class="flipcard__icon flipcard__icon--back" aria-hidden="true"></span>
    </div>
    <div class="flipcard__icon-footer">
      <span class="flipcard__icon flipcard__icon--footer"  aria-hidden="true"></span>
    </div>
  </div>
  </div>
  <div class="flipcard-grid__item">
    <div class="flipcard" data-ulu-flipcard>
    <h3 class="flipcard__front" data-ulu-flipcard-front>
      <span class="flipcard__front-content">
        <div>This is the front</div>
        <span class="flipcard__icon flipcard__icon--front" aria-hidden="true"></span>
      </span>
    </h3>
    <div class="flipcard__back" data-ulu-flipcard-back>
      <div class="flipcard__back-content">
        <div>This is the back</div>
      </div>
      <span class="flipcard__icon flipcard__icon--back" aria-hidden="true"></span>
    </div>
    <div class="flipcard__icon-footer">
      <span class="flipcard__icon flipcard__icon--footer"  aria-hidden="true"></span>
    </div>
  </div>
  </div>
  <div class="flipcard-grid__item">
    <div class="flipcard" data-ulu-flipcard>
    <h3 class="flipcard__front" data-ulu-flipcard-front>
      <span class="flipcard__front-content">
        <div>This is the front</div>
        <span class="flipcard__icon flipcard__icon--front" aria-hidden="true"></span>
      </span>
    </h3>
    <div class="flipcard__back" data-ulu-flipcard-back>
      <div class="flipcard__back-content">
        <div>This is the back</div>
      </div>
      <span class="flipcard__icon flipcard__icon--back" aria-hidden="true"></span>
    </div>
    <div class="flipcard__icon-footer">
      <span class="flipcard__icon flipcard__icon--footer"  aria-hidden="true"></span>
    </div>
  </div>
  </div>
</div>

<!--  <div class="flipcard {{ options.image ? 'flipcard--w-image' }}" data-ulu-flipcard>
     <h3 class="flipcard__front" data-ulu-flipcard-front>
       {% if options.image %}
         <span class="flipcard__front-image">{{ options.image }}</span>
       {% endif %}
       <span class="flipcard__front-content">
         {{ options.front }}
         <span class="flipcard__icon flipcard__icon--front" aria-hidden="true"></span>
       </span>
     </h3>
     <div class="flipcard__back" data-ulu-flipcard-back>
       {% if options.frontOnBack %}
         <div class="flipcard__back-front-content" aria-hidden="true">
           {{ options.front }}
         </div>
       {% endif %}
       <div class="flipcard__back-content">
         {{ options.back }}
       </div>
       <span class="flipcard__icon flipcard__icon--back" aria-hidden="true"></span>
     </div>
     {# Site styling can choose to use this if wanted or it can remain empty #}
     <div class="flipcard__icon-footer">
       <span class="flipcard__icon flipcard__icon--footer"  aria-hidden="true"></span>
     </div>
   </div> -->