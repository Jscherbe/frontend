<template>
  <div class="SassdocItem">
    <p>{{ item.description }}</p>
  </div>
</template>

<script>
  export default {
    name: 'SassdocItem',
    props: {
      item: Object
    },
    mounted() {
      console.log(this.item);
    }
  }
</script>