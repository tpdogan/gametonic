import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchGames } from '../actions/game_actions'
import GameCard from './game_card'

class Games extends Component {
  constructor(props) {
    super(props)
    this.checkForRedirect = this.checkForRedirect.bind(this)
  }

  componentDidMount() {
    this.props.fetchGames()
  }

  checkForRedirect() {
    this.props.location.search != '' ?
      this.props.history.push(
        '/' + this.props.location.search.substr(1)
      ) : ''
  }

  render() {
    this.checkForRedirect()
    const gameList = this.props.games.map(game => (
      <GameCard key={game.name} name={game.name} image={game.image}/>
    ))
    return (
      <div className='games__grid'>
        {gameList}
      </div>
    )
  }
}

function mapState(state) {
  return {
    games: state.games.games
  }
}

export default connect(mapState, { fetchGames })(Games)