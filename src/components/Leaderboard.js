import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap'
import User from './User'
import { Redirect } from 'react-router-dom'

class Leaderboard extends Component {
  render () {
    const { sortedUsers, authedUser } = this.props

    if (authedUser === '') {
      return <Redirect to='/login' />
    }

    return (
      <div className='container'>
        <ListGroup className='mt-3'>
            {sortedUsers.map((user, index) => (
                <ListGroupItem key={user.id}>
                    <User id={user.id} rank={user.rank}/>
                </ListGroupItem>
            ))}
        </ListGroup>
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {

  const userIds = Object.keys(users)
    .sort((a,b) => (
        Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length)
    )
  let sortedUsers = []

  userIds.map((userId, index) => {
    let user = users[userId]
    if (index > 0) {
      let prevUserId = userIds[index - 1]
      let prevUser = users[prevUserId]
      if (Object.keys(prevUser.answers).length + prevUser.questions.length === Object.keys(user.answers).length + user.questions.length) {
        user.rank = prevUser.rank
      } else {
        user.rank = index + 1
      }
    } else {
      user.rank = 1
    }
    sortedUsers.push(user)
    return user
  })

  console.log(userIds)

  return {
    sortedUsers,
    authedUser,
  }
}

export default connect(mapStateToProps)(Leaderboard)
