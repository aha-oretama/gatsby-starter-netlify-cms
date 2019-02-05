---
templateKey: blog-post
title: IntelliJでRubyライブラリをクローンしたが、うまく認識されないときの対処法
date: 2019-02-05T02:05:43.280Z
description: >-
  IntelliJ
  UltimateではRubyプラグインがあり、それをインストールすることでRubyMineと同等の機能を使えることができる。しかし、そのIntelliJに対して、Rubyライブラリのリポジトリをクローンをして使おうとするとJRubyとして認識され、うまくRubyライブラリの開発ができない、という事象に遭遇した。
tags:
  - IntelliJ
  - ruby
---
RubyプラグインをインストールしたIntelliJで、Rubyライブラリのリポジトリをクローンをして使おうとするとJRubyとして認識され、IntelliJから`rspec`,`rake`などを実行することがうまく動かなかった。

上記の対処方法は、始めにIntelliJにRubyライブラリだと認識させるために、Rubyライブラリを新規作成し、次にクローンしたRubyライブラリのリポジトリのGit情報を上書きすることが一番安定かつ早かった。

ここでは、`test`というライブラリをクローンしたいリポジトリする。

1. IntellJで `File` -> `New` -> `Project...`で`Gem`を選択し、クローンしたいライブラリ名`test`で作成する。
2. `*.iml`, `.idea`を残して全て削除する。
3. 対象のリポジトリを別フォルダにインストールする。
```bash
$ git clone https://github.com/xxx/test.git tmp
```
4. `test/.git`を削除後に、`tmp/.git`フォルダを`test/.git`へ移動する。
```bash
$ rm -Rf test/.git
$ mv tmp/.git test
```
5. Gitの最新情報で、もとの状態に戻す。
```bash
$ cd test
$ git pull
$ git checkout .
```
