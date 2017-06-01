import { Map, List, fromJS } from 'immutable';
import quizzes from '../challenges';

import { findQuiz, shuffleQuiz } from '../utils/helpers';
import {
  START_ALL,
  START_QUIZ,
  START_QUIZ_BY_QUESTION,
  NEXT_QUESTION,
  SCORE,
  RESULTS,
  FINISH_QUIZ
} from './actions';

/* We use ImmutableJS to maintain the Redux state object, which
 * contains a key with the array of all quizzes and some metadata
 * associated with the current active quiz. */

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

  case START_ALL: {
    const quizzes = state.get('quizzes').map(shuffleQuiz);
    const quiz = fromJS({
      title: 'All Categories',
      challenges: quizzes.reduce((all, quiz) => {
        return all.concat(quiz.get('challenges'));
      }, List())
    });
    return state
      .set('active', true)
      .set('quiz', quiz)
      .set('currentQuestion', quiz.get('challenges').first());
  }

  case START_QUIZ: {
    const quizzes = state.get('quizzes');
    const quiz = shuffleQuiz(findQuiz(payload, quizzes));
    return state
      .set('active', true)
      .set('quiz', quiz)
      .set('currentQuestion', quiz.get('challenges').first());
  }

  case START_QUIZ_BY_QUESTION: {
    const { title, question } = payload;
    const quizzes = state.get('quizzes');
    const originalQuiz = shuffleQuiz(findQuiz(title, quizzes));
    const first = originalQuiz.get('challenges').findEntry((v, k) => {
      return v.get('subtitle') === question;
    });

    const quiz = originalQuiz
      .update('challenges', c => c.splice(first[0], 1))
      .update('challenges', c => c.insert(0, first[1]));

    return state
      .set('active', true)
      .set('quiz', quiz)
      .set('currentQuestion', quiz.get('challenges').first());
  }

  case NEXT_QUESTION: {
    const index = state.get('index') + 1;
    const quiz = state.get('quiz');
    return state
      .update('index', () => index)
      .update('currentQuestion', () => {
        return quiz.get('challenges').find((v, k) => k === index);
      });
  }

  case SCORE: {
    return state.update('score', s => s + 1);
  }

  case RESULTS: {
    return state.update('index', i => i + 1);
  }

  case FINISH_QUIZ: {
    return defaultState;
  }

  /* eslint-disable no-unreachable */
  default:
    return state;
  };

};
