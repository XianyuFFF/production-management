import React from 'react';
// import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Menu, Icon, Layout, Dropdown, Modal } from 'antd';
import { Popconfirm, message } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer } = Layout;

class Nav extends React.Component {
  state = {
      isLogin: this.props.isLogin,
  }
  confirm(e) {
    message.success('Click on Yes');
    fetch('/user/logout', {
        credentials: 'include',
    }).then( response => {
        console.log(response)
        window.location.href = '/index';
    });
    // this.props.history.push(`/index`);
    return true;
  }

  cancel(e) {
    console.log(e);
    message.error('Click on No');
    return false;
  }

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
                    <Link to="/index"><Icon type="mail" />Guide</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Popconfirm title="Are you sure logout?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                        <a href="/user/logout">logout</a>
                    </Popconfirm>
                </Menu.Item>
                <Menu.Item key="4" style={{float: 'right'}}>
                    {this.state.isLogin?(
                        <a href="/logout">Sign out</a>
                    ):(
                        <Link to="/login">Sign in</Link>
                    )}
                </Menu.Item>
                <Menu.Item key="5" style={{float: 'right'}}>
                    {this.state.isLogin?(
                        <a href="/user/index">{this.state.isLogin}</a>
                    ):(
                        <Link to="/register">Sign up</Link>
                    )}
                </Menu.Item>
            </Menu>
        </Header>
    );
  }
}
    
export default Nav