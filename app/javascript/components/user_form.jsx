import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createUser, newUser } from '../actions/user_actions'

class UserForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value
      }
    )
  }

  onSubmit(event) {
    event.preventDefault()

    const userData = {
      authenticity_token: this.props.authenticity_token,
      user: {
        username: this.state.username,
        password: this.state.password
      },
      game: {
        name: this.props.game_name,
        points: this.props.game_points
      }
    }

    this.props.createUser(userData)
  }

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

function mapState(state) {
  return {
    authenticity_token: state.users.authenticity_token,
    newUser: state.users.newUser
  }
}

export default connect(mapState, { createUser, newUser })(UserForm)
