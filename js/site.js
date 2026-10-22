/* Materials Theory Group — static clone behaviour.
   The original Google Sites bundle is intentionally not archived: it depends
   on Google's backend. This small script supplies the interactions a reader
   expects from the archived pages. */
(function () {
  'use strict';

  var DESKTOP = window.matchMedia('(min-width: 1121px)');
  var body = document.body;
  var searchIndex = Array.isArray(window.MTG_SEARCH_INDEX) ? window.MTG_SEARCH_INDEX : [];

  function closest(el, selector) {
    while (el && el.nodeType === 1) {
      if (el.matches(selector)) return el;
      el = el.parentElement;
    }
    return null;
  }

  /* ------------------------------------------------------------------ */
  /* Desktop dropdown navigation                                        */
  /* ------------------------------------------------------------------ */
  function directPanel(li) {
    for (var i = 0; i < li.children.length; i++) {
      if (li.children[i].classList && li.children[i].classList.contains('oGuwee')) {
        return li.children[i];
      }
    }
    return null;
  }

  function triggerFor(li) {
    return li.querySelector(':scope > div a[aria-haspopup], :scope > div .j10yRb');
  }

  var topNav = document.getElementById('WDxLfe');
  if (topNav) {
    var topItems = Array.prototype.slice.call(topNav.querySelectorAll('li.VsJjtf'));

    function setOpen(li, open) {
      var panel = directPanel(li);
      if (!panel) return;
      var trigger = triggerFor(li);
      panel.classList.toggle('mtg-open', open);
      panel.style.display = open ? 'block' : 'none';
      if (trigger) trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        topItems.forEach(function (other) {
          if (other !== li) setOpen(other, false);
        });
      }
    }

    topItems.forEach(function (li) {
      if (!directPanel(li)) return;
      var trigger = triggerFor(li);
      li.addEventListener('mouseenter', function () {
        if (DESKTOP.matches) setOpen(li, true);
      });
      li.addEventListener('mouseleave', function (event) {
        if (!DESKTOP.matches) return;
        if (event.relatedTarget && li.contains(event.relatedTarget)) return;
        setOpen(li, false);
      });
      li.addEventListener('focusin', function () {
        if (DESKTOP.matches) setOpen(li, true);
      });
      li.addEventListener('focusout', function (event) {
        if (!DESKTOP.matches) return;
        if (event.relatedTarget && li.contains(event.relatedTarget)) return;
        setTimeout(function () {
          if (!li.contains(document.activeElement)) setOpen(li, false);
        }, 0);
      });
      if (trigger) {
        trigger.addEventListener('click', function (event) {
          if (trigger.tagName === 'A' && trigger.getAttribute('href')) return;
          event.preventDefault();
          var panel = directPanel(li);
          setOpen(li, !(panel && panel.classList.contains('mtg-open')));
        });
        trigger.addEventListener('keydown', function (event) {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            var panel = directPanel(li);
            setOpen(li, !(panel && panel.classList.contains('mtg-open')));
          }
        });
      }
    });

    document.addEventListener('click', function (event) {
      if (!topNav.contains(event.target)) {
        topItems.forEach(function (li) { setOpen(li, false); });
      }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        topItems.forEach(function (li) { setOpen(li, false); });
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Mobile drawer (reuses the archived side navigation)                */
  /* ------------------------------------------------------------------ */
  var menuButton = document.getElementById('s9iPrd');
  var sideNav = document.getElementById('yuynLe');
  var navOverlay = document.createElement('div');
  navOverlay.className = 'mtg-nav-overlay';
  navOverlay.setAttribute('aria-hidden', 'true');
  body.appendChild(navOverlay);

  function setMenu(open) {
    body.classList.toggle('mtg-menu-open', open);
    if (menuButton) menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (sideNav) {
      sideNav.classList.toggle('jsnVQ', open);
      sideNav.setAttribute('aria-hidden', open ? 'false' : 'true');
    }
  }

  if (menuButton) {
    menuButton.addEventListener('click', function (event) {
      event.preventDefault();
      setMenu(!body.classList.contains('mtg-menu-open'));
    });
    menuButton.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setMenu(!body.classList.contains('mtg-menu-open'));
      }
    });
  }
  navOverlay.addEventListener('click', function () { setMenu(false); });

  if (sideNav) {
    sideNav.querySelectorAll('li').forEach(function (li) {
      var panel = directPanel(li);
      if (!panel) return;
      // Both the label and its chevron toggle the drawer submenu.
      var triggers = li.querySelectorAll(':scope > div .I35ICb > a, :scope > div .j10yRb');
      triggers.forEach(function (trigger) {
        trigger.addEventListener('click', function (event) {
          if (trigger.tagName === 'A' && trigger.getAttribute('href')) return;
          event.preventDefault();
          event.stopPropagation();
          var isOpen = panel.classList.contains('mtg-subopen');
          panel.classList.toggle('mtg-subopen', !isOpen);
          panel.style.display = !isOpen ? 'block' : 'none';
          triggers.forEach(function (t) { t.setAttribute('aria-expanded', !isOpen ? 'true' : 'false'); });
        });
      });
    });
    sideNav.addEventListener('click', function (event) {
      var link = closest(event.target, 'a[href]');
      if (link && !link.getAttribute('aria-haspopup')) setMenu(false);
    });
  }

  window.addEventListener('resize', function () {
    if (DESKTOP.matches) setMenu(false);
  });

  /* ------------------------------------------------------------------ */
  /* Local search                                                       */
  /* ------------------------------------------------------------------ */
  var searchButton = document.querySelector('[aria-label="Open search bar"]');
  var searchOverlay = document.createElement('div');
  searchOverlay.className = 'mtg-search-overlay';
  searchOverlay.setAttribute('role', 'dialog');
  searchOverlay.setAttribute('aria-modal', 'true');
  searchOverlay.setAttribute('aria-label', 'Search this site');
  searchOverlay.innerHTML =
    '<div class="mtg-search-dialog">' +
      '<div class="mtg-search-head">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>' +
        '<input class="mtg-search-input" type="search" placeholder="Search pages, people, publications…" autocomplete="off" spellcheck="false">' +
        '<button class="mtg-search-close" type="button" aria-label="Close search">×</button>' +
      '</div>' +
      '<ul class="mtg-search-results"></ul>' +
      '<div class="mtg-search-hint">Press Esc to close · Enter opens the first result</div>' +
    '</div>';
  body.appendChild(searchOverlay);
  var searchInput = searchOverlay.querySelector('.mtg-search-input');
  var searchResults = searchOverlay.querySelector('.mtg-search-results');

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function snippet(text, query) {
    var lower = text.toLowerCase();
    var at = lower.indexOf(query.toLowerCase());
    if (at < 0) return text.slice(0, 150) + (text.length > 150 ? '…' : '');
    var start = Math.max(0, at - 52);
    var end = Math.min(text.length, at + query.length + 100);
    return (start ? '…' : '') + text.slice(start, end).trim() + (end < text.length ? '…' : '');
  }

  function renderSearch(query) {
    var q = query.trim();
    var items = searchIndex;
    if (q) {
      var lower = q.toLowerCase();
      items = searchIndex.map(function (page) {
        var title = page.title.toLowerCase();
        var text = page.text.toLowerCase();
        var count = text.split(lower).length - 1;
        var score = 0;
        if (title === lower) score += 200;
        if (title.indexOf(lower) === 0) score += 120;
        if (title.indexOf(lower) >= 0) score += 60;
        score += Math.min(count, 30) * 2;
        return { page: page, score: score, count: count };
      }).filter(function (row) { return row.score > 0; })
        .sort(function (a, b) { return b.score - a.score || a.page.title.localeCompare(b.page.title); })
        .slice(0, 8)
        .map(function (row) { return row.page; });
    }
    if (!items.length) {
      searchResults.innerHTML = '<li class="mtg-search-empty">No pages matched “' + escapeHtml(q) + '”.</li>';
      return;
    }
    searchResults.innerHTML = items.map(function (page) {
      var text = q ? snippet(page.text, q) : page.text.slice(0, 150) + '…';
      return '<li><a href="' + escapeHtml(page.file) + '">' +
        '<span class="mtg-search-result-title">' + escapeHtml(page.title) + '</span>' +
        '<span class="mtg-search-result-snippet">' + escapeHtml(text) + '</span>' +
      '</a></li>';
    }).join('');
    if (q) {
      searchResults.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeSearch);
      });
    }
  }

  function openSearch() {
    searchOverlay.classList.add('mtg-open');
    body.classList.add('mtg-search-open');
    if (searchButton) searchButton.setAttribute('aria-expanded', 'true');
    renderSearch(searchInput.value);
    setTimeout(function () { searchInput.focus(); searchInput.select(); }, 30);
  }

  function closeSearch() {
    searchOverlay.classList.remove('mtg-open');
    body.classList.remove('mtg-search-open');
    if (searchButton) searchButton.setAttribute('aria-expanded', 'false');
  }

  if (searchButton) {
    searchButton.setAttribute('role', 'button');
    searchButton.setAttribute('aria-haspopup', 'dialog');
    searchButton.addEventListener('click', openSearch);
    searchButton.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openSearch();
      }
    });
  }
  searchInput.addEventListener('input', function () { renderSearch(searchInput.value); });
  searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      var first = searchResults.querySelector('a');
      if (first) window.location.href = first.getAttribute('href');
    }
  });
  searchOverlay.addEventListener('click', function (event) {
    if (event.target === searchOverlay) closeSearch();
  });
  searchOverlay.querySelector('.mtg-search-close').addEventListener('click', closeSearch);

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeSearch();
      if (body.classList.contains('mtg-menu-open')) setMenu(false);
      return;
    }
    var tag = (event.target.tagName || '').toLowerCase();
    var typing = tag === 'input' || tag === 'textarea' || event.target.isContentEditable;
    if (!typing && (event.key === '/' || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'))) {
      event.preventDefault();
      openSearch();
    }
  });

  /* ------------------------------------------------------------------ */
  /* Lightbox for content photographs                                   */
  /* ------------------------------------------------------------------ */
  var lightbox = document.createElement('div');
  lightbox.className = 'mtg-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.innerHTML =
    '<button class="mtg-lightbox-close" type="button" aria-label="Close image">×</button>' +
    '<img alt="">' +
    '<div class="mtg-lightbox-caption"></div>';
  body.appendChild(lightbox);
  var lightboxImage = lightbox.querySelector('img');
  var lightboxCaption = lightbox.querySelector('.mtg-lightbox-caption');

  function openLightbox(image) {
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || '';
    lightboxCaption.textContent = image.getAttribute('data-caption') || image.alt || '';
    lightbox.classList.add('mtg-open');
    body.classList.add('mtg-lightbox-open');
  }
  function closeLightbox() {
    lightbox.classList.remove('mtg-open');
    body.classList.remove('mtg-lightbox-open');
    lightboxImage.removeAttribute('src');
  }
  document.querySelectorAll('img[data-mtg-lightbox]').forEach(function (image) {
    image.setAttribute('tabindex', '0');
    image.setAttribute('role', 'button');
    image.addEventListener('click', function () { openLightbox(image); });
    image.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });
  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox || event.target.classList.contains('mtg-lightbox-close')) closeLightbox();
  });

  /* ------------------------------------------------------------------ */
  /* Poster facades for YouTube embeds                                  */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('[data-youtube]').forEach(function (facade) {
    function play() {
      var id = facade.getAttribute('data-youtube');
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
      iframe.title = facade.getAttribute('aria-label') || 'YouTube video';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.setAttribute('loading', 'lazy');
      iframe.style.width = '100%';
      iframe.style.aspectRatio = '16 / 9';
      iframe.style.border = '0';
      iframe.style.display = 'block';
      facade.replaceWith(iframe);
    }
    facade.addEventListener('click', play);
    facade.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        play();
      }
    });
  });
}());
