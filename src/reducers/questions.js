import { RECEIVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION } from '../actions/questions'

export default function tweets (state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS :
            return {
                ...state,
                ...action.questions
            }
        case ANSWER_QUESTION :
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    ...state[action.optionOne]: {
                        votes: action.answer === optionOne
                            && state[action.id.optionOne.votes.concat([action.authedUser])]
                    }
                    ...state[action.optionTwo]: {
                        votes: action.answer === optionTwo
                            && state[action.id.optionTwo.votes.concat([action.authedUser])]
                    }
                }
            }
        case ADD_QUESTION :
            const { question } = action

            return {
                ...state,
                [action.question.id]: action.question,
            }
        default :
            return state
    }
}
