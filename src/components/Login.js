import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

// Component that enables users log in to app
class SignIn extends Component {
  state = {
    id: '',
    toHome: false,
  }


  /*
   * Handles Handle Change Event
   * and updates component state
   *
   * @return {Object} state - id
   */
  handleHandleChange = (e) => {
    const id = e.target.value

    this.setState({
      id,
    })
  }


  /*
   * Handles Submit Login Click Event
   * dispatches setAuthedUser action
   * and updates component state
   *
   * @return {Object} state - id, toHome
   */
  handleSubmit = (e) => {
    e.preventDefault()

    const { id } = this.state
    const { userIds, setAuthedUser } = this.props

    const isValidUser = userIds.filter((uid) => (
      uid === id
    ))

    if (isValidUser.length !== 0) {
        setAuthedUser(id)
        this.setState({
          id: '',
          toHome: true,
        })
    } else {
        alert('Not a valid user id. Please try again.')
        this.setState({
          id: '',
        })
    }
  }


  render () {
    const { id, toHome } = this.state

    // If toHome state is set to true, redirect to home page
    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div className='container'>
          <Form className='mt-3 p-5 card' onSubmit={this.handleSubmit}>
            <h3>Login</h3>
            <FormGroup>
              <Label for='handle'>Handle</Label>
              <Input type='text' placeholder='Handle' value={id}
                onChange={this.handleHandleChange} />
            </FormGroup>
            <Button type='submit' disabled={id === ''}>Login</Button>
        </Form>
      </div>
    )
  }
}


/*
 * Uses redux state and creates props
 * that are passed into component
 *
 * @param {Array} users
 * @return {Object} props
 *    userIds {Array} - All user ids
 */
function mapStateToProps ({ users }) {
  return {
    userIds: Object.keys(users)
  }
}

export default connect(
  mapStateToProps,
  { setAuthedUser }
)(SignIn)
