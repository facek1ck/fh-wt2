import React from "react";

class Result extends React.Component {
  constructor(props) {
    super(props);
  }
  renderQuestins() {
    return this.props.quizResult.map((_data, index) => {
      return (
        <div className="list-grp">
          {_data.question} <br />
          correct answer is option: {_data.answerindex} : and you have selcted{" "}
          {this.props.answers[index].choice + 1}{" "}
          {this.props.answers[index].choice + 1 === _data.answerindex ? (
            <span className="status">its correct !man</span>
          ) : (
            ""
          )}
          <br />
        </div>
      );
    });
  }
  render() {
    return (
      <div className="quiz-story">
        <div>
          <strong>Lets see your results</strong>!
          <div>{this.renderQuestins()}</div>
        </div>
      </div>
    );
  }
}

export default Result;
