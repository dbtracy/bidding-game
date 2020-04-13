import React, { Component } from 'react'
import axios from 'axios'

export class Setup extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let players = this.props.players.sort((a, b) => a.id - b.id)
    let numPlayers = this.props.players.length
    let maxCards = numPlayers <= 5 ? 10 : (52 - (52 % numPlayers)) / numPlayers

    return (
      <div className="setup-body">
        <div className="game-info">

          <div className="card">
            <div className="card-title">
              <h3>Enter players:</h3>
            </div>
            <div className="card-info">
              <form onSubmit={(event) => this.props.addPlayer(event)}>
                <p>Enter player:</p>
                <div className="add-player">
                  <input type="text" className="nameInput" name="name" />
                  <input type="submit" className="nameSubmit" name="submit" />
                </div>
              </form>
            </div>
          </div>

          <div className="card">
            <div className="card-title">
              <h3>Other game info:</h3>
            </div>
            <div className="card-info">
              <div className="cube-rule">
                <p>Cube rule?</p>
                <input type="checkbox" name="cube-rule" />
              </div>
              <hr />
              <div className="max-round">
                <h3>Max starting round: {maxCards}</h3>
                <div className="max-round-input">
                  <p>Set max round:</p>
                  <input type="text" className="maxRoundInput" name="name" />
                </div>
              </div>
              <hr />
              <div className="start-game">
                <button type="button">Start Game!</button>
              </div>
            </div>
          </div>

        </div>

        <div className="card">
          <div className="card-title">
            <h3>Players:</h3>
          </div>
          <div className="card-info">
            <div className="players-entered">
              {players.map(player => {
                return (
                  <div key={player.id}>
                    <p>{player.name}</p>
                    <button type="button" onClick={() => {
                      this.props.deletePlayer(player.id)
                      this.forceUpdate()
                    }}>Delete player</button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    )
  }
}
