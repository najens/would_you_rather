import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatUser } from '../utils/helpers'

class User extends Component {
  render () {
    const { user } = this.props

    if (user === null) {
      return (
        <p>This user doesn't exist</p>
      )
    }

    const {
      rank, name, avatar, numAnswered, numQuestions
    } = user

    const total = numAnswered + numQuestions
    console.log(total)

    return (
      <div className='question'>
        <div className='d-flex flex-row justify-content-between align-items-center'>
          <div className='d-flex flex-row w-25 align-items-center'>
            <div>{rank}</div>
            <img src={avatar} alt={`Avatar of ${name}`} className='avatar' />
            <div className='pt-3 pb-3'>{name}</div>
          </div>
          <div>
            <div className='text-center'>{numAnswered}</div>
            <div>ANS</div>
          </div>
          <div>
            <div className='text-center'>{numQuestions}</div>
            <div>QUE</div>
          </div>
          <div>
            <div className='text-center'>{total}</div>
            <div>TOT</div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ users }, { id, rank }) {
    const user = users[id]

    return {
        user: user
            ? formatUser(user, rank)
            : null
    }
}

export default connect(mapStateToProps)(User)
