
import { fromJS } from 'immutable';

/* This file contains various helper functions used throughout the app */

/* Given an array, shuffle it's contents */
export const shuffle = (array) => {
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
		shuffled[index] = element;
		return shuffled;
	}, []);
};

/* Given a quiz, shuffle the answer options and reassign the correct solution */
export const shuffleAnswers = (challenge) => {
	const solution = challenge.choices[+challenge.solution];
	challenge.choices = shuffle(challenge.choices);
	const newSolutionIndex = challenge.choices.indexOf(solution);
	challenge.solution = newSolutionIndex;
	return challenge;
};

/* Higher level function to shuffle the questions in a quiz and the answer
 * choices for each question */
export const shuffleQuiz = (quiz) => {
	const JSquiz = quiz.toJS();
	JSquiz.challenges = shuffle(JSquiz.challenges);
	JSquiz.challenges = JSquiz.challenges.map(shuffleAnswers);
	return fromJS(JSquiz);
};

/* Given an array of quizes and a title, find the titled quiz in the array */
export const findQuiz = (selected, quizzes) => {
	return quizzes.filter(quiz => quiz.get('title') === selected).first();
};

/* Given a quiz title and possible question, see if the question is valid */
export const validateQuestionName = (title, question, quizzes) => {
	const quiz = findQuiz(title, quizzes);
	if (!quiz) return false;
	const challenges = quiz.get('challenges');
	return challenges.reduce((answer, challenge) => {
		if (answer) return answer;
		const challengeTitle = challenge.get('subtitle');
		if (challengeTitle === question) return question;
		const end = challengeTitle.length - 1;
		if (challengeTitle.charAt(end) === '?') {
			if (question === challengeTitle.slice(0, end)) {
				return challengeTitle;
			}
		}
		return false;
	}, false);
};

/* Create an array filled with values representing the current
 * correct and incorrect answers during a quiz session, given
 * the user's current score, the current question index, and
 * the total number of questions. This is used to construct
 * the score meter in the UI. */
export const createScoreMeter = (correct, current, total) => {
	let count = 0;
	let tower = [];
	while (correct > 0) {
		tower.push('success');
		correct--;
		count++;
	}
	while (count < current) {
		tower.push('failure');
		count++;
	}
	while (count < total) {
		tower.push('blank');
		count++;
	}
	return tower;
};

/* Modify the HTML meta tag data for each challenge to enable
 * content-specific preview on sharing. Currently we only set
 * the title property content to be the challenge subtitle. */
export const setHtmlMetadata = (subtitle) => {
	var elements = document.getElementsByTagName('meta');
	for (var i = 0; i < elements.length; i++) {
	  if (elements[i].getAttribute("property") === "og:title") {
	     elements[i].setAttribute('content', subtitle);
	  }
	}
};

/* Screen size helper */
export const mapScreenSizeToProps = (screenSize) => {
  return { screen: {
    isTablet: screenSize['small'],
    isMobile: screenSize['mobile'],
    isDesktop: screenSize['> small']
  }}
};
