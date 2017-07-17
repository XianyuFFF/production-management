import React from 'react';
// import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Menu, Icon, Breadcrumb, Layout, Dropdown } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer } = Layout;

import Home from './Home';
import Login from './Login';
import Register from './Register';
import ProductAdmin from './ProductAdmin';
import SalesMan from './SalesMan';
import WarehouseMan from './WarehouseMan';
import Worker from './Worker';

import Nav from './Nav';

class App extends React.Component {
  state = {
    isLogin: '',
  }
  login = (isLogin) => {
    alert(isLogin)
  }
  render() {
    return (
      <Router>
        <Layout>
          <Nav isLogin={this.state.isLogin}/>
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <Route exact path="/" component={Home}/>
            <Route path="/index" component={Home}/>
            <Route path="/login" component={Login} login={this.login}/>
            <Route path="/register" component={Register}/>
            <Route path="/user/productadmin/index/:id" component={ProductAdmin}/>
            <Route path="/user/salesman/index/:id" component={SalesMan}/>
            <Route path="/user/warehouseman/index/:id" component={WarehouseMan}/>
            <Route path="/user/worker/index/:id" component={Worker}/>
            <div style={{height: 66, width: '100%'}}></div>
          </Content>
          <Footer style={{ textAlign: 'center',
                           position: 'fixed',
                           bottom: '5px',
                           width: '100%',
                           zIndex: 2,
                           backgroundColor: '#eee',
                           }}>
            Copy ©2017 Created by MrSosann &nbsp;&nbsp;
            <Icon type="github" />
            <a href="https://github.com/Mrsosann/production-management" title="Click to Github address">&nbsp;Github</a>
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App