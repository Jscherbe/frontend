<template>
  <div class="SassdocItem">
  </div>
</template>

<script>
  export default {
    name: 'SassdocItem',
    inject: ["getSassdocItem"],
    props: {
      uid: {
        type: Object,
        required: true
      }
    },
    mounted() {
      console.log(this.getSassdocItem(this.uid));
    }
  }
</script>