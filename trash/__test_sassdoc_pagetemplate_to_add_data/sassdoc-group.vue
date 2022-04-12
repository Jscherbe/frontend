<template>
  <div class="sassdocgroup-layout">
    <ParentLayout>
      <template #page-top>
        <div class="theme-default-content">
          <h1>Test</h1>
          This is in here
        </div>
      </template>
    </ParentLayout>
  </div>
</template>

<script>
  import ParentLayout from '@theme/layouts/Layout.vue';
  export default {
    name: 'SassdocGroup',
    components: {
      ParentLayout
    },
    mounted() {
      console.log(this);
    }
  }
</script>