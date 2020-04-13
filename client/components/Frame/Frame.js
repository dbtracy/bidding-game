import React, { Component } from 'react'
import axios from 'axios'

import { GamePlay } from '../GamePlay/GamePlay'
import { Setup } from '../Setup/Setup'
import { Scoring } from '../Scoring/Scoring'

export class Frame extends Component {
  constructor() {
    super()
    this.state = {
      players: [],
      currRound: 0,
      tricksTaken: 0,
      active: ''
    }
    this.showSetup = this.showSetup.bind(this)
    this.showGamePlay = this.showGamePlay.bind(this)
    this.showScoring = this.showScoring.bind(this)
    this.addPlayer = this.addPlayer.bind(this)
    this.deletePlayer = this.deletePlayer.bind(this)
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
    this.setState({ active: 'Scoring' })
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
            <button className="navbar-btn" type="button" onClick={this.showScoring}>Current Scores</button>
          </div>
        </div>



        <div>{active === 'Setup' ? (
          <div className="page-title">
            <h1>Setup</h1>
            <hr />
            <Setup players={this.state.players} addPlayer={this.addPlayer} deletePlayer={this.deletePlayer} />
          </div>
        ) : active === 'GamePlay' ? (
          <div className="page-title">
            <h1>Game Play</h1>
            <hr />
            <GamePlay players={this.state.players} currRound={this.state.currRound} tricksTaken={this.state.tricksTaken} placeBid={this.placeBid} />
          </div>
        ) : active === 'Scoring' ? (
          <div className="page-title">
            <h1>Scoring</h1>
            <hr />
            <Scoring players={this.state.players} />
          </div>
        ) : null}</div>
      </div>
    )
  }
}
