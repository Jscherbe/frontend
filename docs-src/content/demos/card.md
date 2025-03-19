---
title: Card
intro: Cards are...

---

<div id="icd" class="interactive-demo">
  <div id="icd-display" class="interactive-demo__display">
  </div>
  <form id="icdForm" class="interactive-demo__form form-theme">
    <div class="form-theme__item">
      <input type="checkbox" id="fieldBody" name="fieldBody" checked>
      <label for="fieldBody">Body</label>
    </div>
    <div class="form-theme__item">
      <input type="checkbox" id="fieldFooter" name="fieldFooter" checked>
      <label for="fieldFooter">Footer</label>
    </div>
    <div class="form-theme__item">
      <input type="checkbox" id="fieldHorizontal" name="fieldHorizontal">
      <label for="fieldHorizontal">Horizontal</label>
    </div>
    <div class="form-theme__item">
      <label for="fieldImage">Image:</label>
      <select id="fieldImage" name="fieldImage">
        <option value="none">No Image</option>
        <option value="image" selected>Image</option>
        <option value="icon">Icon</option>
      </select>
    </div>
    <div class="form-theme__actions">
      <button type="button" id="icdSubmit" class="button">Refresh</button>
    </div>
  </form>
</div>

<script>
  (() => {
    const display = document.getElementById("icd-display");
    const submit = document.getElementById("icdSubmit");
    const form = document.getElementById("icdForm");
    const defaults = {
      // Add default options
    };

  
    // Run initially
    update(defaults);

    // Update on submit click
    submit.addEventListener("click", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const values = { ...defaults };
      formData.forEach((value, key) => {
        values[key] = value;
      });
      console.log("values:\n", values);
      update(values);
    });

    function update(options) {
      display.innerHTML = cardTemplate(options);
    }

    // Template for update
    function cardTemplate(options) {
      return `
<article class="card" data-proxy-click>
  <div class="card__body">
    <h5 class="card__title">
      <a class="card__title-link" href="https://www.google.com" data-ulu-proxy-click-source="">Card Title</a>
    </h5>
    <p>
      This is the card content. It can contain around 2-3 sentences.
    </p>
  </div>
  <div class="card__image">
    <img src="/assets/placeholder/image-1.jpg">
  </div>
  <div class="card__image card__image--icon">
    <span aria-hidden class="css-icon css-icon--circle-question"></span>
  </div>
  <div class="card__footer">
    <a class="button button--small" href="https://www.yahoo.com/">Footer</a>
  </div>
</article>      
      `;
    }
  })();
</script>



<!-- card short code parameter order is -->
<!-- {% demoCard number modifier body title content image footer isIcon %} -->

{% demoAccordion "Card Default Styling" %}
  <div class="h4">All Fields</div>
  {% demoCard %}
  <div class="h4">No Body (no proxy click link)</div>
  {% demoCard 1 '' false %}
  <div class="h4">No Title (no proxy click link)</div>
  {% demoCard 1 '' true false %}
  <div class="h4">No Content</div>
  {% demoCard 1 '' true true false %}
  <div class="h4">No Image</div>
  {% demoCard 1 '' true true true false %}
  <div class="h4">No Footer</div>
  {% demoCard 1 '' true true true true false %}
{% enddemoAccordion %}

{% demoAccordion "Card Image-fit Styling" %}
  <div class="h4">All Fields</div>
  {% demoCard 1 'card--image-fit' %}
  <div class="h4">No Body (no proxy click link)</div>
  {% demoCard 1 'card--image-fit' false %}
  <div class="h4">No Title (no proxy click link)</div>
  {% demoCard 1 'card--image-fit' true false %}
  <div class="h4">No Content</div>
  {% demoCard 1 'card--image-fit' true true false %}
  <div class="h4">No Image</div>
  {% demoCard 1 'card--image-fit' true true true false %}
  <div class="h4">No Footer</div>
  {% demoCard 1 'card--image-fit' true true true true false %}
{% enddemoAccordion %}

{% demoAccordion "Card Icon Styling" %}
  <div class="h4">All Fields</div>
  {% demoCard 1 '' true true true true true true %}
  <div class="h4">No Body (no proxy click link)</div>
  {% demoCard 1 '' false true true true true true %}
  <div class="h4">No Title (no proxy click link)</div>
  {% demoCard 1 '' true false true true true true %}
  <div class="h4">No Content</div>
  {% demoCard 1 '' true true false true true true %}
  <div class="h4">No Image</div>
  {% demoCard 1 '' true true true false true true %}
  <div class="h4">No Footer</div>
  {% demoCard 1 '' true true true true false true %}
{% enddemoAccordion %}

{% demoAccordion "Card Overlay Styling" %}
  <div class="h4">All Fields</div>
  {% demoCard 1 'card--overlay' %}
  <div class="h4">No Body (no proxy click link)</div>
  {% demoCard 1 'card--overlay' false true true true true %}
  <div class="h4">No Title (no proxy click link)</div>
  {% demoCard 1 'card--overlay' true false true true true %}
  <div class="h4">No Content</div>
  {% demoCard 1 'card--overlay' true true false true true %}
  <div class="h4">No Footer</div>
  {% demoCard 1 'card--overlay' true true true true false %}
{% enddemoAccordion %}

{% demoAccordion "Card Horizontal Styling" %}
  <div class="h4">All Fields</div>
  {% demoCard 1 'card--horizontal' true true true true false false %}
  <div class="h4">No Title (no proxy click link)</div>
  {% demoCard 1 'card--horizontal' true false true true true %}
  <div class="h4">No Content</div>
  {% demoCard 1 'card--horizontal' true true false true true %}
  <div class="h4">No Image</div>
  {% demoCard 1 'card--horizontal' true true true false true %}
{% enddemoAccordion %}

{% demoAccordion "Card Horizontal and Image-fit Styling" %}
  <div class="h4">All Fields</div>
  {% demoCard 1 'card--image-fit card--horizontal' %}
  <div class="h4">No Body (no proxy click link)</div>
  {% demoCard 1 'card--image-fit card--horizontal' false true true true true %}
  <div class="h4">No Title (no proxy click link)</div>
  {% demoCard 1 'card--image-fit card--horizontal' true false true true true %}
  <div class="h4">No Content</div>
  {% demoCard 1 'card--image-fit card--horizontal' true true false true true %}
  <div class="h4">No Image</div>
  {% demoCard 1 'card--w-image card--horizontal' true true true false true %}
  <div class="h4">No Footer</div>
  {% demoCard 1 'card--image-fit card--horizontal' true true true true false %}
{% enddemoAccordion %}
