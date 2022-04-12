<template>
  <div class="SassdocMixin">
    <p>{{ item.description }}</p>
  </div>
</template>

<script>
  export default {
    name: 'SassdocMixin',
    props: {
      item: Object
    },
    mounted() {
      console.log(this.item);
    }
  }
</script>