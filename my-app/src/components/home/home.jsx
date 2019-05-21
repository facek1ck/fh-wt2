import React, { Component } from "react";
import { inject } from "mobx-react";
import { Card, Button } from "antd";
import "./home.less";

@inject("store")
export default class extends Component {
  handleClick = () => {
    this.props.handleClick("tests");
  };

  render() {
    return (
      <div className="home-view">
        <h1>Hallo {this.props.store.user.firstName}</h1>
        <Card style={{ width: 750 }} className="welcome-card">
          Willkommen zum WebTech 2 Projekt von Gabriel, Gregor, Michi, Thomas
          und Thomas!
          <p />
          Im Rahmen dieses Projekts haben wir eine Node.js Anwendung entwickelt
          um verschiedene Tests oder Quizes durchzuführen. Mit Verschiedenen
          Usern, die verschiedene freigaben für die unterschiedlichen Tests
          haben. Das geht sowohl online, als auch online.
          <p />
          Ein Dashboard gibt Statistiken über die Fragen der verschiedenen Tests
          aus.
          <p />
          <p />
          <Button type="primary" block onClick={this.handleClick}>
            Zu den Tests
          </Button>
        </Card>
      </div>
    );
  }
}
