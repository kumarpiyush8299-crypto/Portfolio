(function () {
  var LIVE_KEY = 'pk_cms_live_v2';
  var LEGACY = 'pk_portfolio_cms_v1';

  function load() {
    try {
      var live = localStorage.getItem(LIVE_KEY);
      if (live) {
        var data = JSON.parse(live);
        if (data && data.meta && data.meta.published) return data;
      }
      var legacy = localStorage.getItem(LEGACY);
      return legacy ? JSON.parse(legacy) : null;
    } catch (e) { return null; }
  }

  function text(el, value) {
    if (el && value != null && String(value).length) el.textContent = value;
  }

  function applyHero(data) {
    if (!data || !data.hero) return;
    var h = data.hero;
    document.querySelectorAll('.logo-text h3').forEach(function (el) { text(el, h.name); });
    document.querySelectorAll('.logo-text span').forEach(function (el) { text(el, h.role); });
    text(document.querySelector('.hero-content > p'), h.bio);
    text(document.querySelector('.profile-card h3, .profile-info h3'), h.name);
  }

  function applySkills(data) {
    if (!data || !data.skills || !data.skills.length) return;
    var tiles = document.querySelectorAll('.services-grid .service-tile');
    data.skills.forEach(function (s, i) {
      if (!tiles[i]) return;
      text(tiles[i].querySelector('h3'), s.title);
      text(tiles[i].querySelector('p'), s.desc);
      var icon = tiles[i].querySelector('.service-icon i');
      if (icon && s.icon) icon.className = 'fa-solid ' + s.icon;
    });
    tiles.forEach(function (tile, i) { tile.style.display = i >= data.skills.length ? 'none' : ''; });
  }

  function applyTools(data) {
    if (!data || !data.tools || !data.tools.length) return;
    var cards = document.querySelectorAll('.tool-grid .tool-card');
    data.tools.forEach(function (t, i) {
      if (!cards[i]) return;
      var name = typeof t === 'string' ? t : t.name;
      var iconName = typeof t === 'object' ? t.icon : null;
      text(cards[i].querySelector('span'), name);
      var icon = cards[i].querySelector('i');
      if (icon && iconName) {
        icon.className = (iconName.indexOf('fa-brands') === 0 ? '' : 'fa-solid ') + iconName;
        if (iconName.indexOf('fa-') === 0 && iconName.indexOf('fa-solid') < 0 && iconName.indexOf('fa-brands') < 0)
          icon.className = 'fa-solid ' + iconName;
      }
    });
    cards.forEach(function (card, i) { card.style.display = i >= data.tools.length ? 'none' : ''; });
  }

  function applyHighlights(data) {
    if (!data || !data.highlights || !data.highlights.length) return;
    var cards = document.querySelectorAll('.achievement-grid .achievement-card');
    data.highlights.forEach(function (h, i) {
      if (!cards[i]) return;
      text(cards[i].querySelector('h2'), h.value);
      text(cards[i].querySelector('p'), h.label);
    });
    cards.forEach(function (card, i) { card.style.display = i >= data.highlights.length ? 'none' : ''; });
  }

  function applyMedia(data) {
    if (!data || !data.media) return;
    var m = data.media;
    var video = document.querySelector('.showreel-video video, .showreel video');
    if (video) {
      var src = video.querySelector('source');
      if (m.showreel) {
        if (src) src.setAttribute('src', m.showreel);
        else video.setAttribute('src', m.showreel);
      }
      if (m.poster) video.setAttribute('poster', m.poster);
    }
    text(document.querySelector('.showreel .section-title h2'), m.title);
    text(document.querySelector('.showreel .section-title p'), m.line);
  }

  function applyTravel(data) {
    if (!data || !data.travel) return;
    var sec = document.querySelector('#travel .section-title');
    if (!sec) return;
    text(sec.querySelector('h2'), data.travel.title);
    text(sec.querySelector('p'), data.travel.line);
  }

  function applyCTA(data) {
    if (!data || !data.cta) return;
    text(document.querySelector('.cta h2, .cta-box h2'), data.cta.title);
    text(document.querySelector('.cta p, .cta-box p'), data.cta.line);
  }

  function applySocial(data) {
    if (!data || !data.social) return;
    var s = data.social;
    function set(sel, url) {
      if (!url) return;
      document.querySelectorAll(sel).forEach(function (a) { a.href = url; });
    }
    set('a[href*="instagram.com"]', s.instagram);
    set('a[href*="github.com"]', s.github);
    set('a[href*="linkedin.com"]', s.linkedin);
    set('a[href*="wa.me"]', s.whatsapp);
    set('a[href*="facebook.com"]', s.facebook);
    set('a[href*="x.com"], a[href*="twitter.com"]', s.twitter);
    set('a[href*="youtube.com"]', s.youtube);
    set('a[href*="behance.net"]', s.behance);
    set('a[href*="dribbble.com"]', s.dribbble);
    set('a[href*="tiktok.com"]', s.tiktok);
    set('a[href*="pinterest.com"]', s.pinterest);
    set('a[href*="t.me"]', s.telegram);
  }

  function applyProjects(data) {
    if (!data || !data.projects || !data.projects.length) return;
    var tiles = document.querySelectorAll('.projects-grid .project-tile');
    data.projects.forEach(function (p, i) {
      if (!tiles[i]) return;
      text(tiles[i].querySelector('.project-content span'), p.tag);
      text(tiles[i].querySelector('.project-content h3'), p.title);
      text(tiles[i].querySelector('.project-content p'), p.desc);
      if (p.link) tiles[i].setAttribute('href', p.link);
    });
  }

  function applyFooter(data) {
    if (!data || !data.legal) return;
    text(document.querySelector('.footer-bottom p, .site-footer .footer-bottom p'), data.legal.footer);
  }

  function run() {
    var data = load();
    if (!data) return;
    applyHero(data);
    applySkills(data);
    applyTools(data);
    applyHighlights(data);
    applyMedia(data);
    applyTravel(data);
    applyCTA(data);
    applySocial(data);
    applyProjects(data);
    applyFooter(data);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
