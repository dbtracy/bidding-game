import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getPlayersThunkCreator, addPlayerThunkCreator, deletePlayerThunkCreator } from '../../reducers/players'
import { updateHighestRoundThunkCreator } from '../../reducers/game'

class DisconnectedSetup extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(event) {
    event.preventDefault()
    this.props.addingPlayer(event.target.name.value)
    event.target.name.value = ''
    if (this.props.players.length > 5) {
      let numPlayers = this.props.players.length
      let remainder = 52 % numPlayers
      let maxCards = (52 - remainder) / numPlayers
      this.props.updatingHighestRound(maxCards)
    }
  }
  componentDidMount() {
    this.props.gettingPlayers()
    // this.props.
  }
  // componentDidUpdate(prevProps) {
  //   if (this.props.highestRound !== prevProps.highestRound) {
  //     this.props.highestRound = this.props.highestRound
  //   }
  // }
  render() {
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
                    this.props.deletingPlayer(player.id)
                  }}>Delete player</button>
                </div>
              )
            })}
          </div>
          <div>
            <form onSubmit={this.onSubmit}>
              <p>Add player:</p>
              <input type="text" className="nameInput" name="name" />
              <input type="submit" className="nameSubmit" name="submit" />
            </form>
          </div>
        </div>
        <div>
          <h3>Max starting round: {this.props.highestRound}</h3>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    players: state.playersReducer.players,
    highestRound: state.gameReducer.highestRound
  }
}

const mapDispatchToProps = dispatch => ({
  gettingPlayers: () => dispatch(getPlayersThunkCreator()),
  addingPlayer: (name) => dispatch(addPlayerThunkCreator(name)),
  deletingPlayer: (id) => dispatch(deletePlayerThunkCreator(id)),

  updatingHighestRound: (newHighestRound) => dispatch(updateHighestRoundThunkCreator(newHighestRound)),
})

export const Setup = connect(mapStateToProps, mapDispatchToProps)(DisconnectedSetup)
