import React from 'react'

export default class Study extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			quiz: this.props.quiz,
			complete: false,
			answer: null,
			score: 0
		}
	}
	correctAnswer = () => {
		this.setState({
			answer: true,
			score: this.state.score + 1
		});
	}
	wrongAnswer = () => { this.setState({ answer: false }) }
	nextQuestion = () => {
		const { index } = this.state;
		const { length } = this.props.quiz.challenges;
		if (index === length - 1) {
			this.setState({ complete: true });
		} else {
			this.setState({
				index: this.state.index + 1,
				answer: null
			});
		}
	}
	render() {
		const { index, quiz } = this.state;
		const currentQuestion = quiz.challenges[index];
		const solution = +currentQuestion.solution;
		const percentage = this.state.score / this.props.quiz.challenges.length;
		return (
			<div className='studyWrapper'>
				<i className="fa fa-times-circle" aria-hidden="true" id="return" onClick={this.props.close}></i>
				<div className='studyContainer'>
					<h1 className='quizTitle'>{this.props.quiz.title}</h1>

					{!this.state.complete &&
						<div>
							<h3 className='quizLength'>Question {this.state.index + 1} of {quiz.challenges.length}</h3>
							<h1 className='questionTitle'>{currentQuestion.questionTitle}</h1>
						</div>}

						{!this.state.complete && currentQuestion.choices.map((answer, idx) => {
							if (this.state.answer === null) {
								if (solution === idx) {
									return (
										<div
											key={answer + idx}
											className='choice'
											onClick={this.correctAnswer}>
											<p>{answer}</p>
										</div>
									)
								} else {
									return (
										<div
											key={answer + idx}
											className='choice'
											onClick={this.wrongAnswer}>
											<p>{answer}</p>
										</div>
									)
								}
							} else if (this.state.answer) {
								if (solution === idx) {
									return (
										<div
											key={answer + idx}
											className='choice' id='correctWinner'>
											<p>{answer}</p>
										</div>
									)
								} else {
									return (
										<div
											key={answer + idx}
											className='choice' id='wrongWinner'>
											<p>{answer}</p>
										</div>
									)
								}
							} else {
								if (solution === idx) {
									return (
										<div
											key={answer + idx}
											className='choice' id='correctLoser'>
											<p>{answer}</p>
										</div>
									)
								} else {
									return (
										<div
											key={answer + idx}
											className='choice' id='wrongLoser'>
											<p>{answer}</p>
										</div>
									)
								}
							}
						})}

					{this.state.answer !== null && !this.state.complete &&
						<div className='messageDiv'>
							{this.state.answer
								? <h1 className='correctAnswer'>Correct, nice job!</h1>
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
							<button className='finishBtn' onClick={this.props.close.bind(this, this.state.score / this.props.quiz.challenges.length * 100 )}>
								Return to Quiz Page
							</button>
						</div>}

				</div>
			</div>
		);
	}
};
