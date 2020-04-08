import React, { Component } from 'react'
import axios from 'axios'

export class Setup extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let numPlayers = this.props.players.length
    let maxCards = numPlayers <= 5 ? 10 : (52 - (52 % numPlayers)) / numPlayers

    return (
      <div>
        <h1>Enter game info:</h1>
        <div className="players-and-add-player">
          <div>
            <p>Players:</p>
            {this.props.players.map(player => {
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
          <div>
            <form onSubmit={(event) => this.props.addPlayer(event)}>
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
