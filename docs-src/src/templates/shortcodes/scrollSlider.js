export default function(
  track = "test title", 
  controls = "Information"
) {
  return `
    <section class="scroll-slider-section container-full" aria-labelledby="slider-title670540522040c">
      <div class="scroll-slider-section__slides">
        <div class="scroll-slider scroll-slider--cards" data-ulu-scroll-slider=''>
        <div data-ulu-scroll-slider-control-context=''>
          <div class="scroll-slider__track-crop" data-ulu-scroll-slider-track-container="">
            <ul class="scroll-slider__track" data-ulu-scroll-slider-track=''>
              <li class="scroll-slider__slide scroll-slider__slide--empty" role="presentation" data-ulu-scroll-slider-slide="">
                &nbsp;
              </li>
              <li class="scroll-slider__slide " data-ulu-scroll-slider-slide="">
                <div class="card">
                  <div class="card__body">
                    <a class="card__title" href="/knowledge-resources/toolkit/46933/eviction-prevention-toolkit">
                      <span class="tag-container">
                        <span class="tag site-content-type">New Toolkit</span>
                      </span>
                      <strong>Eviction Prevention: A Toolkit for Tenants and Service Providers</strong>
                    </a>
                    <div class="wysiwgy">
                      <p>
                        <span>This Toolkit outlines strategies for supporting people with mental health conditions, substance use disorders, or co-occurring disorders living in community-based low-income housing to prevent eviction.</span></p>
                      <p>
                        <a class="button" href="/knowledge-resources/toolkit/46933/eviction-prevention-toolkit">
                          Download the Toolkit
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li class="scroll-slider__slide ">Item 2</li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </section>
  `;
}