import React from 'react'
import { Link } from 'react-router-dom';

/* Practice Quiz Component */
export default class Quiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			complete: false,
			selection: null,
			answer: null,
		}
		document.addEventListener('keydown', this.handleKeyDown);
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown, false);
	}
	onHover = () => this.setState({ selection: null });
	handleKeyDown = ({ code }) => {

		let {
			answer,
			selection,
			complete
		} = this.state;

		const { index, meta } = this.props;

		const question = meta.get('currentQuestion');
		const questions = question.get('choices').size;
		const solution = +question.get('solution');

		switch(code) {
		case 'Space':
			if (complete) {
				this.props.finishQuiz();
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
			this.props.finishQuiz();
			this.props.history.push('/');
			break;
		default:
			return;
		}
	}
	handleAnswer = (choice, solution) => {
		if (choice === solution) {
			this.props.correct();
			this.setState({
				answer: true,
				selection: null,
			});
		} else {
			this.setState({
				answer: false,
				selection: null
			});
		}
	}
	nextQuestion = () => {
		const { meta, title } = this.props;
		const index = meta.get('index');
		const length = meta.getIn(['quiz', 'challenges']).size;
		if (index === length - 1) {
			this.setState({ complete: true });
		} else {
			this.props.nextQuestion();
			const nextTitle = meta
				.getIn(['quiz', 'challenges'])
				.find((v, k) => k === (index + 1))
				.get('title');
			this.props.history.replace(`/practice/${title}/${nextTitle}`);
			this.setState({
				answer: null,
				selection: null
			});
		}
	}
	renderMarkup = (html) => {
		return (
			<span dangerouslySetInnerHTML={{__html: html}}></span>
		);
	}
	render() {
		const { selection, answer, complete } = this.state;
		const { meta, screen } = this.props;
		const { isMobile } = screen;

		const quiz = meta.get('quiz');
		const score = meta.get('score');
		const index = meta.get('index');
		const numberOfQuestions = quiz.get('challenges').size;
		const currentQuestion = meta.get('currentQuestion');
		const solution = +currentQuestion.get('solution');
		const percentage = score / meta.getIn(['quiz', 'challenges']).size;

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
								<span>{quiz.get('title')}</span>
							</div>
							{!this.state.complete
								? <h3 className='quizMeta'>Question {index + 1} of {numberOfQuestions}</h3>
								: <h3 className='quizMeta'>Quiz Complete</h3>}
								{!isMobile && <span id="return">
									<Link to='/'>
										<i className="fa fa-times-circle" aria-hidden="true"></i>
									</Link>
								</span>}
						</div>

						{!complete && <h1 className='questionTitle'>
							{this.renderMarkup(currentQuestion.get('title'))}
						</h1>}

						{!complete && currentQuestion.get('choices').map((choice, idx) => {
							const key = (choice + idx);
							/* User has not selected an answer yet: */
							if (answer === null) {
								return (
									<div
										key={key}
										className={renderClassName(idx)}
										onMouseEnter={this.onHover}
										onClick={() => this.handleAnswer(idx, solution)}>
										<p>{this.renderMarkup(choice)}</p>
									</div>
								)
							/* User selected the correct answer: */
							} else if (answer) {
								if (solution === idx) {
									return (
										<div
											key={key}
											className='choice' id='correctWinner'>
											<p>{this.renderMarkup(choice)}</p>
										</div>
									)
								} else {
									return (
										<div
											key={key}
											className='choice' id='wrongWinner'>
											<p>{this.renderMarkup(choice)}</p>
										</div>
									)
								}
							/* User selected the wrong answer: */
							} else {
								if (solution === idx) {
									return (
										<div
											key={key}
											className='choice' id='correctLoser'>
											<p>{this.renderMarkup(choice)}</p>
										</div>
									)
								} else {
									return (
										<div
											key={key}
											className='choice' id='wrongLoser'>
											<p>{this.renderMarkup(choice)}</p>
										</div>
									)
								}
							}
						})}

					{answer !== null && !complete &&
						<div className='messageDiv'>
							{answer
								? <h1 className='correctAnswer'>Correct, great work!</h1>
								: <h1 className='wrongAnswer'>Sorry, that is not correct!</h1>}
							{answer !== null && !answer && currentQuestion.get('explanation') && (
								<div className='explanation'>
									<h3>Explanation:</h3>
									<p>{currentQuestion.get('explanation')}</p>
								</div>
							)}
							{index + 1 === numberOfQuestions
								? <button onClick={this.nextQuestion}>View Results</button>
								: <button onClick={this.nextQuestion}>Next Question</button>}
						</div>}

					{complete &&
						<div>
							<h1 className='scoreMessage'>
								You scored {score} correct out of {numberOfQuestions} questions! { percentage > 0.75 ? 'Nice work!' : 'Better luck next time!'}
							</h1>
							<Link className='finishBtn' to='/' onClick={() => this.props.finishQuiz()}>
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
