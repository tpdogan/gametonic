import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Games from '../components/games'
import Hangman from '../components/hangman'
import Mastermind from '../components/mastermind'
import Memorycard from '../components/memorycard'
import TicTacToe from '../components/tictactoe'
/*import Users from '../components/users'
import UserForm from '../components/user_form'*/

class App extends Component {
  render() {
    return (
      <div className='container has-text-centered'>
        <BrowserRouter>
          <h1 className="title is-2 has-text-danger">Gametonic</h1>
          <Switch>
            <Route path='/tic-tac-toe' component={ TicTacToe } />
            <Route path='/mastermind' component={ Mastermind } />
            <Route path='/hangman' component={ Hangman } />
            <Route path='/memory-card' component={ Memorycard } />
            <Route path='/' component={ Games } />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
