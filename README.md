html5-Documents
===============

制作資料をHTMLで作るためのライブラリ

## 概要

HTMLの`main > articl`要素を1ページとして扱います

- &lt;body>
    - &lt;main>
        - &lt;article>
            - 内容
        - &lt;article class="marked">
            - <!-- Markdown -->

## できること

- `title`要素と`meta[name=author]`要素からヘッダーとフッターを自動的に生成します
- 印刷時に`main > article`要素ごとに必ず改ページが入ります
- `body > time.last-modefied`要素を入れると更新日として解釈して各ページに挿入します
- `*.marked`要素内のコメント(`<!-- -->`)にMarkdown形式で記述するとHTMLに変換します