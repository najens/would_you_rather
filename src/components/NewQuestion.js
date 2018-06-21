import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handdleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

// Component that enables users to create new questions
class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }


  /*
   * Handles Option One On Text Change Event
   * and updates component state
   *
   * @return {Object} state - optionOneText
   */
  handleOptionOneChange = (e) => {
    const optionOneText = e.target.value

    this.setState(() => ({
      optionOneText
    }))
  }


  /*
   * Handles Option Two On Text Change Event
   * and updates component state
   *
   * @return {Object} state - optionTwoText
   */
  handleOptionTwoChange = (e) => {
    const optionTwoText = e.target.value

    this.setState(() => ({
      optionTwoText
    }))
  }


  /*
   * Handles Submit New Question Event
   * and dispatches handlAddQuestion action
   * and updates component state
   *
   * @return {Object} state - optionOneText, optionTwotext, toHome
   */
  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch } = this.props

    dispatch(handdleAddQuestion(optionOneText, optionTwoText))

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true,
    }))
  }


  render () {
    const { optionOneText, optionTwoText, toHome } = this.state
    const { authedUser } = this.props

    // If user isn't logged in, redirect to log in page
    if (authedUser === '') {
      return <Redirect to='/login' />
    }

    // If toHome state is set to true, redirect to home page
    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div className='container'>
        <Form className='mt-3 p-5 card' onSubmit={this.handleSubmit}>
          <h3>Would you rather...</h3>
          <FormGroup>
            <Label for="optionOne">Option One</Label>
            <Input
              type='text'
              placeholder='first option'
              value={optionOneText}
              onChange={this.handleOptionOneChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for='optionTwo'>Option Two</Label>
            <Input
              type='text'
              placeholder='second option'
              value={optionTwoText}
              onChange={this.handleOptionTwoChange}
            />
          </FormGroup>
          <Button
            type='submit'
            disabled={optionOneText === '' || optionTwoText === ''}
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
 * @param {string} authedUser
 * @return {Object} props
 *    authedUser {string} - Current user id
 */
function mapStateToProps ({ authedUser }) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(NewQuestion)
