
import { fromJS } from 'immutable';

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
	return fromJS(quiz);
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
		const challengeTitle = challenge.get('title');
		if (challengeTitle === question) return question;
		const end = challengeTitle.length - 1;
		if (challengeTitle.charAt(end) === '?') {
			if (question === challengeTitle.slice(0, end)) {
				return challengeTitle;
			}
		}
		return false;
	}, false);
}

/* Screen size helper */
export const mapScreenSizeToProps = (screenSize) => {
  return { screen: {
    isTablet: screenSize['small'],
    isMobile: screenSize['mobile'],
    isDesktop: screenSize['> small']
  }}
};
