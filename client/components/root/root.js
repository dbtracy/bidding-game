import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { getPlayersThunkCreator } from '../../reducers/players'

// import playersReducer from '../../reducers/players'
import './root.css'

class DisconnectedRoot extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   players: []
    // }
  }
  componentDidMount() {
    this.props.gettingPlayers()
  }
  render() {
    return (
      <div className="main-page-body">
        <div className="title">
          <h1>The Bidding Game</h1>
        </div>
        <div className="round-info">
          <div className="bid-tracker">
            <p>To bid --></p>
          </div>
          <div className="players">
            <p>PLAYERS:</p>
            {this.props.players.map(player => {
              return (
                <p key={player.id}>{player.name}</p>
              )
            })}
          </div>
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
