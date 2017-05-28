import React from 'react'

/* Practice Quiz Component */
export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			length: this.props.quiz.challenges.length,
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
				this.props.close();
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
			this.props.close();
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
		const { index, length } = this.state;
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
		const { isMobile } = this.props;
		const { index, quiz, selection } = this.state;
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
							<h1 className='quizTitle'>{this.props.quiz.title}</h1>
							{!this.state.complete
								? <h3 className='quizLength'>Question {this.state.index + 1} of {quiz.challenges.length}</h3>
								: <h3>Quiz Complete</h3>}
							<i className="fa fa-times-circle" aria-hidden="true" id="return" onClick={this.props.close}></i>
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
							<button className='finishBtn' onClick={this.props.close}>
								Return to Quiz Page
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
