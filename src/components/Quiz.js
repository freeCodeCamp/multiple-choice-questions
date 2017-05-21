import React from 'react';
import quizzes from '../challenges';
import Study from './Practice';

export default class Quiz extends React.Component {
	constructor() {
		super();
		this.state = {
			session: false,
			length: quizzes[0].challenges.length,
			selectedQuiz: quizzes[0].title,
			quiz: [],
			quizzes
		}
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
		this.setState({ quiz: quiz, session: true });
	}
	endStudy = (score) => {
		this.setState({ session: false });
		console.log('end of quiz, you scored: ', score);
	}
	render() {
		if (this.state.session && !this.state.loading) {
			return (
				<Study
					endStudy={this.endStudy}
					quiz={this.state.quiz} />
			)
		} else {
			return (
				<div className='studyComponent'>
					<h1>freeCodeCamp Interview Beta</h1>
					<p>Select a quiz to practice:</p>
					<select onChange={this.selectQuiz.bind(this)} value={this.state.selectedQuiz}>
						{this.state.quizzes.map((quiz, idx) => {
							return (
								<option
									value={quiz.title}
									key={idx} >
									{quiz.title}
								</option>
							);
						}) }
					</select>
					{this.state.length !== null &&
						<p className='quizInfo'>This quiz has a total of {this.state.length} questions</p> }
					<button className='studyBtn' onClick={this.startStudy}>Begin Quiz</button>
					<div>
						<h5>
							<a href="https://github.com/freeCodeCamp/multiple-choice-questions">Visit GitHub to Contribute</a>
						</h5>
						<h5>
							<a href="https://github.com/bonham000/fcc-multiple-choice">View Source of this App</a>
						</h5>
					</div>
				</div>
			);
		}
	}
};
