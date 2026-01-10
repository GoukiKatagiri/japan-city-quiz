import { QuizGenerator } from './quiz-generator.js';

export class QuizGame {
  constructor(cities, prefectures) {
    this.quizGenerator = new QuizGenerator(cities, prefectures);
    this.score = 0;
    this.currentQuestionNumber = 0;
    this.totalQuestions = 10;
    this.correctCount = 0;
    this.questionHistory = [];
    this.questionStartTime = null;
  }

  reset() {
    this.score = 0;
    this.currentQuestionNumber = 0;
    this.correctCount = 0;
    this.questionHistory = [];
    this.questionStartTime = null;
    this.quizGenerator.reset();
  }

  generateQuestion() {
    this.currentQuestionNumber++;
    this.questionStartTime = Date.now();

    const question = this.quizGenerator.generateQuestion();
    this.questionHistory.push(question);

    return question;
  }

  checkAnswer(selectedPref, question) {
    const isCorrect = selectedPref === question.correctAnswer;
    const timeElapsed = Date.now() - this.questionStartTime;

    if (isCorrect) {
      this.correctCount++;
      const pointsEarned = this.calculateScore(timeElapsed);
      this.score += pointsEarned;
      return { isCorrect: true, pointsEarned };
    }

    return { isCorrect: false, pointsEarned: 0 };
  }

  calculateScore(timeElapsed) {
    const baseScore = 100;
    const timeInSeconds = timeElapsed / 1000;
    const timeBonus = Math.max(0, Math.floor(50 - timeInSeconds));

    return baseScore + timeBonus;
  }

  hasMoreQuestions() {
    return this.currentQuestionNumber < this.totalQuestions;
  }

  getResults() {
    const accuracy = Math.round((this.correctCount / this.totalQuestions) * 100);
    const isNewRecord = this.saveHighScore(this.score);

    return {
      score: this.score,
      correctCount: this.correctCount,
      totalQuestions: this.totalQuestions,
      accuracy: accuracy,
      isNewRecord: isNewRecord
    };
  }

  saveHighScore(score) {
    const currentHigh = parseInt(localStorage.getItem('highScore') || '0');

    if (score > currentHigh) {
      localStorage.setItem('highScore', score.toString());
      return true;
    }

    return false;
  }

  getHighScore() {
    return parseInt(localStorage.getItem('highScore') || '0');
  }

  getCurrentScore() {
    return this.score;
  }

  getCurrentQuestionNumber() {
    return this.currentQuestionNumber;
  }
}
