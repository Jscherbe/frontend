
export default function(
  title = 'Slider',
  content = `<li class="slider__slide slider__slide-gap-for-controls" data-ulu-slider-slide>
    <img src="/assets/placeholder/image-1.jpg" />
  </li>
  <li class="slider__slide" data-ulu-slider-slide>
    <img src="/assets/placeholder/image-1.jpg" />
  </li>`
) {
    return `<h3 class="h3">${ title }</h3>
      <div class="slider slider--small slider--inset-controls" data-ulu-slider="{&quot;transitionFade&quot;:false}">
        <div class="slider__control-context" data-ulu-slider-control-context>
          <div class="slider__track-crop" data-ulu-slider-track-container>
            <ul class="slider__track" data-ulu-slider-track>
              ${ content }
            </ul>
          </div>
        </div>
      </div>`
  }
