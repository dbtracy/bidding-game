import React, { Component } from 'react'
import axios from 'axios'

import { GamePlay } from '../GamePlay/GamePlay'
import { Setup } from '../Setup/Setup'
import { Scoring } from '../Scoring/Scoring'
import { emptyDummyGame, dummyGame } from '../Scoring/dummyGame'

export class Frame extends Component {
  constructor() {
    super()
    this.state = {
      players: [],
      currRound: 0,
      tricksTaken: 0,
      active: '',
      game: emptyDummyGame,
      dealer: ''
    }
    this.showSetup = this.showSetup.bind(this)
    this.showGamePlay = this.showGamePlay.bind(this)
    this.showScoring = this.showScoring.bind(this)
    this.addPlayer = this.addPlayer.bind(this)
    this.deletePlayer = this.deletePlayer.bind(this)
    this.createGame = this.createGame.bind(this)
    this.setDealer = this.setDealer.bind(this)
    this.placeBid = this.placeBid.bind(this)
  }
  showSetup() {
    this.setState({ active: 'Setup' })
  }
  showGamePlay() {
    this.setState({ active: 'GamePlay' })
  }
  showScoring() {
    this.setState({ active: 'Scoring' })
  }
  async addPlayer(event) {
    event.preventDefault()
    event.persist()
    try {
      const { data } = await axios.post('/api/players', { name: event.target.name.value })
      this.setState({ players: [...this.state.players, data] })
    } catch (error) {
      console.log(error)
    }
    event.target.name.value = ''
  }
  async deletePlayer(id) {
    try {
      const { data } = await axios.delete(`/api/players/${id}`)
      this.setState({ players: this.state.players.filter(player => { return player.id !== id }) })
    } catch (error) {
      console.log(error)
    }
  }
  createGame() {
    for (let round in emptyDummyGame) delete emptyDummyGame[round]
    let numPlayers = this.state.players.length
    let max = numPlayers <= 5 ? 10 : (52 - (52 % numPlayers)) / numPlayers
    let numRounds = max * 2 + max - 2
    for (let i = 1; i <= numRounds; i++) {
      let numCards
      if (i < max) numCards = max + 1 - i
      else if (i > max * 2 - 1) numCards = i - (max * 2 - 2)
      else numCards = 1
      emptyDummyGame[`${i}`] = {
        round: i,
        cards: numCards
      }
    }
    this.state.game['1']['dealer'] = this.state.dealer
    this.showGamePlay()
    console.log('GAME:', this.state.game)
  }
  setDealer(event, name) {
    event.preventDefault()
    // event.persist()
    if (this.state.players.find(player => player.name === name)) {
      console.log('player exists!')
      this.setState({ dealer: name })
    } else {
      console.log('player does not exist!')
      //add error text below
    }
  }
  placeBid(event) {
    this.setState({
      tricksTaken: parseInt(this.state.tricksTaken) + parseInt(event.target.value)
    })
  }
  async componentDidMount() {
    try {
      const { data } = await axios.get('/api/players')
      this.setState({ players: data })
    } catch (error) {
      console.log(error)
    }
    this.setState({ active: 'Setup' })
  }
  render() {
    const active = this.state.active
    return (
      <div className="frame">
        <div className="frame-top">
          <h1 className="frame-title">The Bidding Game!!1!</h1>
          <div className="navbar">
            <button className="navbar-btn" type="button" onClick={this.showSetup}>Setup</button>
            <button className="navbar-btn" type="button" onClick={this.showGamePlay}>Game</button>
            <button className="navbar-btn" type="button" onClick={this.showScoring}>Scores</button>
          </div>
        </div>

        {active === 'Setup' ? (
          <div>
            <div className="page-title">
              <h1>Setup</h1>
              <hr />
            </div>
            <Setup players={this.state.players} game={this.state.game} addPlayer={this.addPlayer} deletePlayer={this.deletePlayer} createGame={this.createGame} setDealer={this.setDealer} />
          </div>
        ) : active === 'GamePlay' ? (
          <div>
            <div className="page-title">
              <h1>Game Play</h1>
              <hr />
            </div>
            <GamePlay players={this.state.players} currRound={this.state.currRound} tricksTaken={this.state.tricksTaken} placeBid={this.placeBid} />
          </div>
        ) : active === 'Scoring' ? (
          <div>
            <div className="page-title">
              <h1>Scoring</h1>
              <hr />
            </div>
            <Scoring players={this.state.players} game={this.state.game} />
          </div>
        ) : null}
      </div>
    )
  }
}
