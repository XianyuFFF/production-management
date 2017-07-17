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
import Sale from './Sale';
import Nav from './Nav';

const iconUser = (
    <Icon type="user" style={{marginRight: '8px'}}/>
);
const signin = (
    <Menu theme="dark">
        <Menu.Item key="0" disabled>Select role to Sign in</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
        <a target="_blank" rel="noopener noreferrer">
            {iconUser}SalesMan</a>
        </Menu.Item>
        <Menu.Item key="2">
        <a target="_blank" rel="noopener noreferrer">
            {iconUser}ProductAdmin</a>
        </Menu.Item>
        <Menu.Item key="3">
        <a target="_blank" rel="noopener noreferrer">
            {iconUser}WarehouseMan</a>
        </Menu.Item>
        <Menu.Item key="4">
        <a target="_blank" rel="noopener noreferrer">
            {iconUser}Worker</a>
        </Menu.Item>
    </Menu>
);
class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Nav />
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <Route exact path="/" component={Home}/>
            <Route path="/index" component={Home}/>
            <Route path="/sale/:id" component={Sale}/>
          </Content>
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

// class App extends React.Component {
//   constructor() {
//     super();
//   }
//   saleClick () {
//     console.log('sale is clicked');
//     this.props.history.push('/sale/chuzhu');
//   }
//   render() {
//     return (
//       <Layout>
//         <Header style={{ position: 'fixed', width: '100%', height: '46px' }}>
//             <div className="logo" />
//             <Menu
//             theme="dark"
//             mode="horizontal"
//             defaultSelectedKeys={['1']}
//             style={{ lineHeight: '46px' }}
//             >
//             <Menu.Item key="1">
//                 Home
//             </Menu.Item>
//             <Menu.Item key="2" >
//                 <span onClick={this.saleClick} ><Icon type="mail" />Guide</span>
//             </Menu.Item>
//             <Menu.Item key="3">Introduce</Menu.Item>
//             <Menu.Item style={{ float:'right' }}>
//                 <Dropdown overlay={signin}>
//                     <a className="ant-dropdown-link" href="#">
//                     Sign in <Icon type="down" style={{marginRight: '0'}}/>
//                     </a>
//                 </Dropdown>
//             </Menu.Item>
//             <Menu.Item key="4" style={{ float:'right' }}><Icon type="user-add" /> Sign up</Menu.Item>
//             </Menu>
//         </Header>

//         <Content style={{ padding: '0 50px', marginTop: 46 }}>
//             <Router>
//                 <div>
//                   <Route exact path="/" component={Home}/>
//                   <Route path="/index" component={Home}/>
//                   <Route path="/sale/:id" component={Sale}/>
//                 </div>
//             </Router>
//         </Content>

//         <Footer style={{ textAlign: 'center' }}>
//             Ant Design ©2016 Created by Ant UED
//         </Footer>
//       </Layout>
//     );
//   }
// }

export default App