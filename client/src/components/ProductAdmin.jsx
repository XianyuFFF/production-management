import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { Icon, message } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
message.config({
  top: 74,
  duration: 3,
});

import Current from './Current';
import Product from './Product';
import Personnel from './Personnel';

class ProductAdmin extends React.Component {
  constructor() {
    super();
    this.state = {
      subkey: 'Produce',
      itemkey: 'Current',
      content: null,
      orderData: null,
      storeData: null,
      columns: null,
      workerData: null,
      userData: null,
    }
    this.handleFetchData(); 
  }
  componentWillMount() {
    const columns = [{
      title: 'Product A',
      dataIndex: 'product_a',
    }, {
      title: 'Product B',
      className: 'column-notEnough',
      dataIndex: 'product_b',
    }, {
      title: 'Product C',
      dataIndex: 'product_c',
    }, {
      title: 'Product D',
      dataIndex: 'product_d',
    }];
    fetch('/user/productadmin/currentData', {
        credentials: 'include',
    }).then( response => {
        return response.json()
    }).then(json => {
        var data = json.data;
        this.setState({
          content: <Current 
                      orderData={this.state.orderData}
                      storeData={this.state.storeData}
                      columns={this.state.columns}
                  />,
        })
        this.setState({
          orderData: data.orderData,
          storeData: data.storeData,
          columns: columns.map((value, index, arr) => {
            value.className = (data.orderData[0][value.dataIndex] > data.storeData[0][value.dataIndex])
                               ? 'column-notEnough' : '';
            return value;
          }),
          workerData: data.workerData,
        })
    });
  }
  handleSelect = (e) => {
    this.handleFetchData();
    var self = this;
    const Produce = {
      Current: <Current 
                  orderData={this.state.orderData}
                  storeData={this.state.storeData}
                  columns={this.state.columns}
               />,
      Product: <Product workerData={this.state.workerData}/>,
    }
    const subkey = Produce[e.key]?'Produce':'Personnel';
    const content = Produce[e.key] ? Produce[e.key] : <Personnel role={e.key}/>
    const itemkey = e.key;
    this.setState({
      subkey,
      itemkey,
      content,
    })
  }
  
  handleFetchData() {
    const columns = [{
      title: 'Product A',
      dataIndex: 'product_a',
    }, {
      title: 'Product B',
      className: 'column-notEnough',
      dataIndex: 'product_b',
    }, {
      title: 'Product C',
      dataIndex: 'product_c',
    }, {
      title: 'Product D',
      dataIndex: 'product_d',
    }];
    fetch('/user/productadmin/currentData', {
        credentials: 'include',
    }).then( response => {
        return response.json()
        // window.location.href = '/index';
        // this.props.history.push(`/index`);
    }).then(json => {
        var data = json.data;
        this.setState({
          orderData: data.orderData,
          storeData: data.storeData,
          columns: columns.map((value, index, arr) => {
            value.className = (data.orderData[0][value.dataIndex] > data.storeData[0][value.dataIndex])
                               ? 'column-notEnough' : '';
            return value;
          }),
          workerData: data.workerData,
        })
    });
  }
  render() {
    // var id = this.props.match.params.id;
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' ,padding: '0 20px'}}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>ProductAdmin</Breadcrumb.Item>
          <Breadcrumb.Item>{this.state.subkey}</Breadcrumb.Item>
          <Breadcrumb.Item>{this.state.itemkey}</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ margin: '0 20px',padding: '24px 0', background: '#fff', minHeight: 440 }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[this.state.itemkey]}
              defaultOpenKeys={[this.state.subkey]}
              style={{ height: 'auto' }}
              onSelect={this.handleSelect}
            >
              <SubMenu key="Produce" title={<span><Icon type="laptop" />Produce</span>}>
                <Menu.Item key="Current">Current</Menu.Item>
                <Menu.Item key="Product">Product</Menu.Item>
              </SubMenu>
              <SubMenu key="Personnel" title={<span><Icon type="user" />Personnel</span>}>
                <Menu.Item key="ProductAdmin">ProductAdmin</Menu.Item>
                <Menu.Item key="SalesMan">SalesMan</Menu.Item>
                <Menu.Item key="WarehouseMan">WarehouseMan</Menu.Item>
                <Menu.Item key="Worker">Worker</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
               {this.state.content}   
              {/* <Personnel role={'ProductAdmin'} />   */}
          </Content>
        </Layout>
      </div>
    );
  }
}

export default ProductAdmin