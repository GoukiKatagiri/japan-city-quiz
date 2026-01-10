# 日本全国市区町村クイズ

日本全国の市区町村を覚えるためのクイズゲームです。表示された市区町村名から、その都道府県を4択で当てるゲームです。

## 特徴

- 日本全国1,916件の市区町村データを収録
- 4択クイズ形式で楽しく学習
- スコアリングシステムとハイスコア記録
- レスポンシブデザイン（PC・タブレット・スマートフォン対応）
- 軽量でビルド不要（バニラJavaScript）

## デモ

ローカルで動作を確認する方法:

```bash
cd japan-city-quiz
python3 -m http.server 8000
```

ブラウザで http://localhost:8000 にアクセス

## プロジェクト構造

```
japan-city-quiz/
├── index.html              # メインHTML
├── README.md               # このファイル
├── .gitignore
│
├── css/
│   ├── style.css          # メインスタイル
│   └── responsive.css     # レスポンシブデザイン
│
├── js/
│   ├── app.js             # アプリケーションエントリーポイント
│   ├── game.js            # ゲームロジック
│   ├── ui.js              # UI操作
│   ├── data-loader.js     # データ読み込み
│   └── quiz-generator.js  # クイズ生成
│
├── data/
│   ├── cities.json        # 市区町村データ (1,916件)
│   ├── prefectures.json   # 都道府県データ (47件)
│   └── README.md          # データソース説明
│
└── scripts/
    └── fetch-data.js      # データ取得スクリプト
```

## データについて

### データソース

- [code4fukui/localgovjp](https://github.com/code4fukui/localgovjp)
- ライセンス: CC0 (パブリックドメイン)

### データの更新

```bash
node scripts/fetch-data.js
```

## 技術スタック

- **HTML5 / CSS3**: UI構築
- **JavaScript (ES6 Modules)**: ゲームロジック
- **Fetch API**: データ読み込み
- **LocalStorage**: ハイスコア保存

フレームワークやビルドツールは使用していません。

## ゲームの遊び方

1. 「スタート」ボタンをクリック
2. 表示された市区町村名と読みを確認
3. 4つの都道府県から正解を選択
4. 10問解答後、結果が表示されます

### スコアリング

- 基本点: 100点
- タイムボーナス: 最大50点（早く答えるほど高得点）
- ハイスコアはブラウザに保存されます

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

## 将来の拡張機能

- [ ] 地図表示機能（Leaflet.js）
- [ ] 難易度選択（簡単・普通・難しい）
- [ ] タイマーモード
- [ ] 都道府県フィルター
- [ ] 統計情報グラフ
- [ ] SNSシェア機能

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

データは [code4fukui/localgovjp](https://github.com/code4fukui/localgovjp) から取得しており、CC0ライセンスで提供されています。

## 貢献

バグ報告や機能リクエストは、Issueを開いてください。
プルリクエストも歓迎します！

## 作者

Created with Claude Code
