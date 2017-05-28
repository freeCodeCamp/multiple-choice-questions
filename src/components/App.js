import React from 'react';
import quizzes from '../challenges';
import Review from './Review';
import Practice from './Practice';

const shuffle = (array) => {
	const cached = {};
	const max = array.length - 1;
	const randomize = () => Math.floor(Math.random() * (max + 1));
	const generateIndex = () => {
			let index = randomize();
			while (index in cached) {
					index = randomize();
			};
			cached[index] = true;
			return index;
	};
	return array.reduce((shuffled, element) => {
		const index = generateIndex();
		shuffled[index] = Object.assign({}, element);
		return shuffled;
	}, []);
};

const findQuiz = (selected, quizzes) => {
	return quizzes.filter(quiz => quiz.title === selected)[0];
};

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			session: null,
			length: quizzes[0].challenges.length,
			selectedQuiz: quizzes[0].title,
			quiz: quizzes[0],
			quizzes
		}
	}
	selectQuiz = (e) => {
		const title = e.target.value;
		const length = this.state.quizzes.filter(quiz => quiz.title === title)[0].challenges.length;
		this.setState({ selectedQuiz: title, length });
	}
	shuffleQuiz = () => {
		const { selectedQuiz, quizzes } = this.state;
		const quiz = findQuiz(selectedQuiz, quizzes);
		quiz.challenges = shuffle(quiz.challenges);
		this.setState({ quiz: quiz, session: 'practice' });
	}
	triggerPractice = () => {
		const { selectedQuiz, quizzes } = this.state;
		const quiz = findQuiz(selectedQuiz, quizzes);
		this.setState({ quiz: quiz, session: 'practice' });
	}
	triggerReview = () => {
		const { selectedQuiz, quizzes } = this.state;
		const quiz = findQuiz(selectedQuiz, quizzes);
		this.setState({ quiz: quiz, session: 'review' });
	}
	close = () => this.setState({ session: null })
	render() {
		switch(this.state.session) {
		case 'review':
			return (
				<Review
					quiz={this.state.quiz}
					close={this.close} />
			);
		case 'practice':
			return (
				<Practice
					quiz={this.state.quiz}
					close={this.close} />
			);
		default:
			return (
			<div className='studyComponent'>
				<h1><strong>freeCodeCamp Interview Beta</strong></h1>
				<p>Select a quiz to practice:</p>
				<select value={this.state.selectedQuiz} onChange={this.selectQuiz.bind(this)}>
					{this.state.quizzes.map(quiz => {
						return (
							<option key={quiz.title} value={quiz.title}>{quiz.title}</option>
						);
					})}
				</select>
				<p className='quizInfo'>This quiz has a total of {this.state.length} questions</p>
				<button className='studyBtn' onClick={this.triggerPractice}>Practice Quiz</button>
				<button className='shuffleBtn' onClick={this.shuffleQuiz}>Shuffle Questions</button>
				<button className='reviewBtn' onClick={this.triggerReview}>Review Questions</button>
				<div>
					<h4>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://github.com/freeCodeCamp/multiple-choice-questions">
							Contribute on GitHub
						</a>
					</h4>
				</div>
			</div>
		)}
	}
};
