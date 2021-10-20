<template>
  <div>
    <button @click="openModalTest">Open a modal</button>
    <button @click="openModalTest2">Open a modal 2</button>
  </div>
</template>

<script>
  export default {
    name: 'example',
    methods: {
      openModalTest(e) {
        this.$modals.open('backup', {
          returnFocusTo: e.target
        });
      },
      openModalTest2(e) {
        this.$modals.open('preferences', {
          returnFocusTo: e.target
        });
      }
    }
  }
</script>

<style lang="scss">
</style>