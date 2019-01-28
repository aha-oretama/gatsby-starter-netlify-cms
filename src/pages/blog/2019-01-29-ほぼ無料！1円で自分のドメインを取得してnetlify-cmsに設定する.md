---
templateKey: blog-post
title: ほぼ無料！1円で自分のドメインを取得してNetlify CMSに設定する
date: 2019-01-27T02:12:00.000Z
description: >-
  自分のブログサイトを作ったら、自分のドメインを取得したくなった。コストをかけないことを重要視して、Netlify
  CMSへほぼ無料、１円で自分のドメインを作成して設定した。
tags:
  - netlify
  - blog
  - domain
---
Netlify CMSでは、Netlify経由で自分のドメインを取得・設定することができる。ただし、その場合、年間$10〜程度（値段はドメイン名による）の費用がかかってしまう。

そこで今回は、[お名前.com](https://www.onamae.com/)で、ドメインを取得し、そのドメインをNetlify CMSへ設定した。
今回は、ドメイン取得、設定、HTTPS化までを行う。

# お名前.comでドメイン取得

お名前.comで自分の取得したいドメイン名をいれて、（他の人に取得されていなければ）自分のドメインを取得できる。

.com, .jp, .net など有名なドメインは高いが、.work, .info, .xyz などそこまでメジャーでないドメインは格安で取得できる。

自分のコスト感に合わせて取得できればいいと思う。
自分の場合、このブログをどこまでやるかわからなかったので、一旦1円という格安の`aha-oretama.work`というドメインを取得した。

# ドメインの有効化

Netlifyのサイト([https://app.netlify.com/](https://app.netlify.com/))の Settings -> Domain management -> Custom domains からドメインを設定できる。
さきほどお名前.comで取得したドメインを入力し、一旦、Netlify側は終了。

Name serverを設定するように言われると思うので、[ネームサーバの設定ガイド](https://www.onamae.com/guide/p/67)に従い、お名前.comのネームサーバにNetlifyで指定された値を設定する。

# Https化

Netlifyのサイト([https://app.netlify.com/](https://app.netlify.com/))の Settings -> Domain management -> HTTPSからHTTPSを有効化できる。

反映されるまで少し時間がかかるが、とくに問題なく設定できるはず。

# まとめ

このように、Netlifyではなく、お名前.comからドメインを取得することで、格安で自分のドメインを取得できた。


