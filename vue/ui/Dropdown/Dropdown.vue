<!-- 
Dependencies: 
- vue-click-outside (npm)
 -->
<template>
  <div 
    class="dropdown" 
    :class="{
      'dropdown--select-style' : selectStyle,
      'dropdown--select-style-inline' : selectStyleInline
    }" 
    :data-dropdown-state="currentState" 
    v-click-outside="hide"
  >
    <span 
      class="dropdown__toggle"
      id="toggleId"
      :data-dropdown-state="currentState"
      :aria-controls="contentId"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <span class="dropdown__toggle-content">
        <slot name="button" />
      </span>
      <span class="dropdown__toggle-icon" v-if="selectStyle">
        <i class="dropdown__toggle-icon-glyph fas fa-caret-down"></i>
      </span>
    </span>
    <div 
      class="dropdown__content" 
      :id="contentId"
      :data-dropdown-state="currentState"
      :data-dropdown-position-x="positionX"
      :data-dropdown-position-y="positionY"
      :aria-labeledby="toggleId"
      :aria-hidden="!isOpen"
      :style="{ width: contentWidth }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside';

  export default {
    name: 'dropdown',
    props: {
      positionX: {
        type: String,
        default: 'center'
      },
      positionY: {
        type: String,
        default: 'center'
      },
      selectStyle: {
        required: false,
        type: Boolean,
        default: false
      },
      selectStyleInline: {
        required: false,
        type: Boolean,
        default: false
      },
      contentWidth: {
        type: String,
        required: false,
        default: '200px'
      }
    },
    directives: {
      ClickOutside
    },
    data() {
      return {
        isOpen: false
      }
    },
    computed: {
      id() {
        return this._uid;
      },
      currentState() {
        return this.isOpen ? 'open' : 'closed';
      },
      toggleId() {
        return `dropown__toggle--id-${ this.id }`;
      },
      contentId() {
        return `dropown__content--id-${ this.id }`;
      }
    },
    methods: {
      toggle() {
        this.isOpen = !this.isOpen;
      },
      hide() {
        this.isOpen = false;
      }
    }
  }
</script>

<style lang="scss">
  $dropdown--border-radius: 6px !default;
  $dropdown--color: black !default;
  $dropdown--font-size: 1rem !default;
  .dropdown {
    position: relative;

    display: inline-block;
    &--select-style {
      padding: 0.35em 1em;
      background-color: white;
      border-radius: $dropdown--border-radius;
      color: $dropdown--color;
      margin: 0.5em 0;
      max-width: 15em;
      display: inline-block;
    }
    &--select-style-inline {
      background-color: transparent;
      font-size: $dropdown--font-size;
      color: inherit;
    }
    &__toggle {
      cursor: pointer;
      .dropdown--select-style & {
        display: flex;
        justify-content: space-between;
      }
      &-content {
        // display: block;
        // flex: 1 1;
      }
      &-icon {
        display: block;
        margin-left: 1em;
        .dropdown--select-style & {
          margin-left: 0.5em;
        }
      }
    }
    &__content {
      display: none;
      position: absolute;
      z-index: 2;
      top: 100%;
      margin-top: 0.3rem;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.4);
      border-radius: 6px;
      // overflow: auto;
      max-height: 300px;
      &[data-dropdown-position-x="center"] {
        left: 50%;
        transform: translateX(-50%);
      }
      &[data-dropdown-position-x="left"] {
        left: 0;
      }
      &[data-dropdown-position-x="right"] {
        right: 0;
      }
      &[data-dropdown-position-y="top"] {
        bottom: 100%;
        top: auto;
        margin-bottom: 0.3rem;
      }
      &[data-dropdown-state="open"] {
        display: block;
      }
    }

    // Contextually style certain global styles
    .button {
      margin: 0;
    }
  }
</style>