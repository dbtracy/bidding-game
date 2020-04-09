import React, { Component } from 'react'
import axios from 'axios'

export class GamePlay extends Component {
  constructor(props) {
    super(props)
    this.submitRound = this.submitRound.bind(this)
    this.devResetScores = this.devResetScores.bind(this)
  }
  submitRound() {
    const bidsArr = Array.from(document.getElementsByClassName('player-and-bids'))
    bidsArr.forEach(async bid => {
      if (bid.childNodes[2].checked) {
        const points = 10 + (Number(bid.childNodes[1].value) || 0)
        const player = this.props.players.find(player => player.name === bid.childNodes[0].innerText)
        const playerPoints = player.points
        const updatedPoints = points + playerPoints
        player.points = updatedPoints
        try {
          const updatedPlayer = await axios.put(`api/players/${player.id}`, {
            points: updatedPoints
          })
        } catch (error) {
          console.log(error)
        }
      }
    })
    console.log('PLAYERS:', this.props.players)
  }
  devResetScores() {
    const bidsArr = Array.from(document.getElementsByClassName('player-and-bids'))
    bidsArr.forEach(async bid => {
      const player = this.props.players.find(player => player.name === bid.childNodes[0].innerText)
      console.log(player.name)
      try {
        const updatedPlayer = await axios.put(`api/players/${player.id}`, {
          points: 0
        })
      } catch (error) {
        console.log(error)
      }
    })
  }
  render() {
    let players = this.props.players.sort((a, b) => a.id - b.id)
    let numPlayers = players.length
    let maxCards = numPlayers <= 5 ? 10 : (52 - (52 % numPlayers)) / numPlayers
    let roundMaxCards = maxCards - this.props.currRound

    return (
      <div className="main-page-body">
        <div className="title">
          <h1>Game Play</h1>
        </div>
        <div className="players-and-round-info">
          <hr />
          <div className="bid-tracker">
            <p>To bid --></p>
          </div>
          <hr />
          <div className="players">
            <p>PLAYERS:</p>
            {players.map(player => {
              // let dropdown = React.createElement('select')
              // dropdown.name = 'bids'
              // dropdown.className = 'bids'
              // dropdown.onChange = this.placeBid
              // let sortedList = []
              // console.log('CURROUND:', this.props.currRound)
              // for (let i = 0; i <= this.props.currRound; i++) {
              //   sortedList.push(<option>i</option>)
              // }
              return (
                <div key={player.id} className="player-and-bids">
                  <p>{player.name}</p>
                  <select name="bids" className="bids" onChange={(event) => this.props.placeBid(event)}>
                    <option value="">Place bid</option>
                    <option value="0" >0</option>
                    <option value="1" >1</option>
                    <option value="2" >2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                  <input type="checkbox" className="made-it" name="made-it" />
                </div>
              )
            })}
          </div>
          <hr />
          <div className="round-info">
            <h1>Round: {roundMaxCards}</h1>
            <h3>Tricks Available: {roundMaxCards - this.props.tricksTaken}</h3>
            <button type="button" name="round-submit" onClick={this.submitRound}>Submit Round</button>
            <button type="button" name="dev-reset-scores" onClick={this.devResetScores} style={{ 'marginLeft': '10px' }}>dev: reset scores</button>
          </div>
          <hr />
        </div>
      </div >
    )
  }
}
