import React, { Component } from 'react'

export function Winner(props) {
  console.log(props)
  const winner = props.players.sort((a, b) => b.points - a.points)
  console.log(winner)
  return (
    <div className="card winner">
      <h1>{winner[0]['name']} wins!</h1>
    </div>
  )
}
