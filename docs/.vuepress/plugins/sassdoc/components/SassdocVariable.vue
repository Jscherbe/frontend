<template>
  <div class="SassdocVariable">
    <p>{{ item.description }} yes)</p>
  </div>
</template>

<script>
  export default {
    name: 'SassdocVariable',
    props: {
      item: Object
    },
    mounted() {
      console.log(this.item);
    }
  }
</script>