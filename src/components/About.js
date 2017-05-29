import React from 'react';
import { Link } from 'react-router-dom';
import { connectScreenSize } from 'react-screen-size';
import { mapScreenSizeToProps } from '../utils/helpers';

/* About Component */
export default connectScreenSize(mapScreenSizeToProps)(
class About extends React.Component {
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
    const { screen } = this.props;
    return (
      <div className='studyWrapper reviewContainer'>
				<div className='studyContainer'>
          <div className='quizHeader'>
            <div className='quizTitle'>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="fccLink"
                href="http://freecodecamp.com/">
                <img src="/assets/freeCodeCamp.png" alt="freeCodeCamp Logo" />
              </a>
            </div>
            {!screen.isMobile && <span id="return">
              <Link to='/'>
                <i className="fa fa-times-circle" aria-hidden="true"></i>
              </Link>
            </span>}
          </div>
          <div className='about'>
            <h1>About</h1>
            <p>You can practice your knowledge of various programming topics through
              multiple choice quizzes here.</p>
            <p>These quizzes are being designed to cover a variety of subjects that otherwise
              are hard to teach through coding challenges.</p>
            <p>This project is specifically targeted toward common programming interview questions.</p>
            <p>These challenges are being actively developed and feedback or contributions
              are very welcome.</p>
            <Link className='finishBtn' to='/'>
							<button>Return to Quiz Page</button>
						</Link>
          </div>
				</div>
			</div>
    )
  }
});
