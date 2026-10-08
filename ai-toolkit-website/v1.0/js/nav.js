/*
 * Shared top bar (doc title + tabs + Copy doc) and the left action rail (like / Share / More).
 *
 * To add / rename / reorder a tab, edit the TABS list below — that's it.
 * Each page marks its active tab with <body data-page="...">.
 * Pages in sub-folders work automatically: paths are resolved from this script's location.
 */

const DOC_TITLE = "AI in Education Toolkit for Racial Equity";
const DOC_ICON = "assets/icons/toolbox.svg";
const ORIGINAL_DOC = "https://docs.superhuman.com/@edtechequity/edtech-ai-toolkit-for-racial-equity";

const TABS = [
  {
    id: "home",
    label: "AI in Education Toolkit for Racial Equity: How to mitigate racial bias in the design and development of your products",
    href: "index.html",
  },
  { id: "how-to-use", label: "How To Use", href: "how-to-use.html" },
  { id: "ideation",   label: "Ideation",   href: "ideation.html" },
];

// Page URLs to share when the site is opened from disk (file://), where the local URL can't be shared.
const SHARE_FALLBACK = {
  "home":       ORIGINAL_DOC,
  "how-to-use": ORIGINAL_DOC + "/how-to-use-41",
  "ideation":   ORIGINAL_DOC + "/ideation-16",
  "ai-vs-ml":   ORIGINAL_DOC + "/ai-vs-ml-34",
};

const BASE_LIKES = 3;               // like count shown before you like the doc
const LIKE_KEY = "aiToolkit.liked"; // saved in localStorage so every page shows the same count

// Site root, e.g. "../" for pages inside ideation/
const ROOT = document.currentScript.src.replace(/js\/nav\.js(\?.*)?$/, "");

// Icons copied from the original doc
const ICONS = {
  like: '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M9.75 1.5a2.75 2.75 0 0 1 2.75 2.75V6.5h4.249a2.75 2.75 0 0 1 2.66 3.45l-1.448 5.5a2.75 2.75 0 0 1-2.66 2.05H2v-11h4.165l1.25-5zM3.5 16H6V8H3.5zm4-8.658V16h7.802a1.25 1.25 0 0 0 1.209-.932l1.447-5.5A1.25 1.25 0 0 0 16.749 8H11V4.25C11 3.56 10.44 3 9.75 3H8.585z"/></svg>',
  liked: '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M4.75 6.5v11H2v-11zM7.403 1.5H9.75c.792 0 1.41.34 1.792.925.35.535.458 1.204.458 1.825V6.5h4.749a2.75 2.75 0 0 1 2.66 3.45l-1.448 5.5a2.75 2.75 0 0 1-2.66 2.05H6.25v-11h-.002z"/></svg>',
  share: '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M19 18.5H1V17h18zM17.34 5.66a2.25 2.25 0 0 1 0 3.18l-3.31 3.311-1.06-1.06L16.06 8h-4.61c-1.516 0-2.594 0-3.426.09-.817.09-1.308.258-1.684.531a3.3 3.3 0 0 0-.719.719c-.273.376-.442.867-.53 1.684C5 11.856 5 12.934 5 14.45V15H3.5v-.55c0-1.483-.001-2.656.1-3.587.102-.945.317-1.73.807-2.405a4.8 4.8 0 0 1 1.051-1.05c.675-.491 1.46-.706 2.405-.808.931-.101 2.104-.1 3.587-.1h4.61l-3.09-3.09 1.06-1.061z"/></svg>',
  more: '<svg width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M10 14a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3"/></svg>',
  link: '<svg viewBox="0 0 20 20"><path fill="currentColor" d="M8.5 6.5h-3c-.24 0-.334 0-.41.004A3.25 3.25 0 0 0 2.005 9.59 10 10 0 0 0 2 10c0 .24 0 .334.004.41a3.25 3.25 0 0 0 3.087 3.086c.075.004.168.004.409.004h3V15h-3c-.223 0-.362 0-.483-.006a4.75 4.75 0 0 1-4.511-4.51C.5 10.361.5 10.223.5 10s0-.362.006-.483a4.75 4.75 0 0 1 4.51-4.511C5.139 5 5.277 5 5.5 5h3zM14.983 5.006a4.75 4.75 0 0 1 4.511 4.51c.006.122.006.26.006.484s0 .362-.006.483a4.75 4.75 0 0 1-4.51 4.511c-.122.006-.26.006-.484.006h-3v-1.5h3c.24 0 .334 0 .41-.004a3.25 3.25 0 0 0 3.086-3.087A10 10 0 0 0 18 10c0-.24 0-.334-.004-.41a3.25 3.25 0 0 0-3.087-3.086A10 10 0 0 0 14.5 6.5h-3V5h3c.223 0 .362 0 .483.006"/><path fill="currentColor" d="M14.5 10.75h-9v-1.5h9z"/></svg>',
  flag: '<svg class="icon-20" viewBox="0 0 20 20"><path fill="currentColor" d="m19.03 3.78-4.47 4.47 4.47 4.47L18.5 14H4v4.5H2.5v-16h16zM4 12.5h12.69l-4.25-4.25L16.69 4H4z"/></svg>',
};

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
      <a class="copy-doc" href="${ORIGINAL_DOC}" target="_blank" rel="noopener">Copy doc</a>
    </header>
  `;
})();

/* ---------- Left rail ---------- */

(function renderRail() {
  const slot = document.getElementById("page-actions");
  if (!slot) return;

  slot.outerHTML = `
    <div class="page-actions${page === "home" ? " hidden" : ""}">
      <div class="rail-item">
        <button class="rail-button" type="button" data-action="like" aria-pressed="false">
          <span class="like-icon">${ICONS.like}</span><span class="like-count">${BASE_LIKES}</span>
        </button>
      </div>
      <div class="rail-item">
        <button class="rail-button" type="button" data-action="share" aria-haspopup="true" aria-expanded="false">${ICONS.share}<span>Share</span></button>
        <div class="menu share-menu" role="menu" hidden>
          <button class="menu-item" type="button" role="menuitem" data-share="x"><img src="${ROOT}assets/icons/share-x.svg" alt="">X</button>
          <button class="menu-item" type="button" role="menuitem" data-share="facebook"><img src="${ROOT}assets/icons/share-facebook.svg" alt="">Facebook</button>
          <button class="menu-item" type="button" role="menuitem" data-share="linkedin"><img src="${ROOT}assets/icons/share-linkedin.svg" alt="">LinkedIn</button>
          <button class="menu-item" type="button" role="menuitem" data-share="copy">${ICONS.link}Copy link</button>
        </div>
      </div>
      <div class="rail-item">
        <button class="rail-button" type="button" data-action="more" aria-haspopup="true" aria-expanded="false">${ICONS.more}<span>More</span></button>
        <div class="menu" role="menu" hidden>
          <a class="menu-item" role="menuitem" href="#" data-report>${ICONS.flag}Report</a>
        </div>
      </div>
    </div>
  `;

  const rail = document.querySelector(".page-actions");
  const title = document.querySelector(".page-title");
  const topbar = document.querySelector(".topbar");

  // Like: one like shared by every page, saved in localStorage
  const readLiked = () => { try { return localStorage.getItem(LIKE_KEY) === "1"; } catch (e) { return false; } };
  const writeLiked = (v) => { try { localStorage.setItem(LIKE_KEY, v ? "1" : "0"); } catch (e) {} };
  const likeButton = rail.querySelector('[data-action="like"]');
  const renderLike = () => {
    const liked = readLiked();
    likeButton.querySelector(".like-icon").innerHTML = liked ? ICONS.liked : ICONS.like;
    likeButton.querySelector(".like-count").textContent = BASE_LIKES + (liked ? 1 : 0);
    likeButton.setAttribute("aria-pressed", String(liked));
  };
  likeButton.addEventListener("click", () => { writeLiked(!readLiked()); renderLike(); });
  window.addEventListener("storage", (e) => { if (e.key === LIKE_KEY) renderLike(); });
  window.addEventListener("pageshow", renderLike); // refresh when coming back with the Back button
  renderLike();

  // Share / More menus
  const closeMenus = () => rail.querySelectorAll(".menu").forEach((m) => {
    m.hidden = true;
    m.previousElementSibling.setAttribute("aria-expanded", "false");
  });
  rail.querySelectorAll('[aria-haspopup="true"]').forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const menu = button.nextElementSibling;
      const open = menu.hidden;
      closeMenus();
      menu.hidden = !open;
      button.setAttribute("aria-expanded", String(open));
    });
  });
  document.addEventListener("click", (e) => { if (!e.target.closest(".menu")) closeMenus(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenus(); });

  const shareUrl = () => (location.protocol === "file:" ? SHARE_FALLBACK[page] || ORIGINAL_DOC : location.href.split("#")[0]);
  const SHARE_TARGETS = {
    x: (u) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}`,
    facebook: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
    linkedin: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}`,
  };
  rail.querySelectorAll("[data-share]").forEach((item) => {
    item.addEventListener("click", () => {
      const target = item.dataset.share;
      closeMenus();
      if (target === "copy") copyLink(shareUrl());
      else window.open(SHARE_TARGETS[target](shareUrl()), "_blank", "noopener,width=600,height=600");
    });
  });

  // Report: link not wired up yet
  rail.querySelector("[data-report]").addEventListener("click", (e) => { e.preventDefault(); closeMenus(); });

  // Position: follows the title until it reaches 200px from the top, then stays there.
  // Home page: fades in once the title has scrolled under the top bar.
  const RAIL_TOP = 200;
  const TITLE_OFFSET = 91;
  const update = () => {
    const t = title.getBoundingClientRect();
    rail.style.top = Math.max(RAIL_TOP, t.top + TITLE_OFFSET) + "px";
    if (page === "home") {
      const show = t.bottom <= topbar.getBoundingClientRect().bottom;
      rail.classList.toggle("hidden", !show);
      if (!show) closeMenus();
    }
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

function copyLink(url) {
  const done = () => showToast("Link copied to clipboard");
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(url).then(done, () => fallbackCopy(url, done));
  } else {
    fallbackCopy(url, done);
  }
}

function fallbackCopy(text, done) {
  const field = document.createElement("textarea");
  field.value = text;
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  try { document.execCommand("copy"); done(); } catch (e) {}
  field.remove();
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2000);
}
