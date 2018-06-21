import { RECEIVE_USERS, ADD_USER } from '../actions/users'
import { ANSWER_QUESTION, ADD_QUESTION } from '../actions/questions'

export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users
            }
        case ADD_USER :
            const { user } = action
            return {
                ...state,
                [user.id]: user,
            }
        case ANSWER_QUESTION :
            const { authedUser, qid, answer } = action
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
            const { question } = action
            const { author, id } = question
            return {
                ...state,
                [author]: {
                    ...state[author],
                    questions: state[author].questions.concat([id])
                }
            }
        default :
            return state
    }
}
