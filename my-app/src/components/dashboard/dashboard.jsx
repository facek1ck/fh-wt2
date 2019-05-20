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
      tests: []
    };
  }

  componentDidMount() {
    axios.get("http://gabriels-macbook.local:3000/tests").then(res => {
      this.setState({
        ...this.state,
        tests: res.data.tests
      });
    });
  }

  handleChange = value => {
    console.log(`selected ${value}`);
  };

  renderOptions() {
    return this.state.tests.map(t => <Option value={t}>{t}</Option>);
  }

  render() {
    const options = this.renderOptions();
    return (
      <div>
        <div className="dashboard-top">
          <div className="dashboard-tests">
            <Select
              defaultValue="TestA"
              style={{ width: 420 }}
              onChange={this.handleChange}
            >
              {options}
            </Select>
          </div>
          <div className="dashboard-online-counter">
            <Icon type="team" /> Online: {/* {this.props.store.counter}  */}
          </div>
        </div>
        <Divider orientation="left">Question Statistics</Divider>

        <div className="dashboard-statistics">
          <div>
            <StatisticCard />
          </div>

          <div>
            <StatisticCard />
          </div>
        </div>
      </div>
    );
  }
}
