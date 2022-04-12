<template>
  <div class="SassdocGroup">
    <!-- <template v-if="sassVariables.length">
      <h2>Variables</h2>
      <SassdocVariable v-for="item in sassVariables" :key="item._uid" :item="item"/>
    </template>
    <template v-if="sassMixins.length">
      <h2>Mixins</h2>
      <SassdocMixin v-for="item in sassMixins" :key="item._uid" :item="item"/>
    </template>
    <template v-if="sassFunctions.length">
      <h2>Functions</h2>
      <SassdocFunction v-for="item in sassFunctions" :key="item._uid" :item="item"/>
    </template>
    <template v-if="sassPlaceholders.length">
      <h2>Placeholders</h2>
      <SassdocPlaceholder v-for="item in sassPlaceholders" :key="item._uid" :item="item"/>
    </template> -->
  </div>
</template>

<script>
  import SassdocVariable from "./SassdocVariable.vue";
  import SassdocMixin from "./SassdocMixin.vue";
  import SassdocFunction from "./SassdocFunction.vue";
  import SassdocPlaceholder from "./SassdocPlaceholder.vue";
  export default {
    name: 'SassdocGroup',
    components: {
      SassdocVariable,
      SassdocMixin,
      SassdocFunction,
      SassdocPlaceholder
    },
    // computed: {
    //   sassVariables() {
    //     return this.itemsByType("variable");
    //   },
    //   sassMixins() {
    //     return this.itemsByType("mixin");
    //   },
    //   sassFunctions() {
    //     return this.itemsByType("function");
    //   },
    //   sassPlaceholders() {
    //     return this.itemsByType("placeholder");
    //   }
    // },
    // methods: {
    //   itemsByType(type) {
    //     return this.$page.sassdocItems.filter(item => item.context.type === type);
    //   }
    // },
    mounted() {
      console.log(this);
      console.log(this.$page.sassdocGroup);
      // console.log(this.$page.sassdocItems.map(i => i._uid));
    }
  }
</script>

<style lang="stylus">
  // Writing styles in stylus because that's what works with vuepress
  // that way if in used a module for pre-existing sass based project
  // won't have to worry about dependency issues 

</style>