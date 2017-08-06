import React from 'react';
import Prism from 'prismjs';
import { Link } from 'react-router-dom';
import { createScoreMeter, setHtmlMetadata } from '../utils/helpers';

/* Practice Quiz Component, this component is responsible
 * for handling each question in a quiz session */
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
	componentDidMount() {
		const subtitle = this.props.meta.getIn(['currentQuestion', 'subtitle']);
		setHtmlMetadata(subtitle);
		Prism.highlightAll();
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.meta !== nextProps.meta) {
			const subtitle = nextProps.meta.getIn(['currentQuestion', 'subtitle']);
			setHtmlMetadata(subtitle);
		}
	}
	componentDidUpdate() {
		Prism.highlightAll();
	}
	onHover = () => this.setState({ selection: null });
	handleKeyDown = (event) => {

		const { code } = event;

		if (code === 'Space' || code === 'ArrowDown' || code === 'ArrowUp') {
			event.preventDefault();
		}

		let {
			answer,
			selection,
			complete
		} = this.state;

		const { meta } = this.props;

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
		if (this.state.answer) this.props.correct();
		if (index === length - 1) {
			this.props.viewResults();
			this.setState({ complete: true });
		} else {
			this.props.nextQuestion();
			const nextTitle = meta
				.getIn(['quiz', 'challenges'])
				.find((v, k) => k === (index + 1))
				.get('subtitle')
				.replace(/\s/g, '-');
			this.props.history.replace(`/practice/${title.replace(/\s/g, '-')}/${nextTitle}`);
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
		const { isMobile, isDesktop } = screen;

		const quiz = meta.get('quiz');
		const score = meta.get('score');
		const index = meta.get('index');
		const numberOfQuestions = quiz.get('challenges').size;
		const currentQuestion = meta.get('currentQuestion');
		const explanation = currentQuestion.get('explanation');
		const solution = +currentQuestion.get('solution');
		const percentage = score / meta.getIn(['quiz', 'challenges']).size;

		const renderClassName = (i) => {
			return (selection === i)
				? `choice selected ${isMobile ? 'mobile' : 'desktop'}`
				: `choice ${isMobile ? 'mobile' : 'desktop'}`;
		};

		const tower = createScoreMeter(score, index, numberOfQuestions);
		const widthPercentage = (100 / numberOfQuestions);
		return (
			<div className='studyWrapper'>
				<div className='studyContainer'>

						<div id='score-tower'>
							{tower.map((type, i) => (
								<div
									className={type}
									key={quiz.get('challenges').find((v,k) => k === i)}
									style={{ width: `${widthPercentage}%` }}>
								</div>
							))}
						</div>

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
								{isDesktop && <span id="return">
									<Link to='/'>
										<i className="fa fa-times-circle" aria-hidden="true"></i>
									</Link>
								</span>}
						</div>

						<div className="container">
							<div className="row questionContainer">
								<div className="col-sm-6">
									{!complete && <h1 className='questionTitle'>
										{this.renderMarkup(currentQuestion.get('title'))}
									</h1>}
								</div>

								<div className="col-sm-6">
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
								</div>
							</div>
						</div>

					{answer !== null && !complete &&
						<div className='messageDiv'>
							{answer
								? <h1 className='correctAnswer'>Correct, great work!</h1>
								: <h1 className='wrongAnswer'>Sorry, that is not correct!</h1>}
							{answer !== null && !answer && explanation && (
								<div className='explanation'>
									<h3>Explanation:</h3>
									<p>{this.renderMarkup(explanation)}</p>
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
							<button className='fbShare'>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://www.facebook.com/sharer/sharer.php?u=http://fcc-quiz.surge.sh/">
									Share on Facebook
								</a>
							</button>
						</div>}

						{!isMobile && <div id='infoBox'>
							<p>Use <i className='fa fa-long-arrow-up'></i> <i className='fa fa-long-arrow-down'></i> space and esc</p>
						</div>}

				</div>
			</div>
		);
	}
};
