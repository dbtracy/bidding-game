const router = require('express').Router()

const { Player } = require('../../db/index')

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

router.post('/', async (req, res, next) => {
  try {
    const newPlayer = await Player.create({ name: req.body.name })
    res.json(newPlayer)
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedPlayer = await Player.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(deletedPlayer)
  } catch (error) {
    console.log(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    console.log('REQ.BODY:', req.body)
    const [, updatedPlayer] = await Player.update({
      points: req.body.points
    }, {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    })
    console.log('UPDATED PLAYER:', updatedPlayer)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
