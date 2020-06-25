import React, { Component } from 'react'
import axios from 'axios'

import { GamePlay } from '../GamePlay/GamePlay'
import { Setup } from '../Setup/Setup'
import { Scoring } from '../Scoring/Scoring'
import { NoScore } from '../NoScore/NoScore'
import { emptyDummyGame, dummyGame } from '../Scoring/dummyGame'

export class Frame extends Component {
  constructor() {
    super()
    this.state = {
      players: [],
      game: {},
      maxRound: 10,
      currRound: 1,
      tricksTaken: 0,
      active: '',
      dealer: '',
      squaredRule: false
    }
    this.showSetup = this.showSetup.bind(this)
    this.showGamePlay = this.showGamePlay.bind(this)
    this.showScoring = this.showScoring.bind(this)
    this.addPlayer = this.addPlayer.bind(this)
    this.deletePlayer = this.deletePlayer.bind(this)
    this.createGame = this.createGame.bind(this)
    this.setDealer = this.setDealer.bind(this)
    this.setMaxRound = this.setMaxRound.bind(this)
    this.setSquaredRule = this.setSquaredRule.bind(this)
    this.setTricksAvailable = this.setTricksAvailable.bind(this)
    this.submitRound = this.submitRound.bind(this)
  }
  showSetup() {
    this.setState({ active: 'Setup' })
  }
  showGamePlay() {
    this.setState({ active: 'GamePlay' })
  }
  showScoring() {
    this.setState({ active: 'Scoring' })
  }
  async addPlayer(event) {
    event.preventDefault()
    event.persist()
    try {
      const { data } = await axios.post('/api/players', { name: event.target.name.value })
      this.setState({ players: [...this.state.players, data] })
    } catch (error) {
      console.log(error)
    }
    event.target.name.value = ''
    let numPlayers = this.state.players.length
    let max = numPlayers <= 5 ? 10 : (52 - (52 % numPlayers)) / numPlayers
    this.setState({ maxRound: max })
  }
  async deletePlayer(id) {
    try {
      const { data } = await axios.delete(`/api/players/${id}`)
      this.setState({ players: this.state.players.filter(player => { return player.id !== id }) })
    } catch (error) {
      console.log(error)
    }
    let numPlayers = this.state.players.length
    let max = numPlayers <= 5 ? 10 : (52 - (52 % numPlayers)) / numPlayers
    this.setState({ maxRound: max })
  }
  createGame() {
    for (let round in emptyDummyGame) delete emptyDummyGame[round]
    let numPlayers = this.state.players.length
    if (numPlayers < 2) return
    let max = Number(this.state.maxRound)
    let numRounds = max * 2 + numPlayers - 2
    for (let i = 1; i <= numRounds; i++) {
      let numCards
      if (i < max) numCards = max + 1 - i
      else if (i > max - 1 + numPlayers) numCards = i - (max + numPlayers - 2)
      else numCards = 1
      emptyDummyGame[`${i}`] = {
        round: i,
        cards: numCards
      }
    }
    emptyDummyGame['1']['dealer'] = this.state.dealer.length ? this.state.dealer : this.state.players[0].name
    this.setState({ game: emptyDummyGame })
    this.showGamePlay()
  }
  setDealer(event, name) {
    event.preventDefault()
    if (this.state.players.find(player => player.name === name)) {
      console.log('dealer set!')
      this.setState({ dealer: name })
    } else {
      console.log('player does not exist, dealer not set')
      //add error text below
    }
  }
  setMaxRound(event, num) {
    event.preventDefault()
    let error = document.getElementsByClassName('max-round-error')
    if (num <= parseInt(51 / this.state.players.length)) {
      error[0].style.display = 'none'
      this.setState({ maxRound: num })
    } else {
      error[0].style.display = 'block'
    }
  }
  setSquaredRule(event) {
    this.setState({ squaredRule: event.target.checked })
  }
  setTricksAvailable(event) {
    const bids = Array.from(document.getElementsByClassName('bids'))
    let sum = 0
    bids.forEach(bid => sum += Number(bid.value))
    this.setState({ tricksTaken: sum })
  }
  submitRound() {
    let currRound = this.state.currRound
    let game = this.state.game
    if (!!game['1']) {
      const bidsArr = Array.from(document.getElementsByClassName('player-and-bids'))
      let round = game[currRound]
      if (round) {
        bidsArr.forEach((bid, idx) => {
          let rNum = `p${idx + 1}`
          round[rNum] = {
            points: 0,
            success: false
          }
          if (bid.childNodes[2].checked) {
            round[rNum]['points'] = this.state.squaredRule ? 10 + (Number(bid.childNodes[1].value) ** 2 || 0) : 10 + (Number(bid.childNodes[1].value) || 0)
            round[rNum]['success'] = true
          }
          const player = this.state.players.find(player => player.name === bid.childNodes[0].innerText)
          const playerPoints = player.points
          const updatedPoints = round[rNum]['points'] + playerPoints
          round[rNum]['total'] = updatedPoints
          player.points = updatedPoints
        })
        if (!game[currRound]) {
          console.log('game over!')
        } else {
          const bids = Array.from(document.getElementsByClassName('bids'))
          bids.forEach(bid => bid.selectedIndex = 0)
          this.setState({
            currRound: currRound + 1,
            tricksTaken: 0
          })
        }
      }

    }
  }
  async componentDidMount() {
    try {
      const { data } = await axios.get('/api/players')
      this.setState({ players: data })
    } catch (error) {
      console.log(error)
    }
    let numPlayers = this.state.players.length
    let max = numPlayers <= 5 ? 10 : (52 - (52 % numPlayers)) / numPlayers
    this.setState({ maxRound: max, active: 'Setup' })
  }
  render() {
    const { active, game, players, maxRound, currRound, squaredRule } = this.state
    return (
      <div className="frame">
        <div className="frame-top">
          <h1 className="frame-title">The Bidding Game!!1!</h1>
          <div className="navbar">
            <button className="navbar-btn" type="button" onClick={this.showSetup}>Setup</button>
            <button className="navbar-btn" type="button" onClick={this.showGamePlay}>Game</button>
            <button className="navbar-btn" type="button" onClick={this.showScoring}>Scores</button>
          </div>
        </div>

        {active === 'Setup' ? (
          <div>
            <div className="page-title">
              <h1>Setup</h1>
              <hr />
            </div>
            <Setup
              players={players}
              game={game}
              maxRound={maxRound}
              addPlayer={this.addPlayer}
              deletePlayer={this.deletePlayer}
              createGame={this.createGame}
              setDealer={this.setDealer}
              setMaxRound={this.setMaxRound}
              squaredRule={squaredRule}
              setSquaredRule={this.setSquaredRule}
            />
          </div>
        ) : active === 'GamePlay' ? (
          <div>
            <div className="page-title">
              <h1>Game Play</h1>
              <hr />
            </div>
            <GamePlay
              players={players}
              game={game}
              currRound={currRound}
              tricksTaken={this.state.tricksTaken}
              setTricksAvailable={this.setTricksAvailable}
              submitRound={this.submitRound} />
          </div>
        ) : active === 'Scoring' && game['1'] && game['1']['p1'] ? (
          <div>
            <div className="page-title">
              <h1>Scoring</h1>
              <hr />
            </div>
            <Scoring players={players} game={game} currRound={currRound} />
          </div>
        ) : active === 'Scoring' ? (
          <div>
            <div className="page-title">
              <h1>Scoring</h1>
              <hr />
            </div>
            <NoScore />
          </div>
        ) : null}
      </div>
    )
  }
}
