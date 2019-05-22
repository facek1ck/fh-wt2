import React from "react";
import { Button, Modal, Form, Input, notification } from "antd";
import axios from "axios";
import { inject } from "mobx-react";

const openNotificationWithIcon = type => {
  notification[type]({
    message: "Eingabefehler!",
    description: "Name oder ID ist Falsch!"
  });
};

const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Verify your Credentials"
          okText="Submit"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Last Name">
              {getFieldDecorator("name", {
                rules: [
                  { required: true, message: "Please input your last name!" }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="ID-Number">
              {getFieldDecorator("id", {
                rules: [
                  { required: true, message: "Please input your ID-Number!" }
                ]
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

@inject("store")
export default class OnlineLogIn extends React.Component {
  state = {
    visible: false,
    step: 1
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.props.store.user = undefined;
    this.setState({
      step: step - 1
    });
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleOk = () => {
    this.setState({ visible: false });
    var headers = {
      "Content-Type": "application/json"
    };
    axios
      .post(
        "http://localhost:3000/requests/heartbeat",
        {
          //axios.post('http://localhost:3000/requests/heartbeat',{
          lastName: this.props.store.user.lastName,
          online: true
        },
        { headers: headers }
      )
      .then(response => {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    this.props.store.online = true;
    this.props.handleClick("home");
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log("Received values of form: ", values);

      axios.get("http://localhost:3000/users").then(response => {
        console.log(response);
        var success;
        response.data.forEach(element => {
          if (element.id == values.id) {
            if (element.lastName == values.name) {
              this.props.store.user = element;
              success = true;
              form.resetFields();
              this.nextStep();
              return;
            }
          }
        });
        if (!success) {
          openNotificationWithIcon("error");
        }
      });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const { step } = this.state;
    switch (step) {
      case 1:
        return (
          <div>
            <Button size="large" type="primary" onClick={this.showModal}>
              Online Test durchführen
            </Button>
            <CollectionCreateForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
            />
          </div>
        );
      case 2:
        return (
          <Modal
            title="Validierung"
            visible={this.state.visible}
            onOk={this.handleOk}
            okText="Ja"
            cancelText="Nein"
            onCancel={this.prevStep}
          >
            <p>
              Sind Sie {this.props.store.user.firstName}{" "}
              {this.props.store.user.lastName}?
            </p>
          </Modal>
        );
    }
  }
}
