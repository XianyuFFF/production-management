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
  constructor () {
      super();
      this.state = {
        loginModalVisible: false,
        loginRole: 1
      }
  }
  showModal = () => {
    this.setState({
      loginModalVisible: true,
    });
  }
  handleLoginModalClick = (e) => {
    console.log(e.key);
    this.setState({
        loginModalVisible: true,
        loginRole: e.key,

    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      loginModalVisible: false,
    });
  }
  handleSubmit = (e) => {
    console.log(e);
    this.setState({
      loginModalVisible: false,
    });
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
            <Menu.Item key="ProductAdmin">
                {iconUser}ProductAdmin
            </Menu.Item>
            <Menu.Item key="SalesMan">
                {iconUser}SalesMan
            </Menu.Item>
            <Menu.Item key="WarehouseMan">
                {iconUser}WarehouseMan
            </Menu.Item>
            <Menu.Item key="Worker">
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
                <Dropdown overlay={loginModal} trigger={['hover']}>
                    <a className="ant-dropdown-link" href="#">
                    Sign in <Icon type="down" style={{marginRight: '0'}}/>
                    </a>
                </Dropdown>
            </Menu.Item>
            <Menu.Item key="4" style={{ float:'right' }}><Icon type="user-add" /> Sign up</Menu.Item>
            </Menu>
            <Modal
            title={null}
            visible={this.state.loginModalVisible}
            footer={null}
            onCancel={this.handleCancel}
            width={480}
            >
            <LoginForm role={this.state.loginRole}/>
            </Modal>
        </Header>
    );
  }
}
    
export default Nav