import React, { Component } from 'react'
import axios from 'axios'
// import { connect } from 'react-redux'

// import { getPlayersThunkCreator, addPlayerThunkCreator, deletePlayerThunkCreator } from '../../reducers/players'
// import { updateHighestRoundThunkCreator, getHighestRoundThunkCreator } from '../../reducers/game'

export class Setup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [],
      currRound: 0,
      tricksTaken: 0
    }
    this.addPlayer = this.addPlayer.bind(this)
    this.deletePlayer = this.deletePlayer.bind(this)
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
  async componentDidMount() {
    try {
      const { data } = await axios.get('/api/players')
      this.setState({ players: data })
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    let numPlayers = this.state.players.length
    let maxCards = numPlayers <= 5 ? 10 : (52 - (52 % numPlayers)) / numPlayers

    return (
      <div>
        <h1>Enter game info:</h1>
        <div className="players-and-add-player">
          <div>
            <p>Players:</p>
            {this.state.players.map(player => {
              return (
                <div key={player.id}>
                  <p>{player.name}</p>
                  <button type="button" onClick={() => {
                    this.deletePlayer(player.id)
                  }}>Delete player</button>
                </div>
              )
            })}
          </div>
          <div>
            <form onSubmit={(event) => this.addPlayer(event)}>
              <p>Add player:</p>
              <input type="text" className="nameInput" name="name" />
              <input type="submit" className="nameSubmit" name="submit" />
            </form>
          </div>
        </div>
        <div>
          <h3>Max starting round: {maxCards}</h3>
        </div>
        <div>
          <button type="button">Start Game!</button>
        </div>
      </div >
    )
  }
}
