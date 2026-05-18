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


## Mobile salary update
モバイル販売支援事業の給与欄を「207,545円〜320,000円」に変更し、固定残業代・各種手当・月給30万円以上可能の説明を追加しました。
GitHubでは recruit.html を上書きアップロードしてください。


## Store info update
トップページの店舗欄に営業時間、定休日、電話番号を追加しました。
サービス欄の正式メニュー名を「眉WAX＋美眉スタイリング」「HBL＋眉WAX＋美眉スタイリング」「HBLのみ」「眉WAXのみ」「間引き」に更新しました。
GitHubでは index.html と style.css を上書きアップロードしてください。


## Flexible work update
採用ページにフレックス制の訴求セクションを追加しました。
月間20日勤務・月160時間を基準に、出退勤時間を柔軟に調整できる旨を、美容サロン採用・モバイル販売支援事業採用の両方に反映しています。
GitHubでは recruit.html と style.css を上書きアップロードしてください。


## Stylish background + recruit message update
採用ページのメッセージを「プライベートも大切にしながら仕事で成長し、人生を幸福な時間へ」という方向に変更しました。
CSSに背景グリッド、装飾グラデーション、カードの質感、ヒーロー枠線などを追加し、爽やかでおしゃれな印象に調整しました。
GitHubでは recruit.html と style.css を上書きアップロードしてください。


## Crafted no-photo update
写真なしでも見栄えがするよう、抽象的な眉ビジュアル、選ばれる理由、施術の流れ、FAQ、スクロール表示アニメーションを追加しました。
GitHubでは index.html / style.css / script.js を上書きアップロードしてください。


## Hamamatsu Ekimae photos and Google Maps update
浜松駅前店の外観写真2枚を店舗カードに追加しました。
各店舗カードにGoogleマップの埋め込みと「Google Map」ボタンを追加しました。
GitHubでは index.html / style.css / hamamatsu-ekimae-exterior-1.jpg / hamamatsu-ekimae-exterior-2.jpg を上書き・追加アップロードしてください。


## Privacy page and company info update
Company欄に所在地・設立日を追加しました。
privacy.html を新規作成し、トップページ・採用ページのフッターに Privacy Policy リンクを追加しました。
GitHubでは index.html / recruit.html / privacy.html / style.css を上書き・追加アップロードしてください。


## Social links update
会社公式LINE、静岡店のInstagram/公式LINE、鹿児島天文館店のInstagram/公式LINEを反映しました。
採用ページの応募相談導線とプライバシーポリシーのお問い合わせ先を会社公式LINEに変更しました。
GitHubでは index.html / recruit.html / privacy.html / style.css を上書きしてください。
