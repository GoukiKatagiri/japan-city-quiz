# 日本全国市区町村クイズ

日本全国の市区町村を覚えるためのクイズゲームです。表示された市区町村名から、その都道府県を4択で当てるゲームです。

## 特徴

- 日本全国1,916件の市区町村データを収録
- 4択クイズ形式で楽しく学習
- **答え合わせ時に市区町村の境界を赤く表示する地図機能**
- スコアリングシステムとハイスコア記録
- レスポンシブデザイン（PC・タブレット・スマートフォン対応）
- 軽量でビルド不要（バニラJavaScript）

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
│   ├── quiz-generator.js  # クイズ生成
│   └── map.js             # 地図表示機能
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
- **Leaflet.js**: 地図表示ライブラリ
- **OpenStreetMap**: 地図タイルとデータソース
- **Overpass API**: 市区町村境界データの取得

フレームワークやビルドツールは使用していません。

## ゲームの遊び方

1. 「スタート」ボタンをクリック
2. 表示された市区町村名と読みを確認
3. 4つの都道府県から正解を選択
4. **答え合わせ後、市区町村の境界が赤くハイライトされた地図が表示されます**
5. 10問解答後、結果が表示されます

### スコアリング

- 基本点: 100点
- タイムボーナス: 最大50点（早く答えるほど高得点）
- ハイスコアはブラウザに保存されます

### 地図表示機能

答え合わせ時に、出題された市区町村の正確な位置と境界を地図上で確認できます：

- **市区町村境界**: 赤色でハイライト表示
- **自動ズーム**: 市区町村全体が見えるように自動調整
- **表示時間**: 5秒間表示後、次の問題へ
- **データソース**: OpenStreetMapのOverpass APIから境界データを取得

*注: インターネット接続が必要です。境界データが取得できない場合は、位置マーカーのみ表示されます。*

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

## 実装済み機能

- [x] 地図表示機能（Leaflet.js + Overpass API）
- [x] 市区町村境界の赤色ハイライト表示
- [x] スコアリングシステム
- [x] ハイスコア記録

## 将来の拡張機能

- [ ] 難易度選択（簡単・普通・難しい）
- [ ] タイマーモード
- [ ] 都道府県フィルター
- [ ] 統計情報グラフ（都道府県別正解率など）
- [ ] SNSシェア機能
- [ ] 音声読み上げ機能

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

データは [code4fukui/localgovjp](https://github.com/code4fukui/localgovjp) から取得しており、CC0ライセンスで提供されています。

## 貢献

バグ報告や機能リクエストは、Issueを開いてください。
プルリクエストも歓迎します！

## 作者

Created with Claude Code
