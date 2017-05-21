import React from 'react';
import ReactDOM from 'react-dom';
import Quiz from './components/quiz-container';
import registerServiceWorker from './utils/registerServiceWorker';
import './styles/index.css';

const props = {
	quizzes: [],
	user: {},
	isAuthenticated: true,
	submitScore: () => null
};

ReactDOM.render(<Quiz {...props} />, document.getElementById('root'));
registerServiceWorker();
