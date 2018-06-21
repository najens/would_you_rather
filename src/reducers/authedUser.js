import { SET_AUTHED_USER, REMOVE_AUTHED_USER } from '../actions/authedUser'

/**
 * Updates authedUser state in store each
 * time an action in switch case is called
 *
 * @param {Object} state - authedUser
 * @param {Object} action
 * @return {Object} state - new authedUser
 */
export default function authedUser (state = null, action) {
  switch(action.type) {
    case SET_AUTHED_USER :
      return action.id
    case REMOVE_AUTHED_USER :
      return ''
    default :
      return state
  }
}
