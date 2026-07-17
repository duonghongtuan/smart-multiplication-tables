/**
 * Client fallback when Edge Middleware is unavailable (local preview / non-Vercel).
 * Only runs on "/" and respects cookie/localStorage preferred_lang.
 */
(function () {
  var path = location.pathname.replace(/\/index\.html$/, "/");
  if (path !== "/" && path !== "") return;

  var preferred = null;
  try {
    preferred = localStorage.getItem("preferred_lang");
  } catch (e) {}

  if (!preferred) {
    var match = document.cookie.match(/(?:^|;\s*)preferred_lang=([^;]+)/);
    if (match) preferred = decodeURIComponent(match[1]);
  }

  if (preferred === "en") return;
  if (preferred === "vi") {
    location.replace("/vi/");
    return;
  }

  var lang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  if (lang.indexOf("vi") === 0) location.replace("/vi/");
})();
