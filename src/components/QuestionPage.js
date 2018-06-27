import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate, formatQuestion, calculatePercent } from '../utils/helpers'
import { handleAnswerQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import NotFound from './NotFound'

class QuestionPage extends Component {

  /*
   * Handles Option One Click Event
   * dispatches handleAnswerQuestion action
   */
  handleOptionOne = (e) => {
    e.preventDefault()

    const { question, authedUser, handleAnswerQuestion } = this.props
    // Alert user if they already answered the question
    if (question.hasAnswered === true) {
      return alert('You already voted on this question. ' +
      'Please vote on another question.')
    }
    handleAnswerQuestion({
      qid: question.id,
      answer: 'optionOne',
      authedUser
    })
  }


  /*
   * Handles Option Two Click Event
   * dispatches handleAnswerQuestion action
   */
  handleOptionTwo = (e) => {
    e.preventDefault()

    const { question, authedUser, handleAnswerQuestion } = this.props
    // Alert user if they already answered the question
    if (question.hasAnswered === true) {
      return alert('You already voted on this question. ' +
      'Please vote on another question.')
    }
    handleAnswerQuestion({
      qid: question.id,
      answer: 'optionTwo',
      authedUser
    })
  }


  render () {
    const { question, authedUser } = this.props

    // If user goes to a route with no question,
    // return question doesn't exist message
    if (question === null) {
      return (
        <NotFound />
      )
    }

    // If the user isn't logged in, redirect to login page
    if (authedUser === '') {
      return <Redirect to='/login' />
    }

    const {
      name, avatar, timestamp, optionOneText, optionOneVotes,
      optionTwoText, optionTwoVotes, hasAnswered, answer
    } = question

    const percentages = calculatePercent(optionOneVotes, optionTwoVotes)
    const optionOnePercent = percentages.optionOnePercent
    const optionTwoPercent = percentages.optionTwoPercent


    return (
      <div className='container'>
        <div className='card mt-3 p-2'>
          <div className='d-flex flex-row align-items-center'>
            <img
              src={avatar}
              alt={`Avatar of ${name}`}
              className='avatar'
            />
            <span>{name}</span>
          </div>
          <div>{formatDate(timestamp)}</div>
          <div className='text-center mt-4 mb-4'>
            <h1>Would you rather...</h1>
            <div className='d-flex flex-row justify-content-around
              align-items-center mt-4'
            >
              <div className='w-40 option'>
                <a onClick={this.handleOptionOne}>
                  <div className={
                    hasAnswered && answer === 'optionOne'
                    ? 'option-answer'
                    : null
                  }>{optionOneText}</div>
                </a>
              </div>
              <div className='w-40 option'>
                <a onClick={this.handleOptionTwo}>
                  <div className={
                    hasAnswered && answer === 'optionTwo'
                    ? 'option-answer'
                    : null
                  }>{optionTwoText}</div>
                </a>
              </div>
            </div>
            {hasAnswered && (
              <div className='d-flex flex-row justify-content-around
                align-items-center mt-4'
              >
                <div className='w-40'>
                  <span className='pr-4'>
                    {optionOneVotes !== 0 && `${optionOneVotes} votes`}
                  </span>
                  <span>
                    {optionOnePercent !== 0 && `${optionOnePercent}%`}
                  </span>
                </div>
                <div className='w-40'>
                  <span className='pr-4'>
                    {optionTwoVotes !== 0 && `${optionTwoVotes} votes`}
                  </span>
                  <span>
                    {optionTwoPercent !== 0 && `${optionTwoPercent}%`}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
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
 * @param {Object} props
 * @return {Object} props
 *    id {string} - Question id
 *    authedUser {string} - Current user id
 *    question {Object} - formatted question
 */
function mapStateToProps ({ authedUser, users, questions }, props) {
  const { id } = props.match.params
  const question = questions[id]

  return {
    id,
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default connect(
  mapStateToProps,
  {handleAnswerQuestion: handleAnswerQuestion}
)(QuestionPage)
