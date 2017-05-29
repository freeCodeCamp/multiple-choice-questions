import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Main from './components/Main';
import Review from './components/ReviewQuiz';
import About from './components/About';
import QuizContainer from './components/QuizContainer';

export default class extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={Main} />
          <Route path='/practice/:title/:question' component={QuizContainer} />
          <Route path='/practice/:title' component={QuizContainer} />
          <Route path='/review/:title' component={Review} />
          <Route exact path='/about' component={About} />
          <Route component={Main} />
        </Switch>
      </Router>
    )
  }
};
