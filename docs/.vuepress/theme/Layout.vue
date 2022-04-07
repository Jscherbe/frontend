
<script>
  import ParentLayout from '@parent-theme/layouts/Layout.vue';
  import { resolvePage, resolveHeaders } from '@parent-theme/util/index.js';
  export default {
    name: "Layout",
    extends: ParentLayout,
    computed: {
      sidebarItems() {
        const { path } = this.$page;
        const { pages } = this.$site;
        const segments = path.split("/").filter(i => i !== "");
        // If child page build sidebar based on section
        const parentPath = `/${ segments[0] }/`;
        const parent = pages.find(page => page.path === parentPath);
        if (!parent) {
          return [];
        }
        // Find all pages with paths that match current section
        const children = pages
          .filter(page => page.path.startsWith(parentPath) && page !== parent)
          .sort((a,b) => {
            const getWeight = p => p.frontmatter.weight || p.frontmatter.order || 0;
            const getTitle = p => '' + p.title; // Force string
            // Sort by weight/order and if equal (ie. 0) fallback to alphbetical
            // or if order/weight not present = 0 fallback to alphabetical
              // isCurrent(a) ? -1 : isCurrent(b) ? 1 : 
            return  getWeight(a) - getWeight(b) || 
                    getTitle(a).localeCompare(getTitle(b));
          });
        // Create the sidebar group for section
        // - use resolvePage() from default-theme utilities (returns child config) 
        const childrenConfigs = children.map(c => {
          const config = resolvePage(this.$site.pages, c.path, path);
          // Add headers
          // if (config.path === path) {
          //   config.type = "group";
          //   config.collpasible = false;
          //   config.children = resolveHeaders(this.$page).children;
          // }
          return config;
        });
        console.log(childrenConfigs);
        return [
          {
            title: parent.title,
            path: parent.path,
            children: childrenConfigs,
            collapsable: false,
            sidebarDepth: 1,
            type: "group"
          }
        ];
      }
    }
  };
</script>