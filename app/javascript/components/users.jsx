import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions/user_actions'

class Users extends Component {
  componentDidMount() {
    this.props.fetchUsers(this.props.game)
  }

  render() {
    const userBoard = this.props.users.map((cell, index) => {
      return (
        <li key={index} className='has-text-left pl-4'>
          <p>{cell[0]}</p>
          <p className='ml-2'>({cell[1]})</p>
        </li>
      )
    })
    return (
      <div>
        <div className='user__plate'>
          <p className='user__plate-title'>{`Best ${this.props.game} gamers`}</p>
          <ol className='user__plate-list'>{userBoard}</ol>
        </div>
      </div>
    )
  }
}

function mapState(state) {
  return {
    game: state.users.game,
    users: state.users.users
  }
}

export default connect(mapState, { fetchUsers })(Users)
