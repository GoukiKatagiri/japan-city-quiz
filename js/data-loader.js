export class DataLoader {
  constructor() {
    this.citiesPath = './data/cities.json';
    this.prefsPath = './data/prefectures.json';
    this.cache = null;
  }

  async loadData() {
    if (this.cache) {
      return this.cache;
    }

    try {
      const [citiesResponse, prefsResponse] = await Promise.all([
        fetch(this.citiesPath),
        fetch(this.prefsPath)
      ]);

      if (!citiesResponse.ok || !prefsResponse.ok) {
        throw new Error('データの取得に失敗しました');
      }

      const cities = await citiesResponse.json();
      const prefectures = await prefsResponse.json();

      this.cache = { cities, prefectures };
      return this.cache;

    } catch (error) {
      console.error('データ読み込みエラー:', error);
      throw error;
    }
  }
}
