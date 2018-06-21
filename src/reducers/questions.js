import { RECEIVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION
} from '../actions/questions'

/**
 * Updates questions state in store each
 * time an action in switch case is called
 *
 * @param {Object} state - questions
 * @param {Object} action
 * @return {Object} state - new questions
 */
export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ANSWER_QUESTION :
      const { qid, answer, authedUser } = action
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
        [action.question.id]: action.question,
      }
    default :
      return state
  }
}
