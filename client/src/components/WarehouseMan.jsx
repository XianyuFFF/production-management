import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
import WareIndex from './WareIndex';
import Add from './Add'

class WarehouseMan extends React.Component {
    constructor() {
        super();
        this.state = {
        subkey: 'Index',
        }
    }
    render() {
        return (
            <Router>
                <div>
                <Breadcrumb style={{ margin: '12px 0' ,padding: '0 20px'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>SalesMan</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.subkey}</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{ margin: '0 20px',padding: '24px 0', background: '#fff', minHeight: 440 }}>
                    <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['Index']}
                        style={{ height: 'auto' }}
                    >
                        <Menu.Item key="Index"><Link to="/user/warehouseman/index/:id">Index</Link></Menu.Item>
                        <Menu.Item key="Add"><Link to="/user/warehouseman/add">Add</Link></Menu.Item>
                    </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280, maxHeight: 400, overflowY: 'auto' }}>
                        <Route exact path="/user/warehouseman/index/:id" component={WareIndex}/>
                        <Route path="/user/warehouseman/add" component={Add}/>
                    </Content>
                </Layout>
                </div>
            </Router>
        )
    }
}
export default WarehouseMan