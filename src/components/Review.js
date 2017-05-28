import React from 'react';

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
export default class extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }
  handleKeyDown = ({ code }) => {
		if (code === 'Escape') this.props.close();
	}
  render() {
    const { quiz } = this.props;
    return (
      <div className='studyWrapper'>
        <i className="fa fa-times-circle" aria-hidden="true" id="return" onClick={this.props.close}></i>
				<div className='studyContainer'>
					<h1 className='quizTitle'>{quiz.title}</h1>
          <p className='subTitle'>{quiz.challenges.length} total questions</p>
          {quiz.challenges.map(renderQuestion)}
				</div>
			</div>
    )
  }
}
