(function(root, factory) {
  if (typeof exports !== 'undefined') {
    var $ = require('jquery');
    require('ejs');
    var marked = require('marked');
    module.exports = factory(root, $, EJS, marked);
  } else if (typeof define === 'function' && define.amd) {
    define([ 'jquery', 'ejs', 'marked'], function($, EJS, marked) {
      root.HTML5Documents = factory(root, $, EJS, marked);
    });
  } else {
    root.HTML5Documents = factory(root, (root.jQuery || root.Zepto || root.ender || root.$), root.EJS, root.marked);
  }
})(this, function (root, $, EJS, marked, undefined) {
  'use strict';

  var doc = window.document;

  var TMPL_COVER_PAGE = '<article class="cover">' +
      '<h1><%= title %></h1>' +
      '<time class="last-modified"><%= time %></time>' +
      '<address>© 2014 <%= author %></address>' +
      '</article>';
  var TMPL_INDEX_PAGE = '<article class="index">' +
      //'</header>' +
      '<main>' +
      '<h1>Index</h1>' +
      '<ol>' +
      '<% for (var i = 0;i < index.length;i++){ %>' +
        '<li><a href="#<%= index[i].id %>"><%= index[i].title %></a></li>' +
      '<% } %>' +
      '</ol>' +
      '</main>' +
      //'<footer>' +
      //'<address>© 2014 <%= author %></address>' +
      //'</footer>' +
      '</article>';
  var TMPL_HEADER =
      '<header>' +
      '<h1><%= title %></h1>' +
      '<time class="last-modified"><%= time %></time>' +
      '</header>';

  var TMPL_FOOTER =
      '<footer>' +
      '<address>© 2014 <%= author %></address>' +
      '</footer>';

  var TMPL_LOCAL_FOOTER =
      '<footer>' +
      '<address>© 2014 <%= author %></address>' +
      '<p class="nombre"><%= page %></p>' +
      '</footer>';

  function init() {
    if(marked && typeof(marked) === 'function') {
      replaceMarkdownText();
    }

    var $main = $('main');

    var time   = $(doc).find('body > time').text();
    var title  = $(doc).find('head > title').text();
    var author = $(doc).find('head > meta[name=author]').attr('content');

    var header = new EJS({text:TMPL_HEADER}).render({title: title, time: time});
    var footer = new EJS({text:TMPL_FOOTER}).render({author: author});

    $(doc.body).prepend(header, footer);


    var index = [];
    $('main > article').each(function(i) {
      var id = /* $this.find('h1').attr('id') || */'page' + i,
          title = 'ページ' + (i+1);

      var $h1 = $($(this).find('h1').get(0));

      $h1.attr({'id': id});
      if($h1.length) title = $h1.text();

      index.push({
        title : title,
        id: id
      });
    });

    var indexPage = new EJS({text:TMPL_INDEX_PAGE}).render({title: title, time: time, author: author, index: index});
    $main.prepend(indexPage);

    $('main > article').each(function(i) {
      var $this = $(this);
      var localFooter = new EJS({text:TMPL_LOCAL_FOOTER}).render({author: author, page: i + 1});
      $this.prepend(header).append(localFooter);
    });

    var coverPage = new EJS({text:TMPL_COVER_PAGE}).render({title: title, time: time, author: author});

    $main.prepend(coverPage);

  }

  function replaceMarkdownText() {
    // TODO: highlight.js 使ってみる https://github.com/isagalaev/highlight.js
    $(doc).find('.marked').each(function() {
      var $this = $(this);
      var text = $this.html();
      $this.empty().append(marked(text)).removeClass('marked');
    });
  }

  return function (){
    $(init);
  };
});