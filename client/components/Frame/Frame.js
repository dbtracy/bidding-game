import React, { Component } from 'react'
import axios from 'axios'

import { GamePlay } from '../GamePlay/GamePlay'
import { Setup } from '../Setup/Setup'

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
    this.setState({ active: 'GamePlay' })
  }
  render() {
    const active = this.state.active
    return (
      <div>
        <h1 className="frame-title">The Bidding Game!!1!</h1>
        <button type="button" onClick={this.showSetup}>Setup</button>
        <button type="button" onClick={this.showGamePlay}>Game</button>
        <div>{active === 'Setup' ? (
          <Setup players={this.state.players} addPlayer={this.addPlayer} deletePlayer={this.deletePlayer} />
        ) : active === 'GamePlay' ? (
          <GamePlay players={this.state.players} currRound={this.state.currRound} tricksTaken={this.state.tricksTaken} placeBid={this.placeBid} />
        ) : null}</div>
      </div>
    )
  }
}
