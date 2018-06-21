import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav, NavItem, NavLink, ListGroup, ListGroupItem } from 'reactstrap'
import Question from './Question'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
  state = {
    questionType: 'unanswered',
  }
  handleUnanswered = () => {
    const { questionType } = this.state

    questionType !== 'unanswered'
    && this.setState(() => ({
        questionType: 'unanswered'
    }))
  }
  handleAnswered = () => {
    const { questionType } = this.state

    questionType !== 'answered'
    && this.setState(() => ({
        questionType: 'answered'
    }))
  }
  render () {
    const { questionType } = this.state
    const { unansweredIds, answeredIds, authedUser } = this.props

    if (authedUser === '') {
      return <Redirect to='/login' />
    }

    return (
      <div>
        <div className='container'>
          <h3 className='mt-3'>Questions</h3>
          <Nav tabs className="ml-auto tabs">
            <NavItem>
              <NavLink className={questionType === 'unanswered' ? 'active' : null} href="#" onClick={this.handleUnanswered}>Unanswered</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={questionType === 'answered' ? 'active' : null} href="#" onClick={this.handleAnswered}>Answered</NavLink>
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

function mapStateToProps ({ questions, authedUser }) {
  return {
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    unansweredIds: Object.keys(questions)
      .filter((a) => !questions[a].optionOne.votes.includes(authedUser) && !questions[a].optionTwo.votes.includes(authedUser))
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    answeredIds: Object.keys(questions)
      .filter((a) => questions[a].optionOne.votes.includes(authedUser) || questions[a].optionTwo.votes.includes(authedUser))
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    authedUser,
  }
}

export default connect(mapStateToProps)(Dashboard)
