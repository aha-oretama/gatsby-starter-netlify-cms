---
templateKey: blog-post
title: RubyライブラリをPublishする
date: 2019-02-06T01:10:31.238Z
description: 'Rubyのライブラリを作成して、https://rubygems.org/ へ登録するまでを簡単に解説する。'
tags:
  - ruby
---
一番は公式ページを参考にすること。
* [https://guides.rubygems.org/make-your-own-gem/](https://guides.rubygems.org/make-your-own-gem/)
* [https://guides.rubygems.org/publishing/](https://guides.rubygems.org/publishing/)

ここでは、ライブラリの中身は作成済み、[Specification](https://guides.rubygems.org/specification-reference/)まで書けている前提で、ライブラリのビルドと公開までを説明する。

ここでは、`sample`というライブラリ名で解説する。

1. `sample.gemspec`ファイルを対象にしてビルド。
```bash
$ gem build sample.gemspec
```

2. `require`できるか、`irb`を起動して確認。（公式ページでは`irb`コマンドだがうまくいかなかったため、`bundle exec irb`を使って実施）
```bash
$ bundle exec irb
>> require 'sample'
=> true
```

3. [https://rubygems.org/](https://rubygems.org/)へサインアップ、もしくはサインインしてユーザ名を確認、

4. APIキーをローカルに保存。
```bash
$ curl -u {username} https://rubygems.org/api/v1/api_key.yaml >
~/.gem/credentials; chmod 0600 ~/.gem/credentials
```

5. gemを公開。
```bash
$ gem push sample-0.1.0.gem
```

実は初のRubyライブラリを公開しました〜！ぜひ使ってみてください〜。
* [allure_turnip](https://rubygems.org/gems/allure_turnip)
