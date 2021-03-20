import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeBoard, resetBoard, submitBoard } from '../actions/play_actions'
import { setGame } from '../actions/user_actions'
import Users from './users'
import Userform from './user_form'

class Mastermind extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guess: [0,0,0,0]
    }
    this.changeColor = this.changeColor.bind(this)
    this.checkSubmit = this.checkSubmit.bind(this)
  }

  componentDidMount() {
    this.props.resetBoard('masterminds')
  }

  changeColor(event) {
    event.preventDefault()
    const index = Number(event.target.id)
    const direction = event.button == 0 ? 1 : -1

    // Gather necessary states
    const board = this.props.board.map(item => item)
    const round = this.props.status.round

    // Change the ball number and submit for state update
    let balls = board[round]
    let newBall = Number(balls[index]) + direction
    newBall = newBall < 0 ? 8 : newBall > 8 ? 0 : newBall
    balls = balls.substr(0,index) + newBall + balls.substr(index + 1)
    board[round] = balls
    this.props.changeBoard(board)
  }

  checkSubmit() {
    const balls = this.props.board[this.props.status.round]
    if (balls.includes('0')) {
      alert('Please color all balls.')
    } else if ([...new Set(balls.split(''))].length != 4) {
      alert('Please submit 4 different colors.')
    } else {
      const boardData = {
        authenticity_token: this.props.authenticity_token,
        id: this.props.id,
        mastermind: {
          board: this.props.board
        }
      }
      this.props.submitBoard('masterminds', boardData)
    }
  }

  render() {
    // Game name must be the same as in the server
    this.props.setGame('Mastermind')
    
    const gameBoard = this.props.board.map((cell, index) => {
      const balls = cell.split('').map(
        (item, index) =>
          <div 
            className={`mastermind__ball mastermind--color-${item}`}
            key={index}
            id={index}
            onClick={this.props.winner ? () => {return false} : this.changeColor}
            onContextMenu={this.props.winner ? () => {return false} : this.changeColor}>
          </div>
      )
      return (
        <div key={cell + index} className='mastermind__cell' id={index}>
          {balls}
          <button
            className={(this.props.status.round != index || this.props.winner) ? 'hidden' : 'mastermind__submit'}
            onClick={this.props.status.round != index ? () => {return false} : this.checkSubmit}>
            Submit
          </button> 
          <div className="mastermind__ball">{this.props.status.colorPlace && this.props.status.colorPlace[index][0]}</div>
          <div className="mastermind__ball">{this.props.status.colorPlace && this.props.status.colorPlace[index][1]}</div>
        </div>
      )
    })
    
    const result = this.props.winner == 1 ? 
      <div className='game__status'>You have won!<Userform /></div> :
      <div className='game__status'>You have lost!</div>

    return (
      <div className='section is-flex is-full-width is-justify-content-space-around'>
        <div className="block m-0">
          <div className='mastermind__plate'>
            {gameBoard}
            {(this.props.winner || this.props.status.round == null) && result}
          </div>

          <div className='game__buttons'>
            <button className='button is-half-width mr-2' onClick={() => this.props.resetBoard('masterminds')}>Reset Board</button>
            <Link to='/' className='button is-half-width'>All games</Link>
          </div>

        </div>

        {/* Get user information for this game */}
        <Users />
      </div>
    )
  }
}

function mapState(state) {
  return {
    authenticity_token: state.mastermind.authenticity_token,
    board: state.mastermind.board,
    id: state.mastermind.id,
    status: state.mastermind.status,
    winner: state.mastermind.winner
  }
}

export default connect(mapState, { changeBoard, resetBoard, setGame, submitBoard })(Mastermind)