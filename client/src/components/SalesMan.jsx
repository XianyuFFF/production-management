import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
import List from './List'
import New from './NewOrder'

class SalesMan extends React.Component {
    constructor() {
        super();
        this.state = {
            subkey: 'List',
            itemkey: null,
            content: null,
            listData: [],
        }
    }
    componentDidMount() {
        this.getOrderListData();
        this.setState({
            content: <List listData={this.state.listData}/>
        })
    }
    handleSelect(e) {
        this.getOrderListData();
        const content = (e.key === 'List') ? <List listData={this.state.listData}/>:<New />
        this.setState({
            subkey: e.key,
            content,
        })
    }
    getOrderListData() {
        console.log('this is getOrderListData')
        fetch('/user/salesman/getOrderListData', {
            credentials: 'include',
        }).then( response => {
            return response.json()
        }).then(json => {
            var data = json.data;
            this.setState({
                listData: data,
            })
        });
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
                         {this.state.subkey === 'List' ? <List listData={this.state.listData}/>:<New />} 
                        {/* <New /> */}
                    </Content>
                </Layout>
            </div>
        )
    }
}
export default SalesMan