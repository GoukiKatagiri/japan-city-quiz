# 日本全国市区町村クイズ

日本全国の市区町村を覚えるためのクイズゲームです。表示された市区町村名から、その都道府県を4択で当てるゲームです。

## 特徴

- **日本全国1,741件の市区町村データを収録**
- **4択クイズ形式で楽しく学習**
- **地図表示機能（Leaflet.js + Google Maps連携）**
  - 答え合わせ後、任意のタイミングで地図表示
  - 市区町村の位置にピンマーカー表示
  - Google Maps詳細リンク
- **スコアリングシステム**
  - 基本点100点 + タイムボーナス最大50点
  - ハイスコア記録（localStorage）
- **堅牢な状態管理**
  - 二重回答防止機構
  - UI状態の厳密な制御
- **レスポンシブデザイン**（PC・タブレット・スマートフォン対応）
- **軽量・高速**（フレームワーク不使用、ビルド不要）

## デモ

**オンラインでプレイ**: https://goukikatagiri.github.io/japan-city-quiz/

### ローカルで動作を確認する方法

```bash
cd japan-city-quiz
python3 -m http.server 8000
```

ブラウザで http://localhost:8000 にアクセス

## プロジェクト構造

```
japan-city-quiz/
├── index.html              # メインHTML（UI構造定義）
├── README.md               # プロジェクト説明
├── .gitignore
│
├── css/
│   ├── style.css          # メインスタイル（デザインシステム）
│   └── responsive.css     # レスポンシブデザイン
│
├── js/
│   ├── app.js             # アプリケーション統合・状態管理
│   ├── game.js            # ゲームロジック・スコアリング
│   ├── ui.js              # UI操作・画面遷移
│   ├── data-loader.js     # データ読み込み（Fetch API）
│   ├── quiz-generator.js  # クイズ生成アルゴリズム
│   └── map.js             # 地図表示機能（Leaflet.js）
│
├── data/
│   ├── cities.json        # 市区町村データ（1,741件）
│   ├── prefectures.json   # 都道府県データ（47件）
│   └── README.md          # データソース説明
│
└── scripts/
    └── fetch-data.js      # データ取得スクリプト（Node.js）
```

## データについて

### データソース

- [code4fukui/localgovjp](https://github.com/code4fukui/localgovjp)
- ライセンス: CC0 (パブリックドメイン)

### データ範囲

クイズの対象は、日本の市、町、村、および東京都の特別区（23区）です。政令指定都市の行政区は、クイズの公平性を保つため対象外としています。

### データの更新

```bash
node scripts/fetch-data.js
```

## 技術スタック

- **HTML5 / CSS3**: UI構築
- **JavaScript (ES6 Modules)**: ゲームロジック
- **Fetch API**: データ読み込み
- **LocalStorage**: ハイスコア保存
- **Leaflet.js**: 地図表示ライブラリ
- **OpenStreetMap**: 地図タイル
- **Google Maps**: 詳細地図表示連携

フレームワークやビルドツールは使用していません。

## ゲームの遊び方

1. **「スタート」ボタンをクリック**
2. **表示された市区町村名と読みを確認**
3. **4つの都道府県から正解を選択**
   - 選択後、正誤判定が即座に表示されます
   - 正解の選択肢が緑色にハイライト
4. **「地図を見る」ボタンで位置確認（任意）**
   - 都道府県全体が見える縮尺で地図表示
   - 市区町村の位置にピンマーカー
   - Google Maps詳細リンク付き
5. **「次の問題へ」ボタンで次に進む**
6. **10問解答後、結果が表示されます**
   - 総スコア、正解率、正解数
   - 新記録達成時は通知表示

### スコアリング

- **基本点**: 100点
- **タイムボーナス**: 最大50点（早く答えるほど高得点）
- **ハイスコア**: ブラウザのlocalStorageに保存

### 地図表示機能の詳細

- **表示タイミング**: 答え合わせ後、ユーザーが「地図を見る」をクリック
- **表示内容**: 都道府県全体が見える縮尺で、市区町村の位置にマーカー表示
- **Google Maps連携**: リンクをクリックすると、新しいタブで詳細情報を確認可能
- **高速表示**: シンプルなマーカー表示により即座に読み込み

## 開発

### 必要な環境

- モダンブラウザ（Chrome, Firefox, Safari, Edge）
- ES6 Modules対応
- Node.js（データ取得スクリプト実行用）

### 開発手順

1. リポジトリをクローン

```bash
git clone <repository-url>
cd japan-city-quiz
```

2. データを取得

```bash
node scripts/fetch-data.js
```

3. ローカルサーバーを起動

```bash
python3 -m http.server 8000
```

または、VS Codeの Live Server拡張機能を使用

4. ブラウザで http://localhost:8000 を開く

## デプロイ

### GitHub Pages

1. GitHubにリポジトリを作成
2. コードをプッシュ

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <repository-url>
git push -u origin main
```

3. GitHub Settings > Pages > Source: main branch
4. 公開URL: `https://<username>.github.io/japan-city-quiz/`

### その他のホスティング

- Netlify
- Vercel
- Firebase Hosting

すべて静的ファイルなので、どのホスティングサービスでも動作します。

## 技術的特徴

### アーキテクチャ

- **モジュール設計**: ES6 Modulesによる機能分離
  - `app.js`: アプリケーション統合・イベント制御
  - `game.js`: ゲームロジック・スコア管理
  - `ui.js`: UI操作・画面遷移
  - `quiz-generator.js`: クイズ生成アルゴリズム
  - `map.js`: 地図表示機能
  - `data-loader.js`: データ読み込み

- **堅牢な状態管理**
  - `isAnswered`フラグによる二重回答防止
  - Guard clauseパターンによる不正な状態遷移の防止
  - `#post-answer-area`コンテナによるUI状態の原子的制御

- **パフォーマンス最適化**
  - 静的ファイルのみ（ビルド不要）
  - 地図表示の遅延読み込み
  - LocalStorageキャッシング

### コードスタイル

- クリーンコード原則に基づく実装
- 単一責任の原則（SRP）
- 可読性重視のネーミング

## 実装済み機能

- [x] 選択式地図表示機能（Leaflet.js + Google Maps連携）
- [x] 市区町村位置のマーカー表示
- [x] スコアリングシステム（基本点 + タイムボーナス）
- [x] ハイスコア記録（localStorage）
- [x] Google Maps詳細表示リンク
- [x] 二重回答防止機構
- [x] UI状態の厳密な制御（v1.2.1）
- [x] レスポンシブデザイン

## 将来の拡張機能

- [ ] 難易度選択（簡単・普通・難しい）
- [ ] タイマーモード
- [ ] 都道府県フィルター（特定地域のみ出題）
- [ ] 統計情報表示（都道府県別正解率グラフなど）
- [ ] SNSシェア機能（結果をTwitter/LINEでシェア）
- [ ] 音声読み上げ機能（アクセシビリティ向上）
- [ ] 間違えた問題の復習モード

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

データは [code4fukui/localgovjp](https://github.com/code4fukui/localgovjp) から取得しており、CC0ライセンスで提供されています。

## 貢献

バグ報告や機能リクエストは、Issueを開いてください。
プルリクエストも歓迎します！

## 作者

Created with Claude Code
