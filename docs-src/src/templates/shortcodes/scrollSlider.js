import card from "./card.js";

export default function(
  cards = 3,
  title = 'Scroll Slider'
) {
  let cardContent = ``;
  for(let i = cards; i > 0; i--) {
    cardContent = cardContent + `
        <li class="scroll-slider__slide " data-ulu-scroll-slider-slide>
          ${ card(cards - i + 1) } 
        </li>
      `;
  }
  return `
    <section class="scroll-slider-section container-full" data-ulu-scroll-slider-init aria-labelledby="slider-title">
      <div class="scroll-slider-section__title container-fit">
        <h2 class="h2 h2--no-rule no-margin-bottom" id="slider-title">
          ${ title }
        </h2>
      </div>
      <div class="scroll-slider-section__slides">
        <div class="scroll-slider scroll-slider--cards" data-ulu-scroll-slider="[]">
          <div class="scroll-slider__control-context" data-ulu-scroll-slider-control-context>
            <div class="scroll-slider__track-crop" data-ulu-scroll-slider-track-container>
              <ul class="scroll-slider__track" data-ulu-scroll-slider-track>
                <li class="scroll-slider__slide scroll-slider__slide--empty" role="presentation" data-ulu-scroll-slider-slide>
                  &nbsp;
                </li>
                ${ cardContent }
                <li class="scroll-slider__slide scroll-slider__slide--empty" role="presentation" data-ulu-scroll-slider-slide>
                  &nbsp;
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}