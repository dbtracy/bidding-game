'use strict'

const { db } = require('./server/db')
const app = require('./server')
const PORT = 1103

db.sync()
  .then(() => {
    console.log('db synced!')
    app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`))
  })
