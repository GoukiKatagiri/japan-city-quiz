const https = require('https');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const CITIES_URL = 'https://code4fukui.github.io/localgovjp/localgovjp.json';
const PREFS_URL = 'https://code4fukui.github.io/localgovjp/prefjp.json';

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      if (res.statusCode !== 200) {
        reject(new Error(`HTTPステータス ${res.statusCode}: ${url}`));
        return;
      }

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (error) {
          reject(new Error(`JSON解析エラー: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`リクエストエラー: ${error.message}`));
    });
  });
}

async function main() {
  console.log('データ取得を開始します...\n');

  try {
    console.log('1. 市区町村データを取得中...');
    const cities = await fetchJSON(CITIES_URL);
    console.log(`   ✓ ${cities.length}件の市区町村データを取得しました`);

    console.log('2. 都道府県データを取得中...');
    const prefectures = await fetchJSON(PREFS_URL);
    console.log(`   ✓ ${prefectures.length}件の都道府県データを取得しました`);

    console.log('\n3. データをファイルに保存中...');
    const citiesPath = path.join(DATA_DIR, 'cities.json');
    const prefsPath = path.join(DATA_DIR, 'prefectures.json');

    fs.writeFileSync(citiesPath, JSON.stringify(cities, null, 2), 'utf8');
    console.log(`   ✓ cities.json を保存しました (${citiesPath})`);

    fs.writeFileSync(prefsPath, JSON.stringify(prefectures, null, 2), 'utf8');
    console.log(`   ✓ prefectures.json を保存しました (${prefsPath})`);

    console.log('\n✅ すべてのデータ取得が完了しました！');
    console.log(`\n📊 データ統計:`);
    console.log(`   - 市区町村: ${cities.length}件`);
    console.log(`   - 都道府県: ${prefectures.length}件`);

  } catch (error) {
    console.error('\n❌ エラーが発生しました:', error.message);
    process.exit(1);
  }
}

main();
