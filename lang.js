// Language toggle for the MyShop Manager legal pages.
// Resolution order: ?lang= param > localStorage > Arabic default.
// Loaded from <head> (not deferred) so the language is applied before the
// body paints — no flash of the wrong language on deep links like ?lang=en.
(function () {
  var KEY = 'myshop-legal-lang';

  function apply(lang) {
    var html = document.documentElement;
    html.setAttribute('data-active-lang', lang);
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang === 'ar' ? 'English' : 'العربية';
  }

  function store(lang) {
    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {
      /* private browsing — ignore */
    }
  }

  var param = new URLSearchParams(window.location.search).get('lang');
  var stored = null;
  try {
    stored = localStorage.getItem(KEY);
  } catch (e) {
    /* ignore */
  }

  var lang =
    param === 'ar' || param === 'en'
      ? param
      : stored === 'ar' || stored === 'en'
        ? stored
        : 'ar';
  if (param === 'ar' || param === 'en') store(param);
  apply(lang);

  document.addEventListener('DOMContentLoaded', function () {
    apply(lang); // sets the toggle label now that the button exists
    var btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var next =
          document.documentElement.getAttribute('data-active-lang') === 'ar'
            ? 'en'
            : 'ar';
        store(next);
        apply(next);
      });
    }
  });
})();
