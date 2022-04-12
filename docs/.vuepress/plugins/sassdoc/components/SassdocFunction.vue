<template>
  <div class="SassdocFunction">
    <p>{{ item.description }}</p>
  </div>
</template>

<script>
  export default {
    name: 'SassdocFunction',
    props: {
      item: Object
    },
    mounted() {
      console.log(this.item);
    }
  }
</script>