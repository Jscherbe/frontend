import { readFileSyncFromUrl } from "@ulu/utils/node/fs.js";

export default {
  demoConfig: {
    debug: false,
    template: readFileSyncFromUrl(import.meta.url, "card.live-demo.twig", "utf8"),
    fields: [
      {
        type: "fieldset",
        legend: "Elements Visible",
        children: [
          {
            type: "checkbox",
            name: "title",
            label: "Title",
            checked: true
          },
          {
            type: "checkbox",
            name: "body",
            label: "Body",
            checked: true
          },
          {
            type: "checkbox",
            name: "content",
            label: "Content",
            checked: true
          },
          {
            type: "checkbox",
            name: "aside",
            label: "Aside",
            checked: true
          },
          {
            type: "checkbox",
            name: "footer",
            label: "Footer",
            checked: true
          },
        ]
      },
      {
        type: "select",
        name: "action",
        label: "Action",
        tooltip: "Proxy click only works when title is present",
        options: [
          {
            value: "",
            text: "None"
          },
          {
            value: "link",
            text: "Card is Link"
          },
          {
            value: "proxy",
            text: "Proxy Click",
            selected: true
          }
        ]
      },
      {
        type: "select",
        name: "media",
        label: "Media",
        options: [
          {
            value: "icon",
            text: "Icon"
          },
          {
            value: "image",
            text: "Image"
          },
          {
            value: "imageFit",
            text: "Image (fit)"
          },
          {
            value: "none",
            text: "No Image"
          }
        ]
      },
      {
        type: "select",
        name: "layout",
        label: "Layout",
        tooltip: "Overlay is not compatible with 'Icon' and 'No Image' options",
        options: [
          {
            value: "",
            text: "Default"
          },
          {
            value: "horizontal",
            text: "Horizontal"
          },
          {
            value: "horizontalCenter",
            text: "Horizontal Center"
          },
          {
            value: "overlay",
            text: "Overlay"
          },
        ]
      },
    ]
  },
  
}