import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { DatePicker, message } from 'antd';
import './style/index.css'

import Nav from './components/nav'

ReactDOM.render(
	<div>
    <Nav  />
  </div>,
	document.getElementById('root')
	)

// ReactDOM.render(<App />, document.getElementById('root'));



if (module.hot) {
  module.hot.accept();
}

