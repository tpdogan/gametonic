import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeBoard, resetBoard, submitBoard } from '../actions/play_actions'
import { setGame } from '../actions/user_actions'
import Users from './users'
import Userform from './user_form'

class Memorycard extends Component {
  constructor(props) {
    super(props)
    this.selectCell = this.selectCell.bind(this)
  }

  componentDidMount() {
    this.props.resetBoard('memorycards')
  }

  selectCell(event) {
    const id = event.target.id
    if (this.props.winner == 0) {
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
    
    const gameBoard = this.props.board.map((cell, index) => {
      return (
        <div key={index} className='memorycard__cell' id={index} onClick={this.selectCell}>
          { cell == '?' ? cell : <i className={`fal fa-${cell}`}></i> }
        </div>
      )
    })
    
    const result = this.props.winner == 1 ? 
      <div className='game__status'>You have won!<Userform /></div> :
      <div className='game__status'>You have lost!</div>

    return (
      <div className='section is-flex is-full-width is-justify-content-space-around'>
        <div className='block m-0'>
          <div className='memorycard__plate'>
            {gameBoard}
            {this.props.winner == 1 && result}
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

function mapState(state) {
  return {
    authenticity_token: state.memorycard.authenticity_token,
    board: state.memorycard.board,
    id: state.memorycard.id,
    winner: state.memorycard.winner
  }
}

export default connect(mapState, { changeBoard, resetBoard, setGame, submitBoard })(Memorycard)