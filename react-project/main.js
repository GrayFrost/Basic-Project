/**
 * Created by Administrator on 2017/5/1.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Index from './src/components/index.jsx';
import Other from './src/components/other.jsx';

class Main extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">主页</Link></li>
            <li><Link to="other">其他页面</Link></li>
          </ul>

            <Route exact path="/" component={Index} />
            <Route path="/other" component={Other} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <Main/>,
  document.getElementById("app")
);