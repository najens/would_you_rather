import { saveUser } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

// ACTION TYPES
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER = 'ADD_USER'

// ACTIONS

/*
 * Receive users action
 *
 * @param {Array} users
 * @return {Object}
 */
export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}


/*
 * Add user action
 *
 * @param {Object} user
 * @return {Object}
 */
function addUser (user) {
  return {
    type: ADD_USER,
    user,
  }
}


// ACTION CREATORS

/**
 * Handles Add User Event
 * and dispatches actions.
 *
 * @param {object} user
 *    name {string}
 *    id {string}
 *    avatar {string}
 */
export function handleAddUser ({ name, id, avatar }) {
  return (dispatch) => {

    dispatch(showLoading())

    return saveUser({
      name,
      id,
      avatar,
    })
    .then((user) => dispatch(addUser(user)))
    .then(() => dispatch(hideLoading()))
  }
}
