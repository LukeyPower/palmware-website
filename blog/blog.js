// ============================================================
// BLOG LISTS. Fills every <div class="post-list"> with cards for
// the posts in blog/posts.js.
//   data-root   path from the page to the site root ("" or "../")
//   data-limit  how many posts to show (leave off to show all)
// ============================================================
(function () {
  var posts = window.PALMWARE_POSTS || [];
  var MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  // "2026-09-17" becomes "17 SEP 2026"
  function niceDate(iso) {
    var p = iso.split('-');
    return Number(p[2]) + ' ' + MONTHS[Number(p[1]) - 1] + ' ' + p[0];
  }

  function card(p, root) {
    var url = root + 'blog/' + p.slug + '.html';
    return '<article class="game-card post-card">' +
      (p.image ? '<img class="game-art" src="' + root + esc(p.image) + '" alt="">' : '') +
      '<div class="game-info">' +
        '<p class="post-date">' + niceDate(p.date) +
          (p.tag ? '<span class="badge">' + esc(p.tag) + '</span>' : '') + '</p>' +
        '<h3><a href="' + url + '">' + esc(p.title) + '</a></h3>' +
        '<p>' + esc(p.summary) + '</p>' +
        '<a class="play-link" href="' + url + '">READ POST &raquo;</a>' +
      '</div>' +
    '</article>';
  }

  document.querySelectorAll('.post-list').forEach(function (list) {
    var root = list.getAttribute('data-root') || '';
    var limit = Number(list.getAttribute('data-limit')) || posts.length;
    list.innerHTML = posts.length
      ? posts.slice(0, limit).map(function (p) { return card(p, root); }).join('')
      : '<p>No posts yet.</p>';
  });
})();
