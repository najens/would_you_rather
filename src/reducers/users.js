import {
  RECEIVE_USERS, ADD_USER, ANSWER_QUESTION, ADD_QUESTION
} from '../actions/actionTypes'

/**
 * Updates users state in store each
 * time an action in switch case is called
 *
 * @param {Object} state - users
 * @param {Object} action
 * @return {Object} state - new users
 */
export default function users (state = {}, action) {
  const { users, user, authedUser, qid, answer, type, question } = action
  switch(type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...users
      }
    case ADD_USER :
      return {
        ...state,
        [user.id]: user,
      }
    case ANSWER_QUESTION :
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      }
    case ADD_QUESTION :
      return {
        ...state,
        [question.author]: {
          ...state[question.author],
          questions: state[question.author].questions.concat([question.id])
        }
      }
    default :
      return state
  }
}
