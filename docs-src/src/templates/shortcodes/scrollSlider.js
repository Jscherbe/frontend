import demoCard from "./demoCard.js";

export default function(
  cards = 3,
  title = 'Scroll Slider'
) {
  let cardContent = ``;
  for(let i = cards; i > 0; i--) {
    cardContent = cardContent + `
        <li class="scroll-slider__slide" data-ulu-scroll-slider-slide>
          ${ demoCard(cards - i + 1) } 
        </li>
      `;
  }
  return `
    <section class="container-fill" data-ulu-scroll-slider-init aria-labelledby="slider-title">
      <div class="container-fit">
        <h2 class="h2" id="slider-title">
          ${ title }
        </h2>
      </div>
        <div class="scroll-slider scroll-slider--cards" data-ulu-scroll-slider="[]">
          <div class="scroll-slider__control-context" data-ulu-scroll-slider-control-context>
            <div class="scroll-slider__track-crop">
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
    </section>
  `;
}