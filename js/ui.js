export class UIController {
  constructor() {
    this.screens = {
      loading: document.getElementById('loading-screen'),
      start: document.getElementById('start-screen'),
      game: document.getElementById('game-screen'),
      result: document.getElementById('result-screen'),
      error: document.getElementById('error-screen')
    };
  }

  hideAllScreens() {
    Object.values(this.screens).forEach(screen => {
      if (screen) screen.classList.add('hidden');
    });
  }

  showLoading() {
    this.hideAllScreens();
    if (this.screens.loading) {
      this.screens.loading.classList.remove('hidden');
    }
  }

  hideLoading() {
    if (this.screens.loading) {
      this.screens.loading.classList.add('hidden');
    }
  }

  showStartScreen(highScore = 0) {
    this.hideAllScreens();
    if (this.screens.start) {
      this.screens.start.classList.remove('hidden');
      const highScoreElement = document.getElementById('high-score');
      if (highScoreElement) {
        highScoreElement.textContent = highScore.toLocaleString();
      }
    }
  }

  showGameScreen() {
    this.hideAllScreens();
    if (this.screens.game) {
      this.screens.game.classList.remove('hidden');
    }
  }

  showResultScreen(results) {
    this.hideAllScreens();
    if (this.screens.result) {
      this.screens.result.classList.remove('hidden');

      const finalScore = document.getElementById('final-score');
      const accuracy = document.getElementById('accuracy');
      const correctCount = document.getElementById('correct-count');
      const newRecord = document.getElementById('new-record');

      if (finalScore) finalScore.textContent = results.score.toLocaleString();
      if (accuracy) accuracy.textContent = `${results.accuracy}%`;
      if (correctCount) {
        correctCount.textContent = `${results.correctCount}/${results.totalQuestions}`;
      }

      if (newRecord) {
        if (results.isNewRecord) {
          newRecord.classList.remove('hidden');
        } else {
          newRecord.classList.add('hidden');
        }
      }
    }
  }

  showError(message) {
    this.hideAllScreens();
    if (this.screens.error) {
      this.screens.error.classList.remove('hidden');
      const errorMessage = document.getElementById('error-message');
      if (errorMessage) {
        errorMessage.textContent = message;
      }
    }
  }

  displayQuestion(question, questionNumber, totalQuestions) {
    const cityName = document.getElementById('city-name');
    const cityKana = document.getElementById('city-kana');
    const choicesContainer = document.getElementById('choices');
    const questionNum = document.getElementById('question-num');

    if (cityName) cityName.textContent = question.cityName;
    if (cityKana) cityKana.textContent = `(${question.cityKana})`;
    if (questionNum) questionNum.textContent = questionNumber;

    if (choicesContainer) {
      choicesContainer.innerHTML = '';
      question.choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice;
        button.dataset.prefecture = choice;
        choicesContainer.appendChild(button);
      });
    }

    this.hideFeedback();
  }

  updateScore(score) {
    const currentScore = document.getElementById('current-score');
    if (currentScore) {
      currentScore.textContent = score.toLocaleString();
    }
  }

  showFeedback(isCorrect, correctAnswer, pointsEarned = 0) {
    const feedback = document.getElementById('feedback');
    const feedbackText = feedback.querySelector('.feedback-text');

    if (feedback && feedbackText) {
      if (isCorrect) {
        feedbackText.innerHTML = `<div class="correct-text">正解！ +${pointsEarned}点</div>`;
        feedback.className = 'feedback correct';
      } else {
        feedbackText.innerHTML = `<div class="wrong-text">不正解</div><div class="correct-answer">正解: ${correctAnswer}</div>`;
        feedback.className = 'feedback wrong';
      }

      feedback.classList.remove('hidden');
    }

    const choiceBtns = document.querySelectorAll('.choice-btn');
    choiceBtns.forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.prefecture === correctAnswer) {
        btn.classList.add('correct');
      }
    });
  }

  hideFeedback() {
    const feedback = document.getElementById('feedback');
    if (feedback) {
      feedback.classList.add('hidden');
    }
  }

  disableChoices() {
    const choiceBtns = document.querySelectorAll('.choice-btn');
    choiceBtns.forEach(btn => {
      btn.disabled = true;
    });
  }

  enableChoices() {
    const choiceBtns = document.querySelectorAll('.choice-btn');
    choiceBtns.forEach(btn => {
      btn.disabled = false;
    });
  }
}
