import React from 'react';
// import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Menu, Icon, Layout, Dropdown, Modal } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer } = Layout;
import LoginForm from './LoginModal';

class Nav extends React.Component {
  render() {
    return (
        <Header style={{ position: 'fixed', width: '100%', fontSize: 14, zIndex: 2}}>
            <div className="logo" />
            <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px', width: '100%', display:'inline-block'}}
            >
                <Menu.Item key="1">
                    <Link to="/index">Home</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="mail" />Guide
                </Menu.Item>
                <Menu.Item key="3">Introduce</Menu.Item>
                <Menu.Item key="4" style={{float: 'right'}}>
                    <Link to="/login">Sign in</Link>
                </Menu.Item>
                <Menu.Item key="5" style={{float: 'right'}}>
                    <Link to="/register">Sign up</Link>
                </Menu.Item>
            </Menu>
        </Header>
    );
  }
}
    
export default Nav