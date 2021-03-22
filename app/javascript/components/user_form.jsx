import React, { Component } from 'react'
import { connect } from 'react-redux'
import { resetBoard } from '../actions/play_actions'
import { createUser, fetchUsers, newUser } from '../actions/user_actions'

class UserForm extends Component {
  // Constructor and onChange, onSubmit function
  constructor(props) {
    super(props)
    // State is used for input event listener
    this.state = {
      username: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  // On every input update the username in the state
  onChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value
      }
    )
  }

  // Submit proper data at click
  onSubmit(event) {
    event.preventDefault()

    const userData = {
      authenticity_token: this.props.authenticity_token,
      user: {
        username: this.state.username
      },
      game: {
        name: this.props.game,
        points: this.props.points
      }
    }

    this.props.createUser(userData)
    this.props.resetBoard(this.props.gamePath)

    // Update the users table 1s of after submission
    // This part should/could be improved with action cable
    setTimeout(() => {
      this.props.fetchUsers(this.props.game)
    }, 1000);
  }

  // Get an auth token for the form
  componentDidMount() {
    this.props.newUser()
  }

  render() {
    return (
      <form className='form user__form game__buttons' onSubmit={this.onSubmit}>
        <input type="text" name='username' className="input is-small" onChange={this.onChange} placeholder='Your name'/>
        <input type='submit' value='Submit' className="button is-small" />
      </form>
    )
  }
}

// Redux is used to save all necessary state elements
function mapState(state) {
  return {
    game: state.games.game,
    gamePath: state.games.gamePath,

    authenticity_token: state.users.authenticity_token,
    newUser: state.users.newUser,

    points: state.games.points
  }
}

export default connect(mapState, { createUser, fetchUsers, newUser, resetBoard })(UserForm)
