---
title: Card
intro: Cards are...

---

<h2 class="h2">Interactive Card Demo</h2>

<div id="icd" class="interactive-demo">
  <div id="icd-display" class="interactive-demo__display">
  </div>
  <form id="icdForm" class="interactive-demo__form form-theme">
    <fieldset>
      <legend>Elements Visible</legend>
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
    </fieldset>
    <div class="form-theme__item form-theme__item--select">
      <label for="fieldImage">Action:</label>
      <select id="fieldAction" name="fieldAction">
        <option value="">None</option>
        <option value="link">Card is Link</option>
        <option value="proxy" selected>Proxy Click</option>
      </select>
      <p class="form-theme__description">Proxy click only works when title is present</p>
    </div>
    <div class="form-theme__item form-theme__item--select">
      <label for="fieldImage">Image:</label>
      <select id="fieldImage" name="fieldImage">
        <option value="icon">Icon</option>
        <option value="image" selected>Image</option>
        <option value="none">No Image</option>
      </select>
    </div>
    <div class="form-theme__item form-theme__item--select">
      <label for="fieldModifier">Modifier:</label>
      <select id="fieldModifier" name="fieldModifier">
        <option value="default" selected>Default</option>
        <option value="horizontal">Horizontal</option>
        <option value="overlay">Overlay</option>
      </select>
      <p class="form-theme__description">Overlay is not compatible with "Icon" and "No Image" options.</p>
    </div>
    <!-- <div class="form-theme__actions">
      <button type="button" id="icdSubmit" class="button button--small">Update</button>
    </div> -->
  </form>
</div>

<script>
  (() => {
    const display = document.getElementById("icd-display");
    const submit = document.getElementById("icdSubmit");
    const form = document.getElementById("icdForm");
  
    // Run initially and watch for changes
    render();
    form.addEventListener("change", update);

    function update() {
      render();
      document.dispatchEvent(new CustomEvent("ulu:pageModified", { bubbles: true }));
    }

    function render() {
      const formData = new FormData(form);
      const values = {};
      formData.forEach((value, key) => { values[key] = value });
      display.innerHTML = cardTemplate(values);
    }

    function cardTemplate(options) {
      const when = (cond, whenTrue, whenFalse = "") => cond ? whenTrue : whenFalse;
      const hasProxy = options.fieldAction == "proxy";
      const isLink = options.fieldAction == "link";
      const element = isLink ? "a" : "article";
      const imageType = options.fieldImage;

      return `
        <${ element } 
          class="card card--${ options.fieldModifier }"
          ${ when(hasProxy, "data-ulu-proxy-click") }
          ${ when(isLink, "href='https://www.google.com'") }
        >
          ${ when(options.fieldBody, `
            <div class="card__body">
              ${ when(options.fieldTitle, `
                <h5 class="card__title">
                  ${ when(isLink, "Card Title", `
                    <a 
                      class="card__title-link" 
                      href="https://www.google.com" 
                      ${ when(hasProxy, "data-ulu-proxy-click-source") }
                    >
                      Card Title
                    </a>
                  `) }
                </h5>
              `) }
              ${ when(options.fieldContent, `
                <div>
                  This is the card content. It can contain around 2-3 sentences.
                </div>
              `) }
            </div>
          `)}
          ${ when(imageType === "image", `
            <div class="card__image">
              <img src="/frontend/assets/placeholder/image-1.jpg">
            </div>
          `) }
          ${ when(imageType === "icon", `
            <div class="card__image card__image--icon">
              <span aria-hidden class="css-icon css-icon--circle-question"></span>
            </div>
          `) }
          ${ when(options.fieldFooter, `
            <div class="card__footer">
              ${ when(isLink, "Card Footer Text", `
                <a class="button button--small" href="https://www.yahoo.com/">Footer</a>
              `) }
            </div>
          `) }
        </${ element }>
      `;
    }
  })();
</script>
