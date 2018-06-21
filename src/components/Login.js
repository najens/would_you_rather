import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class SignIn extends Component {
  state = {
    id: '',
    toHome: false,
  }
  handleHandleChange = (e) => {
      const id = e.target.value

      this.setState(() => ({
          id
      }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { id } = this.state
    const { dispatch, userIds } = this.props

    const isValidUser = userIds.filter((uid) => (
        uid === id
    ))

    if (isValidUser.length !== 0) {
        dispatch(setAuthedUser(id))
        this.setState(() => ({
          id: '',
          toHome: true,
        }))
    } else {
        alert('Not a valid user id. Please try again.')
        this.setState(() => ({
          id: '',
        }))
    }
  }
  render () {
    const { id, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }
    return (
      <div className='container'>
          <Form className='mt-3 p-5 card' onSubmit={this.handleSubmit}>
            <h3>Login</h3>
            <FormGroup>
              <Label for="handle">Handle</Label>
              <Input type="text" placeholder="Handle" value={id} onChange={this.handleHandleChange} />
            </FormGroup>
            <Button type='submit' disabled={id === ''}>Login</Button>
        </Form>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
    return {
        userIds: Object.keys(users)
    }
}

export default connect(mapStateToProps)(SignIn)
