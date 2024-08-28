export default function(
  title = "test title", 
  image = "/assets/placeholder/image-1.jpg"
) {
  return `
<li class="popover-overlay__item">
  <button 
    class="popover-overlay__toggle" 
    type="button" 
    data-ulu-popover-trigger
  >
    <img class="popover-overlay__toggle-image" src="${ image }">
    <span class="popover-overlay__toggle-content">
      <strong>${ title }</strong>
    </span>
  </button> 
  <div class="popover" data-ulu-popover-content>
    <div class="popover__inner">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam commodo felis nisi, nec pretium justo varius sit amet. Vestibulum vitae quam in velit scelerisque tincidunt et vitae mauris. Fusce aliquet, ipsum sit amet lacinia euismod, est risus rhoncus ligula, eget egestas urna ligula nec enim. Fusce vulputate ornare ligula ut tempus. Sed accumsan orci sed turpis iaculis
    </div>
    <span class="popover__arrow" data-ulu-popover-arrow></span>
  </div>   
</li> 
  `;
}