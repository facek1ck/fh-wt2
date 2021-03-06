import React from "react";
import { Radio } from "antd";

// class App extends React.Component {
//     state = {
//       value: 1,
//     };

const AnswerOption = props => {
  return (
    <div className="answer-option">
      <Radio
        className="answer-button"
        size="large"
        type="primary"
        id={props.answerType}
        value={props.index}
        className={props.selectedAnswer === props.index ? "selected-btn" : ""}
        onClick={props.onAnswerSelected}
        checked={
          props.selectedAnswers[props.counter].choice !== undefined
            ? props.selectedAnswers[props.counter].choice == props.index
            : false
        }
      >
        {props.answerContent}
      </Radio>
    </div>
  );
};

export default AnswerOption;
