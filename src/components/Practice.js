import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { connectScreenSize } from 'react-screen-size';
import {
	shuffle,
	shuffleAnswers,
	findQuiz,
	mapScreenSizeToProps
} from '../utils/helpers';

/* Practice Quiz Component */
class Practice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			quiz: this.props.quiz,
			complete: false,
			selection: null,
			answer: null,
			score: 0
		}
		document.addEventListener('keydown', this.handleKeyDown);
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown, false);
	}
	onHover = () => this.setState({ selection: null });
	handleKeyDown = ({ code }) => {

		let {
			quiz,
			answer,
			index,
			selection,
			complete
		} = this.state;

		const question = quiz.challenges[index];
		const questions = question.choices.length;
		const solution = +question.solution;

		switch(code) {
		case 'Space':
			if (complete) {
				this.props.history.push('/');
			} else if (selection !== null) {
				this.handleAnswer(selection, solution);
			} else if (answer !== null) {
				this.nextQuestion();
			}
			break;
		case 'ArrowDown':
			if (selection === null) {
				this.setState({ selection: 0 });
			} else {
				selection++;
				if (selection === questions) {
					this.setState({ selection: 0 });
				} else {
					this.setState({ selection });
				}
			}
			break;
		case 'ArrowUp':
			if (selection === null) {
				this.setState({ selection: questions - 1 });
			} else {
				selection--;
				if (selection === -1) {
					this.setState({ selection: questions - 1 });
				} else {
					this.setState({ selection });
				}
			}
			break;
		case 'Escape':
			this.props.history.push('/');
			break;
		default:
			return;
		}
	}
	handleAnswer = (choice, solution) => {
		if (choice === solution) {
			this.setState({
				answer: true,
				selection: null,
				score: this.state.score + 1
			});
		} else {
			this.setState({
				answer: false,
				selection: null
			});
		}
	}
	nextQuestion = () => {
		const length = this.props.quiz.challenges.length;
		const { index } = this.state;
		if (index === length - 1) {
			this.setState({ complete: true });
		} else {
			this.setState({
				index: this.state.index + 1,
				answer: null
			});
		}
	}
	renderMarkup = (html) => {
		return (
			<span dangerouslySetInnerHTML={{__html: html}}></span>
		);
	}
	render() {
		const { isMobile } = this.props.screen;
		const { index, quiz, selection } = this.state;

		if (!quiz) return null;

		const question = quiz.challenges[index];
		const solution = +question.solution;
		const percentage = this.state.score / this.props.quiz.challenges.length;
		const renderClassName = (i) => {
			return (selection === i)
				? `choice selected ${isMobile ? 'mobile' : 'desktop'}`
				: `choice ${isMobile ? 'mobile' : 'desktop'}`;
		};

		return (
			<div className='studyWrapper'>
				<div className='studyContainer'>

						<div className='quizHeader'>
							<div className='quizTitle'>
								<a
									target="_blank"
									rel="noopener noreferrer"
									className="fccLink"
									href="http://freecodecamp.com/">
									<img src="/assets/freeCodeCamp.png" alt="freeCodeCamp Logo" />
								</a>
								<span>{this.props.quiz.title}</span>
							</div>
							{!this.state.complete
								? <h3 className='quizMeta'>Question {this.state.index + 1} of {quiz.challenges.length}</h3>
								: <h3 className='quizMeta'>Quiz Complete</h3>}
								{!isMobile && <span id="return">
									<Link to='/'>
										<i className="fa fa-times-circle" aria-hidden="true"></i>
									</Link>
								</span>}
						</div>

						{!this.state.complete && <h1 className='questionTitle'>
							{this.renderMarkup(question.title)}
						</h1>}

						{!this.state.complete && question.choices.map((answer, idx) => {
							if (this.state.answer === null) {
								return (
									<div
										key={answer + idx}
										className={renderClassName(idx)}
										onMouseEnter={this.onHover}
										onClick={() => this.handleAnswer(idx, solution)}>
										<p>{this.renderMarkup(answer)}</p>
									</div>
								)
							} else if (this.state.answer) {
								if (solution === idx) {
									return (
										<div
											key={answer + idx}
											className='choice' id='correctWinner'>
											<p>{this.renderMarkup(answer)}</p>
										</div>
									)
								} else {
									return (
										<div
											key={answer + idx}
											className='choice' id='wrongWinner'>
											<p>{this.renderMarkup(answer)}</p>
										</div>
									)
								}
							} else {
								if (solution === idx) {
									return (
										<div
											key={answer + idx}
											className='choice' id='correctLoser'>
											<p>{this.renderMarkup(answer)}</p>
										</div>
									)
								} else {
									return (
										<div
											key={answer + idx}
											className='choice' id='wrongLoser'>
											<p>{this.renderMarkup(answer)}</p>
										</div>
									)
								}
							}
						})}

					{this.state.answer !== null && !this.state.complete &&
						<div className='messageDiv'>
							{this.state.answer
								? <h1 className='correctAnswer'>Correct, great work!</h1>
								: <h1 className='wrongAnswer'>Sorry, that is not correct!</h1>}
							{this.state.index + 1 === quiz.challenges.length
								? <button onClick={this.nextQuestion}>View Results</button>
								: <button onClick={this.nextQuestion}>Next Question</button>}
						</div>}

					{this.state.complete &&
						<div>
							<h1 className='scoreMessage'>
								You scored {this.state.score} correct out of {this.props.quiz.challenges.length} questions! { percentage > 0.75 ? 'Nice work!' : 'Better luck next time!'}
							</h1>
							<Link className='finishBtn' to='/'>
								<button>Return to Quiz Page</button>
							</Link>
						</div>}

						{!isMobile && <div id='infoBox'>
							<p>Use <i className='fa fa-long-arrow-up'></i> <i className='fa fa-long-arrow-down'></i> space and esc</p>
						</div>}

				</div>
			</div>
		);
	}
};

const mapStateToProps = (state, props) => {
	const { title, question } = props.match.params;
	const { quizzes } = state;

	const quiz = findQuiz(title, quizzes);

	if (!quiz) {
		props.history.push('/');
	} else {
		quiz.challenges = shuffle(quiz.challenges);
		quiz.challenges = quiz.challenges.map(shuffleAnswers);
	}

	if (question) {
		quiz.challenges = quiz.challenges.filter(challenge => {
			const { title } = challenge;
			let match = title;
			if (title.charAt(title.length - 1) === '?') {
				match = match.slice(0, title.length - 1);
			}
			return match === question;
		});
	}

	return { quiz };

};

const connectedPractice = connect(mapStateToProps)(Practice);
export default connectScreenSize(mapScreenSizeToProps)(connectedPractice);
