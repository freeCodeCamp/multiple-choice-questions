import React from 'react';
import quizzes from '../challenges';
import View from './View';
import Study from './Practice';

export default class Quiz extends React.Component {
	constructor() {
		super();
		this.state = {
			session: null,
			length: quizzes[0].challenges.length,
			selectedQuiz: quizzes[0].title,
			quiz: quizzes[0],
			quizzes
		}
		document.addEventListener('keydown', this.handleKeyDown);
	}
	handleKeyDown = (k) => {
		if (k.code === 'Escape') this.close();
	}
	selectQuiz = (e) => {
		const title = e.target.value;
		let { length } = this.state;
		this.setState({
			length,
			selectedQuiz: title
		});
	}
	startStudy= () => {
		const { selectedQuiz } = this.state;
		const quiz = this.state.quizzes.filter(quiz => quiz.title === selectedQuiz )[0];
		this.setState({ quiz: quiz, session: 'practice' });
	}
	close = () => this.setState({ session: null })
	viewQuiz = () => {
		const { selectedQuiz } = this.state;
		const quiz = this.state.quizzes.filter(quiz => quiz.title === selectedQuiz )[0];
		this.setState({ quiz: quiz, session: 'review' });
	}
	render() {
		switch(this.state.session) {
		case 'review':
			return (
				<View
					quiz={this.state.quiz}
					close={this.close} />
			);
		case 'practice':
			return (
				<Study
					quiz={this.state.quiz}
					close={this.close} />
			);
		default:
			return (
			<div className='studyComponent'>
				<h1>freeCodeCamp Interview Beta</h1>
				<p>Select a quiz to practice:</p>
				<select value={this.state.selectedQuiz} onChange={this.selectQuiz.bind(this)}>
					{this.state.quizzes.map(quiz => {
						return (
							<option key={quiz.title} value={quiz.title}>{quiz.title}</option>
						);
					})}
				</select>
				{this.state.length !== null &&
					<p className='quizInfo'>This quiz has a total of {this.state.length} questions</p> }
				<button className='studyBtn' onClick={this.startStudy}>Practice Quiz</button>
				<button className='reviewBtn' onClick={this.viewQuiz}>View Questions</button>
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
