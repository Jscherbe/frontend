import card from "./card.js";

export default function(
  title = 'Slider',
  content = `<li class="slider__slide" data-ulu-slider-slide>
    <img src="/assets/placeholder/image-1.jpg" />
  </li>
  <li class="slider__slide" data-ulu-slider-slide>
    <img src="/assets/placeholder/image-1.jpg" />
  </li>`
) {
    return `<h3 class="h3">${ title }</h3>
      <section class="slider-section-layout background-dark-blue-xx" aria-labelledby="slider-title67053c398e12d">
        <div class="slider-section-layout__title container-small no-padding-bottom">
          <h2 class="hidden-visually" id="slider-title67053c398e12d">
            Testimonials
          </h2>
        </div>
        <div class="slider-section-layout__slides container no-padding-top">
          <div class="slider slider--small" data-ulu-slider="{&quot;transitionFade&quot;:false}">
            <div class="slider__control-context" data-ulu-slider-control-context>
              <div class="slider__track-crop" data-ulu-slider-track-container>
                <ul class="slider__track" data-ulu-slider-track>
                  ${ content }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  }
