const router = require('express').Router()

router.use('players', require('./routes/players'))

router.use((req, res, next) => {
  const err = new Error('API not found!')
  err.status = 404
  next(err)
})

module.exports = router
