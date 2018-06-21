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


  /*
   * Handles Name On Text Change Event
   * and updates component state
   *
   * @return {Object} state - name
   */
  handleNameChange = (e) => {
    const name = e.target.value

    this.setState(() => ({
      name
    }))
  }


  /*
   * Handles Handle On Text Change Event
   * and updates component state
   *
   * @return {Object} state - id
   */
  handleHandleChange = (e) => {
    const id = e.target.value

    this.setState(() => ({
      id
    }))
  }


  /*
   * Handles Avatar On Change Event
   * and updates component state
   *
   * @return {Object} state - avatar
   */
  handleAvatarChange = (url) => {
    this.setState(() => ({
      avatar: url,
    }))
  }


  /*
   * Handles Signup Submit Event
   * dispatches handleAddUser action
   * and updates component state
   *
   * @return {Object} state - name
   */
  handleSubmit = (e) => {
    e.preventDefault()

    const { name, id, avatar } = this.state
    const { dispatch, userIds } = this.props

    // If the user doesn't already exist,
    // dispatch handleAddUser action, update state
    // and redirect to home page
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
    }
    // Otherwise, reset form and alert and
    // alert user that the handle already exists
    else {
      this.setState(() => ({
        id: '',
      }))
      alert(`A user already exists with the handle ${id}. \
        Please use a different handle.`)
    }
  }

  
  render () {
    const { name, id, avatar, toHome } = this.state

    // If toHome state is set to true, redirect to home page
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
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={this.handleNameChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="handle">Handle</Label>
            <Input
              type="text"
              placeholder="Handle"
              value={id}
              onChange={this.handleHandleChange}
            />
          </FormGroup>
          <Button
            type='submit'
            disabled={name === '' || id === '' || avatar === ''}
          >Submit</Button>
        </Form>
      </div>
    )
  }
}


/*
 * Uses redux store and creates props
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

export default connect(mapStateToProps)(Signup)
