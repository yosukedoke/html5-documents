!function(a,b,c,d){"use strict";function e(){d&&"function"==typeof d&&f();var a=b(g).find("body > time").text(),e=b(g).find("head > title").text(),j=b(g).find("head > meta[name=author]").attr("content"),k=new c({text:h}).render({title:e,time:a}),l=new c({text:i}).render({author:j});b(g.body).prepend(k,l),b("main > article").each(function(){b(this).prepend(k).append(l)})}function f(){b(g).find(".marked").each(function(){var a=b(this),c=a.html();a.empty().append(d(c)).removeClass("marked")})}var g=a.document,h='<header><h1><%= title %></h1><time class="last-modified"><%= time %></time></header>',i="<footer><address>© 2014 <%= author %></address></footer>";b(e)}(this,jQuery,EJS,marked);