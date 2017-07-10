import React from 'react';
import ReactDOM from 'react-dom';

class ProductAdmin extends React.Component {
  render() {
    
    // var keywords = this.props.params.id;
    return (
      <div>
          <h1>Welcome ProductAdmin "{this.props.match.params.id}"</h1>
          <h4><a href="/user/logout">Logout</a></h4>
          <h4><a href="/user/productadmin/chuzhu">Logout</a></h4>
      </div>
    );
  }
}

export default ProductAdmin