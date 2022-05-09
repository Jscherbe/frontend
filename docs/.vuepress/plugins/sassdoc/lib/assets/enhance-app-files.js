/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */
import "./styles.styl";
import SassdocPreview from "./components/SassdocPreview.vue";
import SassdocDetails from "./components/SassdocDetails.vue";
// Register global plugins
export default ({ Vue }) => {
  Vue.component("SassdocPreview", SassdocPreview);
  Vue.component("SassdocDetails", SassdocDetails)
}
