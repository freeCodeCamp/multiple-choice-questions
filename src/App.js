import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Index from './components/Index';
import Review from './components/ReviewQuiz';
import About from './components/About';
import QuizContainer from './components/QuizContainer';

/* top level component renders the App's routes */
export default class extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={Index} />
          <Route path='/practice/:title/:question' component={QuizContainer} />
          <Route path='/practice/:title' component={QuizContainer} />
          <Route path='/review/:title' component={Review} />
          <Route exact path='/about' component={About} />
          <Route component={Index} />
        </Switch>
      </Router>
    )
  }
};
