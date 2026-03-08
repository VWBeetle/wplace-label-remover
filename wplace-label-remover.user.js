// ==UserScript==
// @name         Wplace Label Remover
// @namespace    https://github.com/vwbeetle/wplace-label-remover
// @version      1.5.1
// @description  Removes map labels from wplace.live
// @downloadURL  https://raw.githubusercontent.com/vwbeetle/wplace-label-remover/main/wplace-label-remover.user.js
// @updateURL    https://raw.githubusercontent.com/vwbeetle/wplace-label-remover/main/wplace-label-remover.user.js
// @match        https://wplace.live/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
  const isStyle = x => x && Array.isArray(x.layers);

  const stripLabels = style => {
    if (!isStyle(style)) return style;

    style.layers = style.layers.filter(
      layer => layer?.type !== "symbol" || layer.layout?.["text-field"] === undefined
    );

    return style;
  };

  const isWplaceStyle = url => {
    try {
      const u = new URL(url, location.href);
      return u.hostname === "maps.wplace.live" && u.pathname.startsWith("/styles/");
    } catch {
      return false;
    }
  };

  const originalFetch = window.fetch;

  window.fetch = async (...args) => {
    const res = await originalFetch(...args);
    const url = args[0]?.url || args[0];

    if (!isWplaceStyle(url)) return res;

    try {
      const json = JSON.parse(await res.clone().text());
      if (!isStyle(json)) return res;

      return new Response(JSON.stringify(stripLabels(json)), {
        status: res.status,
        statusText: res.statusText,
        headers: res.headers
      });
    } catch {
      return res;
    }
  };
})();
