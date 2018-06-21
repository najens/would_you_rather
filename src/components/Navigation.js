import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeAuthedUser } from '../actions/authedUser'
import { Navbar, Nav, NavItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'

class Navigation extends Component {
  handleLogout = () => {
      const { dispatch, authedUser } = this.props

      dispatch(removeAuthedUser(authedUser))

  }
  render () {
    const { authedUser, user } = this.props

    if (authedUser === '') {
        return (
            <div>
              <Navbar color="dark" dark expand="md">
                <NavLink to='/' exact activeClassName='active' className='nav-header'>Would You Rather</NavLink>
                <Nav className="ml-auto" navbar>
                  <NavItem className='pr-3'>
                    <NavLink to='/signup' exact activeClassName='active'>Signup</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to='/login' exact activeClassName='active'>Login</NavLink>
                  </NavItem>
                </Nav>
              </Navbar>
            </div>
        )
    }
    if (user) {
        return (
          <div>
            <Navbar color="dark" dark expand="md">
              <NavLink to='/' exact activeClassName='active' className='nav-header'>Would You Rather</NavLink>
              <Nav className="ml-auto d-flex flex-row align-items-center" navbar>
                <NavItem className='pr-3'>
                  <NavLink className="primary" to='/add' exact activeClassName='active'>New Poll</NavLink>
                </NavItem>
                <NavItem className='pr-3'>
                  <NavLink to='/leaderboard' exact activeClassName='active'>Leaderboard</NavLink>
                </NavItem>
                <img
                    src={user.avatarURL}
                    className='avatar-sm'
                    alt='avatar'
                />
                <span className='text-primary pr-3'>{user.name}</span>
                <NavItem>
                  <NavLink to='/login'onClick={this.handleLogout} exact activeClassName='active'>Logout</NavLink>
                </NavItem>
              </Nav>
            </Navbar>
          </div>
        )

    }
    return null
  }
}

function mapStateToProps ({ authedUser, users }) {
    const user = users[authedUser]
    return {
        authedUser,
        user: user ? user : null
    }
}

export default connect(mapStateToProps)(Navigation)
