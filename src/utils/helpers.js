
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

/* Given an array of quizes and a title, find the titled quiz in the array */
export const findQuiz = (selected, quizzes) => {
	return quizzes.filter(quiz => quiz.title === selected)[0];
};

/* Screen size helper */
export const mapScreenSizeToProps = (screenSize) => {
  return { screen: {
    isTablet: screenSize['small'],
    isMobile: screenSize['mobile'],
    isDesktop: screenSize['> small']
  }}
};
