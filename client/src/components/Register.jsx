import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
message.config({
  top: 68,
  duration: 3,
});
class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        fetch('/user/register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
          // body: values
        }).then( response => {
          console.log(response)
          return response.json()
        }).then( json => {
          console.log(json);
          let result = json.result;
          if (result.status === 'fail') {
            message.error('Wrong Employee Id or Password, please input again!')
          }
          console.log('json.result: ' + result);
        })
        console.log('Received values of form: ', values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['@qq.com', '@163.com', '@mail.dlut.edu.cn'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 9 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 8,
        },
      },
    };

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: 20 }}>
        <FormItem
          {...formItemLayout}
          label="Employee Id"
        >
          {getFieldDecorator('id', {
            rules: [
              { required: true, message: 'Please input your employee id!' },
              {
                pattern: /^\d{6}$/, message: 'Employee id length is 6'
              }
            ],
          })(
            <Input placeholder="Employee id" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Old Password"
        >
          {getFieldDecorator('old', {
            rules: [
              { required: true, message: 'Please input your old password!' },
              {
                pattern: /^.{6,16}$/, message: 'Password length between 6 and 16'
              }
            ],
          })(
            <Input type="password" placeholder="Old password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="New Password"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your new password!',
            },{
              pattern: /^.{6,16}$/, message: 'Password length between 6 and 16',
            },{
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" placeholder="New password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" placeholder="Password again" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="E-mail"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [
                { required: true, message: 'Please input your E-mail!' },
                { type: 'email', message: 'The input is not valid E-mail!' }
            ],
          })(
            <AutoComplete
              dataSource={websiteOptions}
              onChange={this.handleWebsiteChange}
              placeholder="E-mail"
            >
              <Input />
            </AutoComplete>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
            rules: [
                { required: true, message: 'Sorry you don\'t agree with us' },
            ]
          })(
            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">Register</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm