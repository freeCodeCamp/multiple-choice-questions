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

const defaultState = Map({
  active: false,
  score: 0,
  index: 0,
  quiz: null,
  currentQuestion: null,
  quizzes: List(fromJS(quizzes))
});

export default (state = defaultState, action) => {
  const { type, payload } = action;

  switch(type) {

  case START_QUIZ: {
    const quizzes = state.get('quizzes');
    const quiz = shuffleQuiz(findQuiz(payload, quizzes));
    return state
      .set('active', true)
      .set('quiz', quiz)
      .set('currentQuestion', quiz.get('challenges').first());
    break;
  }

  case START_QUIZ_BY_QUESTION: {
    const { title, question } = payload;
    const quizzes = state.get('quizzes');
    const originalQuiz = shuffleQuiz(findQuiz(title, quizzes));
    const first = originalQuiz.get('challenges').findEntry((v, k) => {
      return v.get('title') === question;
    });

    const quiz = originalQuiz
      .update('challenges', c => c.splice(first[0], 1))
      .update('challenges', c => c.insert(0, first[1]));

    return state
      .set('active', true)
      .set('quiz', quiz)
      .set('currentQuestion', quiz.get('challenges').first());
    break;
  }

  case NEXT_QUESTION: {
    const index = state.get('index') + 1;
    const quiz = state.get('quiz');
    return state
      .update('index', () => index)
      .update('currentQuestion', () => {
        return quiz.get('challenges').find((v, k) => k === index);
      });
    break;
  }

  case SCORE: {
    return state.update('score', s => s + 1);
  }

  case FINISH_QUIZ: {
    return defaultState;
    break;
  }

  default:
    return state;
  };

};
