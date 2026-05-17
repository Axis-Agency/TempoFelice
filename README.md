# TempoFelice site starter

## ファイル構成

- `index.html`：ブランドサイト本体
- `recruit.html`：採用ページ
- `style.css`：デザイン
- `script.js`：スマホメニュー用の簡単な動き

## 後から差し替える場所

### 店舗SNS・LINE
`index.html` 内の以下のような箇所を、URLが決まったら `<a>` タグに変更してください。

```html
<span class="button small disabled">Instagram 準備中</span>
<span class="button small disabled">公式LINE 準備中</span>
```

例：

```html
<a class="button small secondary" href="https://www.instagram.com/xxxxx/" target="_blank" rel="noopener">Instagram</a>
<a class="button small secondary" href="https://lin.ee/xxxxx" target="_blank" rel="noopener">公式LINE</a>
```

### 鹿児島天文館店のHot Pepper
準備でき次第、以下を差し替えてください。

```html
<span class="button small disabled">Hot Pepper 準備中</span>
```

例：

```html
<a class="button small primary" href="HOTPEPPER_URL" target="_blank" rel="noopener">Hot Pepper Beauty</a>
```

### 写真
現在はCSSのグラデーションプレースホルダーです。
写真を使う場合は、`store-photo placeholder` の部分を画像タグに置き換えます。

```html
<div class="store-photo">
  <img src="images/hamamatsu.jpg" alt="TempoFelice 浜松店の内観">
</div>
```

画像を入れる場合は `images` フォルダを作り、写真ファイルを入れてください。


## 2026-05 Recruit update
`recruit.html` に給与規程ベースの美容サロン採用条件、モバイル販売支援事業の最低賃金調整文言、共通制度・各種手当セクションを追加しました。
GitHubでは `recruit.html` と `style.css` を上書きアップロードしてください。


## Beauty salon allowance fix
美容サロン採用の手当一覧から「職務手当」「特別手当」を削除しました。
Benefits セクションも、共通手当と誤認されにくいよう「各種手当・制度」に表現調整しています。
