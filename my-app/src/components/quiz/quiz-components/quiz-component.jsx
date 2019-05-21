import React from 'react';
import Question from './question'
import QuestionCount from './question-count';
import AnswerOption from './answer-option';

import { Button } from 'antd';

const Quiz = (props) => {

    function renderAnswerOptions(key,index) {
        return (
          <AnswerOption
          index ={index}
          key={key}
          answerContent={key}
          answerType={key}
          answer={props.answer}
          questionId={props.questionId}
          selectedAnswer={props.selectedAnswer}
          onAnswerSelected={props.onAnswerSelected}
          selectedAnswers={props.selectedAnswers}
          counter={props.counter}
          />
        );
      }
    
      return (
        <div key={props.questionId} className="quiz-story">
          <QuestionCount counter={props.counter} viewreults={props.viewreults}
            total={props.questionTotal}
          />
          <Question  content={props.question} />
          <ul className="answerOptions">
            {props.answerOptions.map(renderAnswerOptions)}
          </ul>
          <div className="bottom-footer" >
            {props.counter > 0 ? (<Button className="Previous-btn" onClick={props.setPreviousQuestion} >Previous</Button>) : (<div></div>)}

            {props.counter < (props.questionTotal-1) ? (<Button className="next-btn" onClick={props.setNextQuestion} >Next</Button>) : undefined}
            <br>
            </br>
            {props.counter == (props.questionTotal-1) && (props.selectedAnswers.length == (props.questionTotal)) ? (<Button className="next-btn" href="" onClick={props.viewreults}>Abgeben</Button>):undefined}
            {/* {props.counter == (props.questionTotal-1) && !(props.selectedAnswers.length == (props.questionTotal)) ? <p>Bitte alle Fragen beantworten.</p>:undefined} */}
        </div>
        </div>
    );

}

export default Quiz;