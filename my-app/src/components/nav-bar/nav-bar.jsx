import React, { Component } from "react";
import { Menu, Icon } from "antd";
import "./nav-bar.less";
import { inject } from "mobx-react";
import axios from "axios";

@inject("store")
class NavBar extends React.Component {
  state = {
    current: "home"
  };

  handleClick = e => {
    if (e.key == "logout") {
      var headers = {
        "Content-Type": "application/json"
      };
      axios
        .post(
          "http://gabriels-macbook.local:3000/requests/heartbeat",
          {
            lastName: this.props.store.user.lastName,
            online: false
          },
          { headers: headers }
        )
        .then(response => {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      console.log("succesfully logged out " + this.props.store.user.lastName);
      this.props.store.user = undefined;
      this.props.handleClick("login");
      return;
    }
    this.setState({
      current: e.key
    });
    this.props.handleClick(e.key);
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="home" className="navbutton">
          <Icon type="home" className="navicon" />
          Home
        </Menu.Item>
        <Menu.Item key="tests" className="navbutton">
          <Icon type="form" className="navicon" />
          Tests
        </Menu.Item>
        <Menu.Item key="dashboard" className="navbutton">
          <Icon type="line-chart" className="navicon" />
          Dashboard
        </Menu.Item>
        <Menu.Item className="logout" key="logout">
          <Icon type="poweroff" className="logoutIcon" />
          Logout ({this.props.store.user.firstName}{" "}
          {this.props.store.user.lastName})
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavBar;
