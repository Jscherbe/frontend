export default function(
  number = "1", 
  hasImage = false,
  frontOnBack = false,
  options = ''
) {
  const containerClass = hasImage ? `flipcard flipcard--animation flipcard--w-image ${ options }` : `flipcard ${ options }`;
  const frontContent = hasImage ? 
    `<span class="flipcard__front-image"><img src="/assets/placeholder/image-1.jpg" /></span>
    <span class="flipcard__front-content type-large type-bold">
    <div>This is the front of flipcard ${ number }</div>
    <div class="flipcard__icon-container">
      <span class="flipcard__icon css-icon css-icon--plus" aria-hidden="true"></span>
    </div>
    </span>` : 
    `<span class="flipcard__front-content type-large type-bold">
    <div>This is the Title of flipcard ${ number }</div>
    <div class="flipcard__icon-container">
      <span class="flipcard__icon css-icon css-icon--plus" aria-hidden="true"></span>
    </div>
    </span>`;
  const backContent = frontOnBack ? 
    `<div class="flipcard__back-front-content type-large type-bold margin-bottom-small" aria-hidden="true">
      <div>This is the Title of flipcard ${ number }</div>
    </div>
    <div class="flipcard__back-content">
      <div>Lorem ipsum odor amet, consectetuer adipiscing elit. Pharetra curabitur ultricies litora bibendum metus nunc a habitant? Pretium dictumst odio ultrices luctus risus sapien aptent. Malesuada conubia potenti tellus eget pulvinar, praesent faucibus pharetra mattis. Primis quis sollicitudin lacinia inceptos amet. Aliquam potenti mollis placerat fusce elit suspendisse placerat hendrerit. Dignissim cras in viverra nibh ante libero interdum porttitor dui. Adipiscing pretium penatibus ornare gravida faucibus nisi odio. Mus et mattis senectus ultricies eu.</div>
      <div class="flipcard__icon-container">
    <span class="flipcard__icon css-icon css-icon--minus" aria-hidden="true"></span>
    </div>
    </div>` :
    `<div class="flipcard__back-content">
      <div>Lorem ipsum odor amet, consectetuer adipiscing elit. Pharetra curabitur ultricies litora bibendum metus nunc a habitant? Pretium dictumst odio ultrices luctus risus sapien aptent. Malesuada conubia potenti tellus eget pulvinar, praesent faucibus pharetra mattis. Primis quis sollicitudin lacinia inceptos amet. Aliquam potenti mollis placerat fusce elit suspendisse placerat hendrerit. Dignissim cras in viverra nibh ante libero interdum porttitor dui. Adipiscing pretium penatibus ornare gravida faucibus nisi odio. Mus et mattis senectus ultricies eu.</div>
      <div class="flipcard__icon-container">
    <span class="flipcard__icon css-icon css-icon--minus" aria-hidden="true"></span>
    </div>
    </div>`;

  return `<div class="${ containerClass }" data-ulu-flipcard>
    <h3 class="flipcard__front" data-ulu-flipcard-front>
      ${ frontContent }
    </h3>
    <div class="flipcard__back type-small-x" data-ulu-flipcard-back>
      ${ backContent }
    </div>
    </div>`;
  }
  // <div class="flipcard__icon-footer">
  // <span class="flipcard__icon flipcard__icon--footer"  aria-hidden="true"></span>
  // </div>