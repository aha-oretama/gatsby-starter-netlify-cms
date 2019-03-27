---
templateKey: blog-post
title: RxJavaを同期的にテストする方法 〜Androidテスト全書から〜
date: 2019-03-27T01:53:56.766Z
description: RxJavaを同期的にテストする方法はいくつかある。ここでは、一番汎用的に使えるJUnit4 のRuleで同期的にする方法をまとめておく。
tags:
  - android
  - rxjava
  - async
---
今回はすべて[Androidテスト全書](https://peaks.cc/books/android_testing)を参考にしている。

## 非同期処理のテスト方法
まず非同期処理を同期的にする方法として、いくつかの方法が紹介されていた。

**一般的な非同期処理に対するテスト方法（RxJava問わず）**
* CountDownLatchを使った非同期コールバックの待ち合わせ
* コールバック内でアサーションしない改善手法  
（非同期処理の結果を`Future`オブジェクトで返却して、同期的処理する方法）

**RxJavaでの非同期処理に対するテスト方法**
* TestObserverを使った方法
* RxJava/RxAndroidのPluginでスケジューラ差し替え

ここでは、一番汎用的だと感じた*RxJava/RxAndroidのPluginでスケジューラ差し替え*についてまとめる。

## RxJava/RxAndroidのPluginでスケジューラ差し替え

処理をその場で実行するimmediateというスケジューラインスタンスを作り、RxJava/RxAndroidのPluginという仕組みを使って、主要なスケジューラをすべてimmediateに差し替える。

```kotlin
class RxImmediateSchedulerRule : TestRule {
  private val immediate = object : Scheduler() {
    override fun scheduleDirect(run: Runnable, delay: Long, unit: TimeUnit): Disposable {
      return super.scheduleDirect(run, 0, unit)
    }

    override fun createWorker(): Scheduler.Worker {
      return ExecutorScheduler.ExecutorWorker(Executor { it.run() })
    }
  }

  override fun apply(base: Statement, description: Description): Statement {
    return object : Statement() {
      @Throws(Throwable::class)
      override fun evaluate() {
        RxJavaPlugins.setInitIoSchedulerHandler { _ -> immediate }
        RxJavaPlugins.setInitComputationSchedulerHandler { _ -> immediate }
        RxJavaPlugins.setInitNewThreadSchedulerHandler { _ -> immediate }
        RxJavaPlugins.setInitSingleSchedulerHandler { _ -> immediate }
        RxAndroidPlugins.setInitMainThreadSchedulerHandler { _ -> immediate }

        try {
          base.evaluate()
        } finally {
          RxJavaPlugins.reset()
          RxAndroidPlugins.reset()
        }
      }
    }
  }
}
```
