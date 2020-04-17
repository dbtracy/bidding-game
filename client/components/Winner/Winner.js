import React, { Component } from 'react'

export function Winner(props) {
  const winner = props.players.sort((a, b) => b.points - a.points)[0]['name']
  return (
    <div className="card winner">
      <h1>{winner} wins!</h1>
    </div>
  )
}
