<template>
  <div class="SassdocPlaceholder">
    <p>{{ item.description }}</p>
  </div>
</template>

<script>
  export default {
    name: 'SassdocPlaceholder',
    props: {
      item: Object
    },
    mounted() {
      console.log(this.item);
    }
  }
</script>