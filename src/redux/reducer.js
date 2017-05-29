import { combineReducers } from 'redux';
import { Map, List, fromJS } from 'immutable';
import quizzes from '../challenges';

import { findQuiz, shuffleQuiz } from '../utils/helpers';
import {
  START_QUIZ,
  START_QUIZ_BY_QUESTION,
  NEXT_QUESTION,
  SCORE,
  FINISH_QUIZ
} from './actions';

/* We're just using Redux to store all the quizzes in a globally availabe
 * way that we can easily connect to our components on demand */

const initialQuizzes = List(fromJS(quizzes));

export const quizReducer = (state = initialQuizzes, action) => {
  return state;
};

const defaultState = Map({
  active: false,
  score: 0,
  index: 0,
  quiz: null,
  currentQuestion: null
});

export const meta = (state = defaultState, action) => {
  const { type, payload } = action;
  switch(type) {
  case START_QUIZ: {
    const quiz = shuffleQuiz(findQuiz(payload, initialQuizzes));
    return state
      .set('active', true)
      .set('quiz', quiz)
      .set('currentQuestion', quiz.get('challenges').first());
    break;
  }
  case START_QUIZ_BY_QUESTION: {
    const { title, question } = payload;

    // const quiz = findQuiz(payload, initialQuizzes);
    //
    // if (!quiz) return defaultState;
    //
    // let firstQuestion;
    // const questions = quiz.challenges.reduce((challenges, challenge) => {
    //   if (challenge.title === title) {
    //     firstQuestion = [ challenge ];
    //     return challenges;
    //   } else {
    //     return challenges.concat(challenge);
    //   };
    // }, []);
    //
    // const newQuiz = firstQuestion.concat(questions);
    // return Object.assign({}, state, { quiz: newQuiz, active: true });

    break;
  }
  case NEXT_QUESTION:
    let { index } = state;
    return Object.assign({}, state, { index: index + 1 });
    break;
  case SCORE:
    return state.update('score', s => s + 1);
  case FINISH_QUIZ:
    return defaultState;
    break;
  default:
    return state;
  };
};

export default combineReducers({
  meta,
  quizzes: quizReducer
});
