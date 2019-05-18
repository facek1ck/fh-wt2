import React from 'react';
import {
    Button, Modal, Form, Input, notification
  } from 'antd';
import {observer} from 'mobx-react';
import { decorate } from 'mobx';
import {inject} from 'mobx-react';

const openNotificationWithIcon = type => {
  notification[type]({
    message: 'Notification Title',
    description:
      'Name oder ID ist Falsch!',
  });
};


const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
    class extends React.Component {
      render() {
        const {
          visible, onCancel, onCreate, form,
        } = this.props;
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
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your last name!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="ID-Number">
                {getFieldDecorator('id', {
                  rules: [{ required: true, message: 'Please input your ID-Number!' }],
                })(
                  <Input />
                )}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    }
  );


  

  @inject("store")
  export default class OfflineLogIn extends React.Component {
    state = {
      visible: false,
      step: 1,
    };

    nextStep = () => {
      const { step } = this.state;
      this.setState({
        step: step + 1
      });
    }

    prevStep = () => {
      const { step } = this.state;
      this.setState({
        step: step - 1
      });
    }
  
    showModal = () => {
      this.setState({ visible: true });
    }
  
    handleCancel = () => {
      this.setState({ visible: false });
    }
  
    handleCreate = () => {
      const form = this.formRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
  
        console.log('Received values of form: ', values);
        form.resetFields();
        //
        var data = require('../app/specs/Users/user-list.json');
        var success;
        data.forEach(element => {
          if(element.id==values.id){
            if(element.lastName==values.name){
              console.log("Login erfolgreich für "+values.name);
              console.log("Gesamter User: ");
              console.log(element);
              this.props.store.user = element;
              success = true;
              this.nextStep();
              return;
            }
          }
        });
        if(!success){
          openNotificationWithIcon('error');
      }
      });
    }
  
    saveFormRef = (formRef) => {
      this.formRef = formRef;
    }
  
    render() {
      const { step } = this.state;
      
      switch(step) {
        case 1:
          return (
            <div>
              <Button size="large" type="primary" onClick={this.showModal}>Offline Test durchführen</Button>
              <CollectionCreateForm
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
              />
            </div>
          );
        case 2:
          return(
            <Modal
            title="Is that you?"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.prevStep}
          >
            <p>{this.props.store.user.id}</p>
            <p>{this.props.store.user.firstName}</p>
            <p>{this.props.store.user.lastName}</p>
          </Modal>
          );
      }
    }
  }
