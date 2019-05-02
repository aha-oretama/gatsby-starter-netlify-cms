---
templateKey: blog-post
title: 'PyCharm, virtualenv, jupyter notebookの連携をまとめておく'
date: 2019-05-02T06:56:00.745Z
description: >-
  開発環境の構築にはけっこう戸惑うことが多い。最近はPythonのコードはJupyter
  Notebookで書くことが多くなってきたが、Notebook上ではコード補完がほぼ効かずに不便を感じていた。PyCharmにはIDE上でNotebookを起動して入力する方法があったのでまとめてみた。
tags:
  - python
  - intellij
  - pycharm
  - notebook
---
まずはそれぞれのツールの理解をしておく。

## PyCharm

[https://www.jetbrains.com/pycharm/](https://www.jetbrains.com/pycharm/)

JetBrain社が開発しているPythonの統合開発環境。自分は[IntelliJ Ultimate Edition](https://www.jetbrains.com/idea/)を購入していて、Pythonプラグインを導入することでPyCharmとほぼ同等の機能が使えている。

## virtualenv

[https://virtualenv.pypa.io/en/latest/](https://virtualenv.pypa.io/en/latest/)

Pythonの仮想環境を作成するツール。

> Since Python 3.3, a subset of it has been integrated into the standard library under the venv module

pythonの仮想環境を作成するツールはいろいろあったが、上記のようにPython 3.3からpython標準モジュールのvenvに取り込まれているので、一番有望なのではないか？（私見）

## Jupyter Notebook

[https://jupyter.org/](https://jupyter.org/)

> The Jupyter Notebook is an open-source web application that allows you to create and share documents that contain live code, equations, visualizations and narrative text. Uses include: data cleaning and transformation, numerical simulation, statistical modeling, data visualization, machine learning, and much more.

１ファイル内にコードとMarkdown、コードの結果やビジュアライゼーションした表やグラフなどをまとめて記述することができる。  
機械学習などの開発ではデファクトスタンダードのツールの１つ。

# Python仮想環境の作成

詳しくは[公式ドキュメント](https://virtualenv.pypa.io/en/latest/)を見てほしい。

自分の場合は以下のコマンドで作成している。
ポイントは２つ。

* 現在パスが通っている`python3`を明示的に指定する
* 開発するプロジェクト内にPython仮想環境のディレクトリ`env`を作成する

```bash
virtualenv -p `which python3` ./env
```

作成後にアクティベートしなければ有効にならない。（再開するときも同様。）

```bash
source ./env/bin/activate
```

## PyCharm Project SDKの設定

上記で作成した仮想環境をProject SDKとして設定する。  
（ついでに上記の仮想環境はPyCharm上でも作成できる。その場合、以下の手順で`Existing enviroment`ではなく`New environment`を選択する。）

1. Project Settingを開く。(`⌘;`)
2. Project SDK → New からPython SDKを選択する。
3. Virtualenv Environment → Existing environment → ... を押す。
4. {project directory}/env/bin/python を選択する。

とくに難しいことはないが最後のファイルを何を指定すればいいかいつも迷ってしまう。（python, python3, python3.X, env/lib/pythonX.X のどれ!?）

## Jupyter Notebookの連携

デフォルトでサポートされている。

[https://pleiades.io/help/pycharm/jupyter-notebook-support.html](https://pleiades.io/help/pycharm/jupyter-notebook-support.html)

そのためとくに難しいことはなく、新規にJupyter Notebookのファイルを作成すればよいだけだ。

1. Project上で右クリック → New (`⌘n`) → Jupyter Notebook 

あとはセルを実行するだけでJupyter Notebookのサーバが自動で起動する。
