<template>
  <div id="app">
    <h1>Vue Collapsibles</h1>
    <h2>Without Transitions (closes on escape)</h2>
    <CollapsibleRegion close-on-escape>
      <template #toggle="{ isOpen }">
        Click Me {{ isOpen }}
      </template>
      This is the hidden content
    </CollapsibleRegion>
    <h3>Start Visible</h3>
    <CollapsibleRegion start-open>
      <template #toggle>
        Click Me
      </template>
      This is the hidden content
    </CollapsibleRegion>
    <h2>With Transitions</h2>
    <CollapsibleRegion 
      transition-height 
      transition-fades 
      transition-duration="200ms"
    >
      <template #toggle>
        Click Me
      </template>
      <p>
        {{ placeholder }}
      </p>
      <p>
        {{ placeholder }}
      </p>
    </CollapsibleRegion>
    <CollapsibleRegion 
      transition-height 
      transition-fades 
      transition-duration="200ms"
    >
      <template #toggle>
        Click Me
      </template>
      <p>
        {{ placeholder }}
      </p>
      <p>
        {{ placeholder }}
      </p>
    </CollapsibleRegion>
  </div>
</template>

<script>
import CollapsibleRegion from '@/CollapsibleRegion.vue';
// import placeholder from "@/assets/text-placeholder.js";
export default {
  name: 'App',
  components: {
    CollapsibleRegion
  },
  data() {
    return {
      placeholder: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque quam eget dui fringilla, non fringilla mi eleifend. Vivamus non ex urna. Pellentesque lacinia tortor id dapibus volutpat. Morbi et ante non tortor eleifend dapibus. Ut vitae pulvinar sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam sollicitudin, ante sed venenatis vestibulum, est elit dapibus ex, sed vulputate leo ante et ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam consequat imperdiet ligula facilisis gravida."
    }
  }
}
</script>

<style lang="scss">
body, html {
  padding: 0;
  margin: 0;
  background-color: rgb(23, 22, 27);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  color: rgba(255, 255, 255, 0.795);
}
.CollapsibleRegion {
  margin: 3em;
}
  // background-color: rgb(224, 226, 226);
.CollapsibleRegion__toggle {
  padding: 1em 3em;
  // outline: none;
  border: none;
  background-color: rgb(29, 103, 199);
  
  width: 100%;
  font-weight: bold;
}
.CollapsibleRegion__content-inner {
  padding: 3em;
  background-color: rgb(39, 36, 49);
}

</style>
