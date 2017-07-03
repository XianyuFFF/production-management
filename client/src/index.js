import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, browserHistory,Link, IndexRoute, IndexRedirect } from 'react-router';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { DatePicker, message } from 'antd';
import './style/index.css'

import App from './components/App';

ReactDOM.render(
	( 
    <div>
      <App />
    </div>
  ),
	document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}

