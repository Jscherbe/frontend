export default function(
  number = "1", 
  hasImage = false,
  frontOnBack = false
) {
  const containerClass = hasImage ? 'flipcard flipcard--w-image' : 'flipcard';
  const frontContent = hasImage ? 
    `<span class="flipcard__front-image"><img src="/assets/placeholder/image-1.jpg" /></span>
    <span class="flipcard__front-content">
    <div>This is the front of flipcard ${ number }</div>
    <span class="flipcard__icon flipcard__icon--front" aria-hidden="true"></span>
    </span>` : 
    `<span class="flipcard__front-content">
    <div>This is the Title of flipcard ${ number }</div>
    <span class="flipcard__icon flipcard__icon--front" aria-hidden="true"></span>
    </span>`;
  const backContent = frontOnBack ? 
    `<div class="flipcard__back-front-content" aria-hidden="true">
      <div>This is the Title of flipcard ${ number }</div>
    </div>
    <div class="flipcard__back-content">
      This is the back
    </div>
    <span class="flipcard__icon flipcard__icon--back" aria-hidden="true"></span>` :
    `<div class="flipcard__back-content">
      <div>This is the back</div>
    </div>
    <span class="flipcard__icon flipcard__icon--back" aria-hidden="true"></span>`;

  return `<div class="${ containerClass }" data-ulu-flipcard>
    <h3 class="flipcard__front" data-ulu-flipcard-front>
      ${ frontContent }
    </h3>
    <div class="flipcard__back" data-ulu-flipcard-back>
      ${ backContent }
    </div>
    <div class="flipcard__icon-footer">
    <span class="flipcard__icon flipcard__icon--footer"  aria-hidden="true"></span>
    </div>
    </div>`;
  }