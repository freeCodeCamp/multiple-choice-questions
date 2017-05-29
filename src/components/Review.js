import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { connectScreenSize } from 'react-screen-size';
import { findQuiz, mapScreenSizeToProps } from '../utils/helpers';

const renderMarkup = (html) => {
  return (
    <span dangerouslySetInnerHTML={{__html: html}}></span>
  );
}

const renderQuestion = (question) => {
  const solution = +question.solution;
   return (
     <div key={question.title}>
      <div className='reviewTitle'>
        <h1 className='questionTitle'>{renderMarkup(question.title)}</h1>
      </div>
      {question.choices.map((choice, index) => (
        <div
          key={choice}
          className={solution === index ? 'choice reivew solution' : 'choice review'}>
          <p>{renderMarkup(choice)}</p>
        </div>
      ))}
    </div>
  );
};

/* Review Quiz Questions Component */
class Review extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }
  handleKeyDown = ({ code }) => {
		if (code === 'Escape') this.props.history.push('/');
	}
  render() {
    const { quiz } = this.props;
    if (!quiz) return null;
    return (
      <div className='studyWrapper reviewContainer'>
				<div className='studyContainer'>
          <div className='quizHeader'>
            <h1 className='quizTitle'>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="fccLink"
                href="http://freecodecamp.com/">
                <img src="/assets/freeCodeCamp.png" alt="freeCodeCamp Logo" />
              </a>
              {quiz.title}
            </h1>
            <h3 className='quizLength'>
              {quiz.challenges.length > 1 ? `${quiz.challenges.length} total questions` : ''}
            </h3>
            <span id="return">
              <Link to='/'>
                <i className="fa fa-times-circle" aria-hidden="true"></i>
              </Link>
            </span>
          </div>
          {quiz.challenges.map(renderQuestion)}
				</div>
			</div>
    )
  }
}

const mapStateToProps = (state, props) => {
	const { title } = props.match.params;
	const { quizzes } = state;

	const quiz = findQuiz(title, quizzes);

  if (!quiz) {
    props.history.push('/');
  }

	return { quiz };
};

const connectedReview = connect(mapStateToProps)(Review);
export default connectScreenSize(mapScreenSizeToProps)(connectedReview);
