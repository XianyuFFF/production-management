import React from 'react';
import ReactDOM from 'react-dom';
import { Timeline } from 'antd';

function getItems(storeDataList) {
    if(Array.isArray(storeDataList)) {
        const status = [{
            color: 'red',
            action: 'Delivery',
        }, {
            color: 'green',
            action: 'Product',
        }, {
            color: 'red',
            action: 'Add',
        }]
        return storeDataList.map((item, index) => {
            var sign = (item.sign === 0)?status[0]:((item.sign === 1)?status[1]:status[2]);
            return (
                <Timeline.Item key={index+2} color={sign.color}>
                    <p>{item.id}: {new Date(item.date).toLocaleDateString()}</p>
                    <p>{sign.action} A: {item.change_a}, B: {item.change_b}, 
                                  C: {item.change_c}, D: {item.change_d}. </p>
                    <p>Now Store A: {item.product_a}, B: {item.product_b}, 
                                  C: {item.product_c}, D: {item.product_d}. </p>
                </Timeline.Item>
            )
        })
    } else {
        return [];
    }
}
function getItem(storeData) {
    const status = [{
            color: 'red',
            action: 'Delivery',
        }, {
            color: 'green',
            action: 'Product',
        }, {
            color: 'blue',
            action: 'Add',
        }]
    if (storeData) {
        var sign = (storeData.sign === 0)?status[0]:((storeData.sign === 1)?status[1]:status[2]);
        return (
            <Timeline.Item key={storeData.id} color={sign.color}>
                <p>{storeData.id}: {new Date(storeData.date).toLocaleDateString()}</p>
                <p>{sign.action} A: {storeData.change_a}, B: {storeData.change_b}, 
                                C: {storeData.change_c}, D: {storeData.change_d}. 
                Now Store A: {storeData.product_a}, B: {storeData.product_b}, 
                                C: {storeData.product_c}, D: {storeData.product_d}. </p>
            </Timeline.Item>
        )
    } else {
        return null
    }
    
}
class WareIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            storeInfo: [
                <Timeline.Item key='1' color="green">Store start with A: 0, B: 0, C: 0, D: 0</Timeline.Item>,
            ]
        }
    }
    componentWillMount () {
        fetch('/user/warehouseman/getStoreData', {
            credentials: 'include',
        }).then( response => {
            return response.json()
        }).then(json => {
            var data = json.data;
            // console.log(getItem(data[0]));
            var storeInfo = [...this.state.storeInfo];
            for(let i=0; i<data.length; i++) {
                // console.log(getItem(data[i]));
                storeInfo.push(getItem(data[i]))
            }
            console.log(storeInfo)
            this.setState({
                storeInfo,
            })
        })
    }
    render() {
        return (
            <Timeline>
                {this.state.storeInfo}
            </Timeline>
        )
    }
}
export default WareIndex