import React, { Component } from 'react'
import axios from 'axios'



export class Scoring extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('EMPTY DUMMY:', this.props.game)
    // console.log('DUMMY:', dummyGame)
    const players = this.props.players.sort((a, b) => a.id - b.id)
    return (
      <div className="scoring-body">
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
        <button onClick={() => {
          if (this.props.game['poo']) {
            this.props.game['poo'] += 1
          } else {
            this.props.game['poo'] = 1
          }
          console.log(this.props.game)
        }}>Change score</button>
      </div>
    )
  }
}
