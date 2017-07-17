import React from 'react';
import ReactDOM from 'react-dom';
import { Card } from 'antd';

import { Table } from 'antd';

class Current extends React.Component {
  render() {
    return (
      <div>
      <Table
        columns={this.props.columns}
        dataSource={this.props.storeData}
        bordered
        title={()=>'Current Store'}
        footer={null}
        pagination={false}
        style={{
          marginBottom: 20,
        }}
      />
      <Table
        columns={this.props.columns}
        dataSource={this.props.orderData}
        bordered
        title={()=>'Current all orders'}
        footer={null}
        pagination={false}
        style={{
        }}
      />
      </div>
    );
  }
}

export default Current