import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Row, Col, Input, Button, Icon, Radio, Card, message } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
  };

  handleReset = () => {
    this.props.form.resetFields();
  }
  handleProduct = (e) => {
    e.preventDefault();
    message.success('submit')
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     fetch('/login', {
    //       credentials: 'include',
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(values)
    //     }).then( response => {
    //       // console.log(response)
    //       return response.json()
    //     }).then( json => {
    //       console.log(json);
    //       let result = json.result;
    //       if ( result.status === 1 ) {
    //         message.success(result.message)
    //         // alert(result.message);
    //         this.props.history.push(`/user/productadmin/index/${result.id}`);
    //         // window.location.href = '/user/productadmin/index/100000'
    //         // withRouter( ({history}) => {
    //         //   console.log('this withrouter')
    //         //   history.push('/user/productadmin/index/100000')
    //         // })
    //       } else if ( result.status === 2 ) {
    //         message.warning(result.message)
    //       } else if ( result.status === 0 ) {
    //         message.error(result.message)
    //       }
    //       console.log('json.result: ');
    //       console.log(result);
    //     })
    //     console.log('Received values of form: ', values);
    //   }
    // });
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 12 },
      wrapperCol: { span: 12 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
          span: 12,
          offset: 12,
      },
    };
    const { getFieldDecorator } = this.props.form;
    return (
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleProduct}
        >
          <FormItem {...formItemLayout} label="Product A">
            {getFieldDecorator('product_a', {
              rules: [
                { required: true, message: 'Please input a number!' },
                {
                  pattern: /^\d{0,4}$/, message: 'Not a Right number'
                }
              ],
            })(
              <Input placeholder="Product A" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Product B">
            {getFieldDecorator('product_b', {
              rules: [
                { required: true, message: 'Please input a number!' },
                {
                  pattern: /^\d{0,4}$/, message: 'Not a Right number'
                }
              ],
            })(
              <Input placeholder="Product B" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Product C">
            {getFieldDecorator('product_c', {
              rules: [
                { required: true, message: 'Please input a number!' },
                {
                  pattern: /^\d{0,4}$/, message: 'Not a Right number'
                }
              ],
            })(
              <Input placeholder="Product C" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Product D">
            {getFieldDecorator('product_d', {
              rules: [
                { required: true, message: 'Please input a number!' },
                {
                  pattern: /^\d{0,4}$/, message: 'Not a Right number'
                }
              ],
            })(
              <Input placeholder="Product D" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Worker"
          >
              {getFieldDecorator('worker', {
                  rules: [{ required: true, message: 'Please select Worker!' }],
              })(
                  <RadioGroup style={{maxHeight: 160,  overflowY: 'auto'}}>
                    <Row>
                      <Col xs={24}><Radio value={'ProductAdmin'}>ProductAdmin</Radio></Col>
                      <Col xs={24}><Radio value={'SalesMan'}>SalesMan</Radio></Col>
                      <Col xs={24}><Radio value={'WarehouseMan'}>WarehouseMan</Radio></Col>
                      <Col xs={24}><Radio value={'Worker'}>Worker</Radio></Col>
                      <Col xs={24}><Radio value={'Worker2'}>Worker</Radio></Col>
                      <Col xs={24}><Radio value={'Worker3'}>Worker</Radio></Col>
                      <Col xs={24}><Radio value={'Worker4'}>Worker</Radio></Col>
                    </Row>
                  </RadioGroup>
              )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large">Product</Button>
          </FormItem>
        </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

export default WrappedAdvancedSearchForm