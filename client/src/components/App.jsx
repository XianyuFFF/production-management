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
import Sale from './Sale';
import Nav from './Nav';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Nav />
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <Route exact path="/" component={Home}/>
            <Route path="/index" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/sale/:id" component={Sale}/>
          </Content>
          <hr />
          <Footer style={{ textAlign: 'center' }}>
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