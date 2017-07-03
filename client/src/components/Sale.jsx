import React from 'react';
import ReactDOM from 'react-dom';

class Sale extends React.Component {
  render() {
    
    // var keywords = this.props.params.id;
    return (
      <div>
          <h1>Welcome Salesman "{this.props.match.params.id}"</h1>
      </div>
    );
  }
}

export default Sale