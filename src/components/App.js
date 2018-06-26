import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Navigation from './Navigation'
import Dashboard from './Dashboard'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import Signup from './Signup'
import Login from './Login'
import NotFound from './NotFound'

// Main Entry component of App that displays Navbar,
// and handles renders components at assigned routes
class App extends Component {
  // When component mounts, get initial data
  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Navigation />
          <LoadingBar />
          <div>
              {this.props.loading === true
                ? null
                : <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/question/:id' component={QuestionPage} />
                    <Route path='/add' component={NewQuestion} />
                    <Route path='/leaderboard' component={Leaderboard} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/login' component={Login} />
                    <Route path='*' component={NotFound} />
                  </Switch>
              }
          </div>
        </Fragment>
      </Router>
    )
  }
}


/*
 * Uses redux store and creates props
 * that are passed into component
 *
 * @param {string} authedUser
 * @return {Object} props
 *    loading {boolean} - true when loading initial data
 */
function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
