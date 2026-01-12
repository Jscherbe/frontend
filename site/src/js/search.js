// const { algoliasearch, instantsearch } = window;
import algoliasearch from "algoliasearch/lite";
import instantsearch from "instantsearch.js/dist/instantsearch.production.min";

const container = document.querySelector(".site-search");

if (container) {
  console.log("init");
  init();
}

function init() {
  // FYI: App ID & API key are public (ok to expose)
  const searchClient = algoliasearch(
    "3PP8YC3MQX",
    "ab9e8106a1317eb9a3da408229b70590"
  );

  const search = instantsearch({
    indexName: "ulu_frontend",
    searchClient,
    future: { preserveSharedStateOnUnmount: true },
  });

  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: "#search-form",
    }),
    instantsearch.widgets.hits({
      container: "#search-results",
      templates: {
        item: (hit, { html, components }) => html`
          <article>
            <div>
              <h1>${ components.Highlight({ hit, attribute: "name" }) }</h1>
            </div>
          </article>
        `,
      },
    }),
    instantsearch.widgets.configure({
      hitsPerPage: 8,
    }),
    instantsearch.widgets.pagination({
      container: "#search-pagination",
    }),
  ]);

  search.start();
}