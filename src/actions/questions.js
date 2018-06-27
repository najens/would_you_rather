import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { RECEIVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION } from './actionTypes'

// ACTIONS

/*
 * Receive Questions action
 *
 * @return {Object}
 */
export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}


/*
 * Add Question action
 *
 * @param {string} question
 * @return {Object}
 */
function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}


/*
 * Answer Question action
 *
 * @param {string} authedUser
 * @param {string} qid
 * @param {string} answer
 * @return {Object}
 */
function answerQuestion ({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    qid,
    authedUser,
    answer,
  }
}


// ACTION CREATORS

/**
 * Handles Add Question Event
 * and dispatches actions.
 *
 * @param {string} optionOneText
 * @param {string} optionTwoText
 */
export function handdleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
    .then((question) => dispatch(addQuestion(question)))
    .then(() => dispatch(hideLoading()))
  }
}


/**
 * Handles Answer Question Event
 * and dispatches actions.
 *
 * @param {Object} info
 */
export function handleAnswerQuestion (info) {
  return (dispatch) => {
    dispatch(answerQuestion(info))

    return saveQuestionAnswer(info).catch((e) => {
      console.warn('Error in saveQuestionAnswer: ', e)
      dispatch(answerQuestion(info))
      alert('There was an error answering the question. Try again.')
    })
  }
}
