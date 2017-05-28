import React from 'react';
import { connectScreenSize } from 'react-screen-size';
import quizzes from '../challenges';
import Review from './Review';
import Practice from './Practice';

/* Helper Functions */
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

const mapScreenSizeToProps = (screenSize) => {
  return { screen: {
    isTablet: screenSize['small'],
    isMobile: screenSize['mobile'],
    isDesktop: screenSize['> small']
  }}
};

/* Main Quiz Component */
export default connectScreenSize(
	mapScreenSizeToProps)(
class Quiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			session: null,
			length: quizzes[0].challenges.length,
			quiz: quizzes[0],
			quizzes
		}
	}
	triggerPractice = (title) => {
		const { quizzes } = this.state;
		const quiz = findQuiz(title, quizzes);
		quiz.challenges = shuffle(quiz.challenges);
		this.setState({ quiz: quiz, session: 'practice' });
	}
	triggerReview = (title) => {
		const { quizzes } = this.state;
		const quiz = findQuiz(title, quizzes);
		this.setState({ quiz: quiz, session: 'review' });
	}
	close = () => this.setState({ session: null })
	render() {
		const { isDesktop } = this.props.screen;
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
					close={this.close}
				quiz={this.state.quiz}
				isMobile={this.props.screen.isMobile} />
			);
		default:
			return (
			<div>
				<div className='header'>
					<a
						target="_blank"
						rel="noopener noreferrer"
						className="fccLink"
						href="http://freecodecamp.com/">
						<img src="/assets/freeCodeCamp.png" alt="freeCodeCamp Logo" />
					</a>
					<span>Interview Quiz Beta</span>
						{isDesktop && <a
							target="_blank"
							rel="noopener noreferrer"
							className="contributeLink"
							href="https://github.com/freeCodeCamp/multiple-choice-questions">
							Contribute <i className='fa fa-github'></i>
					</a>}
				</div>
				<div className='studyComponent'>
					{this.state.quizzes.map(quiz => {
						const { title, challenges } = quiz;
						return (
							<div key={title} className='quizContainer'>
								{process.env.NODE_ENV === 'development' &&
									<div className='review' onClick={() => this.triggerReview(title)}>
										<i className='fa fa-search'></i>
									</div>}
								<div className={`title ${isDesktop ? 'titleHover' : ''}`} onClick={() => this.triggerPractice(title)}>
									{title} <span>({challenges.length} questions)</span>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		)}
	}
});
