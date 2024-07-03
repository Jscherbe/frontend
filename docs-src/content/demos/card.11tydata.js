const cardTypes= {
  default: {
    title: 'Default',
    content:
      `
        <article class="card" data-proxy-click>
          <div class="card__body">
              <a class="site-card__link card__title" href="#" data-proxy-click-source="">Card with Image</a>
            <div class="site-card__body-content">
              This is a card with an upper image using a containing div with the "card__image" class. 
            </div>
          </div>
          <div class="card__image site-card__image">
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
        <article class="card" data-proxy-click>
          <div class="card__body">
            <div class="site-card__header">
              <a class="site-card__link card__title" href="#" data-proxy-click-source="">Card with Image</a>
            </div>
            <div class="site-card__body-content">
              This is a card with an upper image using a containing div with the "card__image--icon" class. This maintains the card's padding, so it will line up properly to the text.
            </div>
          </div>
          <div class="card__image card__image--icon site-card__image">
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
        <article class="card card--covered" data-proxy-click>
          <div class="card__body">
            <div class="site-card__header">
              <a class="site-card__link card__title" href="#" data-proxy-click-source="">Card with background image</a>
            </div>
            <div class="site-card__body-content">
              Adding "card--covered" to the parent card to have the image cover the entire background. Text will be displayed over a semi-transparent gradient.
            </div>
          </div>
          <div class="card__image site-card__image">
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
        <article class="card card--covered" data-proxy-click>
          <div class="card__body">
            <div class="site-card__header">
              <a class="site-card__link card__title" href="#" data-proxy-click-source="">Card with background image</a>
            </div>
          </div>
          <div class="card__image site-card__image">
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
        <article class="card card--covered" data-proxy-click>
          <div class="card__body">
            <div class="site-card__body-content">
              Adding "card--covered" to the parent card to have the image cover the entire background. Text will be displayed over a semi-transparent gradient.
            </div>
          </div>
          <div class="card__image site-card__image">
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
        <article class="card card--covered" data-proxy-click>
          <div class="card__body">
            <div class="site-card__header">
              <a class="site-card__link card__title" href="#" data-proxy-click-source="">Card with background image</a>
            </div>
            <div class="site-card__body-content">
              Adding "card--covered" to the parent card to have the image cover the entire background. Text will be displayed over a semi-transparent gradient.
            </div>
          </div>
          <div class="card__image site-card__image">
            <img src="/assets/placeholder/image-1.jpg" />
          </div>
        </article>
      `,
  },
  cardCoveredOnlyTitle: {
    title: "Covered Card with only Title",
    content: 
      `
        <article class="card card--covered" data-proxy-click>
          <div class="card__body">
            <div class="site-card__header">
              <a class="site-card__link card__title" href="#" data-proxy-click-source="">Card with background image</a>
            </div>
          </div>
          <div class="card__image site-card__image">
            <img src="/assets/placeholder/image-1.jpg" />
          </div>
        </article>
      `,
  },
  cardCoveredOnlyBody: {
    title: "Covered Card with only Body",
    content: 
      `
        <article class="card card--covered" data-proxy-click>
          <div class="card__body">
            <div class="site-card__body-content">
              Adding "card--covered" to the parent card to have the image cover the entire background. Text will be displayed over a semi-transparent gradient.
            </div>
          </div>
          <div class="card__image site-card__image">
            <img src="/assets/placeholder/image-1.jpg" />
          </div>
        </article>
      `,
  },
  cardCoveredOnlyFooter: {
    title: "Covered Card with only Footer",
    content: 
      `
        <article class="card card--covered" data-proxy-click>
          <div class="card__image site-card__image">
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