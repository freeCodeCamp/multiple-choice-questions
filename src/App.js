import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Quiz from './components/Quiz';
import Review from './components/Review';
import Practice from './components/Practice';

export default class extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={Quiz} />
          <Route path='/practice/:title/:question' component={Practice} />
          <Route path='/practice/:title' component={Practice} />
          <Route path='/review/:title' component={Review} />
          <Route component={Quiz} />
        </Switch>
      </Router>
    )
  }
};
