import { createTree, toDefaultTheme } from "@ulu/vitepress-auto-menus";
import { resolve } from "path";

/**
 * Modifies the generated nav and sidebar
 * - Changes SCSS to dropdown
 * - Adds sidebars for each section with links to other sections below
 */
export default function createMenus() {
  const pages = createTree({ source: resolve(__dirname, "../") });
  const { nav, sidebar } = toDefaultTheme(pages);
  // console.log(nav);
  const sassPath = "/scss/";
  const sections = sidebar[sassPath][0].items;
  const itemNoChildren = ({ text, link }) => ({ text, link });
  const navIndex = nav.findIndex(item => item.link.includes(sassPath));

  if (navIndex === -1 || !sections?.length) {
    throw Error("Missing sass items in nav/sidebar, unable to setup menu");
  }

  // Modify the nav
  // - Remove old item and replace with dropdown version
  nav.splice(navIndex, 1, {
    text: 'SCSS',
    items: [
      {
        text: 'SCSS',
        items: sections.map(itemNoChildren)
      }
    ]
  });
  
  // Modify the sidebar
  // - Pull out scss section and make separate sidebar configs for each
  //   since we will display them in a dropdown menu (the sections)
  // - We also add the other sections 
  delete sidebar[sassPath];
  sections.forEach(current => {
    // Map from section so they retain the same order as dropdown
    sidebar[current.link] = [
      current,
      ...sections.filter(other => other !== current).map(itemNoChildren)
    ];
  });

  return { nav, sidebar };
}