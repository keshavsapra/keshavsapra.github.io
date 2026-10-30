/* Keshav Sapra · pinned work portfolio */
(function () {
  "use strict";

  /* ---------- Scroll reveals (once, on enter) ---------- */
  var revealables = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });

    revealables.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Tagline: word by word activation ---------- */
  var tagline = document.getElementById("tagline");
  if (tagline) {
    var words = tagline.textContent.trim().split(/\s+/);
    tagline.innerHTML = words
      .map(function (w, i) {
        return '<span class="w" style="--i:' + i + '">' + w + "</span>";
      })
      .join(" ");

    var activate = function () {
      var spans = tagline.querySelectorAll(".w");
      spans.forEach(function (s) { s.classList.add("in"); });
      if (taglineObserver) taglineObserver.disconnect();
    };

    var taglineObserver = "IntersectionObserver" in window
      ? new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) { activate(); }
          });
        }, { rootMargin: "0px 0px -20% 0px" })
      : null;

    if (taglineObserver) {
      taglineObserver.observe(tagline);
    } else {
      activate();
    }
  }

  /* ---------- Mobile menu ---------- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");

  if (nav && toggle && links) {
    Array.prototype.forEach.call(links.children, function (item, i) {
      item.style.setProperty("--i", i);
    });

    var open = false;
    var setMenu = function (next) {
      open = next;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      links.classList.toggle("open", open);
      document.body.classList.toggle("menu-open", open);
    };

    toggle.addEventListener("click", function () { setMenu(!open); });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) { setMenu(false); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && open) { setMenu(false); }
    });
    window.matchMedia("(min-width: 821px)").addEventListener("change", function (e) {
      if (e.matches) { setMenu(false); }
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) { year.textContent = String(new Date().getFullYear()); }
})();
