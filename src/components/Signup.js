import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddUser } from '../actions/users'
import { Redirect } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ImageInput from './ImageInput';

class Signup extends Component {
  state = {
    name: '',
    id: '',
    avatar: '',
    toHome: false,
  }
  handleNameChange = (e) => {
    const name = e.target.value

    this.setState(() => ({
      name
    }))
  }
  handleHandleChange = (e) => {
      const id = e.target.value

      this.setState(() => ({
          id
      }))
  }
  handleAvatarChange = (url) => {
      this.setState(() => ({
          avatar: url,
      }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { name, id, avatar } = this.state
    const { dispatch, userIds } = this.props

    const isValidUser = userIds.filter((uid) => (
        uid === id
    ))

    if (isValidUser.length === 0) {
        dispatch(handleAddUser({
            name,
            id,
            avatar
        }))

        this.setState(() => ({
          name: '',
          id: '',
          toHome: true,
        }))
    } else {
        this.setState(() => ({
            id: '',
        }))
        alert(`A user already exists with the handle ${id}. Please use a different handle.`)
    }
  }
  render () {
    const { name, id, avatar, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/login' />
    }
    return (
      <div className='container'>
          <Form className='mt-3 p-5 card' onSubmit={this.handleSubmit}>
            <h3>Sign Up</h3>
            <ImageInput
              className='create-contact-avatar-input'
              name='avatarURL'
              maxHeight={64}
              onAvatarChange={this.handleAvatarChange}
            />
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" placeholder="Name" value={name} onChange={this.handleNameChange} />
            </FormGroup>
            <FormGroup>
              <Label for="handle">Handle</Label>
              <Input type="text" placeholder="Handle" value={id} onChange={this.handleHandleChange} />
            </FormGroup>
            <Button type='submit' disabled={name === '' || id === '' || avatar === ''}>Submit</Button>
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

export default connect(mapStateToProps)(Signup)
