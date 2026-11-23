/* =====================================================================
   beamKit v1.0 — small helpers that go with beamkit.css
   - Injects the icon sprite (use <svg class="i"><use href="#icon-NAME"/></svg>)
   - Light/dark theme toggle, remembered across all jalibakthermk.github.io tools
   - Drag-and-drop file zones, chart colour helpers, canvas + download helpers
   No dependencies. Load with <script src="…/beamkit.js" defer></script>.
   MIT © 2026 Jalib Akther
   ===================================================================== */
(function (global) {
  'use strict';
  var THEME_KEY = 'theme'; // same key as the portfolio page, so the choice carries over

  /* ---------- Icons (Lucide-style, MIT) ---------- */
  var ICONS = {
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    chev: '<path d="m6 9 6 6 6-6"/>',
    copy: '<rect width="14" height="14" x="8" y="8"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    table: '<rect x="3" y="3" width="18" height="18"/><path d="M3 9h18M3 15h18M9 3v18"/>',
    lock: '<rect width="18" height="11" x="3" y="11"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>',
    settings: '<path d="M20 7h-9M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    report: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
    /* lighting */
    gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    road: '<path d="M4 21 9 3"/><path d="M20 21 15 3"/><path d="M12 4v2"/><path d="M12 10v3"/><path d="M12 17v4"/>',
    beam: '<path d="M3 7h2.5a5 5 0 0 1 0 10H3z"/><path d="M13 11h4l4-3"/><path d="M13 14.5h8"/><path d="M13 18h8"/>',
    glare: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/><path d="M12 2v2"/><path d="m5 4 1.4 1.4"/><path d="m19 4-1.4 1.4"/>',
    cutoff: '<path d="M2 15h8l4.5-8H22"/><path d="M4 19h16"/><path d="M7 4v2"/><path d="M4 7l1.4 1.4"/>',
    thermo: '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/><path d="M12 14v3"/>',
    palette: '<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13-.29-.29-.44-.65-.44-1.13a1.64 1.64 0 0 1 1.67-1.67h2c3.05 0 5.55-2.5 5.55-5.55C21.97 6.01 17.46 2 12 2z"/>',
    correlate: '<path d="M3 3v18h18"/><path d="m7 16 4-5 3 3 5-7"/>',
    ratio: '<line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    matrix: '<rect x="3" y="4" width="4" height="4"/><rect x="10" y="4" width="4" height="4"/><rect x="17" y="4" width="4" height="4"/><rect x="3" y="10" width="4" height="4"/><rect x="17" y="10" width="4" height="4"/><rect x="3" y="16" width="4" height="4"/><rect x="10" y="16" width="4" height="4"/><rect x="17" y="16" width="4" height="4"/>',
    drive: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>'
  };
  function injectIcons() {
    if (document.getElementById('bk-icons')) return;
    var s = '<svg id="bk-icons" width="0" height="0" style="position:absolute" aria-hidden="true">';
    for (var k in ICONS) s += '<symbol id="icon-' + k + '" viewBox="0 0 24 24">' + ICONS[k] + '</symbol>';
    document.body.insertAdjacentHTML('afterbegin', s + '</svg>');
  }

  /* ---------- Theme ---------- */
  var themeListeners = [];
  function currentTheme() {
    var t = document.documentElement.getAttribute('data-theme');
    if (t) return t;
    return global.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
    themeListeners.forEach(function (fn) { try { fn(t); } catch (e) { console.error(e); } });
  }
  function toggleTheme() { setTheme(currentTheme() === 'dark' ? 'light' : 'dark'); }
  /** Run fn(theme) whenever the theme changes — use it to redraw canvases. */
  function onThemeChange(fn) { themeListeners.push(fn); }

  /* ---------- Colours (read live from CSS, so they follow the theme) ---------- */
  function cssVar(name, el) { return getComputedStyle(el || document.documentElement).getPropertyValue(name).trim(); }
  function series(i) { return cssVar('--series-' + ((i % 6) + 1)); }
  function colors() {
    return {
      text: cssVar('--cds-text-primary'), text2: cssVar('--cds-text-secondary'), helper: cssVar('--cds-text-helper'),
      grid: cssVar('--cds-grid'), layer: cssVar('--cds-layer-01'), border: cssVar('--cds-border-subtle'),
      ok: cssVar('--cds-ok'), bad: cssVar('--cds-bad'), warn: cssVar('--cds-warn'), accent: cssVar('--cds-button-primary'),
      cut: cssVar('--cds-cut'), series: [0, 1, 2, 3, 4, 5].map(series),
      font: '11px "IBM Plex Sans", system-ui, sans-serif', mono: '11px "IBM Plex Mono", ui-monospace, monospace'
    };
  }
  /** Sequential ramp colour for t in [0,1] → "rgb(r,g,b)" (or [r,g,b] when asArray). */
  function ramp(t, asArray) {
    var stops = [1, 2, 3, 4, 5, 6, 7].map(function (k) { return cssVar('--ramp-' + k); });
    t = Math.max(0, Math.min(1, t));
    var x = t * (stops.length - 1), i = Math.floor(x), f = x - i;
    var a = hex(stops[i]), b = hex(stops[Math.min(i + 1, stops.length - 1)]);
    var c = [0, 1, 2].map(function (k) { return Math.round(a[k] * (1 - f) + b[k] * f); });
    return asArray ? c : 'rgb(' + c.join(',') + ')';
  }
  function hex(h) { h = h.replace('#', ''); return [0, 2, 4].map(function (k) { return parseInt(h.substr(k, 2), 16); }); }

  /* ---------- Canvas: crisp on HiDPI ---------- */
  /** Sizes a canvas to its CSS box × devicePixelRatio. Returns {ctx, W, H} in CSS pixels. */
  function setupCanvas(cv) {
    var dpr = global.devicePixelRatio || 1, r = cv.getBoundingClientRect();
    cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr);
    var ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, W: r.width, H: r.height };
  }
  /** "Nice" axis ticks between min and max. */
  function niceTicks(min, max, n) {
    n = n || 5;
    var span = max - min || 1, step0 = span / n, mag = Math.pow(10, Math.floor(Math.log10(step0)));
    var step = [1, 2, 2.5, 5, 10].map(function (m) { return m * mag; }).filter(function (s) { return s >= step0; })[0];
    var out = []; for (var v = Math.ceil(min / step) * step; v <= max + 1e-9; v += step) out.push(+v.toFixed(10));
    return out;
  }

  /* ---------- Drop zones ---------- */
  /** Wire a .drop label: click to browse + drag-and-drop. onFile(file) is called with the File. */
  function dropZone(el, onFile) {
    if (typeof el === 'string') el = document.querySelector(el);
    var input = el.querySelector('input[type=file]');
    if (input) input.addEventListener('change', function () { if (input.files[0]) onFile(input.files[0]); input.value = ''; });
    el.addEventListener('dragover', function (e) { e.preventDefault(); el.classList.add('over'); });
    el.addEventListener('dragleave', function () { el.classList.remove('over'); });
    el.addEventListener('drop', function (e) { e.preventDefault(); el.classList.remove('over'); var f = e.dataTransfer.files[0]; if (f) onFile(f); });
    return el;
  }
  /** Read a File as text → Promise<string>. */
  function readText(file) {
    return new Promise(function (res, rej) { var r = new FileReader(); r.onload = function () { res(r.result); }; r.onerror = rej; r.readAsText(file); });
  }

  /* ---------- Output helpers ---------- */
  function download(filename, data, mime) {
    var blob = data instanceof Blob ? data : new Blob([data], { type: mime || 'text/plain' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }
  /** Copy text; flashes "Copied" on the button's <span> label if a button is given. */
  function copy(text, btn) {
    var lbl = btn && (btn.querySelector('span') || btn), old = lbl && lbl.textContent;
    return navigator.clipboard.writeText(text).then(function () { if (lbl) lbl.textContent = 'Copied'; },
      function () { if (lbl) lbl.textContent = 'Copy blocked'; })
      .then(function () { if (lbl) setTimeout(function () { lbl.textContent = old; }, 1600); });
  }
  /** Pass/fail tag HTML. */
  function chip(ok, labels) {
    labels = labels || ['Pass', 'Fail'];
    return '<span class="chip ' + (ok ? 'ok' : 'bad') + '"><span class="dot"></span>' + (ok ? labels[0] : labels[1]) + '</span>';
  }
  /** Engineering number format: 3 significant figures, no exponent for normal ranges. */
  function fmt(x, n) {
    n = n || 3;
    if (!isFinite(x)) return '—';
    var a = Math.abs(x);
    return a >= 1000 ? x.toFixed(0) : a >= 1 ? x.toPrecision(Math.max(n, 3)) : a === 0 ? '0' : x.toPrecision(n);
  }
  /** Debounce. */
  function debounce(fn, ms) { var t; return function () { var a = arguments, s = this; clearTimeout(t); t = setTimeout(function () { fn.apply(s, a); }, ms || 150); }; }

  /* ---------- Auto-init ---------- */
  function init() {
    injectIcons();
    document.querySelectorAll('[data-bk-theme]').forEach(function (b) { b.addEventListener('click', toggleTheme); });
    if (global.matchMedia) {
      var mq = matchMedia('(prefers-color-scheme: dark)');
      var fire = function () { if (!document.documentElement.getAttribute('data-theme')) themeListeners.forEach(function (fn) { fn(currentTheme()); }); };
      mq.addEventListener ? mq.addEventListener('change', fire) : mq.addListener(fire);
    }
    // Redraw once IBM Plex has loaded, so canvas text uses the right font
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { themeListeners.forEach(function (fn) { fn(currentTheme()); }); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  global.beamKit = {
    version: '1.0.0',
    theme: { get: currentTheme, set: setTheme, toggle: toggleTheme, onChange: onThemeChange },
    cssVar: cssVar, series: series, colors: colors, ramp: ramp,
    setupCanvas: setupCanvas, niceTicks: niceTicks,
    dropZone: dropZone, readText: readText,
    download: download, copy: copy, chip: chip, fmt: fmt, debounce: debounce,
    icons: Object.keys(ICONS)
  };
})(window);
