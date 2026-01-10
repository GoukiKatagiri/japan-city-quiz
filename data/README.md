# データソース

このディレクトリには日本の市区町村データが含まれています。

## データ元

- **ソース**: [code4fukui/localgovjp](https://github.com/code4fukui/localgovjp)
- **ライセンス**: CC0 (パブリックドメイン)
- **URL**: https://code4fukui.github.io/localgovjp/

## ファイル

- `cities.json`: 日本全国の市区町村データ（約1,900件）
  - 市区町村名、読み、都道府県、緯度経度を含む
- `prefectures.json`: 日本の都道府県データ（47件）

## データ更新

データを更新するには、プロジェクトルートで以下を実行：

```bash
node scripts/fetch-data.js
```
