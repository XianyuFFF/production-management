import React from 'react';
import ReactDOM from 'react-dom';

class WarehouseMan extends React.Component {
    constructor() {
        super();
        this.state = {
        subkey: 'Produce',
        itemkey: 'Current',
        }
    }
    render() {
        return (
            <div>
                <h1>this is WarehouseMan {this.props.match.params.id}</h1>
            </div>
        )
    }
}
export default WarehouseMan