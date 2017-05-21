import React from 'react';
import axios from 'axios';
import Study from './practice-view';

import sources from '../source/challenges';

export default class Quiz extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: true,
			session: false,
			selectedQuiz: '',
			quiz: [],
			quizzes: [],
			length: null
		}
	}
	componentDidMount() {

		const request = (sources) => sources.map(src => axios.get(src));

		axios.all(request(sources)).then(response => {
			const quizzes = response.map(({ data }) => data);
			this.setState({
				quizzes,
				length: quizzes[0].challenges.length,
				selectedQuiz: quizzes[0].title,
				loading: false
			});
		}).catch(err => {
			console.warn(err);
		});

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
		console.log(this.state)
		if (this.state.session && !this.state.loading) {
			return (
				<Study
					endStudy = {this.endStudy}
					quiz = {this.state.quiz} />
			)
		} else {
			return (
				<div className = 'studyComponent'>
					<h1>freeCodeCamp Interview Beta</h1>
					<p>Select a quiz to practice:</p>
					<select onChange = {this.selectQuiz.bind(this)} value = {this.state.selectedQuiz}>
						{this.state.quizzes.map((quiz, idx) => {
							return (
								<option
									value = {quiz.title}
									key = {idx} >
									{quiz.title}
								</option>
							);
						}) }
					</select>
					{this.state.length !== null &&
						<p className = 'quizInfo'>This quiz has a total of {this.state.length} questions</p> }
					<button className = 'studyBtn' onClick = {this.startStudy}>Begin Quiz</button>
					<div>
						<h5>
							<a href="https://github.com/freeCodeCamp/multiple-choice-questions">Visit GitHub to Contribute</a>
						</h5>
					</div>
				</div>
			);
		}
	}
};
