<template functional>
  <details class="SassdocDetails">
    <summary v-if="props.summary">
      {{ props.summary }}
    </summary>
    <div class="SassdocDetails__content">
      <slot/>
    </div>
  </details>
</template>

<script>
  export default {
    name: 'SassdocDetails',
    props: {
      summary: String
    }
  }
</script>

<style lang="css">
  .SassdocDetails {
    font-size: 0.9em;
    padding: 0.5em;
    margin: 0.75em 0px;
    color: #414141;
    border: none;
    background-color: #f6f6f6;
    border-radius: 3px;
  }
  .SassdocDetails > summary {
    cursor: pointer;
  }
  .SassdocDetails > summary:hover,
  .SassdocDetails > summary:hover::marker {
    color: black;
  }
  .SassdocDetails > summary::marker {
    color: #a8a8a8;
    font-size: 0.95em;
  }
</style>