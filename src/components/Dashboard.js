import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, NavItem, NavLink, ListGroup, ListGroupItem } from 'reactstrap'
import Question from './Question'
import { Redirect } from 'react-router-dom'

// Component that renders the home page of the app
class Dashboard extends Component {
  state = {
    questionType: 'unanswered',
  }


  /*
   * Handles Unanswered Link Click Event
   * and updates component state
   *
   * @return {Object} questionType
   */
  handleUnanswered = () => {
    const { questionType } = this.state

    questionType !== 'unanswered'
    && this.setState({
      questionType: 'unanswered'
    })
  }


  /*
   * Handles Answered Link Click Event
   * and updates component state
   *
   * @return {Object} questionType
   */
  handleAnswered = () => {
    const { questionType } = this.state

    questionType !== 'answered'
    && this.setState({
      questionType: 'answered'
    })
  }


  render () {
    const { questionType } = this.state
    const { unansweredIds, answeredIds, authedUser } = this.props

    // If user isn't logged in, redirect to login page
    if (authedUser === '') {
      return <Redirect to='/login' />
    }

    return (
      <div>
        <div className='container'>
          <h3 className='mt-3'>Questions</h3>
          <Nav tabs className="ml-auto tabs">
            <NavItem>
              <NavLink
                className={questionType === 'unanswered' ? 'active' : null}
                href='#' onClick={this.handleUnanswered}
              >Unanswered</NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={questionType === 'answered' ? 'active' : null}
                href='#' onClick={this.handleAnswered}
              >Answered</NavLink>
            </NavItem>
          </Nav>
          <ListGroup>
            {questionType === 'unanswered'
              ? unansweredIds.map((id) => (
                <ListGroupItem key={id} className='question'>
                  <Question id={id} />
                </ListGroupItem>
              ))
              : answeredIds.map((id) => (
                <ListGroupItem key={id} className='question'>
                  <Question id={id} />
                </ListGroupItem>
              ))
            }
          </ListGroup>
        </div>
      </div>
    )
  }
}


/*
 * Uses redux store and creates props
 * that are passed into component
 *
 * @param {Array} questions
 * @param {string} authedUser
 * @return {Object} props
 *    questionIds {Array} - All question ids by most recent
 *    unansweredIds {Array} - All unanswerd question ids by most recent
 *    answeredIds {Array} - All answered question ids by most recent
 *    authedUser {string} - Current user id
 */
function mapStateToProps ({ questions, authedUser }) {
  return {
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    unansweredIds: Object.keys(questions)
      .filter((a) => (!questions[a].optionOne.votes.includes(authedUser)
        && !questions[a].optionTwo.votes.includes(authedUser)))
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    answeredIds: Object.keys(questions)
      .filter((a) => (questions[a].optionOne.votes.includes(authedUser)
        || questions[a].optionTwo.votes.includes(authedUser)))
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    authedUser,
  }
}

export default connect(mapStateToProps)(Dashboard)
