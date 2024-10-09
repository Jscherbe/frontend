export default function(
  number = "1", 
) {
  return `
    <article class="card" data-ulu-proxy-click>
      <div class="card__body">
        <h5 class="card__title">
          <a class="card__title-link" href="https://www.google.com" data-ulu-proxy-click-source="">Card ${number}</a>
        </h5>
        <div>
          This is a card with an upper image using a containing div with the "card__image" class. 
        </div>
      </div>
      <div class="card__image">
        <img src="/assets/placeholder/image-1.jpg" />
      </div>
      <div class="card__footer">
        My Card Footer
      </div>
    </article>
      `;
}