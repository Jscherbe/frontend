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
      <input type="checkbox" id="fieldTitle" name="fieldTitle" checked>
      <label for="fieldTitle">Title</label>
    </div>
    <div class="form-theme__item">
      <input type="checkbox" id="fieldContent" name="fieldContent" checked>
      <label for="fieldContent">Content</label>
    </div>
    <div class="form-theme__item">
      <input type="checkbox" id="fieldFooter" name="fieldFooter" checked>
      <label for="fieldFooter">Footer</label>
    </div>
    <div class="form-theme__item">
      <label for="fieldImage">Image:</label>
      <select id="fieldImage" name="fieldImage">
        <option value="icon">Icon</option>
        <option value="image" selected>Image</option>
        <option value="none">No Image</option>
      </select>
    </div>
    <div class="form-theme__item">
      <label for="fieldModifier">Modifier:</label>
      <select id="fieldModifier" name="fieldModifier">
        <option value="default" selected>Default</option>
        <option value="horizontal">Horizontal</option>
        <option value="overlay">Overlay</option>
      </select>
    </div>
    <div class="form-theme__actions">
      <button type="button" id="icdSubmit" class="button">Refresh</button>
    </div>
  </form>
  <div><em>Note the following config combinations are not currently supported</em></div>
  <dl>
    <dt>Overlay</dt>
    <dd>No Image</dd>
    <dd>Icon</dd>
</dl>
</div>


<!-- Note you will need to run the pageModified event after re-rendering the card, you can add the following to cause the scripts to update

document.dispatchEvent(new CustomEvent("ulu:pageModified", { bubbles: true })); -->

<script>
  (() => {
    const display = document.getElementById("icd-display");
    const submit = document.getElementById("icdSubmit");
    const form = document.getElementById("icdForm");
  
    // Run initially
    render();

    // Update on submit click
    submit.addEventListener("click", (event) => {
      event.preventDefault();
      render();
      document.dispatchEvent(new CustomEvent("ulu:pageModified", { bubbles: true }));
    });

    function render() {
      const formData = new FormData(form);
      const values = {};
      formData.forEach((value, key) => {
        values[key] = value;
      });
      console.log("values:\n", values);
      display.innerHTML = cardTemplate(values);
    }

    function cardFooterBuilder(options) {
      if(options.fieldFooter) {
        return `
          <div class="card__footer">
            ${ options.fieldTitle && options.fieldBody ? `<a class="button button--small" href="https://www.yahoo.com/">Footer</a>` : `Card Footer Text` }
          </div>
        `.trim();
      }
      return "";
    }

    function cardImageBuilder(imageType) {
      if(imageType == "image") {
        return `
          <div class="card__image">
            <img src="/frontend/assets/placeholder/image-1.jpg">
          </div>
        `.trim();
      } else if(imageType == "icon") {
        return `
          <div class="card__image card__image--icon">
            <span aria-hidden class="css-icon css-icon--circle-question"></span>
          </div>
        `.trim();
      }
      return "";
    }

    function cardBodyBuilder(options) {
      if(options.fieldBody) {
        let cardContent = `<div class="card__body">`
        if(options.fieldTitle) {
          cardContent = cardContent + `
            <h5 class="card__title">
              <a class="card__title-link" href="https://www.google.com" data-ulu-proxy-click-source="">Card Title</a>
            </h5>
          `.trim();
        }
        if(options.fieldContent) {
          cardContent = cardContent + `
            <div>
              This is the card content. It can contain around 2-3 sentences.
            </div>
          `.trim();
        }
        cardContent = cardContent + `</div>`
        return cardContent
      }
      return "";
    }

    // Template for update
    function cardTemplate(options) {
      const cardOpen = `<${ options.fieldTitle && options.fieldBody ? 'article data-ulu-proxy-click' : 'a href="https://www.google.com"' }  class="card card--${options.fieldModifier}">` 
      const cardClose = (options.fieldTitle && options.fieldBody) ? '</article>' : '</a>'
      console.log(cardClose)
      return cardOpen + cardBodyBuilder(options) + cardImageBuilder(options.fieldImage) + cardFooterBuilder(options) + cardClose
    }
  })();
</script>


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
