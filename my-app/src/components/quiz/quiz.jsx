import React, { Component } from "react";
//import quizQuestions from './question-config';
import Quiz from "./quiz-components/quiz-component";
import Result from "./quiz-components/result";
import "./quiz.less";
import { inject } from "mobx-react";
import axios from "axios";

@inject("store")
export default class QuizApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      questionId: 1,
      question: "",
      answerOptions: [],
      allQuestions: [],
      answer: "",
      selectedAnswers: [],
      result: ""
    };
    this.setNextQuestion = this.setNextQuestion.bind(this);
    this.setPreviousQuestion = this.setPreviousQuestion.bind(this);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.viewreults = this.viewreults.bind(this);
  }

  handleAnswerSelected(e) {
    var _self = this;
    var obj = _self.state.selectedAnswers;
    var selected = parseInt(e.target.value);
    console.log(
      "for selected question number " +
        (_self.state.counter + 1) +
        " answer is " +
        selected +
        " selected"
    );
    var counter = _self.state.counter;
    // create map and store all selecred answers with quiz Questions
    obj[counter] = { id: counter, choice: selected };
    _self.setState({ selectedAnswers: obj });
    console.log(obj);
  }

  componentWillMount() {
    let quizQuestions = this.props.store.quiz.questions;
    const fill = [];
    for (let i = 0; i < this.props.store.quiz.questions.length; i++) {
      fill[i] = 0;
    }
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: quizQuestions[0].answers,
      allQuestions: quizQuestions,
      selectedAnswers: fill
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    let quizQuestions = this.props.store.quiz.questions;
    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ""
    });
  }

  setPreviousQuestion() {
    const counter = this.state.counter - 1;
    const questionId = this.state.questionId - 1;
    let quizQuestions = this.props.store.quiz.questions;
    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ""
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: "Undetermined" });
    }
  }

  renderQuiz() {
    return (
      <Quiz
        viewreults={this.viewreults}
        setNextQuestion={this.setNextQuestion}
        counter={this.state.counter}
        setPreviousQuestion={this.setPreviousQuestion}
        answer={this.state.answer}
        selectedAnswer={this.state.selectedAnswers[this.state.counter]}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={this.props.store.quiz.questions.length}
        selectedAnswers={this.state.selectedAnswers}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (
      <Result
        quizResult={this.state.allQuestions}
        answers={this.state.selectedAnswers}
      />
    );
  }

  viewreults(e) {
    e.preventDefault();
    let resultfile = function(name, uid, answers) {
      this.name = name;
      this.userid = uid;
      this.answers = answers;
    };
    let answers = this.state.selectedAnswers;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] == 0) {
        answers[i] = { id: `${i + 1}`, choice: -1 };
      } else {
        answers[i] = { id: `${i + 1}`, choice: answers[i].choice };
      }
    }
    let results = new resultfile(
      this.props.store.quiz.name,
      this.props.store.user.id,
      answers
    );
    results = JSON.stringify(results, null, 2);
    const blob = new Blob([results], {
      type: "application/json"
    });
    const data = new FormData();
    data.append("55CHbmatnFYH6UYy", blob);
    console.log(results);
    axios({
      method: "post",
      url:
        "http://gabriels-macbook.local:3000/tests/" +
        this.props.store.quiz.name +
        "/upload",
      data: data
    });
    this.setState({ result: true });
  }

  render() {
    return (
      <div className="Quiz">
        <div className="Quiz-header">
          <h2>Quiz Assignment :</h2>
        </div>

        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}
