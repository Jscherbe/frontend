const cardTypes= {
  default: {
    title: 'Default',
    content:
      `
        <article class="card" data-ulu-proxy-click>
          <div class="card__body">
              <a class="card__title" href="https://www.google.com" data-ulu-proxy-click-source="">Card with Image</a>
            <p>
              This is a card with an upper image using a containing div with the "card__image" class. 
            </p>
          </div>
          <div class="card__image">
            <img src="/assets/placeholder/image-1.jpg" />
          </div>
          <div class="card__footer">
            My first Card Footer
          </div>
        </article>
      `,
  },
  cardIcon: {
    title: 'Card with Icon',
    content: 
      `
        <article class="card" data-ulu-proxy-click>
          <div class="card__body">
            <a class="card__title" href="#" data-ulu-proxy-click-source="">Card with Image</a>
            <p>
              This is a card with an upper image using a containing div with the "card__image--icon" class. This maintains the card's padding, so it will line up properly to the text.
            </p>
          </div>
          <div class="card__image card__image--icon">
            <img src="/assets/placeholder/image-1.jpg" />
          </div>
          <div class="card__footer">
            My first Card Footer
          </div>
        </article>
      `,
  },
  cardCovered: {
    title: 'Card with Full Background Image',
    content: 
      `
        <article class="card card--covered" data-ulu-proxy-click>
          <div class="card__body">
            <a class="card__title" href="#" data-ulu-proxy-click-source="">Card with background image</a>
            <p>
              Adding "card--covered" to the parent card to have the image cover the entire background. Text will be displayed over a semi-transparent gradient.
            </p>
          </div>
          <div class="card__image">
            <img src="/assets/placeholder/image-1.jpg" />
          </div>
          <div class="card__footer">
            My first Card Footer
          </div>
        </article>
      `,
  },
  cardCoveredNoContent: {
    title: "Covered Card without Body Content",
    content: 
      `
        <article class="card card--covered" data-ulu-proxy-click>
          <div class="card__body">
              <a class="card__title" href="#" data-ulu-proxy-click-source="">Card with background image</a>
          </div>
          <div class="card__image">
            <img src="/assets/placeholder/image-1.jpg" />
          </div>
          <div class="card__footer">
            My first Card Footer
          </div>
        </article>
      `,
  },
  cardCoveredNoTitle: {
    title: "Covered Card without Title",
    content: 
      `
        <article class="card card--covered" data-ulu-proxy-click>
          <div class="card__body">
            <p>
              Adding "card--covered" to the parent card to have the image cover the entire background. Text will be displayed over a semi-transparent gradient.
            </p>
          </div>
          <div class="card__image">
            <img src="/assets/placeholder/image-1.jpg" />
          </div>
          <div class="card__footer">
            My first Card Footer
          </div>
      </article>`,
  },
  cardCoveredNoFoot: {
    title: "Covered Card without Footer",
    content: 
      `
        <article class="card card--covered" data-ulu-proxy-click>
          <div class="card__body">
            <a class="card__title" href="#" data-ulu-proxy-click-source="">Card with background image</a>
            <p>
              Adding "card--covered" to the parent card to have the image cover the entire background. Text will be displayed over a semi-transparent gradient.
            </p>
          </div>
          <div class="card__image">
            <img src="/assets/placeholder/image-1.jpg" />
          </div>
        </article>
      `,
  },
  cardCoveredOnlyTitle: {
    title: "Covered Card with only Title",
    content: 
      `
        <article class="card card--covered" data-ulu-proxy-click>
          <div class="card__body">
              <a class="card__title" href="#" data-ulu-proxy-click-source="">Card with background image</a>
          </div>
          <div class="card__image">
            <img src="/assets/placeholder/image-1.jpg" />
          </div>
        </article>
      `,
  },
  cardCoveredOnlyBody: {
    title: "Covered Card with only Body",
    content: 
      `
        <article class="card card--covered" data-ulu-proxy-click>
          <div class="card__body">
            <p>
              Adding "card--covered" to the parent card to have the image cover the entire background. Text will be displayed over a semi-transparent gradient.
            </p>
          </div>
          <div class="card__image">
            <img src="/assets/placeholder/image-1.jpg" />
          </div>
        </article>
      `,
  },
  cardCoveredOnlyFooter: {
    title: "Covered Card with only Footer",
    content: 
      `
        <article class="card card--covered" data-ulu-proxy-click>
          <div class="card__image">
            <img src="/assets/placeholder/image-1.jpg" />
          </div>
          <div class="card__footer">
            My first Card Footer
          </div>
        </article>
      `,
  },
}

const cardTypesArray = []
for (let card in cardTypes) {
  cardTypesArray.push(cardTypes[card])
}
console.log(cardTypesArray)
export default {
  // map card types to an array for the liquid to work through
  cardTypes,
  cardTypesArray 
}