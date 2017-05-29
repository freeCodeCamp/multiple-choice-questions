import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { connectScreenSize } from 'react-screen-size';
import { mapScreenSizeToProps } from '../utils/helpers';

/* Header Component */
const renderHeader = (isDesktop) => (
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
);

/* Main Quiz Component */
export default connectScreenSize(
	mapScreenSizeToProps)(connect(
	state => ({ quizzes: state.get('quizzes') }))(
class extends React.Component {
	render() {
		const { screen, quizzes } = this.props;
		const { isDesktop } = screen;
		const totalQuestions = quizzes.reduce((t, q) => {
			return t + q.get('challenges').size;
		}, 0);
		return (
		<div>
			{renderHeader(isDesktop)}
			<div className='studyComponent'>
				{quizzes.map(quiz => {
					const title = quiz.get('title');
					const challenges = quiz.get('challenges');
					return (
						<div key={title} className='quizContainer'>
							{process.env.NODE_ENV === 'development' &&
								<Link className='review' to={`/review/${title}`}>
									<i className='fa fa-search'></i>
								</Link>}
							<Link to={`/practice/${title}`} className={`title ${isDesktop ? 'titleHover' : ''}`}>
								{title} <span>({challenges.size} questions)</span>
							</Link>
						</div>
					)
				})}
				<div className='quizContainer'>
					<Link to={`practice/shuffle`} className={`title ${isDesktop ? 'titleHover' : ''}`}>
						Practice All <span>({totalQuestions} questions)</span>
					</Link>
				</div>
				<div className='quizContainer'>
					<Link to="/about" className={`title ${isDesktop ? 'titleHover' : ''}`}>
						Additional Information
					</Link>
				</div>
			</div>
		</div>
	)}
}));
