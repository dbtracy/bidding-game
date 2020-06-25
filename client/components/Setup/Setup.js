import React, { Component } from 'react'
import axios from 'axios'

export class Setup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dealer: '',
      maxRound: 0
    }
    this.changeDealer = this.changeDealer.bind(this)
    this.changeMaxRound = this.changeMaxRound.bind(this)
  }
  changeDealer(event) {
    this.setState({ dealer: event.target.value })
  }
  changeMaxRound(event) {
    this.setState({ maxRound: event.target.value })
  }
  render() {
    const players = this.props.players.sort((a, b) => a.id - b.id)
    const { dealer, maxRound } = this.state
    return (
      <div className="setup-frame">
        <div className="setup-body">
          <div className="game-info">

            {/* CARD: ENTER PLAYERS */}
            <div className="card enter-players">
              <div className="card-title">
                <h3>Enter players:</h3>
              </div>
              <div className="card-info">
                <form onSubmit={(event) => this.props.addPlayer(event)}>
                  <p>Enter player:</p>
                  <div className="add-player">
                    <input type="text" className="name-input" name="name" />
                    <button type="submit" className="nameSubmit" name="submit">Add</button>
                  </div>
                </form>
              </div>
            </div>

            {/* CARD: SET OTHER GAME INFO */}
            <div className="card">
              <div className="card-title">
                <h3>Other game info:</h3>
              </div>
              <div className="card-info">
                <form className="set-dealer-form" onSubmit={() => this.props.setDealer(event, dealer)}>
                  <div className="set-dealer-input">
                    <label htmlFor="set-dealer-input">Set first dealer:</label>
                    <input type="text" name="name" size="6" placeholder={dealer} onChange={this.changeDealer} />
                  </div>
                </form>
                <hr />
                <div className="max-round">
                  <form className="max-round-input" onSubmit={(event) => this.props.setMaxRound(event, maxRound)}>
                    <p>Set max round:</p>
                    <input type="text" className="max-round-input" name="name" size="3" onChange={this.changeMaxRound} placeholder={this.props.maxRound} />
                  </form>
                  <p className="max-round-error">Max round must be {parseInt(51 / players.length)} or less for {players.length} players</p>
                </div>
                <hr />
                <div className="squared-rule">
                  <p>Squared rule?</p>
                  <input type="checkbox" name="squared-rule" checked={this.props.squaredRule} onChange={() => this.props.setSquaredRule(event)} />
                </div>
              </div>
            </div>
          </div>

          {/* CARD: PLAYERS ENTERED */}
          <div className="card">
            <div className="card-title">
              <h3>Players:</h3>
            </div>
            <div className="card-info players-entered">
              <div className="players-entered">
                {players.map(player => {
                  return (
                    <div key={player.id} className="player-entered">
                      <p>{player.name}</p>
                      <button className="delete-player-btn" type="button" onClick={() => {
                        this.props.deletePlayer(player.id)
                        this.forceUpdate()
                      }}>X</button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

        </div>
        <div className="start-game">
          <button type="button" onClick={this.props.createGame}>Start Game!</button>
        </div>
      </div>
    )
  }
}
