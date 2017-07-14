import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Row, Col, Input, Button, Icon, message } from 'antd';
const FormItem = Form.Item;
message.config({
  top: 74,
  duration: 4,
});

class AdvancedSearchForm extends React.Component {
  state = {
    loading: false
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch('/user/salesman/neworder', {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values)
        }).then( response => {
          return response.json()
        }).then( json => {
          let result = json.result;
          this.setState({
            loading: true,
          })
          var self = this;
          setTimeout(function() {
            self.setState({
              loading: false,
            })
            message.success(result.message);
          }, 2000);
          this.handleReset();
        })
        console.log('Received values of form: ', values);
      }
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 6 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 2,
          offset: 4,
        },
        sm: {
          span: 2,
          offset: 4,
        },
      },
    };
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <FormItem {...formItemLayout} label='Product A'>
            {getFieldDecorator('product_a', {
                rules: [
                { required: true, message: 'Please input your Num of A!' },
                {
                    pattern: /^\d{0,4}$/, message: 'Not a Right number'
                }
                ],
            })(
                <Input placeholder="Number" />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label='Product B'>
            {getFieldDecorator('product_b', {
                rules: [
                { required: true, message: 'Please input your Num of B!' },
                {
                    pattern: /^\d{0,4}$/, message: 'Not a Right number'
                }
                ],
            })(
                <Input placeholder="Number" />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label='Product C'>
            {getFieldDecorator('product_c', {
                rules: [
                { required: true, message: 'Please input your Num of C!' },
                {
                    pattern: /^\d{0,4}$/, message: 'Not a Right number'
                }
                ],
            })(
                <Input placeholder="Number" />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label='Product D'>
            {getFieldDecorator('product_d', {
                rules: [
                { required: true, message: 'Please input your Num of D!' },
                {
                    pattern: /^\d{0,4}$/, message: 'Not a Right number'
                }
                ],
            })(
                <Input placeholder="Number" />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label='Customer'>
            {getFieldDecorator('customer', {
                rules: [
                { required: true, message: 'Please input customer name!' },
                ],
            })(
                <Input placeholder="Customer" />
            )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large" loading={this.state.loading}>Create</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

export default WrappedAdvancedSearchForm