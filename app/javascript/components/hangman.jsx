import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeBoard, resetBoard, submitBoard } from '../actions/play_actions'
import { setGame, setGamePath, setPoints } from '../actions/game_actions'
import Users from './users'
import Userform from './user_form'
import hanger from '../vanilla/hanger'

class Hangman extends Component {
  // Constructor and checkWrongs, submitLetter functions
  constructor(props) {
    super(props)
    this.checkWrongs = this.checkWrongs.bind(this)
    this.submitLetter = this.submitLetter.bind(this)
  }

  // Set game path to plural for rails
  // Request a new game from rails index
  componentDidMount() {
    hanger()
    this.props.setGamePath('hangmen')
    this.props.resetBoard('hangmen')
  }

  // For all wrong letters partially uncover the hangman
  checkWrongs() {
    // Hide the cover at the back
    for (let i = 0; i < this.props.wrongs; i++) {
      const element = document.getElementById(`cover-${i}`)
      element.style.zIndex = -1
    }

    // Emphasize the already selected letters
    this.props.letters.map(letter => {
      document.getElementById(`letter-${letter}`).classList.add('hangman__selected')
    })
  }

  // Submit letter when clicked
  submitLetter(event) {
    // Get the letter from the div id
    const id = event.target.id
    if (this.props.wrongs < 8 && this.props.winner != 1 && id.substr(0,7) === 'letter-') {
      const letter = id.substr(7)
      // If letter is not selected already post a request
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
    // Check points at each render for winning situation
    this.props.setPoints(this.props.points)

    // Game board only has the word
    const gameBoard = this.props.board.map((letter, index) => {
      return (
        <div key={index} className='hangman__letter'>{letter.toUpperCase()}</div>
      )
    })

    // Alphabet is arranged and updated as selected from the rails response
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

    // The cover are the curtains in front of hangman
    // They are removed partially at each render
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

    // Depending on the winner status the result differs to show the points and the user form to save username
    const winner = this.props.winner
    const result = winner === -1 ? <div className='game__status'>You have lost!</div> :
                   winner === 1 ? <div className='game__status'>You have won {this.props.points} point(s)!<Userform /></div> : ''

    return (
      <div className='section is-flex is-flex-wrap-wrap is-full-width is-justify-content-space-around'>
        <div className='block m-0 mb-4'>
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

// Redux is used to save all necessary state elements
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