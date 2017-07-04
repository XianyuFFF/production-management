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
// import LoginModal from './LoginModal';

class Nav extends React.Component {
  handleLoginModalClick = (e) => {
    console.log(e.key);
    if (e.key === '3') {
      this.setState({ visible: false });
    }
  }
  render() {
      let self = this;
      const iconUser = (
        <Icon type="user" style={{marginRight: '8px'}}/>
      )
      const loginModal = (
        <Menu theme="dark" onClick={self.handleLoginModalClick}>
            <Menu.Item key="0" disabled>Select role to Sign in</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1">
                {iconUser}SalesMan
            </Menu.Item>
            <Menu.Item key="2">
                {iconUser}ProductAdmin
            </Menu.Item>
            <Menu.Item key="3">
                {iconUser}WarehouseMan
            </Menu.Item>
            <Menu.Item key="4">
                {iconUser}Worker
            </Menu.Item>
        </Menu>
    )
    
    return (
        <Header style={{ position: 'fixed', width: '100%', fontSize: 14}}>
            <div className="logo" />
            <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px', width: '60%', display:'inline-block'}}
            >
            <Menu.Item key="1">
                <Link to="/sale/chuzhu">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Icon type="mail" />Guide
            </Menu.Item>
            <Menu.Item key="3">Introduce</Menu.Item>
            </Menu>
            <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px', width: '40%', display:'inline-block'}}
            >
            <Menu.Item key="5" style={{ float:'right' }}>
                <Dropdown overlay={loginModal}>
                    <a className="ant-dropdown-link" href="#">
                    Sign in <Icon type="down" style={{marginRight: '0'}}/>
                    </a>
                </Dropdown>
            </Menu.Item>
            <Menu.Item key="4" style={{ float:'right' }}><Icon type="user-add" /> Sign up</Menu.Item>
            </Menu>
        </Header>
    );
  }
}



export default Nav