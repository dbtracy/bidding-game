import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { getPlayersThunkCreator } from '../../reducers/players'

import './root.css'

class DisconnectedRoot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currRound: 0,
      tricksTaken: 0,
    }
    this.placeBid = this.placeBid.bind(this)
  }
  placeBid(event) {
    this.setState({
      tricksTaken: parseInt(this.state.tricksTaken) + parseInt(event.target.value)
    })
  }
  componentDidMount() {
    this.props.gettingPlayers()
  }
  render() {
    let players = this.props.players
    let numPlayers = players.length
    let maxCards = numPlayers <= 5 ? 10 : (52 - (52 % numPlayers)) / numPlayers
    let roundMaxCards = maxCards - this.state.currRound

    return (
      <div className="main-page-body">
        <div className="title">
          <h1>The Bidding Game</h1>
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
              return (
                <div key={player.id} className="player-and-bids">
                  <p>{player.name}</p>
                  <select name="bids" className="bids" onChange={this.placeBid}>
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
            <h3>Tricks Available: {roundMaxCards - this.state.tricksTaken}</h3>
          </div>
          <hr />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    players: state.playersReducer.players
  }
}

const mapDispatchToProps = dispatch => ({
  gettingPlayers: () => dispatch(getPlayersThunkCreator())
})

export const Root = connect(mapStateToProps, mapDispatchToProps)(DisconnectedRoot)
