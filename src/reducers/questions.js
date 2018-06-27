import { RECEIVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION
} from '../actions/actionTypes'

/**
 * Updates questions state in store each
 * time an action in switch case is called
 *
 * @param {Object} state - questions
 * @param {Object} action
 * @return {Object} state - new questions
 */
export default function questions (state = {}, action) {
  const { questions, question, qid, answer, authedUser, type } = action
  switch(type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...questions
      }
    case ANSWER_QUESTION :
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser])
          }
        }
      }
    case ADD_QUESTION :
      return {
        ...state,
        [question.id]: question,
      }
    default :
      return state
  }
}
