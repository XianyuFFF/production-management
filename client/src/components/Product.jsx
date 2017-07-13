import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Row, Col, Input, Button, Icon, Radio, Card, message } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
message.config({
  top: 74,
  duration: 4,
});

class AdvancedSearchForm extends React.Component {
  state = {
    loading: false,
    workers: [],
  }
  componentWillMount() {
    console.log('this is c w')
    const workers = [];
    fetch('/user/productadmin/workerData', {
        credentials: 'include',
    }).then( response => {
        return response.json()
    }).then(json => {
        var data = json.data;
        console.log('product: ',data);
        for(let i = 0; i<data.length; i++) {
          workers.push(
            <Col xs={24} key={i}><Radio value={data[i].id}>{data[i].name}</Radio></Col>
          )
        }
        console.log(workers);
        this.setState({
          workers: workers,
        })
        // return workers;
    });
  }
  handleProduct = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        fetch('/user/productadmin/product', {
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
          
          console.log('json.result: ');
          console.log(result);
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
      labelCol: { span: 10 },
      wrapperCol: { span: 8 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 12,
          offset: 10,
        },
        sm: {
          span: 12,
          offset: 10,
        },
      },
    };
    return (
      <Row>
      <Col span={12}>
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
            {getFieldDecorator('producer_id', {
                rules: [{ required: true, message: 'Please select Worker!' }],
            })(
                <RadioGroup style={{maxHeight: 100,  overflowY: 'auto'}}>
                  <Row>
                    {/* <Col xs={24}><Radio value={400000}>Worker1</Radio></Col> */}
                    {this.state.workers}
                  </Row>
                </RadioGroup>
            )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large" loading={this.state.loading}>Product</Button>
        </FormItem>
      </Form>
      </Col>
      <Col span={12}>
        <img src="/static/images/ice3.png" style={{width: '80%', margin: '0 10%'}}/>
      </Col>
      </Row>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

export default WrappedAdvancedSearchForm