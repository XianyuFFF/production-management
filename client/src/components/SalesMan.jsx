import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
import List from './List'

class SalesMan extends React.Component {
    constructor() {
        super();
        this.state = {
        subkey: 'List',
        itemkey: null,
        }
    }
    handleSelect(e) {
        this.setState({
            subkey: e.key,
        })
    }
    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '12px 0' ,padding: '0 20px'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>SalesMan</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.subkey}</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.itemkey}</Breadcrumb.Item>
                </Breadcrumb>
                <Layout style={{ margin: '0 20px',padding: '24px 0', background: '#fff', minHeight: 440 }}>
                    <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['List']}
                        style={{ height: 'auto' }}
                        onSelect={this.handleSelect.bind(this)}
                    >
                        <Menu.Item key="List">List</Menu.Item>
                        <Menu.Item key="New">New</Menu.Item>
                    </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <List />
                    </Content>
                </Layout>
            </div>
        )
    }
}
export default SalesMan