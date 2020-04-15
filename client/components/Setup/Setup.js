import React, { Component } from 'react'
import axios from 'axios'

export class Setup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dealer: ''
    }
    this.changeDealer = this.changeDealer.bind(this)
  }
  changeDealer(event) {
    this.setState({ dealer: event.target.value })
  }
  render() {
    let players = this.props.players.sort((a, b) => a.id - b.id)
    let dealer = this.state.dealer

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
                    <input type="text" name="name" size="6" value={this.state.dealer} onChange={this.changeDealer} />
                  </div>
                </form>
                <hr />
                <div className="max-round">
                  <div className="max-round-input">
                    <p>Set max round:</p>
                    <input type="text" className="max-round-input" name="name" size="3" placeholder={this.props.maxRound} />
                  </div>
                </div>
                <hr />
                <div className="cube-rule">
                  <p>Cube rule?</p>
                  <input type="checkbox" name="cube-rule" />
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
