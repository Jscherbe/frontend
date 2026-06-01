---
title: Card Grid
intro: The Card Grid is a flexible layout component designed to organize cards into a responsive grid. It automatically handles item distribution and spacing, making it ideal for displaying collections of content like articles, products, or features.
layout: fullpage
---

<div class="container">

  <h2 class="h2">Card Grid Defaults</h2>
  <p>The standard card grid uses CSS grid to distribute items evenly. It automatically wraps cards as the screen size changes.</p>

  {% CodePreview %}
  <ul class="card-grid">
    <li class="card-grid__item">
      <article class="card card--fill" data-ulu-proxy-click>
        <div class="card__image">
          <img src="https://picsum.photos/id/10/600/400" alt="Sustainable Living">
        </div>
        <div class="card__body">
          <div class="card__main">
            <h3 class="card__title">
              <a href="#" class="card__title-link" data-ulu-proxy-click-source>Sustainable Living</a>
            </h3>
            <p>Small changes can make a big impact. Learn how to reduce your carbon footprint starting at home with simple, everyday habits.</p>
          </div>
        </div>
        <div class="card__footer">
          <a href="#" class="button button--small">Read More</a>
        </div>
      </article>
    </li>
    <li class="card-grid__item">
      <article class="card card--fill" data-ulu-proxy-click>
        <div class="card__image">
          <img src="https://picsum.photos/id/20/600/400" alt="Remote Work Tips">
        </div>
        <div class="card__body">
          <div class="card__main">
            <h3 class="card__title">
              <a href="#" class="card__title-link" data-ulu-proxy-click-source>Remote Work Tips</a>
            </h3>
            <p>Boost your productivity while working from home with these tried and tested strategies for staying focused and organized.</p>
          </div>
        </div>
        <div class="card__footer">
          <a href="#" class="button button--small">Read More</a>
        </div>
      </article>
    </li>
    <li class="card-grid__item">
      <article class="card card--fill" data-ulu-proxy-click>
        <div class="card__image">
          <img src="https://picsum.photos/id/30/600/400" alt="Healthy Eating">
        </div>
        <div class="card__body">
          <div class="card__main">
            <h3 class="card__title">
              <a href="#" class="card__title-link" data-ulu-proxy-click-source>Healthy Eating</a>
            </h3>
            <p>Discover nutritious and delicious recipes that are easy to prepare, budget-friendly, and perfect for the whole family.</p>
          </div>
        </div>
        <div class="card__footer">
          <a href="#" class="button button--small">Read More</a>
        </div>
      </article>
    </li>
  </ul>
  {% endCodePreview %}

  <h2 class="h2 margin-top-large">Compact Grid</h2>
  <p>The <code>card-grid--compact</code> modifier reduces the gap between items, which is useful for smaller cards or dense data displays.</p>

  {% CodePreview %}
  <ul class="card-grid card-grid--compact">
    <li class="card-grid__item">
      <article class="card card--fill">
        <div class="card__body">
          <div class="card__main">
            <h4 class="card__title">Quick Insight</h4>
            <p>Short snippets of information that don't require much space or an image.</p>
          </div>
        </div>
      </article>
    </li>
    <li class="card-grid__item">
      <article class="card card--fill">
        <div class="card__body">
          <div class="card__main">
            <h4 class="card__title">Direct Access</h4>
            <p>Links or actions that need to be grouped tightly together for efficiency.</p>
          </div>
        </div>
      </article>
    </li>
    <li class="card-grid__item">
      <article class="card card--fill">
        <div class="card__body">
          <div class="card__main">
            <h4 class="card__title">Fast Navigation</h4>
            <p>Compact grids are ideal for dashboard-style interfaces and toolbars.</p>
          </div>
        </div>
      </article>
    </li>
    <li class="card-grid__item">
      <article class="card card--fill">
        <div class="card__body">
          <div class="card__main">
            <h4 class="card__title">Resource Links</h4>
            <p>Gathering related resources in a single, scanable area without visual bloat.</p>
          </div>
        </div>
      </article>
    </li>
  </ul>
  {% endCodePreview %}

  <h2 class="h2 margin-top-large">Horizontal Card Layouts (Testing minmax Fix)</h2>
  <p>The following examples use tall images with minimal text to verify that the <code>minmax(0, 1fr)</code> fix prevents images from forcing the card height beyond the intended <code>horizontal-min-height</code>. This ensures consistent card heights regardless of image dimensions.</p>
  
  {% CodePreview %}
  <ul class="card-grid card-grid--one-column card-grid--rows-fit">
    <!-- 1. Standard Horizontal (Body + Footer) -->
    <li class="card-grid__item">
      <article class="card card--horizontal card--fill" data-ulu-proxy-click>
        <div class="card__image">
          <img src="https://picsum.photos/id/1015/600/1200" alt="Standard Horizontal Test">
        </div>
        <div class="card__body">
          <div class="card__main">
            <h3 class="card__title">
              <a href="#" class="card__title-link" data-ulu-proxy-click-source>Standard with Footer</a>
            </h3>
            <p>Verifying that the grid row containing this small text shrinks correctly despite the 1200px tall image.</p>
          </div>
        </div>
        <div class="card__footer">
          <a href="#" class="button button--small">Footer Action</a>
        </div>
      </article>
    </li>
    <!-- 2. No Footer Horizontal -->
    <li class="card-grid__item">
      <article class="card card--horizontal card--fill" data-ulu-proxy-click>
        <div class="card__image">
          <img src="https://picsum.photos/id/1016/600/1200" alt="No Footer Test">
        </div>
        <div class="card__body">
          <div class="card__main">
            <h3 class="card__title">
              <a href="#" class="card__title-link" data-ulu-proxy-click-source>No Footer Layout</a>
            </h3>
            <p>This layout uses a single row for the body. The fix ensures this row doesn't expand to the full height of the tall image.</p>
          </div>
        </div>
      </article>
    </li>
    <!-- 3. Footer Inline Horizontal -->
    <li class="card-grid__item">
      <article class="card card--horizontal card--footer-inline card--fill" data-ulu-proxy-click>
        <div class="card__image">
          <img src="https://picsum.photos/id/1018/600/1200" alt="Footer Inline Test">
        </div>
        <div class="card__body">
          <div class="card__main">
            <h3 class="card__title">
              <a href="#" class="card__title-link" data-ulu-proxy-click-source>Footer Inline Layout</a>
            </h3>
            <p>The footer is moved to a column. This verifies consistency across specialized horizontal layouts.</p>
          </div>
        </div>
        <div class="card__footer">
          <a href="#" class="button button--small">Action</a>
        </div>
      </article>
    </li>
    <!-- 4. No Image (Fallback Check) -->
    <li class="card-grid__item">
      <article class="card card--horizontal card--no-image card--fill" data-ulu-proxy-click>
        <div class="card__body">
          <div class="card__main">
            <h3 class="card__title">
              <a href="#" class="card__title-link" data-ulu-proxy-click-source>No Image Fallback</a>
            </h3>
            <p>Ensuring that the layout remains robust even when the image is explicitly hidden or missing.</p>
          </div>
        </div>
        <div class="card__footer">
          <a href="#" class="button button--small">Read More</a>
        </div>
      </article>
    </li>
  </ul>
  {% endCodePreview %}

  <h2 class="h2 margin-top-large">Horizontal Card Layouts (Image Fit)</h2>
  <p>Using <code>card--image-fit</code> ensures that the images are contained within the image area (<code>object-fit: contain</code>), which is ideal for varying aspect ratios.</p>
  
  {% CodePreview %}
  <ul class="card-grid card-grid--one-column">
    <li class="card-grid__item">
      <article class="card card--horizontal card--image-fit card--fill" data-ulu-proxy-click>
        <div class="card__image">
          <img src="https://picsum.photos/id/1015/600/400" alt="Landscape Photography">
        </div>
        <div class="card__body">
          <div class="card__main">
            <h3 class="card__title">
              <a href="#" class="card__title-link" data-ulu-proxy-click-source>Mastering Landscape Photography</a>
            </h3>
            <p>Learn the technical and artistic skills needed to capture stunning natural vistas, from equipment choice to post-processing techniques.</p>
          </div>
        </div>
        <div class="card__footer">
          <a href="#" class="button button--small">View Tutorial</a>
        </div>
      </article>
    </li>
    <li class="card-grid__item">
      <article class="card card--horizontal card--image-fit card--fill" data-ulu-proxy-click>
        <div class="card__image">
          <img src="https://picsum.photos/id/1019/400/600" alt="Mountain Biking">
        </div>
        <div class="card__body">
          <div class="card__main">
            <h3 class="card__title">
              <a href="#" class="card__title-link" data-ulu-proxy-click-source>The Best Mountain Biking Trails</a>
            </h3>
            <p>A curated list of the most challenging and scenic mountain biking trails across the country, complete with difficulty ratings and maps.</p>
          </div>
        </div>
        <div class="card__footer">
          <a href="#" class="button button--small">Explore Trails</a>
        </div>
      </article>
    </li>
    <li class="card-grid__item">
      <article class="card card--horizontal card--image-fit card--fill" data-ulu-proxy-click>
        <div class="card__image">
          <img src="https://picsum.photos/id/1020/600/600" alt="Urban Exploration">
        </div>
        <div class="card__body">
          <div class="card__main">
            <h3 class="card__title">
              <a href="#" class="card__title-link" data-ulu-proxy-click-source>Hidden City Gems</a>
            </h3>
            <p>Uncover the secret spots and historical landmarks hidden in plain sight within major metropolitan areas around the globe.</p>
          </div>
        </div>
        <div class="card__footer">
          <a href="#" class="button button--small">See Locations</a>
        </div>
      </article>
    </li>
    <li class="card-grid__item">
      <article class="card card--horizontal card--image-fit card--fill" data-ulu-proxy-click>
        <div class="card__image">
          <img src="https://picsum.photos/id/1025/800/400" alt="Wildlife Photography">
        </div>
        <div class="card__body">
          <div class="card__main">
            <h3 class="card__title">
              <a href="#" class="card__title-link" data-ulu-proxy-click-source>Wildlife in the Wild</a>
            </h3>
            <p>Capturing the essence of animals in their natural habitats requires patience, the right gear, and a deep understanding of animal behavior.</p>
          </div>
        </div>
        <div class="card__footer">
          <a href="#" class="button button--small">Read Article</a>
        </div>
      </article>
    </li>
  </ul>
  {% endCodePreview %}

  <section class="list-grid margin-top-large" data-list-grid="grid">
    <header class="list-grid__header">
      <h3 class="h3">List Grid with Switcher</h3>
      <p>This advanced example demonstrates the <code>list-grid</code> utility, which allows users to toggle between a standard grid and a horizontal list view.</p>
      <div class="list-grid__toolbar site-toolbar">
        <button 
          class="icon-switch" 
          type="button" 
          data-list-grid-toggle
          aria-label="Toggle List/Grid Mode"
        >
          <span class="icon-switch__icon fa-solid fa-list" data-list-grid-toggle-list></span>
          <span class="icon-switch__icon is-active" data-list-grid-toggle-grid>
            {% svgBoxes %}
          </span>
        </button>
      </div>
    </header>

    {% CodePreview %}
    <ul class="card-grid list-grid__rows">
      <li class="card-grid__item">
        <article class="card card--horizontal list-grid__card card--fill" data-ulu-proxy-click>
          <div class="card__image">
            <img src="https://picsum.photos/id/1020/600/400" alt="Tech Trends">
          </div>
          <div class="card__body">
            <div class="card__main">
              <h3 class="card__title">
                <a href="#" class="card__title-link" data-ulu-proxy-click-source>Tech Trends for 2026</a>
              </h3>
              <p>Explore the emerging technologies that will reshape our world, from advanced AI to sustainable energy solutions.</p>
            </div>
          </div>
          <div class="card__footer">
            <span class="type-small">Updated 2 days ago</span>
          </div>
        </article>
      </li>
      <li class="card-grid__item">
        <article class="card card--horizontal list-grid__card card--fill" data-ulu-proxy-click>
          <div class="card__image">
            <img src="https://picsum.photos/id/1043/600/400" alt="Urban Planning">
          </div>
          <div class="card__body">
            <div class="card__main">
              <h3 class="card__title">
                <a href="#" class="card__title-link" data-ulu-proxy-click-source>Future of Urban Planning</a>
              </h3>
              <p>How cities are evolving to become more walkable, green, and resilient in the face of global challenges.</p>
            </div>
          </div>
          <div class="card__footer">
            <span class="type-small">Updated 5 days ago</span>
          </div>
        </article>
      </li>
    </ul>
    {% endCodePreview %}
  </section>

  <h2 class="h2 margin-top-large">Constrained Container</h2>
  <p>Card grids are often placed within constrained containers to maintain readability and visual balance on larger screens.</p>
  <div style="max-width: 1000px; margin: 0 auto;">
    {% CodePreview %}
    <ul class="card-grid">
      <li class="card-grid__item">
        <article class="card card--fill">
          <div class="card__body">
            <div class="card__main">
              <h4 class="card__title">Project Alpha</h4>
              <p>An ambitious initiative focusing on community-driven growth and innovation.</p>
            </div>
          </div>
        </article>
      </li>
      <li class="card-grid__item">
        <article class="card card--fill">
          <div class="card__body">
            <div class="card__main">
              <h4 class="card__title">Project Beta</h4>
              <p>Developing next-generation tools for collaborative research and development.</p>
            </div>
          </div>
        </article>
      </li>
    </ul>
    {% endCodePreview %}
  </div>

</div>
