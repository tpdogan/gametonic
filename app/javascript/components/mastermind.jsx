import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeBoard, resetBoard, submitBoard } from '../actions/play_actions'
import { setGame, setGamePath, setPoints } from '../actions/game_actions'
import Users from './users'
import Userform from './user_form'

class Mastermind extends Component {
  // Constructor and changeColor, checkSubmit functions
  constructor(props) {
    super(props)
    this.changeColor = this.changeColor.bind(this)
    this.checkSubmit = this.checkSubmit.bind(this)
  }

  // Set game path to plural for rails
  // Request a new game from rails index
  componentDidMount() {
    this.props.setGamePath('masterminds')
    this.props.resetBoard('masterminds')
  }

  // Update the form at each color change / click
  changeColor(event) {
    event.preventDefault()
    // Get the current color from id
    const index = Number(event.target.id)
    // Check which mouse button is clicked
    const direction = event.button == 0 ? 1 : -1

    // Gather necessary states
    const board = this.props.board.map(item => item)
    const round = this.props.status.round

    // Change the ball number/color and submit for state update
    let balls = board[round]
    let newBall = Number(balls[index]) + direction
    newBall = newBall < 0 ? 8 : newBall > 8 ? 0 : newBall
    balls = balls.substr(0,index) + newBall + balls.substr(index + 1)
    board[round] = balls
    this.props.changeBoard(board)
  }

  // Check if all balls are colored differently and submit
  checkSubmit() {
    // Get the current balls
    const balls = this.props.board[this.props.status.round]
    // Check if all balls are not colored
    if (balls.includes('0')) {
      alert('Please color all balls.')
      // Check if all colors are not different
    } else if ([...new Set(balls.split(''))].length != 4) {
      alert('Please submit 4 different colors.')
      // Submit the data for other cases
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
    // Check points at each render for winning situation
    this.props.setPoints(this.props.points)
    
    // Game board re-rendered when the board us updated at rails
    // This is to prevent tampers
    const gameBoard = this.props.board.map((cell, index) => {
      // First set balls for each round
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

      // Second add alls to the full stack
      return (
        <div key={cell + index} className='mastermind__cell' id={index} style={index == 12 ? {zIndex: '1001'} : {}}>
          {balls}
          <button
            className={(this.props.status.round != index || this.props.winner) ? 'hidden' : 'mastermind__submit'}
            onClick={this.props.status.round != index ? () => {return false} : this.checkSubmit}>
            Submit
          </button>
          <div className="mastermind__ball">
            {this.props.status.colorPlace && this.props.status.colorPlace[index] && this.props.status.colorPlace[index][0]}
          </div>
          <div className="mastermind__ball">
            {this.props.status.colorPlace && this.props.status.colorPlace[index] && this.props.status.colorPlace[index][1]}
          </div>
        </div>
      )
    })
    
    // Depending on the winner status the result differs to show the points and the user form to save username
    const result = this.props.winner == 1 ? 
      <div className='game__status'>
        <p>You have won</p>
        <p>{this.props.points} point(s)!</p>
        <Userform />
      </div> :
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

// Redux is used to save all necessary state elements
function mapState(state) {
  return {
    authenticity_token: state.mastermind.authenticity_token,
    answer: state.mastermind.status.answer,
    board: state.mastermind.board,
    id: state.mastermind.id,
    points: state.mastermind.points,
    status: state.mastermind.status,
    winner: state.mastermind.winner,

    game: state.games.game,
    gamePath: state.games.gamePath
  }
}

export default connect(mapState, { changeBoard, resetBoard, setGame, setGamePath, setPoints, submitBoard })(Mastermind)