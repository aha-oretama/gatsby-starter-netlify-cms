---
templateKey: blog-post
title: WebdriverIOでカスタムコマンドを追加する
date: 2019-03-27T02:10:44.970Z
description: >-
  WebdriverIOは自作のコマンドを`browser`,
  `element`に追加することができる。ここでは非アクティブなボタンを押すようなカスタムコマンドを作成してみる。
tags:
  - mocha
  - typescript
  - webdriverio
  - test
---
**環境**
* Node: v10.11.0
* mocha: 6.0.2
* WebdriverIO: 5.7.6
* typescript: 3.3.3333

詳細については公式ドキュメントを参考にしてほしい。
[https://webdriver.io/docs/customcommands.html](https://webdriver.io/docs/customcommands.html)

ここでは、非アクティブなボタンを押すようなカスタムコマンドを作成してみる。

## カスタムコマンドの作成

事前にWebdriverIOでTypeScriptを読み込めるように、設定はしておく。（[https://webdriver.io/docs/typescript.html](https://webdriver.io/docs/typescript.html)）

またmochaの設定も行っておく。（[https://webdriver.io/docs/frameworks.html#using-mocha](https://webdriver.io/docs/frameworks.html#using-mocha)）

ここで先に流れを説明しておく。
1. カスタムコマンドを追加する関数を定義する。
2. `wdio.conf.js`内の`before`メソッドで追加処理を呼び出す。
3. TypeScript用に@typeを定義し、読み込みを行う。

### カスタムコマンドを追加する関数を定義

今回は、非アクティブなボタンを押すための`nonDisplayedClick`メソッドを追加する。
ここで注意すべきことは、このファイルを読み込み先は`wdio.conf.js`で、JavaScriptであり、このファイルもJavaScriptで書かなければならないことだ。

```javascript:title=webdriverExtension.js
exports.addCustomCommand = () => {
  browser.addCommand("nonDisplayedClick", function (customSelect) {
    const selector = this.selector;

    if (customSelect) {
      browser.execute(`${customSelect}.click();`);
    } else if (selector.startsWith('#')) {
      const id = selector.substring(1);
      browser.execute(`document.getElementById('${id}').click();`)
    } else if (selector.startsWith('.')) {
      const className = selector.substring(1);
      browser.execute(`document.getElementsByClassName('${className}')[0].click();`)
    }
  }, true)
};
```

### `wdio.conf.js`内の`before`メソッドで追加処理を呼び出す

```javascript:title=wdio.conf.js
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  before: function (capabilities, specs) {
    require('ts-node').register({files: true});
    addCustomCommand();
  },
```

### TypeScript用に@typeを定義し、読み込みを行う
今回はElementオブジェクトにカスタムコマンドを追加したため、Elementオブジェクトに対して@typeを追加しなければならない。

TypeScriptの型に関しては若干古くなってしまっているが、この記事が役立った。  
[TypeScript の型定義ファイルと仲良くなろう](http://developer.hatenastaff.com/entry/2016/06/27/140931)

TypeScriptの型は

```typescript
declare namespace WebdriverIO {
  interface Element {
    nonDisplayedClick(): void;
  }
}
```
