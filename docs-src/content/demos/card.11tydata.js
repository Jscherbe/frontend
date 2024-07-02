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
            This is a card with an upper image using a containing div with the "card__image" class. 
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
      <div class="card card--covered">
        <div class="card__content">
          <div class="card__title">Card with Image</div> 
          <div class="card__body">This is a card with an upper image using a containing div with the "card__image" class. </div>
          <div class="card__footer">My first Card Footer</div>
        </div>
        <img class="card__background" src="/assets/placeholder/image-1.jpg" />
      </div>`
  }
}