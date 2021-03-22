import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchGames } from '../actions/game_actions'
import GameCard from './game_card'

class Games extends Component {
  // Constructor and checkForRedirect functions
  constructor(props) {
    super(props)
    this.checkForRedirect = this.checkForRedirect.bind(this)
  }

  // Fetch all of the games
  componentDidMount() {
    this.props.fetchGames()
  }

  // When refresh is clicked the route is send as a parameter
  // This functions checks if such redirect has occured
  checkForRedirect() {
    this.props.location.search != '' ?
      this.props.history.push(
        '/' + this.props.location.search.substr(1)
      ) : ''
  }

  // All games are rendered as a game card
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

// Redux is used to fetch all of the games
function mapState(state) {
  return {
    games: state.games.games
  }
}

export default connect(mapState, { fetchGames })(Games)