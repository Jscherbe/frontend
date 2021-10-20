<!-- 
  Version: 1.0.3

  Changes:
    - 1.0.1 | CSS Tweaks
    - 1.0.3 | Optional Click Outside Close
 -->
<template>
  <div class="modals" v-if="Boolean(this.$root.active)">
    <div class="modals__back-drop" @click.self.prevent="closeModals">
      <div 
        class="modals__modal" 
        id="modals__modal"
        role="dialog" 
        :aria-labelledby="labeledBy"
      >
        <component 
          v-if="this.$root.active" 
          :is="this.$root.active.component"
          @hook:mounted="modalMounted"
          @hook:destroyed="modalDestroy"
        />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modals',
    data() {
      return {
        pageScrollY: 0
      }
    },
    computed: {
      labeledBy() {
        return this.$root.active && this.$root.active.labeledBy;
      },
      // modalState() {
      //   return this.$root.active ? 'open' : 'closed'
      // }
    },
    methods: {
      modalMounted() {
        this.pageScrollY = window.pageYOffset || document.documentElement.scrollTop;
        window.addEventListener('scroll', this.disableScroll);
        this.$nextTick(() => {
          this.$root.$emit('modal-mount');
        });
      },
      modalDestroy() {
        window.removeEventListener('scroll', this.disableScroll);
        this.$nextTick(() => {
          this.$root.$emit('modal-destroy');
        });
      },
      closeModals() {
        if (this.$root.active.clickOutsideCloses) {
          this.$root.close();
        }
      },
      disableScroll() { 
        window.scrollTo(0, this.scrollTop); 
      }
    }
  }
</script>

<style lang="scss">
  .modals {
    box-sizing: border-box;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(black, 0.5);
    z-index: 1000;
    opacity: 1;
    display: flex;
    backdrop-filter: blur(4px);
  }
  .modals__back-drop {
    flex: 1 1;
    box-sizing: border-box;
    // padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modals__modal {
    // flex: 0 0;
    box-sizing: border-box;
    // background: white;
    position: relative;
    // max-height: 75%;
    // transform: translateY((25% / 2)); // Half of 10% left
    // border-radius: 10px;
    // overflow: auto;
    // box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.45);
  }
</style>