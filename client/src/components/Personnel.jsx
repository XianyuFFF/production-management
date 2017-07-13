import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Icon } from 'antd';
import { Popconfirm, message, Button } from 'antd';
message.config({
  top: 74,
  duration: 5,
});

const columns = [{
  title: 'Id',
  dataIndex: 'id',
}, {
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Gender',
  dataIndex: 'gender',
  render: text => <span>{text=='0'?'female':'male'}</span>,
}, {
  title: 'Tel',
  dataIndex: 'tel',
}, {
  title: 'E-mail',
  dataIndex: 'email',
}, {
  title: 'Sign',
  dataIndex: 'sign',
  render: (text, record) => (
    <span>{record.name?'Yes':'No'}</span>
  )
}];

class Personnel extends React.Component {
  state = {
    data: null,
    role: this.props.role,
    loading: false,
  }
  componentWillMount () {
    this.getPersonnelData(this.props.role);
  }
  componentDidUpdate() {
    console.log(this.state.role);
    console.log(this.props.role);
    if(this.state.role !== this.props.role) {
      this.setState({
        role: this.props.role,
      })
      this.getPersonnelData(this.props.role);
    }
  }
  getPersonnelData(role) {
    fetch('/user/productadmin/personnel', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({role})
    }).then( response => {
      return response.json()
    }).then( json => {
      let result = json.result;
      this.setState({
        data: result.map((item, index) => {
          item.key = index;
          return item
        })
      })
    })
  }
  adduser(e) {
    this.setState({
      loading: true,
    })
    const role = this.props.role;
    fetch('/user/productadmin/adduser', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({role})
    }).then( response => {
      return response.json()
    }).then( json => {
      let result = json.result;
      console.log('this is adduser ', result);
      this.setState({
        newid: result.id,
      })
      var self = this;
      setTimeout(function(){
        message.success(`${result.role} ${result.id} Added successfully!`);
        self.setState({
          loading: false,
        })
        self.getPersonnelData(self.props.role);
      }, 1000)
    })
  }
  render() {
    return (
      <div className="personnel">
        <h1>{this.props.role}</h1>
        <Table columns={columns} dataSource={this.state.data}
        pagination={false} />
        <Button type="primary"
          style={{
            float:'right',marginTop: 10
          }}
          onClick={this.adduser.bind(this)}
          loading={this.state.loading}>
          Add {this.props.role}
        </Button>
      </div>
    );
  }
}

export default Personnel