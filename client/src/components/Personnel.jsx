import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Icon } from 'antd';

const columns = [{
  title: 'Id',
  dataIndex: 'id',
}, {
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Gender',
  dataIndex: 'gender',
}, {
  title: 'Tel',
  dataIndex: 'tel',
}, {
  title: 'E-mail',
  dataIndex: 'email',
}];

const data = [{
  key: '1',
  id: '12',
  name: 'j',
  gender: 'New York No. 1 Lake Park',
  tel: '123456789',
  email: '123@123.com'
}, {
  key: '2',
  id: 'John Brown',
  name: 32,
  gender: 'New York No. 1 Lake Park',
  tel: '123456789',
  email: '123@123.com'
}];

class Personnel extends React.Component {

  render() {
    
    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default Personnel