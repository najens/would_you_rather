import React from 'react'
import { connect } from 'react-redux'
import { formatUser } from '../utils/helpers'

// Component that renders a user on leaderboard page
const User = ({ user }) => {

  // If user doesn't exist display message
  if (user === null) {
    return (
      <p>This user doesn't exist</p>
    )
  }

  const {
    rank, name, avatar, numAnswered, numQuestions
  } = user
  // Calcualate user's total score
  const total = numAnswered + numQuestions

  return (
    <div className='question'>
      <div className='d-flex flex-row justify-content-between
        align-items-center'
      >
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


/*
 * Uses redux store and creates props
 * that are passed into component
 *
 * @param {Array} users
 * @param {string) id - props
 * @param {integer} rank - props
 * @return {Object} props
 *    user {Object} - formatted user
 */
function mapStateToProps ({ users }, { id, rank }) {
  const user = users[id]

  return {
    user: user
      ? formatUser(user, rank)
      : null
  }
}

export default connect(mapStateToProps)(User)
