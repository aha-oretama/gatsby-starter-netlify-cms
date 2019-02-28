---
templateKey: blog-post
title: Jenkins Pipeline上でPATHに追加する方法
date: 2019-02-28T07:31:05.256Z
description: Jenkins Pipelin場でPATHに追加する方法をまとめたい。また、そのように設定する中で、落とし穴にハマってしまったので、それも共有しておきたい。
tags:
  - jenkins
  - rbenv
---
## 背景
一言でいえば、[Rbenv Plugin](https://wiki.jenkins.io/display/JENKINS/rbenv+plugin)のせいだ。（最終更新が６年以上も前…ちゃんとメンテしてほしい…）

通常のツール（Maven,NodeJS,etc.）であれば、Global Tool Configurationに設定できるため、各Slaveへのインストールは不要で、自動でインストールすることができる。
しかしながら、RbenvはGlobal Tool Configurationに対応していなく、各Slaveに手動でインストールし、PATHの設定をする必要がある。

自分の場合、Rbenvを各Slaveに手動でインストールしたが、PATHについてはPipeline上で設定していた。そのため、Pipeline上でPATHに追加する必要が出てきた、というわけだ。

## 
