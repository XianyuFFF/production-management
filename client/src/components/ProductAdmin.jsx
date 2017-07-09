import React from 'react';
import ReactDOM from 'react-dom';

class ProductAdmin extends React.Component {
  render() {
    
    // var keywords = this.props.params.id;
    return (
      <div>
          <h1>Welcome ProductAdmin "{this.props.match.params.id}"</h1>
      </div>
    );
  }
}

export default ProductAdmin