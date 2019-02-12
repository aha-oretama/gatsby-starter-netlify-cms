---
templateKey: blog-post
title: Google App Engineは便利で簡単。だけどカスタマイズは大変
date: 2019-02-12T05:03:00.028Z
description: >-
  Google App
  Engineを使ってみるのは非常に簡単。だけどそれをカスタマイズするのは非常に大変だったので、どうした場合にカスタマイズの必要が出たのか？どうすればカスタマイズできるのか？をまとめる。
tags:
  - gcp
  - app-engine
---
[Google App Engine](https://cloud.google.com/appengine/?hl=ja)は自動で言語を判別し、デプロイコマンドだけで自動でWEBアプリケーションを立ち上げてくれる、非常に便利なサービスだ。（AWSでいえば、[AWS Elastic Beanstalk](https://aws.amazon.com/jp/elasticbeanstalk/)にあたる）

以下のコマンドだけで、デプロイをしてくる。（事前に`gcloud`コマンドの初期設定は必要）
```bash
$ gcloud app deploy
```

通常は上記コマンドだけでWEBアプリケーションが問題なく起動する。

しかし、今回はRubyのGemにプライベートライブラリがあり、そのプライベートライブラリの取得のために、`~/.bundle/config`に認証情報の保存が必要だった。

このように、
* 事前処理
* 環境の変更

が必要な場合、`gen-config`([Reference](https://cloud.google.com/sdk/gcloud/reference/beta/app/gen-config?hl=ja))を使用して、Dockerfileから変更する必要が出てくる。

`gen-config`でカスタマイズする場合のコマンドは以下。
```bash
$ gcloud beta app gen-config --custom
```

上記のコマンドで、Dockerfileが定義され、また`app.yaml`の`runtime`が`custom`に変更される。
あとはDockerfileを適切に変更すればよい。






