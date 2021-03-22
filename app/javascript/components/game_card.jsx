import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class GameCard extends Component {
  // Constructor and nameToRoute functions
  constructor(props) {
    super(props)
    this.nameToRoute = this.nameToRoute.bind(this)
  }
  
  // This function converts game name into a gap-free string to user as a route
  nameToRoute(name) {
    return name.toLowerCase().replaceAll(' ','-')
  }

  // Each game card is rendered with an image and a button to open the game
  render() {
    return (
      <div className='card game__card'>
        <img src={this.props.image} alt={this.props.name}/>
        <Link to={`/${this.nameToRoute(this.props.name)}`}>
          <p className="button is-large is-warning is-light game__name">{this.props.name}</p>
        </Link>
      </div>
    )
  }
}

export default GameCard
