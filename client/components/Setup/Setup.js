import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getPlayersThunkCreator, addPlayerThunkCreator, deletePlayerThunkCreator } from '../../reducers/players'

class DisconnectedSetup extends Component {
  constructor(props) {
    super(props)
    this.deletePlayer = this.deletePlayer.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(event) {
    event.preventDefault()
    this.props.addingPlayer(event.target.name.value)
    event.target.name.value = ''
  }
  componentDidMount() {
    this.props.gettingPlayers()
  }
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
  gettingPlayers: () => dispatch(getPlayersThunkCreator()),
  addingPlayer: (name) => dispatch(addPlayerThunkCreator(name)),
  deletingPlayer: (id) => dispatch(deletePlayerThunkCreator(id))
})

export const Setup = connect(mapStateToProps, mapDispatchToProps)(DisconnectedSetup)
