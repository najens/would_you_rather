import {
  _getUsers,
  _saveUser,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function saveUser (user) {
    return _saveUser(user)
}

export function saveQuestion (question) {
  return _saveQuestion(question)
}

export function saveQuestionAnswer (info) {
  return _saveQuestionAnswer(info)
}
