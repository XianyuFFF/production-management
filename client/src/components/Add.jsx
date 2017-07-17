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
  }
  componentWillMount() {
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
    });
  }
  handleProduct = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        fetch('/user/warehouseman/add', {
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
          }, 1000);
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
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large" loading={this.state.loading}>Add</Button>
        </FormItem>
      </Form>
      </Col>
      <Col span={12}>
        <img src="/static/images/cat1.png" style={{width: '80%', margin: '0 10%'}}/>
      </Col>
      </Row>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

export default WrappedAdvancedSearchForm