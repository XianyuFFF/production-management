import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Steps, Icon } from 'antd';
const Step = Steps.Step;

class ProductAdmin extends React.Component {
  render() {
    
    // var keywords = this.props.params.id;
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0', padding: '0 20px' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>ProductAdmin</Breadcrumb.Item>
          <Breadcrumb.Item>Index</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff',margin: '0 20px', padding: 20, minHeight: 880 }}>
          <h1>Welcome ProductAdmin "{this.props.match.params.id}"</h1>
        </div>
      </div>
    );
  }
}

export default ProductAdmin