export default {
  cardTypes: {
    cardImage: `
      <span class="site-card__label">Card Label</span>
      <span class="site-card__title">Title</span>
      <article class="card" data-proxy-click>
        <div class="card__body">
          <div class="site-card__header">
            <a class="site-card__link card__title" href="#" data-proxy-click-source="">Card with Image</a>
          </div>
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
      </article>`,
    cardIcon: `
      <span class="site-card__label">Card Label</span>
      <span class="site-card__title">Title</span>
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
      </article>`,
    cardCovered: `
      <span class="site-card__label">Card Label</span>
      <span class="site-card__title">Title</span>
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
      </article>`
  }
}