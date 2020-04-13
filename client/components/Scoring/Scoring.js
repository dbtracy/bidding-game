import React, { Component } from 'react'
import axios from 'axios'

export class Scoring extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const players = this.props.players.sort((a, b) => a.id - b.id)
    return (
      <div className="scoring-body">
        <h1>Scoring</h1>
        <div className="score-table">
          <div className="score-table-row">
            <p>Round</p>
            <p>Cards</p>
            {players.map(player => {
              return (
                <div key={player.id}>
                  <p>{player.name}</p>
                </div>
              )
            })}
          </div>
          <hr />
          <div className="score-table-row">
            <p>1</p>
            <p>10</p>
            {players.map(player => {
              return (
                <div className="round-row" key={player.id}>
                  <p>{player.points}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div >
    )
  }
}
