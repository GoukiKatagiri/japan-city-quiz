# 日本全国市区町村クイズ 🗾

**表示された市区町村がどの都道府県に属するかを当てる、シンプルで中毒性の高いクイズゲーム。**

洗練されたUIとスムーズな操作性で、日本の地理に詳しくなろう！

**オンラインでプレイ**: [https://goukikatagiri.github.io/japan-city-quiz/](https://goukikatagiri.github.io/japan-city-quiz/)

---

## ✨ 主な機能

- **🗾 全国の市区町村から出題**: 1,700以上の市区町村からランダムで問題が生成されます。
- **🧠 直感的な4択クイズ**: シンプルなインターフェースで、サクサク解答できます。
- **🗺️ 即時的な地図フィードバック**: 解答後、即座に正解の市区町村の地図が自動で表示され、地理的な理解を深めます。
- **✨ 洗練されたUI/UX**: レイアウトのガタつきをなくし、スムーズなアニメーションで快適なプレイ体験を提供します。
- **🏆 スコア＆ハイスコア**: 正解までの時間も考慮したスコアリングシステムと、自己ベストを更新する楽しみがあります。
- **📱 レスポンシブデザイン**: PC、タブレット、スマートフォンなど、あらゆるデバイスで快適にプレイできます。
- **⚡ パフォーマンス最適化**: 軽量なコードと最適化された処理により、ストレスのない高速な動作を実現しています。

## 🛠️ 技術スタック

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6 Modules)
- **Map**: [Leaflet.js](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/)
- **Build**: No build tools required.

## 🚀 ローカルでの実行方法

1.  リポジトリをクローンします。
    ```bash
    git clone https://github.com/GoukiKatagiri/japan-city-quiz.git
    cd japan-city-quiz
    ```

2.  ローカルサーバーを起動します。Pythonがインストールされている場合、以下のコマンドが使えます。
    ```bash
    python3 -m http.server
    ```
    (または、VS Codeの [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 拡張機能などを使用)

3.  ブラウザで `http://localhost:8000` を開きます。

## 📂 プロジェクト構造

```
.
├── index.html              # UI構造
├── README.md
├── css/
│   ├── style.css           # メインスタイル
│   └── responsive.css      # レスポンシブ対応
├── js/
│   ├── app.js              # アプリケーション統合・イベント制御
│   ├── game.js             # ゲームロジック・スコアリング
│   ├── ui.js               # UI操作・画面遷移
│   ├── data-loader.js      # データ読み込み
│   ├── quiz-generator.js   # クイズ生成
│   └── map.js              # 地図表示 (Leaflet.js)
└── data/
    ├── cities.json         # 市区町村データ
    └── prefectures.json    # 都道府県データ
```

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。
使用している市区町村データは [code4fukui/localgovjp](https://github.com/code4fukui/localgovjp) (CC0) に基づいています。

---
*This project was built with the assistance of an AI coding agent.*