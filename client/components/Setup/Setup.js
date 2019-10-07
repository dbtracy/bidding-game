import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getPlayersThunkCreator } from '../../reducers/players'

class DisconnectedSetup extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.gettingPlayers()
  }
  render() {
    return (
      <div>
        <h1>Enter game info:</h1>
        <div>
          <p>Add player</p>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <p>Players:</p>
          {this.props.players.map(player => {
            return (
              <p key={player.id}>{player.name}</p>
            )
          })}
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

export const Setup = connect(mapStateToProps, mapDispatchToProps)(DisconnectedSetup)
