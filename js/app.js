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
    this.ui.showGameScreen();
    this.ui.updateScore(0);
    this.nextQuestion();
  }

  nextQuestion() {
    if (!this.game.hasMoreQuestions()) {
      this.showResults();
      return;
    }

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

  async handleAnswer(selectedPref) {
    this.ui.disableChoices();

    const result = this.game.checkAnswer(selectedPref, this.currentQuestion);
    this.ui.showFeedback(
      result.isCorrect,
      this.currentQuestion.correctAnswer,
      result.pointsEarned
    );
    this.ui.updateScore(this.game.getCurrentScore());

    await this.showMap();

    setTimeout(() => {
      this.cleanupMap();
      this.nextQuestion();
    }, 5000);
  }

  async showMap() {
    try {
      if (!this.mapDisplay) {
        this.mapDisplay = new MapDisplay('map-container');
      }

      await this.mapDisplay.showCityBoundary(
        this.currentQuestion.cityName,
        this.currentQuestion.lat,
        this.currentQuestion.lng
      );
    } catch (error) {
      console.error('地図表示エラー:', error);
    }
  }

  cleanupMap() {
    if (this.mapDisplay) {
      this.mapDisplay.destroy();
      this.mapDisplay = null;
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
