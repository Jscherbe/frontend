---
title: Scroll Slider
intro: Scroll Slider Intro
layout: fullpage
---
<div class="container">
  <h3 class="h3">Issue</h3>
  <p>
    When using the scroll slider at a min width around 1920px, the arrows don't allow you to return back to the first card. The scroll slider works correctly at around 1900px. 
  </p>
  <p>
    Original Note from Rachel: Unable to return to the beginning of the cards when navigating the slider
  </p>
</div>

<section class="container-fill" data-ulu-scroll-slider-init aria-labelledby="slider-title">
  <div class="container-fit">
    <h2 class="h2" id="slider-title">
      Slide Title
    </h2>
  </div>
    <div class="scroll-slider scroll-slider--cards" data-ulu-scroll-slider="[]">
      <div class="scroll-slider__control-context" data-ulu-scroll-slider-control-context>
        <div class="scroll-slider__track-crop">
          <ul class="scroll-slider__track" data-ulu-scroll-slider-track>
            <li class="scroll-slider__slide scroll-slider__slide--empty" role="presentation" data-ulu-scroll-slider-slide></li>
            <li class="scroll-slider__slide" data-ulu-scroll-slider-slide>
              {% demoCard %}
            </li>
            <li class="scroll-slider__slide" data-ulu-scroll-slider-slide>
              {% demoCard %}
            </li>
            <li class="scroll-slider__slide" data-ulu-scroll-slider-slide>
              {% demoCard %}
            </li>
            <li class="scroll-slider__slide" data-ulu-scroll-slider-slide>
              {% demoCard %}
            </li>
            <li class="scroll-slider__slide" data-ulu-scroll-slider-slide>
              {% demoCard %}
            </li>
            <li class="scroll-slider__slide" data-ulu-scroll-slider-slide>
              {% demoCard %}
            </li>
            <li class="scroll-slider__slide scroll-slider__slide--empty" role="presentation" data-ulu-scroll-slider-slide></li>
          </ul>
        </div>
      </div>
    </div>
</section>