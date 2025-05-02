export default function(
  title,
  ...modifiers
) {
  let mainClass = "popover"
  modifiers.forEach((modifier) => {
    mainClass += ` popover--${ modifier }`
  })
  return `
  <button class="button" type="button" data-ulu-popover-trigger>
    <span>Show ${ title } Popover</span>
    <span class="button__icon">
      <span data-feather="fas fa-chevron-down"></span>
    </span>
  </button> 
  <div class="${ mainClass }" data-ulu-popover-content>
    <div class="popover__inner">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam commodo felis nisi, nec pretium justo varius sit amet. Vestibulum vitae quam in velit scelerisque tincidunt et vitae mauris. Fusce aliquet, ipsum sit amet lacinia euismod, est risus rhoncus ligula, eget egestas urna ligula nec enim. Fusce vulputate ornare ligula ut tempus. Sed accumsan orci sed turpis iaculis, at aliquam nibh rhoncus. Maecenas porta lorem a sem tincidunt, sed tristique ex laoreet. Nullam accumsan metus at lobortis interdum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam sagittis sem erat, quis fermentum lectus ultrices quis.
    </div>
    <div class="popover__footer">Popover Footer</div>
    <span class="popover__arrow" data-ulu-popover-arrow></span>
  </div>
  `;
}