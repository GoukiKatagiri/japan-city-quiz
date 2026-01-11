export class UIController {
  constructor() {
    this.elements = {
      // Screens
      loadingScreen: document.getElementById('loading-screen'),
      startScreen: document.getElementById('start-screen'),
      gameScreen: document.getElementById('game-screen'),
      resultScreen: document.getElementById('result-screen'),
      errorScreen: document.getElementById('error-screen'),

      // Start Screen
      highScore: document.getElementById('high-score'),

      // Game Screen
      currentScore: document.getElementById('current-score'),
      questionNum: document.getElementById('question-num'),
      cityName: document.getElementById('city-name'),
      cityKana: document.getElementById('city-kana'),
      choices: document.getElementById('choices'),
      feedback: document.getElementById('feedback'),
      postAnswerArea: document.getElementById('post-answer-area'),
      feedbackTextContainer: document.querySelector('#feedback .feedback-text'),
      feedbackResultText: document.getElementById('feedback-result-text'),
      feedbackPointsText: document.getElementById('feedback-points-text'),
      feedbackCorrectAnswerText: document.getElementById('feedback-correct-answer-text'),
      mapContainer: document.getElementById('map-container'),
      googleMapsLink: document.getElementById('google-maps-link'),

      // Result Screen
      finalScore: document.getElementById('final-score'),
      accuracy: document.getElementById('accuracy'),
      correctCount: document.getElementById('correct-count'),
      newRecord: document.getElementById('new-record'),

      // Error Screen
      errorMessage: document.getElementById('error-message'),
    };

    this.screens = [
      this.elements.loadingScreen,
      this.elements.startScreen,
      this.elements.gameScreen,
      this.elements.resultScreen,
      this.elements.errorScreen,
    ];
  }

  // --- State-based UI Update ---
  updateView(phase) {
    const isQuestionPhase = phase === 'question';
    this.elements.postAnswerArea?.classList.toggle('u-hidden', isQuestionPhase);

    if (isQuestionPhase) {
      this.elements.mapContainer?.classList.add('hidden');
      this.elements.googleMapsLink?.classList.add('hidden');
    }
  }

  // --- Screen Management ---
  hideAllScreens() {
    this.screens.forEach(screen => {
      if (screen) screen.classList.add('hidden');
    });
  }

  showScreen(screenName, data = {}) {
    this.hideAllScreens();
    switch (screenName) {
      case 'loading':
        this.elements.loadingScreen?.classList.remove('hidden');
        break;
      case 'start':
        this.elements.startScreen?.classList.remove('hidden');
        if (this.elements.highScore) {
          this.elements.highScore.textContent = (data.highScore || 0).toLocaleString();
        }
        break;
      case 'game':
        this.elements.gameScreen?.classList.remove('hidden');
        break;
      case 'result':
        this.elements.resultScreen?.classList.remove('hidden');
        this.renderResults(data.results);
        break;
      case 'error':
        this.elements.errorScreen?.classList.remove('hidden');
        if (this.elements.errorMessage) {
          this.elements.errorMessage.textContent = data.message || '不明なエラーが発生しました';
        }
        break;
    }
  }

  renderResults(results) {
    if (!results) return;
    if (this.elements.finalScore) this.elements.finalScore.textContent = results.score.toLocaleString();
    if (this.elements.accuracy) this.elements.accuracy.textContent = `${results.accuracy}%`;
    if (this.elements.correctCount) {
      this.elements.correctCount.textContent = `${results.correctCount}/${results.totalQuestions}`;
    }
    this.elements.newRecord?.classList.toggle('hidden', !results.isNewRecord);
  }


  // --- Game Component Rendering ---
  displayQuestion(question, questionNumber) {
    if (this.elements.cityName) this.elements.cityName.textContent = question.cityName;
    if (this.elements.cityKana) this.elements.cityKana.textContent = `(${question.cityKana})`;
    if (this.elements.questionNum) this.elements.questionNum.textContent = questionNumber;

    if (this.elements.choices) {
      this.elements.choices.innerHTML = '';
      question.choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice;
        button.dataset.prefecture = choice;
        this.elements.choices.appendChild(button);
      });
    }

    this.hideFeedback();
    this.updateView('question');
  }

  updateScore(score) {
    if (this.elements.currentScore) {
      this.elements.currentScore.textContent = score.toLocaleString();
    }
  }

  showFeedback(isCorrect, correctAnswer, pointsEarned = 0) {
    const { feedback, feedbackResultText, feedbackPointsText, feedbackCorrectAnswerText } = this.elements;

    if (feedback && feedbackResultText && feedbackPointsText && feedbackCorrectAnswerText) {
      if (isCorrect) {
        feedback.className = 'feedback correct';
        feedbackResultText.textContent = '正解！';
        feedbackPointsText.textContent = `+${pointsEarned}点`;
        feedbackCorrectAnswerText.textContent = '';
      } else {
        feedback.className = 'feedback wrong';
        feedbackResultText.textContent = '不正解';
        feedbackPointsText.textContent = '';
        feedbackCorrectAnswerText.textContent = `正解: ${correctAnswer}`;
      }
      feedback.classList.remove('hidden');
    }

    const choiceBtns = this.elements.choices.querySelectorAll('.choice-btn');
    choiceBtns.forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.prefecture === correctAnswer) {
        btn.classList.add('correct');
      }
    });

    this.updateView('feedback');
  }

  hideFeedback() {
    if (this.elements.feedback) {
      this.elements.feedback.classList.add('hidden');
    }
  }

  disableChoices() {
    const choiceBtns = this.elements.choices.querySelectorAll('.choice-btn');
    choiceBtns.forEach(btn => {
      btn.disabled = true;
    });
  }
}
