import React from 'react';
// import ReactDOM from 'react-dom';
import { Menu, Icon, Breadcrumb, Layout, Dropdown } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
// 固定头部
const { Header, Content, Footer } = Layout;

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

class Nav extends React.Component {
  render() {
    return (
      <Layout>
        <Header style={{ position: 'fixed', width: '100%', height: '46px' }}>
            <div className="logo" />
            <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '46px' }}
            >
            <Menu.Item key="1">
                Home
            </Menu.Item>
            <Menu.Item key="2">
                <Icon type="mail" />Guide
            </Menu.Item>
            <Menu.Item key="3">Introduce</Menu.Item>
            <Menu.Item style={{ float:'right' }}>
                <Dropdown overlay={signin}>
                    <a className="ant-dropdown-link" href="#">
                    Sign in <Icon type="down" style={{marginRight: '0'}}/>
                    </a>
                </Dropdown>
            </Menu.Item>
            <Menu.Item key="4" style={{ float:'right' }}><Icon type="user-add" /> Sign up</Menu.Item>
            </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 46 }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>Content</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

export default Nav