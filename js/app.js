import { QuizGame } from './game.js';
import { UIController } from './ui.js';
import { DataLoader } from './data-loader.js';
import { MapDisplay } from './map.js';

class App {
  constructor() {
    this.game = null;
    this.ui = null;
    this.dataLoader = new DataLoader();
    this.currentQuestion = null;
    this.mapDisplay = null;
    this.isAnswered = false;
  }

  async init() {
    try {
      this.ui = new UIController();
      this.ui.showLoading();

      const data = await this.dataLoader.loadData();
      this.game = new QuizGame(data.cities, data.prefectures);

      this.ui.hideLoading();
      this.setupEventListeners();
      this.ui.showStartScreen(this.game.getHighScore());

    } catch (error) {
      console.error('初期化エラー:', error);
      this.ui.showError('データの読み込みに失敗しました');
    }
  }

  setupEventListeners() {
    const startBtn = document.getElementById('start-btn');
    const retryBtn = document.getElementById('retry-btn');
    const homeBtn = document.getElementById('home-btn');
    const reloadBtn = document.getElementById('reload-btn');

    if (startBtn) {
      startBtn.addEventListener('click', () => this.startGame());
    }

    if (retryBtn) {
      retryBtn.addEventListener('click', () => this.startGame());
    }

    if (homeBtn) {
      homeBtn.addEventListener('click', () => {
        this.ui.showStartScreen(this.game.getHighScore());
      });
    }

    if (reloadBtn) {
      reloadBtn.addEventListener('click', () => {
        window.location.reload();
      });
    }
  }

  startGame() {
    this.game.reset();
    this.isAnswered = false;
    this.ui.showGameScreen();
    this.ui.updateScore(0);
    this.hideButtons();
    this.nextQuestion();
  }

  nextQuestion() {
    // Guard clause: 回答していない場合は何もしない
    if (!this.isAnswered && this.currentQuestion !== null) {
      return;
    }

    if (!this.game.hasMoreQuestions()) {
      this.showResults();
      return;
    }

    // 次の問題の準備
    this.isAnswered = false;
    this.hideButtons();

    this.currentQuestion = this.game.generateQuestion();
    this.ui.displayQuestion(
      this.currentQuestion,
      this.game.getCurrentQuestionNumber(),
      this.game.totalQuestions
    );
    this.ui.updateScore(this.game.getCurrentScore());

    this.setupChoiceListeners();
  }

  setupChoiceListeners() {
    const choiceBtns = document.querySelectorAll('.choice-btn');

    choiceBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.handleAnswer(e.target.dataset.prefecture);
      }, { once: true });
    });
  }

  handleAnswer(selectedPref) {
    // Guard clause: すでに回答済みの場合は何もしない（二重回答防止）
    if (this.isAnswered) {
      return;
    }

    this.isAnswered = true;
    this.ui.disableChoices();

    const result = this.game.checkAnswer(selectedPref, this.currentQuestion);
    this.ui.showFeedback(
      result.isCorrect,
      this.currentQuestion.correctAnswer,
      result.pointsEarned
    );
    this.ui.updateScore(this.game.getCurrentScore());

    // ボタンを表示
    this.showButtons();
    this.setupFeedbackButtons();
  }

  setupFeedbackButtons() {
    const showMapBtn = document.getElementById('show-map-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');

    if (showMapBtn) {
      showMapBtn.onclick = () => this.showMap();
    }

    if (nextQuestionBtn) {
      nextQuestionBtn.onclick = () => {
        this.cleanupMap();
        this.hideGoogleMapsLink();
        this.nextQuestion();
      };
    }
  }

  showButtons() {
    const showMapBtn = document.getElementById('show-map-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');

    if (showMapBtn) {
      showMapBtn.classList.remove('u-hidden');
    }
    if (nextQuestionBtn) {
      nextQuestionBtn.classList.remove('u-hidden');
    }
  }

  hideButtons() {
    const showMapBtn = document.getElementById('show-map-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');

    if (showMapBtn) {
      showMapBtn.classList.add('u-hidden');
    }
    if (nextQuestionBtn) {
      nextQuestionBtn.classList.add('u-hidden');
    }
  }

  showMap() {
    try {
      if (!this.mapDisplay) {
        this.mapDisplay = new MapDisplay('map-container');
      }

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
    const linkContainer = document.getElementById('google-maps-link');
    if (linkContainer && this.mapDisplay) {
      const url = this.mapDisplay.generateGoogleMapsUrl(
        this.currentQuestion.lat,
        this.currentQuestion.lng,
        this.currentQuestion.cityName
      );

      linkContainer.innerHTML = `
        <a href="${url}" target="_blank" rel="noopener noreferrer">
          📍 Google Mapsで開く
        </a>
      `;
      linkContainer.classList.remove('hidden');
    }
  }

  hideGoogleMapsLink() {
    const linkContainer = document.getElementById('google-maps-link');
    if (linkContainer) {
      linkContainer.classList.add('hidden');
      linkContainer.innerHTML = '';
    }
  }

  cleanupMap() {
    if (this.mapDisplay) {
      this.mapDisplay.destroy();
      this.mapDisplay = null;
    }

    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
      mapContainer.classList.add('hidden');
    }
  }

  showResults() {
    const results = this.game.getResults();
    this.ui.showResultScreen(results);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
