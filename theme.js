// ==========================================================
// THEME TERMINAL. Retro palettes pulled from the logo colour
// studies, shared by every page (load at the end of <body>).
// 16-BIT MONO is applied on load; auto-rotation is off by
// default but visitors can switch it on from the panel.
// Styles live in style.css.
// ==========================================================
(function () {
  // Logo paths below are relative to this file, so pages in
  // subfolders (blog/) still find them.
  var base = document.currentScript.src.replace(/[^\/]*$/, '');

  // Every page gets the scanlines, the glitch veil and the panel.
  document.body.insertAdjacentHTML('beforeend',
    '<div class="crt-overlay" aria-hidden="true"></div>' +
    '<div id="glitch-veil" aria-hidden="true"></div>' +
    '<div id="theme-terminal">THEME TERMINAL<br>' +
      '<b id="tt-name">16-BIT MONO</b> &middot; <span id="tt-timer">AUTO OFF</span><br>' +
      '<span class="tt-btn" id="tt-next">NEXT THEME</span>' +
      '<span class="tt-btn" id="tt-auto">AUTO: OFF</span>' +
      '<span class="tt-btn" id="tt-glitch">GLITCH: OFF</span>' +
    '</div>');

  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  var veil = document.getElementById('glitch-veil');
  var ttName = document.getElementById('tt-name');
  var ttTimer = document.getElementById('tt-timer');

  var THEMES = [
    { name: 'PALMWARE CLASSIC', v: { '--bg':'#0a0d12','--bg-panel':'#11161f','--text':'#e8e8e8','--text-dim':'#9aa3ad','--blue':'#4a7ce8','--red':'#d7263d','--orange':'#e8712a','--yellow':'#e8d84a','--green':'#3aa655','--bg-hdr':'rgba(10,13,18,.92)','--border':'#1d2530','--accent':'#e8d84a','--heading':'#ffffff' } },
    { name: 'GREEN PHOSPHOR',   logo: 'assets/logos/crt-phosphor.png', v: { '--bg':'#020803','--bg-panel':'#081408','--text':'#9ef2a8','--text-dim':'#4f8f5c','--blue':'#d6f7b0','--red':'#9ae06a','--orange':'#57c04a','--yellow':'#2f8f3e','--green':'#57c04a','--bg-hdr':'rgba(2,8,3,.92)','--border':'#14401f','--accent':'#39ff6a','--heading':'#ffffff' } },
    { name: 'CASSETTE CREAM',   logo: 'assets/logos/cassette-cream.png', v: { '--bg':'#f2ead8','--bg-panel':'#e6dcc2','--text':'#3a2e22','--text-dim':'#6b5a45','--blue':'#d94f2b','--red':'#e8873c','--orange':'#eab648','--yellow':'#6f9a58','--green':'#3f6f8a','--bg-hdr':'rgba(242,234,216,.92)','--border':'#c9b995','--accent':'#d94f2b','--heading':'#3a2e22' } },
    { name: 'AMBER TERMINAL',   logo: 'assets/logos/amber-terminal.png', v: { '--bg':'#171006','--bg-panel':'#251a0a','--text':'#ffcf8a','--text-dim':'#b8925c','--blue':'#ffe0a3','--red':'#ffbe55','--orange':'#f29a2e','--yellow':'#c76f1e','--green':'#ffb642','--bg-hdr':'rgba(23,16,6,.92)','--border':'#4a3416','--accent':'#ffb642','--heading':'#ffffff' } },
    { name: 'SUNSET DUSK',      logo: 'assets/logos/sunset-dusk.png', v: { '--bg':'#0d0d14','--bg-panel':'#181322','--text':'#f2e6c8','--text-dim':'#a595bd','--blue':'#f5d442','--red':'#f08c2e','--orange':'#d8402f','--yellow':'#8c3a7c','--green':'#6157c9','--bg-hdr':'rgba(13,13,20,.92)','--border':'#2e2545','--accent':'#f5d442','--heading':'#ffffff' } },
    { name: 'HANDHELD GREEN',   logo: 'assets/logos/gameboy-dmg.png', v: { '--bg':'#0a1608','--bg-panel':'#122410','--text':'#9bbc0f','--text-dim':'#79953e','--blue':'#9bbc0f','--red':'#8bac0f','--orange':'#6b8c26','--yellow':'#4a7029','--green':'#306230','--bg-hdr':'rgba(10,22,8,.92)','--border':'#2c4a1c','--accent':'#9bbc0f','--heading':'#ffffff' } },
    { name: '16-BIT COLOUR',    logo: 'assets/logos/super-famicom.png', v: { '--bg':'#26262e','--bg-panel':'#33333c','--text':'#e8e8ee','--text-dim':'#a0a0ac','--blue':'#e60012','--red':'#0068b7','--orange':'#52489c','--yellow':'#f8b500','--green':'#00a651','--bg-hdr':'rgba(38,38,46,.92)','--border':'#45454f','--accent':'#f8b500','--heading':'#ffffff' } },
    { name: 'BASIC BLUE',       logo: 'assets/logos/c64-boot.png', v: { '--bg':'#251c58','--bg-panel':'#40318d','--text':'#b8b0f0','--text-dim':'#8a80d8','--blue':'#b6aef0','--red':'#9d94e8','--orange':'#7c70da','--yellow':'#67b6bd','--green':'#8b3f96','--bg-hdr':'rgba(37,28,88,.92)','--border':'#5a4bb8','--accent':'#7c70da','--heading':'#ffffff' } },
    { name: '16-BIT MONO',      logo: 'assets/logos/sfc-mono.png', v: { '--bg':'#101012','--bg-panel':'#1c1c1f','--text':'#e8e8e8','--text-dim':'#9a9a9a','--blue':'#47474d','--red':'#68686f','--orange':'#8c8c94','--yellow':'#b0b0b8','--green':'#dcdce0','--bg-hdr':'rgba(16,16,18,.92)','--border':'#333338','--accent':'#dcdce0','--heading':'#ffffff' } },
    { name: 'VIRTUAL RED',      logo: 'assets/logos/virtual-boy.png', v: { '--bg':'#070000','--bg-panel':'#160404','--text':'#ff6b6b','--text-dim':'#a83a3a','--blue':'#ff5c5c','--red':'#e63232','--orange':'#b81f1f','--yellow':'#ff2a2a','--green':'#ff5c5c','--bg-hdr':'rgba(7,0,0,.92)','--border':'#3a0a0a','--accent':'#ff2a2a','--heading':'#ff8a8a' } },
    { name: 'POCKET LCD',       logo: 'assets/logos/pocket-lcd.png', v: { '--bg':'#c4c2ae','--bg-panel':'#b7b5a2','--text':'#2e2c26','--text-dim':'#55534a','--blue':'#454337','--red':'#5c5a4c','--orange':'#767463','--yellow':'#8f8d7c','--green':'#767463','--bg-hdr':'rgba(196,194,174,.92)','--border':'#8f8d7c','--accent':'#454337','--heading':'#2e2c26' } },
    { name: 'GBA INDIGO',       logo: 'assets/logos/gba-indigo.png', v: { '--bg':'#1e1f44','--bg-panel':'#2c2d5e','--text':'#c8c9e8','--text-dim':'#8e90c0','--blue':'#42438f','--red':'#6465b2','--orange':'#7f80c4','--yellow':'#9a9bd4','--green':'#c8c9e8','--bg-hdr':'rgba(30,31,68,.92)','--border':'#4c4d9f','--accent':'#9a9bd4','--heading':'#ffffff' } },
    { name: 'CASSETTE NAVY',    logo: 'assets/logos/cassette-navy.png', v: { '--bg':'#131a2b','--bg-panel':'#1e2942','--text':'#e8e2d0','--text-dim':'#9aa4b8','--blue':'#4a5e7a','--red':'#8aa0b8','--orange':'#c4452e','--yellow':'#e0b64a','--green':'#f0e8d4','--bg-hdr':'rgba(19,26,43,.92)','--border':'#33415c','--accent':'#e0b64a','--heading':'#ffffff' } },
    { name: 'VHS VAPOR',        logo: 'assets/logos/vhs-vapor.png', v: { '--bg':'#16121f','--bg-panel':'#221a33','--text':'#f5f2ff','--text-dim':'#a89ec8','--blue':'#ff71ce','--red':'#b967ff','--orange':'#01cdfe','--yellow':'#05ffa1','--green':'#fffb96','--bg-hdr':'rgba(22,18,31,.92)','--border':'#3a2e58','--accent':'#ff71ce','--heading':'#ffffff' } }
  ];

  THEMES.forEach(function (t) { if (t.logo) (new Image()).src = base + t.logo; });
  var idx = 0, PERIOD = 10, left = PERIOD;
  var glitchOn = false, autoOn = false;

  function stripes() {
    var v = THEMES[idx].v;
    return [v['--blue'], v['--red'], v['--orange'], v['--yellow'], v['--green']];
  }

  function apply(i) {
    idx = (i + THEMES.length) % THEMES.length;
    var t = THEMES[idx];
    for (var k in t.v) root.style.setProperty(k, t.v[k]);
    var s = stripes();
    veil.style.background =
      'repeating-linear-gradient(0deg, transparent 0 18px, ' + s[0] + ' 18px 20px, transparent 20px 55px, ' +
      s[2] + ' 55px 58px, transparent 58px 110px, ' + s[4] + ' 110px 112px, transparent 112px 160px)';
    var logo = base + (t.logo || 'assets/palmware-logo.png');
    document.querySelectorAll('.brand-logo, .hero-logo').forEach(function (el) { el.src = logo; });
    ttName.textContent = t.name;
  }

  function nextTheme() {
    left = PERIOD;
    if (reduced || !glitchOn) { apply(idx + 1); return; }
    root.classList.add('theme-glitch');
    setTimeout(function () { apply(idx + 1); }, 140);
    setTimeout(function () { root.classList.remove('theme-glitch'); }, 560);
  }

  function renderTimer() {
    ttTimer.textContent = autoOn ? 'NEXT IN ' + Math.max(left, 0) + 's' : 'AUTO OFF';
  }

  setInterval(function () {
    if (!autoOn) return;
    left--;
    if (left <= 0) nextTheme();
    renderTimer();
  }, 1000);

  document.getElementById('tt-next').addEventListener('click', function () {
    nextTheme();
    renderTimer();
  });
  document.getElementById('tt-auto').addEventListener('click', function () {
    autoOn = !autoOn;
    left = PERIOD;
    this.textContent = 'AUTO: ' + (autoOn ? 'ON' : 'OFF');
    renderTimer();
  });
  document.getElementById('tt-glitch').addEventListener('click', function () {
    glitchOn = !glitchOn;
    this.textContent = 'GLITCH: ' + (glitchOn ? 'ON' : 'OFF');
  });
  // Every page load starts on 16-BIT MONO (no glitch flash on first paint).
  // A theme picked with NEXT THEME lasts until the page is reloaded or the
  // visitor moves to another page; nothing is remembered on purpose.
  apply(THEMES.map(function (t) { return t.name; }).indexOf('16-BIT MONO'));
})();
