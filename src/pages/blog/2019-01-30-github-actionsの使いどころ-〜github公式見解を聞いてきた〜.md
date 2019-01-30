---
templateKey: blog-post
title: GitHub Actionsの使いどころ 〜GitHub公式見解を聞いてきた〜
date: 2019-01-29T11:19:00.000Z
description: >-
  GitHub ActionsがClosed Betaで公開された。事前登録していた人たちは少しずつ使えるようになっていると思われる。今回は、GitHub
  ソリューションズエンジニアの人が登壇したセミナーに参加して、GitHubが想定しているGitHub
  Actionsのユースケースを聞いてきたので、メモしておく。
tags:
  - GitHub Actions
---
# GitHub Actions

2019/01/30現在、GitHub ActionsはClosed Betaで公開されている。利用するためには、 [https://github.com/features/actions](https://github.com/features/actions) からサインアップする必要がある。

GitHub Actionsを雑に説明すると、GitHubのイベントをトリガーとして、定義しておいたWorkflowというフローに沿って、処理を実行するものである。
そのWorkflowはコードで定義されており、他ユーザが作成したWorkflowも利用可能なものだ。

# GitHubが想定しているGitHub Actionsのユースケース

なぜこれが重要かというと、GitHub Actionsは言ってみればCIとしての働きもできてしまうためだ。では、既存のCIを置き換えるようなものか、というと答えはNoだ。

その理由は、いまのCIにはキャッシュの保存やパラメータライズなどいろいろな機能があり、GitHub Actionsを（本格的な）CIとして使うには若干の機能不足感が否めない。

では、GitHub Actionｓはどのようなユースケースを想定しているのか？
[共同セミナー：GitHub X CircleCIで実現するDevOps](https://peatix.com/event/582857)というセミナーで、GitHub ソリューションズエンジニアの方が説明していた。以下はそのスライドで説明されていたものだ。

**GitHub Actionsの利用シーン**
- 簡易なCI/CD
- 複数のツールをGitHub Actionsでつなげる役割
- 日常の作業を自動化してくれるbot
  - マージされたブランチの削除
  - リリースしたらGitHub上にReleaseを作る
  - 古くなったIssueやPRをクローズする
  - WIPを間違ってマージしないようにする

上記の説明を聞いて、自分は非常に納得がいった。それまでは、GitHub ActionsはCIを置き換えるものと考えていたため、使うメリットがまだあまりない、と思っていたが、そうではなかった。
GitHub Actionsは日常の開発に関わる些細な作業を自動化したり、ツールのグルー（のり）の役割をして、開発を手助けしてくれるものであり、ということだ。

個人的には、*日常の作業を自動化してくれるbot*の部分は、GitHubから公式のWorkflowが展開されてくれると助かる、と思った。（それであればすぐに使える）
