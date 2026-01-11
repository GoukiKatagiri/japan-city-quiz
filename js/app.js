import { QuizGame } from './game.js';
import { UIController } from './ui.js';
import { DataLoader } from './data-loader.js';
import { MapDisplay } from './map.js';

class App {
  constructor() {
    this.game = null;
    this.ui = new UIController();
    this.dataLoader = new DataLoader();
    this.currentQuestion = null;
    this.mapDisplay = null;
    this.isAnswered = false;

    this.elements = {
      startBtn: document.getElementById('start-btn'),
      retryBtn: document.getElementById('retry-btn'),
      homeBtn: document.getElementById('home-btn'),
      reloadBtn: document.getElementById('reload-btn'),
      showMapBtn: document.getElementById('show-map-btn'),
      nextQuestionBtn: document.getElementById('next-question-btn'),
    };
  }

  async init() {
    try {
      this.ui.showScreen('loading');

      const data = await this.dataLoader.loadData();
      this.game = new QuizGame(data.cities, data.prefectures);

      this.setupEventListeners();
      this.ui.showScreen('start', { highScore: this.game.getHighScore() });

    } catch (error) {
      console.error('初期化エラー:', error);
      this.ui.showScreen('error', { message: 'データの読み込みに失敗しました' });
    }
  }

  setupEventListeners() {
    this.elements.startBtn?.addEventListener('click', () => this.startGame());
    this.elements.retryBtn?.addEventListener('click', () => this.startGame());
    this.elements.homeBtn?.addEventListener('click', () => {
      this.ui.showScreen('start', { highScore: this.game.getHighScore() });
    });
    this.elements.reloadBtn?.addEventListener('click', () => {
      window.location.reload();
    });
  }

  startGame() {
    this.game.reset();
    this.isAnswered = false;
    this.ui.showScreen('game');
    this.ui.updateScore(0);
    this.nextQuestion();
  }

  nextQuestion() {
    if (!this.isAnswered && this.currentQuestion !== null) {
      return;
    }

    if (!this.game.hasMoreQuestions()) {
      this.showResults();
      return;
    }

    this.isAnswered = false;
    this.cleanupMap(); // Mapインスタンスの破棄はAppの責務

    this.currentQuestion = this.game.generateQuestion();
    this.ui.displayQuestion(
      this.currentQuestion,
      this.game.getCurrentQuestionNumber()
    );
    this.ui.updateScore(this.game.getCurrentScore());

    this.setupChoiceListeners();
  }

  setupChoiceListeners() {
    const choiceBtns = this.ui.elements.choices.querySelectorAll('.choice-btn');
    choiceBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.handleAnswer(e.target.dataset.prefecture);
      }, { once: true });
    });
  }

  handleAnswer(selectedPref) {
    if (this.isAnswered) {
      return;
    }
    this.isAnswered = true;

    const result = this.game.checkAnswer(selectedPref, this.currentQuestion);
    this.ui.showFeedback(
      result.isCorrect,
      this.currentQuestion.correctAnswer,
      result.pointsEarned
    );
    this.ui.updateScore(this.game.getCurrentScore());

    this.setupFeedbackButtons();
  }

  setupFeedbackButtons() {
    this.elements.showMapBtn.onclick = () => this.showMap();
    this.elements.nextQuestionBtn.onclick = () => this.nextQuestion();
  }

  showMap() {
    try {
      if (!this.mapDisplay) {
        this.mapDisplay = new MapDisplay(this.ui.elements.mapContainer.id);
      }

      this.ui.elements.mapContainer?.classList.remove('hidden');
      this.mapDisplay.showCityLocation(
        this.currentQuestion.cityName,
        this.currentQuestion.lat,
        this.currentQuestion.lng,
        this.currentQuestion.correctAnswer
      );

      this.showGoogleMapsLink();
    } catch (error) {
      console.error('地図表示エラー:', error);
    }
  }

  showGoogleMapsLink() {
    const { googleMapsLink } = this.ui.elements;
    if (googleMapsLink && this.mapDisplay) {
      const url = this.mapDisplay.generateGoogleMapsUrl(
        this.currentQuestion.lat,
        this.currentQuestion.lng,
        this.currentQuestion.cityName
      );

      googleMapsLink.innerHTML = `
        <a href="${url}" target="_blank" rel="noopener noreferrer">
          📍 Google Mapsで開く
        </a>
      `;
      googleMapsLink.classList.remove('hidden');
    }
  }

  cleanupMap() {
    if (this.mapDisplay) {
      this.mapDisplay.destroy();
      this.mapDisplay = null;
    }
    // DOM操作はui.jsに任せる (updateViewがやってくれる)
  }

  showResults() {
    const results = this.game.getResults();
    this.ui.showScreen('result', { results });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
