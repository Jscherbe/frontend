/*
  params {
    number: What number to display in title. Used by cardGrid to differentiate cards in grid
    modifier: modifier to card (ie, card--horizontal)
    body: toggles display of body  
    title: toggles display of title 
    content: toggles display of content 
    image: toggles display of image 
    footer: toggles display of footer 
    isIcon: toggles use of card__image--icon class on card image
  }
*/

export default function(
  number = "1", 
  modifier = "",
  body = true,
  title = true,
  content = true,
  image = true,
  footer = true,
  isIcon = false
) {
  // create markup snippets to conditionally render
  let titleMarkup = `
    <h5 class="card__title">
      <a class="card__title-link" href="https://www.google.com" data-ulu-proxy-click-source="">Card ${number} Title</a>
    </h5>
  `.trim();
  let contentMarkup = `
    <div>
      This is the card content. It can contain around 2-3 sentences.
    </div>
  `.trim();
  
  let footerMarkup = `
    <div class="card__footer">
      <a class="button" href="https://www.yahoo.com/">Footer</a>
    </div>
  `.trim();
  let imageMarkup = `
    <div class="card__image ${ isIcon ? "card__image--icon" : "" }">
      ${ isIcon ? '<span aria-hidden class="css-icon css-icon--circle-question"></span>' : '<img src="/assets/placeholder/image-1.jpg"/>' } 
    </div>
  `.trim();

  // Condensed to not create <p> elements
  let bodyMarkup = `<div class="card__body">${ title ? titleMarkup : "" }${ content ? contentMarkup : "" }</div>`;

  // Condensed to not create <p> elements
  return `<article class="card ${ modifier }" ${ title ? "data-ulu-proxy-click" : "" }>${ body ? bodyMarkup : "" }${ image ? imageMarkup : "" }${ footer ? footerMarkup : "" }</article>`;
}