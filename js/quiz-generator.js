export class QuizGenerator {
  constructor(cities, prefectures) {
    this.cities = cities;
    this.prefectures = prefectures;
    this.usedCityIds = new Set();
  }

  selectRandomCity() {
    const availableCities = this.cities.filter(
      city => !this.usedCityIds.has(city.cid)
    );

    if (availableCities.length === 0) {
      this.usedCityIds.clear();
      return this.selectRandomCity();
    }

    const randomIndex = Math.floor(Math.random() * availableCities.length);
    const selectedCity = availableCities[randomIndex];
    this.usedCityIds.add(selectedCity.cid);

    return selectedCity;
  }

  generateChoices(correctPref) {
    const choices = [correctPref];
    const otherPrefs = this.prefectures
      .map(p => p.pref)
      .filter(p => p !== correctPref);

    while (choices.length < 4) {
      const randomIndex = Math.floor(Math.random() * otherPrefs.length);
      const randomPref = otherPrefs[randomIndex];

      if (!choices.includes(randomPref)) {
        choices.push(randomPref);
      }
    }

    return this.shuffle(choices);
  }

  shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  generateQuestion() {
    const city = this.selectRandomCity();
    const choices = this.generateChoices(city.pref);

    return {
      city: city,
      cityName: city.city,
      cityKana: city.citykana,
      correctAnswer: city.pref,
      choices: choices,
      lat: parseFloat(city.lat),
      lng: parseFloat(city.lng)
    };
  }

  reset() {
    this.usedCityIds.clear();
  }
}
