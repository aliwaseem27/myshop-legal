// Page behaviour for the MyShop Manager site. Every feature here
// is an enhancement: the hidden/collapsed start states are scoped
// to the `js` class set in each page's <head>, so a browser
// without JS (or one that fails to load this file) still shows
// all content.
(function () {
  var reduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Scroll reveal ────────────────────────────────────────
  function reveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    function showAll() {
      for (var i = 0; i < items.length; i++) items[i].classList.add('in');
    }

    if (reduced || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    // Stagger siblings inside a [data-stagger] group so a grid
    // fades in as a wave. Capped so late cards never lag.
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
            io.unobserve(entries[i].target); // one-way: never re-hide
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    for (var n = 0; n < items.length; n++) io.observe(items[n]);
  }

  // ── Tabs (Screens page) ──────────────────────────────────
  // <div class="tabs" role="tablist"> holds buttons whose
  // aria-controls name sibling .panel elements.
  function tabs() {
    var lists = document.querySelectorAll('.tabs[role="tablist"]');
    for (var l = 0; l < lists.length; l++) {
      (function (list) {
        var btns = list.querySelectorAll('[role="tab"]');

        function select(index, focus) {
          for (var i = 0; i < btns.length; i++) {
            var on = i === index;
            btns[i].setAttribute('aria-selected', on ? 'true' : 'false');
            btns[i].tabIndex = on ? 0 : -1;
            var panel = document.getElementById(btns[i].getAttribute('aria-controls'));
            if (panel) panel.hidden = !on;
          }
          if (focus) btns[index].focus();
        }

        for (var b = 0; b < btns.length; b++) {
          (function (i) {
            btns[i].addEventListener('click', function () {
              select(i, false);
            });
            btns[i].addEventListener('keydown', function (e) {
              // Arrow keys follow reading direction.
              var rtl = document.documentElement.dir === 'rtl';
              var next = rtl ? 'ArrowLeft' : 'ArrowRight';
              var prev = rtl ? 'ArrowRight' : 'ArrowLeft';
              if (e.key === next) select((i + 1) % btns.length, true);
              else if (e.key === prev) select((i - 1 + btns.length) % btns.length, true);
              else return;
              e.preventDefault();
            });
          })(b);
        }

        select(0, false);
      })(lists[l]);
    }
  }

  // ── FAQ filter ───────────────────────────────────────────
  // Buttons carry data-filter; questions carry data-cat.
  function faqFilter() {
    var groups = document.querySelectorAll('.filters');
    for (var g = 0; g < groups.length; g++) {
      (function (group) {
        var list = document.getElementById(group.getAttribute('data-for'));
        if (!list) return;
        var btns = group.querySelectorAll('button[data-filter]');
        var items = list.querySelectorAll('li[data-cat]');

        for (var b = 0; b < btns.length; b++) {
          btns[b].addEventListener('click', function () {
            var cat = this.getAttribute('data-filter');
            for (var i = 0; i < btns.length; i++) {
              btns[i].setAttribute('aria-pressed', btns[i] === this ? 'true' : 'false');
            }
            for (var j = 0; j < items.length; j++) {
              items[j].hidden = cat !== 'all' && items[j].getAttribute('data-cat') !== cat;
            }
          });
        }
      })(groups[g]);
    }
  }

  // ── Phone nav ────────────────────────────────────────────
  // On narrow screens the nav is a horizontal scroller; bring the
  // current page's link into view so it isn't hidden off-edge.
  function navIntoView() {
    var cur = document.querySelector('.nav [aria-current="page"]');
    var nav = cur && cur.parentNode;
    if (!nav || nav.scrollWidth <= nav.clientWidth) return;
    var n = nav.getBoundingClientRect();
    var c = cur.getBoundingClientRect();
    nav.scrollLeft += c.left + c.width / 2 - (n.left + n.width / 2);
  }

  function init() {
    navIntoView();
    reveal();
    tabs();
    faqFilter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
