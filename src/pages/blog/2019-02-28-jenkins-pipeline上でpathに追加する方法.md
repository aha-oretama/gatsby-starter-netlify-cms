---
templateKey: blog-post
title: Jenkins Pipeline上でPATHに追加する方法
date: 2019-02-28T07:31:05.256Z
description: Jenkins Pipelin上でPATHに追加する方法をまとめたい。また、そのように設定する中で、落とし穴にハマってしまったので、それも共有しておきたい。
tags:
  - jenkins
  - rbenv
---
## 背景
一言でいえば、[Rbenv Plugin](https://wiki.jenkins.io/display/JENKINS/rbenv+plugin)のせいだ。（最終更新が６年以上も前…ちゃんとメンテしてほしい…）

通常のツール（Maven,NodeJS,etc.）であれば、Global Tool Configurationに設定できるため、各Nodeへのインストールは不要で、自動でインストールすることができる。
しかしながら、RbenvはGlobal Tool Configurationに対応していなく、各Nodeに手動でインストールし、PATHの設定をする必要がある。

自分の場合、Rbenvを各Nodeに手動でインストールしたが、PATHについてはPipeline上で設定していた。そのため、Pipeline上でPATHに追加する必要が出てきた、というわけだ。

## Jenkins Pipelin場でPATHに追加する方法

### Declarative Pipeline

#### tools
通常のツールであれば、`tools`に指定することで、そのツールがPATHに追加され、そのツールを使えることができるようになる。

[https://jenkins.io/doc/book/pipeline/syntax/#tools](https://jenkins.io/doc/book/pipeline/syntax/#tools)

```groovy
pipeline {
    agent any
    tools {
        maven 'apache-maven-3.0.1' 
    }
    stages {
        stage('Example') {
            steps {
                sh 'mvn --version'
            }
        }
    }
}
```

このようなツールは、Global Tool Configurationに設定できることが多く、各Nodeへのインストールは自動で行われ、非常にJenkinsとの親和性が高い。

この方法は、Rbenvでは使えない。

#### environment

参考にあげたページを見ればわかるように、`environment`を使ってもPATHを変更することができる。
```groovy
pipeline {
  agent { label 'docker' }
  environment {
    PATH = "/hot/new/bin:$PATH"
  }
  stages {
    stage ('build') {
      steps {
        echo "PATH is: $PATH"
      }
    }
  }
}
```

**ただし、この方法には問題点があるので注意してほしい！**
どういった問題点かというと、**Declarative Pipelineから起動した別の`node`のPATHも上書きされてしまう**のだ。

以下のように、例えばParallelで別Node上で処理を実行した場合を見てみよう。
```groovy
pipeline {
  agent { label 'node-0' }
  environment {
    PATH = "/hot/new/bin:$PATH"
    // /hot/new/bin:/hogehoge:
  }
  stages {
    stage ('build') {
      steps {
        echo "PATH is: $PATH"
        parallel(
          "node":{ 
             node('node-1') {
               echo "PATH is: $PATH"
               // 仮に'node-1'上のPATHが`/piyopiyo`だとしても
               // /hot/new/bin:/hogehoge:
               // になってしまう。
             }
          }
        }
      }
    }
  }
}
```

その場合、`node-1`のNodeのPATHは、`environment`が動いたNode(ここでは`node-0`)のPATHに上書きされてしまい、もともとの`node-1`のNodeのPATHは消えてしまうのだ。

RbenvのPATHがすべてのNode上で同じであれば、問題ないが、そうではなかったため、この方法も使えなかった。

### Scripted Pipeline
`withEnv(["PATH+HOGEHOGE=/hogehoge"])`という表現が使える。
この方法は[withEnv](https://jenkins.io/doc/pipeline/steps/workflow-basic-steps/#withenv-set-environment-variables)のドキュメントに記載されている。

```groovy
withEnv(["PATH+MAVEN=${tool 'M3'}/bin"]) {
      sh 'mvn -B verify'
   }
```

これであれば、*environment*であげた問題も発生しない。

## 結論
Declarative Pipelineの`tools`に設定できるものは、`tools`に設定するのがよい。
ただし、**toolsでの設定ができないものに関して、PATHに追加したい場合は、Scripted Pipeline の`withEnv`を用いるのが一番よい。**

## 参考
[https://stackoverflow.com/questions/43237051/how-to-set-path-in-jenkins-declarative-pipeline](https://stackoverflow.com/questions/43237051/how-to-set-path-in-jenkins-declarative-pipeline)
