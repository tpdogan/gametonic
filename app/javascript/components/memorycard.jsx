import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeBoard, resetBoard, submitBoard } from '../actions/play_actions'
import { setGame, setGamePath, setPoints } from '../actions/game_actions'
import Users from './users'
import Userform from './user_form'

class Memorycard extends Component {
  // Constructor and selectCell function
  constructor(props) {
    super(props)
    this.selectCell = this.selectCell.bind(this)
  }

  // Set game path to plural for rails
  // Request a new game from rails index
  componentDidMount() {
    this.props.setGamePath('memorycards')
    this.props.resetBoard('memorycards')
  }

  // Submit cell if it has not been opened
  selectCell(event) {
    // Get the cell id and check if the game has finished
    const id = event.target.id
    if (this.props.winner === 0) {
      const boardData = {
        authenticity_token: this.props.authenticity_token,
        id: this.props.id,
        memorycard: {
          index: id
        }
      }
      this.props.submitBoard('memorycards', boardData)
    } else {
      console.log('cannot play')
    }
  }
  

  render() {
    // Game name must be the same as in the server
    this.props.setGame('Memory Card')
    // Check points at each render for winning situation
    this.props.setPoints(this.props.points)
    
    // Game board only has the tiles with shapes or ?
    const gameBoard = this.props.board.map((cell, index) => {
      return (
        <div key={index} className='memorycard__cell' id={index} onClick={this.selectCell}>
          { cell === '?' ? cell : <i className={`fal fa-${cell}`}></i> }
        </div>
      )
    })
    
    // Depending on the winner status the result differs to show the points and the user form to save username
    const result = this.props.winner === 1 ? 
      <div className='game__status'>
        <p>You have won</p>
        <p>{this.props.points} point(s)!</p>
        <Userform />
      </div> :
      <div className='game__status'>You have lost!</div>

    return (
      <div className='section is-flex is-flex-wrap-wrap is-full-width is-justify-content-space-around'>
        <div className='block m-0 mb-4'>
          <div className='memorycard__plate'>
            {gameBoard}
            {this.props.winner !== 0 && result}
          </div>

          <div className='game__buttons'>
            <button className='button is-half-width mr-2' onClick={() => this.props.resetBoard('memorycards')}>Reset Board</button>
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
    authenticity_token: state.memorycard.authenticity_token,
    board: state.memorycard.board,
    id: state.memorycard.id,
    points: state.mastermind.points,
    winner: state.memorycard.winner,

    game: state.games.game,
    gamePath: state.games.gamePath
  }
}

export default connect(mapState, { changeBoard, resetBoard, setGame, setGamePath, setPoints, submitBoard })(Memorycard)