import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, Radio, Row, Col, message } from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
message.config({
  top: 74,
  duration: 3,
});

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch('/login', {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values)
        }).then( response => {
          // console.log(response)
          return response.json()
        }).then( json => {
          console.log(json);
          let result = json.result;
          if ( result.status === 1 ) {
            message.success(result.message)
            // alert(result.message);
            this.props.history.push(`/user/productadmin/index/${result.id}`);
            // window.location.href = '/user/productadmin/index/100000'
            // withRouter( ({history}) => {
            //   console.log('this withrouter')
            //   history.push('/user/productadmin/index/100000')
            // })
          } else if ( result.status === 2 ) {
            message.warning(result.message)
          } else if ( result.status === 0 ) {
            message.error(result.message)
          }
          console.log('json.result: ');
          console.log(result);
        })
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('id', {
            rules: [
              { required: true, message: 'Please input your Employee Id!' },
              {
                pattern: /^\d{6}$/, message: 'Employee Id length is 6'
              }
            ],
          })(
            <Input style={{height: 36}} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Employee Id" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your Password!' },
              {
                pattern: /^.{6,16}$/, message: 'Password length between 6 and 16'
              }
              ],
          })(
            <Input style={{height: 36}} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
            {getFieldDecorator('role', {
                rules: [{ required: true, message: 'Please select your Role!' }],
            })(
                <RadioGroup>
                  <Row>
                    <Col xs={12}><Radio value={'ProductAdmin'}>ProductAdmin</Radio></Col>
                    <Col xs={12}><Radio value={'SalesMan'}>SalesMan</Radio></Col>
                    <Col xs={12}><Radio value={'WarehouseMan'}>WarehouseMan</Radio></Col>
                    <Col xs={12}><Radio value={'Worker'}>Worker</Radio></Col>
                  </Row>
                </RadioGroup>
            )}
        </FormItem>
        
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm