import React from 'react';
import ReactDOM from 'react-dom';
import Quiz from './components/Quiz';
import registerServiceWorker from './utils/registerServiceWorker';
import './styles/index.css';

ReactDOM.render(<Quiz />, document.getElementById('root'));
registerServiceWorker();
