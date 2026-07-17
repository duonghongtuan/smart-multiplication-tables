(function () {
  var LANG_COOKIE = "preferred_lang";
  var LANG_KEY = "preferred_lang";

  function setYear() {
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  function setPreferredLang(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {}
    document.cookie =
      LANG_COOKIE +
      "=" +
      encodeURIComponent(lang) +
      "; path=/; max-age=31536000; SameSite=Lax";
  }

  function initLangSwitcher() {
    var links = document.querySelectorAll("[data-set-lang]");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function (event) {
        var lang = event.currentTarget.getAttribute("data-set-lang");
        if (lang === "en" || lang === "vi") setPreferredLang(lang);
      });
    }
  }

  function initNavHighlight() {
    var sectionIds = ["features", "screenshots", "download"];
    var links = Array.prototype.slice.call(
      document.querySelectorAll(".nav a[data-section]")
    );
    var linkBySection = {};
    for (var i = 0; i < links.length; i++) {
      linkBySection[links[i].getAttribute("data-section")] = links[i];
    }

    function setActive(sectionId) {
      for (var j = 0; j < sectionIds.length; j++) {
        var id = sectionIds[j];
        var link = linkBySection[id];
        if (!link) continue;
        if (id === sectionId) link.classList.add("active");
        else link.classList.remove("active");
      }
    }

    var initial = (location.hash || "").replace("#", "");
    if (sectionIds.indexOf(initial) !== -1) setActive(initial);

    if (!("IntersectionObserver" in window)) return;

    var ratios = {};
    var io = new IntersectionObserver(
      function (entries) {
        for (var k = 0; k < entries.length; k++) {
          var entry = entries[k];
          var id = entry.target.id;
          if (sectionIds.indexOf(id) === -1) continue;
          if (entry.isIntersecting) ratios[id] = entry.intersectionRatio;
          else delete ratios[id];
        }

        var bestId = null;
        var bestRatio = 0;
        for (var sid in ratios) {
          if (!Object.prototype.hasOwnProperty.call(ratios, sid)) continue;
          if (ratios[sid] > bestRatio) {
            bestRatio = ratios[sid];
            bestId = sid;
          }
        }
        if (bestId) setActive(bestId);
      },
      {
        root: null,
        threshold: [0, 0.2, 0.35, 0.5, 0.65],
        rootMargin: "-15% 0px -65% 0px",
      }
    );

    for (var n = 0; n < sectionIds.length; n++) {
      var el = document.getElementById(sectionIds[n]);
      if (el) io.observe(el);
    }
  }

  setYear();
  initLangSwitcher();
  initNavHighlight();
})();
