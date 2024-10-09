import card from "./card.js";

export default function(
  cards = 3,
  title = 'Slider'
) {
    let cardContent = ``;
    for(let i = cards; i > 0; i--) {
      cardContent = cardContent + `
          <li class="site-slider__slide " data-ulu-slider-slide>
            ${ card(cards - i + 1) } 
          </li>
        `;
    }
    return `
      <section class="slider-section-layout background-dark-blue-xx" aria-labelledby="slider-title67053c398e12d">
        <div class="slider-section-layout__title container-small no-padding-bottom">
          <h2 class="hidden-visually" id="slider-title67053c398e12d">
            Testimonials
          </h2>
        </div>
        <div class="slider-section-layout__slides container no-padding-top">
          <div class="site-slider site-slider--small" data-ulu-slider="{&quot;transitionFade&quot;:false}">
            <div class="site-slider__control-context" data-ulu-slider-control-context>
              <div class="site-slider__track-crop" data-ulu-slider-track-container>
                <ul class="site-slider__track" data-ulu-slider-track>
                  ${ cardContent }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  }
