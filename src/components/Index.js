import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { connectScreenSize } from 'react-screen-size';
import { finishQuiz } from '../redux/actions';
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
		<span>Interview Preparation</span>
			{isDesktop && <a
				target="_blank"
				rel="noopener noreferrer"
				className="contributeLink"
				href="https://github.com/freeCodeCamp/multiple-choice-questions">
				Contribute <i className='fa fa-github'></i>
		</a>}
	</div>
);

/* Main Quiz Selector Component */
export default connectScreenSize(
	mapScreenSizeToProps)(connect(
	state => ({
		quizzes: state.get('quizzes'),
		isActive: state.get('active'),
	}), { cancelQuiz: finishQuiz })(
class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			maxOptions: this.props.quizzes.size + 1,
			selection: null,
			answer: null,
		}
		document.addEventListener('keydown', this.handleKeyDown);
	}
	componentDidMount() {
		if (this.props.isActive) {
			this.props.cancelQuiz();
		}
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown, false);
	}
	onHover = () => this.setState({ selection: null });
	handleKeyDown = (event) => {

		const { code } = event;

		if (code === 'Space' || code === 'ArrowDown' || code === 'ArrowUp') {
			event.preventDefault();
		}

		let { selection, maxOptions } = this.state;

		switch(code) {
		case 'Space':
			const { quizzes } = this.props;
			if (selection !== null) {
				let target;
				if (selection <= this.props.quizzes.size - 1) {
					target = `practice/${quizzes
						.find((v, k) => k === selection)
						.get('title')}`;
				} else {
					if (selection === maxOptions - 1) {
						target = 'practice/shuffle';
					} else {
						target = '/about';
					}
				}
				this.props.history.push(target);
			}
			break;
		case 'ArrowDown':
			if (selection === null) {
				this.setState({ selection: 0 });
			} else {
				selection++;
				if (selection === maxOptions + 1) {
					this.setState({ selection: 0 });
				} else {
					this.setState({ selection });
				}
			}
			break;
		case 'ArrowUp':
			if (selection === null) {
				this.setState({ selection: maxOptions });
			} else {
				selection--;
				if (selection === -1) {
					this.setState({ selection: maxOptions });
				} else {
					this.setState({ selection });
				}
			}
			break;
		default:
			return;
		}
	}
	render() {
		const { maxOptions, selection } = this.state;
		const { screen, quizzes } = this.props;
		const { isDesktop } = screen;
		const totalQuestions = quizzes.reduce((t, q) => {
			return t + q.get('challenges').size;
		}, 0);
		const renderClassName = (index) => {
			let css = 'title ';
			if (isDesktop) {
				if (index === selection) {
					css += 'titleHover';
				}
			}
			return css;
		};
		return (
		<div>
			{renderHeader(isDesktop)}
			<div className='studyComponent'>
				{quizzes.map((quiz, index) => {
					const title = quiz.get('title').replace(/\s/g, '-');
					const challenges = quiz.get('challenges');
					return (
						<div key={title} className='quizContainer'>
							{/* We could limit the review link to development with this:
							 * process.env.NODE_ENV === 'development' */}
							<Link className='review' to={`/review/${title}`} title='Review All Questions'>
								<i className='fa fa-search'></i>
							</Link>
							<Link to={`/practice/${title}`} className={renderClassName(index)} onMouseEnter={this.onHover}>
								{title} <span>({challenges.size} questions)</span>
							</Link>
						</div>
					)
				})}
				<div className='quizContainer'>
					<Link to='practice/shuffle' className={renderClassName(maxOptions - 1)} onMouseEnter={this.onHover}>
						Shuffle All Quizzes <span>({totalQuestions} questions)</span>
					</Link>
				</div>
				<div className='quizContainer'>
					<Link to="/about" className={renderClassName(maxOptions)} onMouseEnter={this.onHover}>
						Additional Information
					</Link>
				</div>
			</div>
		</div>
	)}
}));
