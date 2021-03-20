import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class GameCard extends Component {
  constructor(props) {
    super(props)
    this.nameToRoute = this.nameToRoute.bind(this)
  }
  
  nameToRoute(name) {
    return name.toLowerCase().replaceAll(' ','-')
  }

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
