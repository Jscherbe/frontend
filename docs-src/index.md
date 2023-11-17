---
home: true
# heroImage: https://v1.vuepress.vuejs.org/hero.png
tagline: Modular SCSS theming library. Whose modules can be used to create stylesheet or individually.
# actionText: Quick Start →
# actionLink: /guide/
# features:
# - title: Feature 1 Title
#   details: Feature 1 Description
# - title: Feature 2 Title
#   details: Feature 2 Description
# - title: Feature 3 Title
#   details: Feature 3 Description
# footer: Joe Scherben
---

{{ content }}

<script setup>
  import { ref } from "vue";
  import { data } from '../sassdoc.data.js';
  const content = ref(data.content);
</script>




