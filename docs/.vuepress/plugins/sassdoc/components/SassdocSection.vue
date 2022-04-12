<template>
  <div class="SassdocSection">
    
  </div>
</template>

<script>
  export default {
    name: 'SassdocSection',
    props: {
      items: {
        type: Array,
        required: true
      },
      itemType: {
        type: String,
        required: true
      }
    },
    // mounted() {
    //   console.log(this);
    // }
  }
</script>