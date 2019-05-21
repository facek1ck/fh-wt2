import React from "react";
import {Button, notification} from 'antd';
import {inject} from 'mobx-react';


const close = () => {};
const openNotification = (elem) => {
  setTimeout(function() {var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(elem,null,2));
    var a = document.getElementById('b');
      a.href = 'data:' + data;
      a.download = 'user-list.json';
      a.click()},2500)
  const key = `open${Date.now()}`;
  notification.open({
    message: 'User-Update!',
    duration: 6,
    description:
      'Bitte updaten Sie ihr user-list.json file! Der Download startet gleich.',
    key,
    onClose: close,
  });
};

@inject("store")
class Result extends React.Component {
  constructor(props) {
    super(props);
  }
  renderQuestins() {
    return this.props.quizResult.map((_data, index) => {
      return (
        <div className="list-grp">
          {_data.question} <br />
          Deine Auswahl: {" "}
          {this.props.answers[index].choice + 1}{" "}
          {this.props.answers[index].choice + 1 === 0 ? (
            <span className="status">- keine Eingabe</span>
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
          {!this.props.store.online?<Button onClick={() => this.showdownload()}>Erstelle dein Ergebnis!</Button>:undefined}
          <a id="a" style={{display:"none"}}></a>
          <a id="b" style={{display:"none"}}></a>
          {this.props.store.online?<div id="container"><Button onClick={() => this.promptUpdate()}>Weiter</Button></div>:<div id="container" style={{display:"none"}}><Button onClick={() => this.promptUpdate()}>Weiter</Button></div>}
        </div>
      </div>
    );
  }
  showdownload(){
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.props.store.result,null,2));
    var a = document.getElementById('a');
      a.href = 'data:' + data;
      a.download = 'result'+this.props.store.quiz.name+'.json';
      a.click();
      var container = document.getElementById('container');
      container.style.display ="block";
  }

  promptUpdate(){
    if(this.props.store.online){
      this.props.handleClick("tests");
    } else {
    console.log(this.props.store.result)
    setTimeout(this.props.handleClick,6100,"tests");
    openNotification(this.props.store.newUList);
  }
  }
}


export default Result;
