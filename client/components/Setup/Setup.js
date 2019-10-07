import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getPlayersThunkCreator, addPlayerThunkCreator } from '../../reducers/players'

class DisconnectedSetup extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(event) {
    event.preventDefault()
    console.log(event.target.name.value)
    this.props.addingPlayer(event.target.name.value)
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
                <p key={player.id}>{player.name}</p>
              )
            })}
          </div>
          <div>
            {/* <p>Add player:</p>
            <label htmlFor="name">Name</label> */}

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
  addingPlayer: (name) => dispatch(addPlayerThunkCreator(name))
})

export const Setup = connect(mapStateToProps, mapDispatchToProps)(DisconnectedSetup)
