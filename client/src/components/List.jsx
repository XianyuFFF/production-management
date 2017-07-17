import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, message } from 'antd';
message.config({
  top: 74,
  duration: 4,
});
const columns = [{
  title: 'Id',
  dataIndex: 'id',
}, {
  title: 'SalesMan',
  dataIndex: 'salesman_id',
}, {
  title: 'Date',
  dataIndex: 'order_date',
}, {
  title: 'A',
  dataIndex: 'product_a',
}, {
  title: 'B',
  dataIndex: 'product_b',
}, {
  title: 'C',
  dataIndex: 'product_c',
}, {
  title: 'D',
  dataIndex: 'product_d',
}, {
  title: 'Completed',
  dataIndex: 'whether_complete',
  render: (text, record) => <span>{text == 0?'No':new Date(record.finish_date*1000).toLocaleDateString()}</span>
}];
const data = [{
  key: '1',
  id: 10000000,
  salesman_id: 200000,
  order_date: '2017-7-12',
  product_a: 10,
  product_b: 10,
  product_c: 0,
  product_d: 20,
  whether_complete: 1,
}, {
  key: '2',
  id: 10000001,
  salesman_id: 200000,
  order_date: '2017-7-12',
  product_a: 10,
  product_b: 10,
  product_c: 0,
  product_d: 20,
  whether_complete: 0,
}, {
  key: '3',
  id: 10000002,
  salesman_id: 200000,
  order_date: '2017-7-12',
  product_a: 10,
  product_b: 10,
  product_c: 0,
  product_d: 20,
  whether_complete: 0,
}, ];
function initListData(listData) {
    if (listData) {
        console.log(typeof listData[0].order_date)
        return listData.map( (item)=> {
                item.key = item.id;
                item.order_date = new Date(item.order_date).toLocaleDateString();
                return item;
            })
    } else {
        return null;
    }
    console.log(listData)
    
}
function initStoreData(storeData) {
    if(storeData) {
        return (
            <div>
            <span className='product-sum'>Current Store</span>
            <span className='product-sum'>A : {storeData.product_a}</span>
            <span className='product-sum'>B : {storeData.product_b}</span>
            <span className='product-sum'>C : {storeData.product_c}</span>
            <span className='product-sum'>D : {storeData.product_d}</span> 
            </div>
        )
    }
}
function enough(storeData) {
    if(storeData) {
        return storeData.product_a >= this.state.product_a &&
                storeData.product_b >= this.state.product_b &&
                storeData.product_c >= this.state.product_c &&
                storeData.product_d >= this.state.product_d
    } else {
        return false;
    }
}

class List extends React.Component {
    state = {
        selectedRowKeys: [],
        selectedRows: [],
        product_a: 0,
        product_b: 0,
        product_c: 0,
        product_d: 0,
        loading: false,
        storeData: {
            product_a: 0,
            product_b: 0,
            product_c: 0,
            product_d: 0,
        },
    }
    componentWillMount() {
        console.log('list data: ', this.props.listData)
    }
    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log(this.props.listData);
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        var product_a= 0,
            product_b= 0,
            product_c= 0,
            product_d= 0;
        selectedRows.forEach(function(element) {
            product_a += element.product_a;
            product_b += element.product_b;
            product_c += element.product_c;
            product_d += element.product_d;
        }, this);
        this.setState({
            selectedRowKeys,
            selectedRows,
            product_a,
            product_b,
            product_c,
            product_d,
        })
    }
    delivery () {
        fetch('/user/salesman/delivery', {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              product_a: this.state.product_a,
              product_b: this.state.product_b,
              product_c: this.state.product_c,
              product_d: this.state.product_d,
              selectedRowKeys: this.state.selectedRowKeys,
          })
        }).then( response => {
          // console.log(response)
          return response.json()
        }).then( json => {
          let result = json.result;
          this.setState({
              loading: true,
          })
          var self = this;
          setTimeout(function(){
            self.props.getOrderListData();
            self.setState({
                loading: false,
            })
            // window.location.href = window.location.href+'#';
          }, 1000)
          message.success(result.message+', delivery ing')
        //   this.props.history.push(`/user/${result.role.toLowerCase()}/index/${result.id}`);
          // window.location.href = '/user/productadmin/index/100000'
        })
    }
    render() {
        // rowSelection object indicates the need for row selection
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            onChange: this.onSelectChange,
            selectedRowKeys,
            getCheckboxProps: record => ({
                disabled: record.whether_complete === 1,    // Column configuration not to be checked
            }),
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className='salesman-list'>
            {initStoreData(this.props.listData.storeData)}
            <Table 
            rowSelection={rowSelection} 
            columns={columns} 
            dataSource={initListData.call(this,this.props.listData.orderData)} 
            pagination={false}
            size='small'
            style={{maxHeight: 320, overflowY: 'auto'}}/>
            <span className='product-sum'>Current Sum</span>
            <span className='product-sum'>A : {this.state.product_a}</span>
            <span className='product-sum'>B : {this.state.product_b}</span>
            <span className='product-sum'>C : {this.state.product_c}</span>
            <span className='product-sum'>D : {this.state.product_d}</span>
            <Button type="primary"
            style={{
                float:'right',marginTop: 10
            }}
            disabled={!hasSelected || !enough.call(this, this.props.listData.storeData)}
            loading={loading}
            onClick={this.delivery.bind(this)}>
            delivery
            </Button>
            </div>
        )
    }
}
  
export default List