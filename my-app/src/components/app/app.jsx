import React, { Component } from "react";
import TabsCard from "../select-button/select-button";
import QuizApp from "../quiz/quiz";
import "./App.less";
import "antd/dist/antd.css";
import StoreClass from "../store-component/store";
import { Provider, observer } from "mobx-react";
import { Form, Button, Icon } from "antd";
import NavBar from "../nav-bar/nav-bar";
import TestList from "../test-list/test-list";
import Dashboard from "../dashboard/dashboard";

const store = new StoreClass();

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { view: store.viewState };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleClick(value) {
    this.setState(state => ({
      view: value
    }));
  }
  logout() {
    console.log("successfully logged out " + store.user.lastName);
    store.user = undefined;
    this.handleClick("login");
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <span className="titleBlock">
              WT2 Projekt
              {this.state.view != "login" && !store.online ? (
                <Icon
                  type="poweroff"
                  className="logoutIcon2"
                  onClick={this.logout}
                />
              ) : (
                undefined
              )}
            </span>
            <div className="navBar">
              {this.state.view != "login" && store.online ? (
                <NavBar handleClick={this.handleClick} />
              ) : (
                undefined
              )}
            </div>
          </header>
          <div className="mainScreen">
            {this.state.view == "login" ? (
              <TabsCard handleClick={this.handleClick} />
            ) : (
              undefined
            )}
            {this.state.view == "dashboard" ? (
              <Dashboard handleClick={this.handleClick} />
            ) : (
              undefined
            )}
            {this.state.view == "tests" ? (
              <TestList handleClick={this.handleClick} />
            ) : (
              undefined
            )}
            {this.state.view == "quiz" ? (
              <QuizApp handleClick={this.handleClick} />
            ) : (
              undefined
            )}
          </div>
        </div>
      </Provider>
    );
  }
}
export default App;
