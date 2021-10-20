// =============================================================================
// Vue Modal Plugin
// =============================================================================
// 
// Version:         1.0.2
// 
// Changes:         - 1.0.1 | Added rootComponent for access to app root,  
//                            added ability to pass instance props
//                  - 1.0.2 | Added clickOutsideCloses to Modal class (and component close condition)
// 
// Description:     Vue plugin that will add accessible modal features. Will only
//                  support dialog modals (aria). Non-dialog modals will be handled
//                  separately since they won't display as modals usually.
// 
// Details:         - Exposes global <modal> component
//                  - Creates and mounts <modals> container component
//                  - Uses a separate Vue instance for the container
//                  - Can be configured to mount anywhere in DOM
//                  - Has accessibility features to return focus
//                  
// Todo:            - Workout how multiple modals would work
//                    - Challenge: There is only one component really
//                    - Challenge: Will need to store info for previous modal
//                    - Can we let the user manage this complexity?
//                  - Maybe consider switching to use vue-portal
//                    - https://portal-vue.linusb.org/guide/getting-started.html#multiple-portals-one-target
//                    
// Reference:
//                  https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html 
//                  https://www.w3.org/TR/wai-aria-practices/#dialog_modal   
//                  https://allyjs.io/tutorials/accessible-dialog.html
//                    - In this article they mention don't bank on keydown changing the focus only  
//                    - This article is the most accurate and complete             
//                  https://snipcart.com/blog/vue-js-plugin  
//                  
// Issues:          - maintain.tabFocus is removing the focus wring in chrome (not sure why)
//                    - Could have to do with how the browser doesn't add focus when the element 
//                      is focused because of a click?
//                                                  

// External
import maintain from 'ally.js/maintain/_maintain';
import when from 'ally.js/when/_when';
import query from 'ally.js/query/_query';

// Internal
import modalsComponent from "./components/Modals.vue";
import modalComponent from "./components/Modal.vue";

class Modals  {
  constructor(options) {
    // Pull out users array of modal configurations
    // - we will pass them through the constructor below
    // - No need for the original array
    const modals = options.modals;
    delete options.modals;

    this.modals = {};
    this.disabledHandler = null;
    this.tabHandler = null;
    this.escapeHandler = null;
    this.rootInstance = null; // User can pass the context of their app this way
    this.root = null;
    Object.assign(this, options);
    this.registerModals(modals);
  }
  /**
   *   Passes user modal configuration through the Modal class 
   *   and maps to an object/lookup table.
   *   @param  {array} array array of modal configurations
   */
  registerModals(array) {
    array.forEach((modal) => {
      this.modals[modal.name] = new Modal(modal);
    });
  }
  install(Vue, options) {

    const instanceProperties = options.instanceProperties || {};
    const self = this;

    // Install the global modals component
    Vue.component('modal', this.modalComponent);

    // Create a new Vue instance to add reactivity to the
    // data, which will allow the modal component to dynamically
    // switch components when the user open() a modal.
    // 
    // User adds modal components to an object, each key is a different modal
    // { ...options, component: vueComponent }
    // similar to how you use the router
    const root = new Vue({
      // Allow the user to add instance properties (like store)
      ...instanceProperties,
      render: createElement => createElement(modalsComponent),
      data: {
        modals:     self.modals,
        active:     null,
        activeKey:  null,
        rootInstance: null,
        returnFocusTo: null
      },
      methods: {
        /**
         *   Opens a Modal
         *   
         *   @param  {string}     key             Key the modal was stored in "modals" object
         *   @param  {object}     options         Object of options
         *   - @key  {Element}    closeTo         The element that should be focused when the user exits the modal
         *   - @key  {Function}   onOpenBefore    Callback before the modal is opened
         *   - @key  {Function}   onOpenAfter     Callback when the modal is opened
         *   - @key  {Function}   onCloseBefore   Callback before the modal is closed
         *   - @key  {Function}   onCloseAfter    Callback when the modal is closed
         *   @return {}                           Unused
         */
        open(key, { returnFocusTo }) {
          this.activeKey = key;
          this.active = this.modals[key];
          this.returnFocusTo = returnFocusTo || null;
        },
        close() {
          const { returnFocusTo, activeKey } = this;
          if (self.disabledHandler) {
            self.disabledHandler.disengage();
          }
          if (self.tabHandler) {
            self.tabHandler.disengage();
          }
          if (self.escapeHandler) {
            self.escapeHandler.disengage();
          }
          this.active = null;
          this.activeKey = null;
          switch (typeof returnFocusTo) {
            case "string":
              const element = document.querySelector(returnFocusTo);
              if (element) {
                element.focus();
              }
              break;
            case "object":
              if (returnFocusTo && returnFocusTo.focus) {
                returnFocusTo.focus();
              }
              break;
            case "function":
              returnFocusTo(activeKey);
              break;
          }
        }
      }
    });
    // Then we mount the vue instance to the Document
    // - Default we choose to add to end of body so that 
    //   the modals are always the top layer
    root.$mount(this.mountTo());
    // Listen to the modal component to send an event when it's
    // child has mounted > next tick (DOM ready)
    root.$on("modal-mount", () => {
      const context = root.$el;
      // Handlers
      this.disabledHandler = maintain.disabled({ filter: context });
      // this.tabHandler = maintain.tabFocus({ context: context });
      this.escapeHandler = when.key({ escape: root.close.bind(root) });
      // Focus the First
      let element = query.firstTabbable({
        context: context,
        defaultToContext: true,
      });
      // Check if there was a focusable element (if not use the labeledBy Element)
      if (!element) {
        element = context.querySelector('#' + root.active.labeledBy);
        // Make it focusable
        if (element && !element.hasAttribute('tabindex')) {
          element.setAttribute('tabindex', '-1');
        }
      }
      if (element) {
        element.focus();
      }
    });
    // Add a global property to all Vue Instances so they can interact with the 
    // modal root instance for things like open and close.
    Vue.prototype.$modals = this.root = root;
  }
  /**
   *   Change where the modals container is mounted in the document
   *   - User can define their own element in DOM to mount to returned to vm.$mount()
   *   @return {element} Return native DOM element
   */
  mountTo() {
    return document.body.appendChild(document.createElement('div'));
  }
  /**
   *   Allows the user to assign their app component to a property accessible in the modal components
   */
  setRootInstance(rootInstance) {
    this.root.rootInstance = rootInstance;
  }
}
// Defaults (on prototype)
Modals.prototype.modalComponent = modalComponent; // User can replace the modal template/component


class Modal {
  constructor(config) {
    Object.assign(this, config);
  }
}

// Defaults
Modal.prototype.labeledBy = "modal__label";
Modal.prototype.clickOutsideCloses = true;

export default Modals;