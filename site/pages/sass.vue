<template>
  <div class="">
    sass
  </div>
</template>

<script>
  export default {
    mounted() {
      console.log(this.$content);
    },
    async asyncData({ $content }) {
      const data = await $content("sassdocs").fetch();
      console.log(data.length);
      console.log(typeof data);
      console.log(Array.isArray( data));
      return { sass: data };
    }
  }
</script>