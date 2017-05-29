import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { connectScreenSize } from 'react-screen-size';
import Quiz from './Quiz';
import { findQuiz, mapScreenSizeToProps } from '../utils/helpers';
import {
	nextQuestion,
	startQuiz,
	startQuizByQuestion,
	correct,
	finishQuiz
} from '../redux/actions';

class QuizContainer extends React.Component {
	componentWillMount() {
		const { title, question, meta } = this.props;
		const active = meta.get('active');
		if (!active) {
			if (title && !question) {
				this.props.startQuiz(title);
			} else if (title && question) {
				this.props.startQuizByQuestion(title);
			}
		}
	}
	componentWillReceiveProps(nextProps) {
		const { title, question } = this.props;
		const activeQuestion = nextProps.meta.getIn(['currentQuestion', 'title']);
		if (!question && activeQuestion) {
			this.props.history.push(`${title}/${activeQuestion}`);
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
	const { quizzes, meta } = state;
	return {
		meta,
		title,
		question
	};
};

const dispatchProps = {
	startQuiz,
	startQuizByQuestion,
	nextQuestion,
	correct,
	finishQuiz,
};

const connectedPractice = connect(mapStateToProps, dispatchProps)(QuizContainer);
export default connectScreenSize(mapScreenSizeToProps)(connectedPractice);
