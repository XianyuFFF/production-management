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
import Home from './components/Home';
import Sale from './components/Sale';

const Child = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
)

ReactDOM.render(
	( 
    <Router>
        <div>
          {/*<ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>

          <hr/>*/}

          <Route exact path="/" component={Home}/>
          <Route path="/index" component={Home}/>
          <Route path="/about" component={Sale}/>
          <Route path="/ppp/:id" component={Child}/>
        </div>
    </Router>
  ),
	document.getElementById('root')
);

// ReactDOM.render(
// 	( 
//     <Router history={browserHistory}>
//       <Route path="/" component={App}>
//         <IndexRoute component={Home}></IndexRoute>
//         <Route path='index/' component={Home} />
//         <Route path='user/' component={Sale} />
//       </Route>
//     </Router>
//   ),
// 	document.getElementById('root')
// );

if (module.hot) {
  module.hot.accept();
}

