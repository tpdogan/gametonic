import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeBoard, resetBoard, submitBoard } from '../actions/play_actions'
import { setGame, setGamePath, setPoints } from '../actions/game_actions'
import Users from './users'
import Userform from './user_form'

class TicTacToe extends Component {
  constructor(props) {
    super(props)
    this.selectCell = this.selectCell.bind(this)
  }

  componentDidMount() {
    this.props.setGamePath('tictactoes')
    this.props.resetBoard('tictactoes')
  }

  selectCell(event) {
    const cellNo = event.target.id
    if (this.props.board[cellNo] === '0' && this.props.winner === 0) {
      const board = 
        this.props.board.map(
          (item,index) => {
            return index === cellNo ? '-1' : item
          }
        )
      this.props.changeBoard(board)

      const boardData = {
        authenticity_token: this.props.authenticity_token,
        id: this.props.id,
        tictactoe: {
          index: cellNo
        }
      }
      this.props.submitBoard(this.props.gamePath, boardData)
    } else {
      console.log('cannot play')
    }
  }

  render() {
    // Game name must be the same as in the server
    this.props.setGame('Tic Tac Toe')
    this.props.setPoints(this.props.points)
    
    const gameBoard = this.props.board.map((cell, index) => {
      return (
        <div key={index} className='tictactoe__cell' id={index} onClick={this.selectCell}>
          {
            cell === '1' ?
              'X' :
              cell === '-1' ?
              'O' :
              ''
          }
        </div>
      )
    })

    const result =
      this.props.winner === -1 ?
        <div className='game__status'>
          You have won!
          <Userform />
        </div> :
      this.props.winner === 1 ?
        <div className='game__status'>You have lost!</div> :
        <div className='game__status'>It is draw!</div>

    return (
      <div className='section is-flex is-full-width is-justify-content-space-around'>
        <div className='block m-0'>
          <div className='tictactoe__plate'>
            {gameBoard}
            {this.props.perform != 'play' && <div className='game__status'>{result}</div>}
          </div>

          <div className='game__buttons'>
            <button className='button is-half-width mr-2' onClick={() => this.props.resetBoard(this.props.gamePath)}>Reset Board</button>
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
    authenticity_token: state.tictactoe.authenticity_token,
    board: state.tictactoe.board,
    id: state.tictactoe.id,
    perform: state.tictactoe.status.perform,
    points: state.tictactoe.points,
    winner: state.tictactoe.winner,

    game: state.games.game,
    gamePath: state.games.gamePath
  }
}

export default connect(mapState, { changeBoard, resetBoard, setGame, setGamePath, setPoints, submitBoard })(TicTacToe)