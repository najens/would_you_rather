import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate, formatQuestion } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'

// Component that renders a Question
class Question extends Component {
  render () {
    const { question } = this.props

    // If user goes to a route with no question,
    // return question doesn't exist message
    if (question === null) {
      return (
        <p>This question doesn't exist</p>
      )
    }

    const {
      id, timestamp, optionOneText, optionTwoText
    } = question

    return (
      <Link to={`/question/${id}`} className='text-center'>
        <h2>Would you rather...</h2>
        <div>{formatDate(timestamp)}</div>
        <div className='d-flex flex-row justify-content-around
          align-items-center'
        >
          <h3 className='w-40 pt-3 pb-3 text-center'>{optionOneText}</h3>
          <h3 className='w-40 pt-3 pb-3 text-center'>{optionTwoText}</h3>
        </div>
      </Link>
    )
  }
}


/*
 * Uses redux store and creates props
 * that are passed into component
 *
 * @param {string} authedUser
 * @param {Array} users
 * @param {Array} questions
 * @param {string} id - from props
 * @return {Object} props
 *    authedUser {string} - Current user id
 *    question {object} - formatted question
 */
function mapStateToProps ({ authedUser, users, questions }, { id }) {
  const question = questions[id]

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default withRouter(connect(mapStateToProps)(Question))
