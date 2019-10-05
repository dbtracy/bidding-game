const router = require('express').Router()

const Player = require('../../db/index')

router.get('/', async (req, res, next) => {
  try {
    const players = await Player.findAll()
    if (players) {
      res.json(players)
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const player = await Player.findOne({
      where: {
        id: req.params.id
      }
    })
    if (player) {
      res.json(player)
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
  }
})