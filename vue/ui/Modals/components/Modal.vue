<template>
  <!-- Note: The top level is used for click outside -->
  <div class="modal">
    <div class="modal__panel">
      <div class="modal__header" id="modal__label">
        <span 
          v-if="icon" 
          class="modal__icon" 
          :data-icon-name="icon" 
          aria-hidden="true"
        ></span>
        <!-- Optionally use the title (pre-templated with prop) or pass markup using slot -->
        <span 
          class="modal__title" 
          v-if="title && title.length" key="title"
        >
          {{ title }}
        </span>
        <span 
          class="modal__title" 
          v-else key="title-slotted"
        >
          <slot name="title"></slot>
        </span>
      </div>
      <div class="modal__body">
        <!-- Default Slot -->
        <slot></slot>
      </div>
      <div class="modal__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'modal',
    props: {
      title: String,
      icon: String
    },
  }
</script>

<style lang="scss">
</style>