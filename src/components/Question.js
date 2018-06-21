import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate, formatQuestion } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
  render () {
    const { question } = this.props

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
        <div className='d-flex flex-row justify-content-around align-items-center'>
          <h3 className='w-40 pt-3 pb-3 text-center'>{optionOneText}</h3>
          <h3 className='w-40 pt-3 pb-3 text-center'>{optionTwoText}</h3>
        </div>
      </Link>
    )
  }
}

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
