/*
 * Shared top bar (doc title + tabs).
 *
 * To add / rename / reorder a tab, edit the TABS list below — that's it.
 * Each page marks its active tab with <body data-page="...">.
 * Pages in sub-folders work automatically: paths are resolved from this script's location.
 */

const DOC_TITLE = "AI in Education Toolkit for Racial Equity";
const DOC_ICON = "assets/icons/toolbox.svg";
const ORIGINAL_DOC = "https://docs.superhuman.com/@edtechequity/edtech-ai-toolkit-for-racial-equity";

const TABS = [
  { id: "how-to-use", label: "How To Use", href: "how-to-use.html" },
  { id: "ideation",   label: "Ideation",   href: "ideation.html" },
];

// Site root, e.g. "../" for pages inside ideation/
const ROOT = document.currentScript.src.replace(/js\/nav\.js(\?.*)?$/, "");

const page = document.body.dataset.page;

/* ---------- Top bar ---------- */

(function renderTopbar() {
  const tabs = TABS.map((tab) => {
    const active = tab.id === page ? " active" : "";
    return `<a class="tab${active}" href="${ROOT}${tab.href}" title="${tab.label}"><span>${tab.label}</span></a>`;
  }).join("");

  document.getElementById("site-nav").outerHTML = `
    <header class="topbar">
      <a class="doc-title" href="${ROOT}index.html">
        <img src="${ROOT}${DOC_ICON}" alt="" width="20" height="20"><span>${DOC_TITLE}</span>
      </a>
      <nav class="tabs" aria-label="Pages">${tabs}</nav>
    </header>
  `;
})();

/* ---------- Left rail ---------- */

(function renderRail() {
  const slot = document.getElementById("page-actions");
  if (!slot) return;
  slot.replaceChildren();
})();
