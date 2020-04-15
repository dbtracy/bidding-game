import React, { Component } from 'react'
import axios from 'axios'

export class GamePlay extends Component {
  constructor(props) {
    super(props)
    // this.submitRound = this.submitRound.bind(this)
    this.devResetScores = this.devResetScores.bind(this)
  }
  // submitRound() {
  //   const bidsArr = Array.from(document.getElementsByClassName('player-and-bids'))
  //   bidsArr.forEach(async bid => {
  //     if (bid.childNodes[2].checked) {
  //       const points = 10 + (Number(bid.childNodes[1].value) || 0)
  //       const player = this.props.players.find(player => player.name === bid.childNodes[0].innerText)
  //       const playerPoints = player.points
  //       const updatedPoints = points + playerPoints
  //       player.points = updatedPoints

  //       bid.childNodes[2].checked = false
  //       try {
  //         const updatedPlayer = await axios.put(`api/players/${player.id}`, {
  //           points: updatedPoints
  //         })
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //     // console.log('BID:', bid)
  //     // console.log('BID VALUE:', bid.childNodes[1].defaultSelected)
  //     // bid.childNodes[1].selected = bid.childNodes[1].defaultSelected
  //   })
  //   console.log('PLAYERS:', this.props.players)
  // }
  devResetScores() {
    const bidsArr = Array.from(document.getElementsByClassName('player-and-bids'))
    bidsArr.forEach(async bid => {
      const player = this.props.players.find(player => player.name === bid.childNodes[0].innerText)
      try {
        const updatedPlayer = await axios.put(`api/players/${player.id}`, {
          points: 0
        })
      } catch (error) {
        console.log(error)
      }
    })
    console.log('scores reset to zero')
  }
  componentDidMount() {
    console.log('GAME:', this.props.game)
  }
  render() {
    let players = this.props.players.sort((a, b) => a.id - b.id)
    let roundMaxCards = this.props.game[this.props.currRound]['cards']

    return (
      <div className="players-and-round-info">
        <div className="card">
          <div className="card-title">
            <h3>PLAYERS</h3>
            {/* <hr /> */}
          </div>
          <form className="card-info">
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
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
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
            {/* <input type="reset" value="reset"></input> */}
          </form>
        </div>

        <div className="card">
          <div className="card-title">
            <h3>ROUND</h3>
          </div>
          <div className="card-info">
            <h3>Round: {this.props.currRound}</h3>
            <h3>Round Cards: {roundMaxCards}</h3>
            <h3>Tricks Available: {roundMaxCards - this.props.tricksTaken}</h3>
            <button type="button" name="round-submit" onClick={this.props.submitRound}>Submit Round</button>
            {/* <button type="button" name="dev-reset-scores" onClick={this.devResetScores} style={{ 'marginLeft': '10px' }}>dev: reset scores</button> */}
          </div>
        </div>

      </div>
    )
  }
}
