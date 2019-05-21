import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Select, Divider, Icon } from "antd";
import axios from "axios";
import StatisticCard from "./dashboard-statistic-card";
import "./dashboard.less";

const Option = Select.Option;

@inject("store")
export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tests: [],
      selectedTest: "",
      answers: [],
      questions: [],
      online: 0
    };
  }

  componentDidMount() {
    this.checkOnline();
    setInterval(() => {
      this.checkOnline();
    }, 5000);

    axios.get("http://gabriels-macbook.local:3000/tests").then(res => {
      this.setState({
        ...this.state,
        tests: res.data.tests
      });
    });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.selectedTest !== this.state.selectedTest) {
      axios
        .get(
          `http://gabriels-macbook.local:3000/stats/${this.state.selectedTest}`
        )
        .then(resAnswers => {
          axios
            .get(
              `http://gabriels-macbook.local:3000/tests/${
                this.state.selectedTest
              }/questions`
            )
            .then(resQuestions => {
              this.setState({
                ...this.state,
                answers: resAnswers.data.answers,
                questions: resQuestions.data
              });
            });
        });
    }
  }

  downloadStats(name) {
    axios.get(`http://gabriels-macbook.local:3000/stats/${name}`).then(res => {
      var data =
        "text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(res.data, null, 2));
      var a = document.getElementById("a");
      a.href = "data:" + data;
      a.download = "result" + name + ".json";
      a.click();
    });
  }

  checkOnline() {
    axios
      .get("http://gabriels-macbook.local:3000/requests/online")
      .then(res => {
        this.setState({
          ...this.state,
          online: res.data
        });
      });
  }

  handleChange = value => {
    this.setState({
      ...this.state,
      selectedTest: value
    });
  };

  renderOptions() {
    return this.state.tests.map(t => (
      <Option key={t} value={t}>
        {t}
      </Option>
    ));
  }

  renderCards() {
    return this.state.answers.map((a, i) => (
      <div key={i}>
        <StatisticCard results={a.results} name={this.state.questions[i]} />
      </div>
    ));
  }

  render() {
    const options = this.renderOptions();
    const cards = this.renderCards();
    return (
      <div>
        <div className="dashboard-top">
          <div className="dashboard-tests">
            <Select
              defaultValue={this.state.tests[0]}
              style={{ width: 420 }}
              onChange={this.handleChange}
            >
              {options}
            </Select>
          </div>
          <div className="download">
            {this.state.selectedTest != "" ? (
              <button
                onClick={() => this.downloadStats(this.state.selectedTest)}
              >
                Download
              </button>
            ) : (
              undefined
            )}
          </div>
          <div className="dashboard-online-counter">
            <Icon type="team" /> Online: {this.state.online}
          </div>
        </div>
        <Divider orientation="left">Question Statistics</Divider>

        <div className="dashboard-statistics">
          {cards}
          <a id="a" style={{ display: "none" }} />
        </div>
      </div>
    );
  }
}
