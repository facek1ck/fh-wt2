import React from 'react';
import {
    Button, Modal, Form, Input,
  } from 'antd';
  
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
            title="Create a new collection"
            okText="Create"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <Form.Item label="Name">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your name!' }],
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
  
  export default class CollectionsPage extends React.Component {
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
        this.setState({ visible: false });
      });
    }
  
    saveFormRef = (formRef) => {
      this.formRef = formRef;
    }
  
    render() {
      return (
        <div>
          <Button type="primary" onClick={this.showModal}>New Collection</Button>
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
  