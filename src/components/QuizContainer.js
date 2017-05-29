import React from 'react'
import { connect } from 'react-redux';
import { connectScreenSize } from 'react-screen-size';
import Quiz from './Quiz';
import { validateQuestionName, mapScreenSizeToProps } from '../utils/helpers';
import {
	nextQuestion,
	startQuiz,
	startQuizByQuestion,
	startAllQuestionQuiz,
	correct,
	finishQuiz
} from '../redux/actions';

class QuizContainer extends React.Component {
	componentWillMount() {

		/* The title and question props are from the url parameters. We use
		 * these in addition to the quiz meta active state to determine 'how'
		 * a user got here. They may have arrived here from a shared link, for
		 * instance, in which case we want to begin a quiz (assuming the title
		 * and question are valid). All this logic starts here and continues
		 * with componentWillReceiveProps, and we either end up redirecting
		 * or we wait for the full quiz props to load the child quiz component
		 * below. ***************************** */

		const { title, question, meta } = this.props;
		const active = meta.get('active');
		const quizzes = meta.get('quizzes');
		if (!active) {
			if (title === 'shuffle') {
				this.props.startAllQuestionQuiz();
			} else if (title && !question) {
				this.props.startQuiz(title);
			} else if (title && question) {
				const questionTitle = validateQuestionName(title, question, quizzes);
				if (questionTitle) {
					this.props.startQuizByQuestion(title, questionTitle);
				} else {
					this.props.history.push('/');
				}
			}
		}
	}
	componentWillReceiveProps(nextProps) {
		const { title, question } = this.props;
		const activeQuestion = nextProps.meta.getIn(['currentQuestion', 'title']);
		if (!question && activeQuestion) {
			this.props.history.replace(`${title}/${activeQuestion}`);
		}
	}
  render() {
		const { title, question, meta } = this.props;
		const active = meta.get('active');
    if (title && question && active) {
			return <Quiz {...this.props} />
		} else {
			return null;
		}
  }
}

const mapStateToProps = (state, props) => {
	const { title, question } = props.match.params;
	return {
		meta: state,
		title,
		question
	};
};

const dispatchProps = {
	startQuiz,
	startQuizByQuestion,
	startAllQuestionQuiz,
	nextQuestion,
	correct,
	finishQuiz,
};

const connectedPractice = connect(mapStateToProps, dispatchProps)(QuizContainer);
export default connectScreenSize(mapScreenSizeToProps)(connectedPractice);
