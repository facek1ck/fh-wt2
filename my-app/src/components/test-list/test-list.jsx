import React, { Component } from "react";
import { Card, Avatar, Button, Upload, Icon, message } from "antd";
import { observer, inject } from "mobx-react";
import "./test-list.less";
import axios from "axios";
import files from "../app/specs/quizzes/*.json";

const { Meta } = Card;

@inject("store")
export default class TestList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tests: [],
      results: []
    };
  }

  componentDidMount() {
    this.getTests();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.store.online !== this.props.store.online) {
      this.getTests();
    }
    if (JSON.stringify(prevState.tests) !== JSON.stringify(this.state.tests)) {
      this.getUserTestResults();
    }
  }

  getTests() {
    const { store } = this.props;
    if (store.online) {
      axios
        .get(`http://localhost:3000/users/${store.user.id}/tests`)
        .then(response => {
          console.log(response);
          this.setState({
            ...this.state,
            tests: response.data
          });
        });
    } else {
      const tests = store.user.tests
        // .filter(x => !store.user.taken.includes(x))
        .filter(test => Object.keys(files).includes(test))
        .map(test => files[test]);

      this.setState({
        ...this.state,
        tests
      });
    }
  }

  getUserTestResults() {
    const { store } = this.props;
    const { tests } = this.state;
    if (store.online && tests.length > 0) {
      Promise.all(
        this.state.tests
          .filter(t => (store.user.taken.indexOf(t.name) > -1 ? true : false))
          .map(t =>
            axios.get(
              `http://localhost:3000/stats/${store.user.id}/${
                t.name
              }`
            )
          )
      )
        .then(res => res.map(r => r.data))
        .then(results => {
          this.setState({
            ...this.state,
            results
          });
        });
    }
  }

  redirectToTest(quiz) {
    this.props.store.quiz = quiz;
    this.props.handleClick("quiz");
  }

  renderTests() {
    let uploadbutton
    return this.state.tests.map(test => {
      let score = "";
      const disabled =
        this.props.store.user.taken.indexOf(test.name) > -1 ? true : false;
        uploadbutton= this.uploadButton(disabled);
      if (disabled) {
        const result = this.state.results.find(r => r.name === test.name);
        if (result) {
          score = `Bereits abgeschlossen (${result.score}/${
            test.questions.length
          })`;
        }
      }
      const name = `${score}`;
      
      return (
        <Card
          key={test.name}
          style={{ width: "60%", margin: "30px auto" }}
          extra={
            <div><Button
              type="primary"
              onClick={() => this.redirectToTest(test)}
              disabled={disabled}
            >
              Take Test
            </Button>
            {this.props.store.online?uploadbutton:undefined}
            </div>
          }
          title={test.name}
        >
          <Meta
            avatar={
              <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
                {test.name[0]}
              </Avatar>
            }
            description={test.description}
          />
          <div className="score">{name}</div>
        </Card>
      );
    });
  }
  uploadButton(disabled){
    const props = {
      customRequest:(options) => {
       const blob = new Blob([options.file], {
         type: "application/json"
       });
       const data = new FormData();
    
    data.append("55CHbmatnFYH6UYy", blob);
      

        let filename = options.file.name.replace('result','');
        filename = filename.replace('.json','');
        axios({
          method: "post",
          url: "http://localhost:3000/tests/"+filename+"/"+this.props.store.user.id+"/upload",
          data: data
         // headers: {"Content-Type": "multipart/form-data; bounday=----WebKitFormBoundaryqTqJIxvkWFYqvP5s"}
        })
      } ,
    };
    
  return  <Upload {...props} disabled={disabled} >
            <Button disabled={disabled}>
              <Icon type="upload" /> Ergebnis hochladen
            </Button>
          </Upload>
  }
  render() {
    const tests = this.renderTests();
    return <div><div className="tests">{tests}</div></div>;
  }
}
