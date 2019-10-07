import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { getPlayersThunkCreator } from '../../reducers/players'

import './root.css'

class DisconnectedRoot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      round: 10,
      tricksAvailable: 10,

    }
    this.onChange = this.onChange.bind(this)
  }
  onChange(event) {
    // console.log(event.target.value)
    this.setState({
      tricksAvailable: this.state.tricksAvailable - event.target.value
    })
  }
  componentDidMount() {
    this.props.gettingPlayers()
  }
  render() {
    let tricks = []
    for (let i = this.state.tricksAvailable; i >= 0; i--) {
      tricks.push(i)
    }

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
            {this.props.players.map(player => {
              return (
                <div key={player.id} className="player-and-bids">
                  <p>{player.name}</p>
                  <select name="bids" className="bids" onChange={this.onChange}>
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
            <h1>Round: {this.state.round}</h1>
            <h3>Tricks Available: {this.state.tricksAvailable}</h3>
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
