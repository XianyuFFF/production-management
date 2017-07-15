import React from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'antd';

class Home extends React.Component {
  render() {
    return (
      <div className='home-page'>
        <Carousel autoplay>
          <div>
            <img src="/static/images/index1.png" alt=""/>
            <h3>App Index Login</h3>
          </div>
          <div>
            <img src="/static/images/index2.png" alt=""/>
            <h3>Product Admin Personnel</h3>
          </div>
          <div>
            <img src="/static/images/index3.png" alt=""/>
            <h3>Salesman Order List</h3>
          </div>
          <div>
            <img src="/static/images/index4.png" alt=""/>
            <h3>Warehouseman Store Record</h3>
          </div>
          <div>
            <img src="/static/images/index5.png" alt=""/>
            <h3>Warehouseman Add Product</h3>
          </div>
        </Carousel>
      </div>
    );
  }
}

export default Home