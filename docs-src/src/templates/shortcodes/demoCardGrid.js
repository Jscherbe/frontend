import card from "./demoCard.js"

export default function(
  number = "1", 
  modifier = "",
  cardModifier = "",
  body = true,
  title = true,
  content = true,
  image = true,
  footer = true,
) {
  let cardsContent = ''
  for( let i = 1; i <= number; i++) {
    cardsContent = cardsContent + `<li class="card-grid__item">${ card(i, cardModifier, body, title, content, image, footer) }</li>`
  }
  return `
    <ul class="card-grid ${ modifier }">
      ${ cardsContent }
    </ul>
  `.trim();
}