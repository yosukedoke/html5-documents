(function (window, $, EJS, marked, undefined) {
  'use strict';

  var doc = window.document;
  var TMPL_HEADER =
      '<header>' +
      '<h1><%= title %></h1>' +
      '<time class="last-modified"><%= time %></time>' +
      '</header>';

  var TMPL_FOOTER =
      '<footer>' +
      '<address>© 2014 <%= author %></address>' +
      '</footer>';

  function init() {
    if(marked && typeof(marked) === 'function') {
      replaceMarkdownText();
    }

    var time   = $(doc).find('body > time').text();
    var title  = $(doc).find('head > title').text();
    var author = $(doc).find('head > meta[name=author]').attr('content');

    var header = new EJS({text:TMPL_HEADER}).render({title: title, time: time});
    var footer = new EJS({text:TMPL_FOOTER}).render({author: author});

    $(doc.body).prepend(header, footer);

    $('main > article').each(function() {
      $(this).prepend(header).append(footer);
    });
  }

  function replaceMarkdownText() {
    // TODO: highlight.js 使ってみる https://github.com/isagalaev/highlight.js
    $(doc).find('.marked').each(function() {
      var $this = $(this);
      var text = $this.html();
      $this.empty().append(marked(text)).removeClass('marked');
    });
  }

  $(init);
})(this, jQuery, EJS, marked);