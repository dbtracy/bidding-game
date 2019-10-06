import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { getPlayersThunkCreator } from '../../reducers/players'

import './root.css'

class DisconnectedRoot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tricksAvailable: 10,

    }
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
        <div className="round-info">
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
                  <select name="bids" className="bids">
                    {tricks.map(trick => {
                      return (
                        <option key="`${trick + 0}`" value="`${trick}`">{trick}</option>
                      )
                    })}
                  </select>
                  <input type="checkbox" className="made-it" name="made-it" />
                </div>
              )
            })}
          </div>
          <hr />
          <div className="aftermath">

          </div>
          <div className="tricks-remaining">

          </div>
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
