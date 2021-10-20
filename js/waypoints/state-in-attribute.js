import ElementWaypoint from "../element-waypoint";

export default function init(config) { 
  const defaults = {
    attr: 'data-site-waypoint', 
    options: { 
      offsetTop: '20%' 
    }
  }
  config = Object.assign(defaults, config);
  const elements = document.querySelectorAll(`[${ options.attr }]`);

  return [ ...elements ].map((element) => {

    const options = Object.assign(config.options, element.dataset.siteWaypoint);
    const setState = (active, direction) => {
      element.setAttribute(`${ attr }-state`, `active: ${ active }, direction: ${ direction }`);
    };

    setState(false, null);
    
    return new ElementWaypoint({
      ...options,
      element,
      handler(entering, direction) {
        setState(entering, direction);
      }
    });
  });
}


