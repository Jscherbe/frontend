// <article class="card">
//   <div class="card__body">
//   <div class="card__header">
//     <h5 class="card__title>
//       <a href="/work/iri-strategic-communications-program" class="card__title-link">
//         <span class="headline-label type-small">IRI</span> 
//         Strategic Communications Program
//       </a>
//     </h5>
//   </div>
// </div>
// <div class="card__image">
//   <img src="/pages/work/iri-strategic-communications-program/_required/thumbnail.jpg" alt="">
// </div><!--v-if-->
// </article>

const cardTypes= {
  default: {
    title: 'Default',
    content:
      `
        <article class="card" data-ulu-proxy-click>
          <div class="card__body">
            <h5 class="card__title">
              <a class="card__title-link" href="https://www.google.com" data-ulu-proxy-click-source="">Card with Image</a>
            </h5>
            <div>
              This is a card with an upper image using a containing div with the "card__image" class. 
            </div>
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
            <h5 class="card__title">
              <a class="card__title-link" href="#" data-ulu-proxy-click-source="">Card with icon</a>
            </h5>
            <div>
              This is a card with an upper image using a containing div with the "card__image--icon" class. This maintains the card's padding, so it will line up properly to the text.
            </div>
          </div>
          <div class="card__image card__image--icon">
            <span class="css-icon css-icon--square"></span>
          </div>
          <div class="card__footer">
            My first Card Footer
          </div>
        </article>
      `,
  },
  cardOverlay: {
    title: 'Card with Full Background Image',
    content: 
      `
        <article class="card card--overlay" data-ulu-proxy-click>
          <div class="card__body">
            <h5 class="card__title">
              <a class="card__title-link" href="#" data-ulu-proxy-click-source="">Card with background image dasdf</a>
            </h5>
            <div>
              Adding "card--overlay" to the parent card to have the image cover the entire background. Text will be displayed over a semi-transparent gradient.Adding "card--overlay" to the parent card to have the image cover the entire background. Text will be displayed over a semi-transparent gradient.Adding "card--overlay" to the parent card to have the image cover the entire background. Text will be displayed over a semi-transparent gradient.Adding "card--overlay" to the parent card to have the image cover the entire background. Text will be displayed over a semi-transparent gradient.Adding "card--overlay" to the parent card to have the image cover the entire background. Text will be displayed over a semi-transparent gradient.
            </div>
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
  cardOverlayNoContent: {
    title: "overlay Card without Body Content",
    content: 
      `
        <article class="card card--overlay" data-ulu-proxy-click>
          <div class="card__body">
            <h5 class="card__title">
              <a class="card__title-link" href="#" data-ulu-proxy-click-source="">Card with background image</a>
            </h5>
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
  cardOverlayNoTitle: {
    title: "overlay Card without Title",
    content: 
      `
        <article class="card card--overlay" data-ulu-proxy-click>
          <div class="card__body">
            <div>
              Adding "card--overlay" to the parent card to have the image cover the entire background. Text will be displayed over a semi-transparent gradient.
            </div>
          </div>
          <div class="card__image">
            <img src="/assets/placeholder/image-1.jpg" />
          </div>
          <div class="card__footer">
            My first Card Footer
          </div>
      </article>`,
  },
  cardOverlayNoFoot: {
    title: "overlay Card without Footer",
    content: 
      `
        <article class="card card--overlay" data-ulu-proxy-click>
          <div class="card__body">
            <h5 class="card__title">
              <a class="card__title-link" href="#" data-ulu-proxy-click-source="">Card with background image</a>
            </h5>
            <div>
              Adding "card--overlay" to the parent card to have the image cover the entire background. Text will be displayed over a semi-transparent gradient.
            </div>
          </div>
          <div class="card__image">
            <img src="/assets/placeholder/image-1.jpg" />
          </div>
        </article>
      `,
  },
  cardOverlayOnlyTitle: {
    title: "overlay Card with only Title",
    content: 
      `
        <article class="card card--overlay" data-ulu-proxy-click>
          <div class="card__body">
            <h5 class="card__title">
              <a class="card__title-link" href="#" data-ulu-proxy-click-source="">Card with background image</a>
            </h5>
          </div>
          <div class="card__image">
            <img src="/assets/placeholder/image-1.jpg" />
          </div>
        </article>
      `,
  },
  cardOverlayOnlyBody: {
    title: "overlay Card with only Body",
    content: 
      `
        <article class="card card--overlay" data-ulu-proxy-click>
          <div class="card__body">
            <div>
              Adding "card--overlay" to the parent card to have the image cover the entire background. Text will be displayed over a semi-transparent gradient.
            </div>
          </div>
          <div class="card__image">
            <img src="/assets/placeholder/image-1.jpg" />
          </div>
        </article>
      `,
  },
  cardOverlayOnlyFooter: {
    title: "overlay Card with only Footer",
    content: 
      `
        <article class="card card--overlay" data-ulu-proxy-click>
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
// console.log(cardTypesArray)
export default {
  // map card types to an array for the liquid to work through
  cardTypes,
  cardTypesArray 
}