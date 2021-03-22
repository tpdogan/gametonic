import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeBoard, resetBoard, submitBoard } from '../actions/play_actions'
import { setGame, setGamePath, setPoints } from '../actions/game_actions'
import Users from './users'
import Userform from './user_form'
import hanger from '../vanilla/hanger'

class Hangman extends Component {
  constructor(props) {
    super(props)
    this.checkWrongs = this.checkWrongs.bind(this)
    this.resetFront = this.resetFront.bind(this)
    this.submitLetter = this.submitLetter.bind(this)
  }

  componentDidMount() {
    hanger()
    this.props.setGamePath('hangmen')
    this.props.resetBoard('hangmen')
  }

  checkWrongs() {
    for (let i = 0; i < this.props.wrongs; i++) {
      const element = document.getElementById(`cover-${i}`)
      element.style.zIndex = -1
    }

    this.props.letters.map(letter => {
      document.getElementById(`letter-${letter}`).classList.add('hangman__selected')
    })
  }

  resetFront() {
    setTimeout(() =>{
      const letters = document.getElementsByClassName('hangman__letter')
      for (let i = 0; i < letters.length; i++) {
        const element = letters[i]
        element.classList.remove('hangman__selected')
      }

      const covers = document.getElementsByClassName('hangman__cover')
      for (let i = 0; i < covers.length; i++) {
        const element = covers[i]
        element.style.zIndex = 1
      }
    }, 100)
  }

  submitLetter(event) {
    const id = event.target.id
    if (this.props.wrongs < 8 && this.props.winner != 1 && id.substr(0,7) === 'letter-') {
      const letter = id.substr(7)
      if (!this.props.letters.includes(letter)) {
        const boardData = {
          authenticity_token: this.props.authenticity_token,
          hangman: {
            letter: letter
          },
          id: this.props.id
        }
        this.props.submitBoard('hangmen', boardData)
      }
    }
  }

  render() {
    // Game name must be the same as in the server
    this.props.setGame('Hangman')
    this.props.setPoints(this.props.points)

    const gameBoard = this.props.board.map((letter, index) => {
      return (
        <div key={index} className='hangman__letter'>{letter.toUpperCase()}</div>
      )
    })

    const alphabet =
      'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => {
        return (
          <div
            key={`letter-${letter}`}
            id={`letter-${letter}`}
            className={`hangman__letter ${this.props.letters && this.props.letters.includes(letter) ? 'hangman__selected' : ''}`}
            onClick={this.submitLetter}>
              {letter.toUpperCase()}
          </div>
        )
      })

    const cover = '01234567'.split('').map(i => {
      return (
        <div
          key={i}
          className='hangman__cover'
          style=
          {
            i < 4 ?
            {bottom: 40 * i + 'px', zIndex: i*1 + 1 - (this.props.wrongs || 0)} :
            {bottom: 120 - 40 * (i*1 - 4) + 'px', right: 60 + 'px', zIndex: (i*1 + 1 - (this.props.wrongs || 0) )}
          }>
        </div>
      )
    })

    const winner = this.props.winner
    const result = winner === -1 ? <div className='game__status'>You have lost!</div> :
                   winner === 1 ? <div className='game__status'>You have won {this.props.points} point(s)!<Userform /></div> : ''

    return (
      <div className='section is-flex is-full-width is-justify-content-space-around'>
        <div className='block m-0'>
          <div className='hangman__plate'>
            <div className='hangman__cell'>{gameBoard}</div>
            {this.props.winner != 0 && result}
            <div className='hangman__man'>{cover}</div>
            <div className='hangman__alphabet'>{alphabet}</div>
          </div>

          <div className='game__buttons'>
            <button className='button is-half-width mr-2' onClick={() => this.props.resetBoard('hangmen')}>Reset Board</button>
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
    authenticity_token: state.hangman.authenticity_token,
    board: state.hangman.board,
    id: state.hangman.id,
    letters: state.hangman.status.letters,
    points: state.hangman.points,
    wrongs: state.hangman.status.wrongs,
    winner: state.hangman.winner,

    game: state.games.game,
    gamePath: state.games.gamePath
  }
}

export default connect(mapState, { changeBoard, resetBoard, setGame, setGamePath, setPoints, submitBoard })(Hangman)