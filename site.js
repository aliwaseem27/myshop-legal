// Scroll-reveal for the landing page (index.html only).
// The hidden start state lives behind the `js` class that index.html sets in
// <head>, so a browser without JS — or one that fails to load this file —
// renders every section normally instead of a blank page.
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  function showAll() {
    for (var i = 0; i < items.length; i++) items[i].classList.add('in');
  }

  var reduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    showAll();
    return;
  }

  // Stagger siblings inside a [data-stagger] group so a grid fades in as a
  // wave rather than all at once. Capped so late cards never feel laggy.
  var groups = document.querySelectorAll('[data-stagger]');
  for (var g = 0; g < groups.length; g++) {
    var kids = groups[g].children;
    for (var k = 0; k < kids.length; k++) {
      kids[k].style.setProperty('--d', Math.min(k * 70, 420) / 1000 + 's');
    }
  }

  var io = new IntersectionObserver(
    function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('in');
          io.unobserve(entries[i].target); // one-way: never re-hide on scroll up
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );

  for (var n = 0; n < items.length; n++) io.observe(items[n]);
})();
