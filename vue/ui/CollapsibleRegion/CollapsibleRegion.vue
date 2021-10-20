<!-- 
  Reference:
  - transitioning from auto: https://codepen.io/brundolf/pen/dvoGyw?editors=0010
-->
<template>
  <div 
    class="CollapsibleRegion"
    @keydown.esc="handleEscape"
    :class="{ 
      'CollapsibleRegion--open' : isOpen,
      'CollapsibleRegion--closed' : !isOpen,
      'CollapsibleRegion--transitioning' : isTransitioning
    }"
  >
    <button 
      class="CollapsibleRegion__toggle"
      :id="toggleId"
      :aria-controls="contentId" 
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <slot name="toggle" :isOpen="isOpen" />
    </button>
    <div 
      class="CollapsibleRegion__content"
      tabindex="-1"
      ref="content"
      :id="contentId"
      :aria-hidden="!isOpen"
      :aria-labelledby="toggleId"
      :style="contentStyles"
      v-show="!isHidden"
    >
      <!-- 
      Using inner container to allow no styles on content container
      as they interfere with getting accurate measurements of the content
      when it's hidden (scrollHeight) 
      -->
      <div class="CollapsibleRegion__content-inner">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
  
  let uid = 0;

  export default {
    name: 'CollapsibleRegion',
    props: {
      closeOnEscape: Boolean,
      /**
       * When the component is shown it should start visible or hidden
       */
      startOpen: Boolean,
      /**
       * Whether or not to transition the show and hide
       */          
      transitionHeight: Boolean,
      /**
       * Transition should fade as it expands
       */         
      transitionFades: Boolean,
      /**
       * Transition Timing Function
       */
      transitionTiming: {
        type: String,
        default: 'ease-out'
      },
      /**
       * Transition Duration (css duration string), use comma seperation if different for opacity (fade).
       * Note: This is used to calculate a fallback timer if transitions fail
       */      
      transitionDuration: {
        type: String,
        default: '400ms',
        validator(value) {
          // Make sure that it's a valid css duration (ms|s)
          return value.includes('s')
        }
      },
    },
    data() {
      const isOpen = this.startOpen;
      // Calculate the duration needed for the fallback, 
      // adding 500 to allow padding for delays in transitioning
      const transitionTimeout = Math.ceil(
        this.getUnitlessDuration(this.transitionDuration) + 500
      );
      // Note (isOpen vs isHidden): 'isOpen' is the actaul state of the content, 
      // and 'isHidden' is just used for display none
      return {
        isOpen,               
        toggleId:             this.getUid(),
        contentId:            this.getUid(),
        contentHeight:        isOpen ? 'auto' : '0px',
        contentOpacity:       this.transitionFades && !isOpen ? 0 : 1,
        transitionsDisabled:  false,
        transitionTimeout:    Math.ceil(this.getUnitlessDuration(this.transitionDuration) + 500),
        isTransitioning:      false,
        isHidden:             isOpen ? false : true,
        onCleanupTransition:  null, // Transitions add function here used if needing to cancel 
      };

    },
    computed: {
      contentStyles() {
        if (this.transitionHeight) {
          return { 
            overflow:           'hidden',
            height:             this.contentHeight,
            transitionDuration: this.transitionDuration,
            transitionTiming:   this.transitionTiming,
            opacity:            this.contentOpacity,
            transitionProperty: this.transitionsDisabled ? "none" : `height${ this.transitionFades ? ",opacity" : "" }`
          };
        }
        return {};
      }
    },
    methods: {
      
      /**
       * Function used to toggle the collapsible 
       */
      toggle() {
        console.log('Toggle Click', this.isOpen);
        if (this.isOpen && !this.isTransitioning) {
          this.close();
        } else {
          this.open();
        }
      },
      handleEscape() {
        if (this.closeOnEscape && this.isOpen) {
          this.close();
        }
      },
      removeTransition(canceled) {
        if (this.onCleanupTransition) this.onCleanupTransition();
        this.isTransitioning = false;
        this.onCleanupTransition = null;
      },
      /**
       * Function that will handle setting the styles in a way that allows for
       * transitioning from display: none to height: auto. With optional fade.
       */
      open() {
        // If there are no animations
        if (!this.transitionHeight) {
          this.isOpen = true;
          this.isHidden = false;
          return;
        }

        this.removeTransition(true);

        let tid;
        const element = this.$refs.content;
        // When finished clear the fallback and set the height to auto
        // incase something else on the page changes this elements layout/height,
        // remove the one time listener, and call the ending callback 
        // and user callbacks
        const complete = () => {
          this.contentHeight = 'auto';
          this.isOpen = true;
          this.removeTransition();
          this.$emit('collapsible-opened');
        };
        this.onCleanupTransition = () => {
          clearTimeout(tid);
          element.removeEventListener('transitionend', complete);
        };
        // Listen for the end of the transition we are about to trigger on 
        element.addEventListener('transitionend', complete);
        this.isHidden = false;
        this.isTransitioning = true;
        this.$emit('collapsible-opening');
        // Waiting for vue to update the elements style.display from none
        // so we can measure it's hidden height, set it statically,
        // to then trigger the transition to that static height
        this.$nextTick(() => {
          this.contentHeight = element.scrollHeight + 'px';
          if (this.transitionFades) this.contentOpacity = 1;
          // Setting a fallback incase anything interupts the browsers 
          // ability to fire the 'transitionend' event, the element will 
          // still be functional
          tid = setTimeout(complete, this.transitionTimeout);
        });
      },
      /**
       * Function that will handle setting the styles in a way that allows for
       * transitioning from height: auto to display: none
       */      
      close() {
        // If there are no animations
        if (!this.transitionHeight) {
          this.isOpen = false;
          this.isHidden = true;
          return;
        }

        this.removeTransition(true);

        let tid;
        // Measure the elements height, to set it from auto  
        // to static so that we can transtion it
        const element = this.$refs.content;
        const height = element.scrollHeight;
        // Set the elements height to a static value so we can transition it
        // then on next tick when that value is set, start the transition
        const setup = () => {
          element.addEventListener('transitionend', complete);
          this.contentHeight = height + 'px';
          this.$nextTick(init);
        };
        // Enable transitions and then on next update start it
        // by setting the height to 0
        const init = () => {
          this.transitionsDisabled = false;
          this.$nextTick(() => {
            requestAnimationFrame(transition);
          });
        };
        const transition = () => {
          this.contentHeight = '0px';
          if (this.transitionFades) this.contentOpacity = 0;
        };
        const complete = () => {
          this.isOpen = false;
          this.isHidden = true;
          this.removeTransition();
          this.$emit('collapsible-closed');
        };
        const fallback = () => {
          transition();
          complete();
        };
        this.onCleanupTransition = () => {
          clearTimeout(tid);
          element.removeEventListener('transitionend', complete);
        };
        // Temporarily disable the transitions on the element,
        // on next tick when transistions are disabled (removing transiton-property) 
        // attach the fallback and setup the transition
        this.transitionsDisabled = true;
        this.isTransitioning = true;
        this.$emit('collapsible-closing');
        this.$nextTick(() => {
          requestAnimationFrame(setup);
          tid = setTimeout(fallback, this.transitionTimeout);
        });
      },
      /**
       * Returns unitless duration
       * @param {String} duration - Css duration string
       */
      getUnitlessDuration(value) {
        // Grab only first value in string
        let duration = parseFloat( value.split(',')[0] );
        // If not milliseconds we need to convert assumed if 
        // not milliseconds it's seconds (only other valid duration)
        return value.includes('ms') ? duration : duration * 1000;
      },
      /**
       * Recursive function to generate and test id uniqueness
       */
      getUid() {
        const id = `Ulu-C-${ ++uid }`;
        return document.getElementById(id) ? this.getUid() : id;
      }
    },
  }
</script>