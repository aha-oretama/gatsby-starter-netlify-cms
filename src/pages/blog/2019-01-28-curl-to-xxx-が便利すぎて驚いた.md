---
templateKey: blog-post
title: curl to XXX が便利すぎて驚いた
date: 2019-01-28T09:49:30.257Z
description: >-
  APIへ通信を行うモジュールやメソッドを開発するときに、どうやって開発するか？自分はCurlを使って、まずはリクエストが正常にうまくいくかどうかを調べてから、その後にそれをプログラミングに落としていく方法を取ることが多い。そのときにCurl
  から各プログラミングへ変換する便利サイトを見つけたので共有したい。
tags:
  - curl
  - ruby
  - tips
---
自分の場合は、あるAPIへの通信をCurlで確かめたあとにRubyに変換しようとした。
そのときに以下のサイトを見つけた。

**[curl-to-ruby](https://jhawthorn.github.io/curl-to-ruby/)**

Curlを左側に書くだけで、Rubyでのリクエスト方法が表示される。
めっちゃ便利！

もちろんそのままをプロダクションコードにのせるにはリスクがあるし、重複コードが増えてしまうのであまりよくない。
ただこんなに簡単にプログラミングへ落とせるのは非常に助かった。

調べてみたら、いろいろな言語でサポートされていた。

* curl-to-Go: [https://mholt.github.io/curl-to-go/](https://mholt.github.io/curl-to-go/)
* curl-to-Ruby: [https://jhawthorn.github.io/curl-to-ruby/](https://jhawthorn.github.io/curl-to-ruby/)
* curl-to-PHP: [https://incarnate.github.io/curl-to-php/](https://incarnate.github.io/curl-to-php/)
* Convert curl syntax to Python, Node.js, R, PHP, Go: [https://curl.trillworks.com/](https://curl.trillworks.com/)

JVM系の言語（Java, Kotlin, Groovy, Scala)は見つからなかった。残念…

