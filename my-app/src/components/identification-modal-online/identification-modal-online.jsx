import React from 'react';
import {
    Button, Modal, Form, Input,
  } from 'antd';
import axios from 'axios';
import {inject} from 'mobx-react';
  
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
  export default class OnlineLogIn extends React.Component {
    state = {
      visible: false,
    };
  
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
        
        axios.get('http://gabriels-macbook.local:3000/users').then(response => {
          console.log(response);
          var success;
        response.data.forEach(element => {
          if(element.id==values.id){
            if(element.lastName==values.name){
              console.log("Login erfolgreich für "+values.name);
              console.log("Gesamter User: ");
              console.log(element);
              this.props.store.user = element;
              this.setState({ visible: false });
              success = true;
              return;
            }
          }
        });
        if(!success){
        alert("Name oder ID ist falsch.");
      }
        });
       
      });
    }
  
    saveFormRef = (formRef) => {
      this.formRef = formRef;
    }
  
    render() {
      return (
        <div>
          <Button size="large" type="primary" onClick={this.showModal}>Online Test durchführen</Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </div>
      );
    }
  }
  
