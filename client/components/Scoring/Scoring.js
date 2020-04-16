import React, { Component } from 'react'
import axios from 'axios'

export class Scoring extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rounds: [],
      currRoundScores: []
    }
  }
  componentDidMount() {
    const players = this.props.players.sort((a, b) => a.id - b.id)
    const scoreTable = document.querySelector('.score-table')
    let scoreTableRow = []
    let playerList = []

    playerList.push(
      <div className="score">Round</div >,
      <div className="score">Cards</div >
    )
    for (let player of players) {
      playerList.push(<div className="score">{player.name}</div >)
    }

    scoreTableRow.push(<div className="score-table-row titles">{playerList}</div >)
    for (let i = 1; i < this.props.currRound; i++) {
      let scores = []
      scores.push(
        <div className="score">{i}</div>,
        <div className="score">{this.props.game[i]['cards']}</div>

      )
      for (let j = 1; j <= players.length; j++) {
        scores.push(<div className="score" key={`p${j}`}>{this.props.game[i][`p${j}`]['points']}</div>)
      }
      scoreTableRow.push(<div className="score-table-row">{scores}</div>)
      this.setState({ currRoundScores: scoreTableRow })
    }
  }
  render() {
    const players = this.props.players.sort((a, b) => a.id - b.id)

    return (this.props.game['1']['p1'] ? (
      <div className="scoring-body">
        <div className="score-table">{this.state.currRoundScores}
          {/* <div className="score-table-row">
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
          </div> */}
          <hr />
          <div className="score-totals">
            <div></div>
            <div>TOTALS:</div>
            {players.map(player => {
              return <div key={player.id}>{player.points}</div>
            })}</div>
        </div>

        {/* <button onClick={() => {
          if (this.props.game['poo']) {
            this.props.game['poo'] += 1
          } else {
            this.props.game['poo'] = 1
          }
          console.log(this.props.game)
        }}>Change score</button> */}
      </div>
    ) : null
    )
  }
}
