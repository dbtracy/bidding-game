const { db } = require('./server/db')
const chalk = require('chalk')
const red = chalk.red

const { Player } = require('./server/db/index')

const seedPlayers = [
  {
    name: 'Jon Tracy',
    points: 0
  },
  {
    name: 'Joel Tracy',
    points: 0
  },
  {
    name: 'Grandpa Tracy',
    points: 0
  },
  {
    name: 'Joy Tracy',
    points: 0
  },
  {
    name: 'Jane Tracy',
    points: 0
  },
  {
    name: 'Jim Tracy',
    points: 0
  }
]

const seed = async () => {
  console.log('Seeding the database...')
  await db.sync({ force: true })
  await Player.create(seedPlayers[0])
  await Player.create(seedPlayers[1])
  await Player.create(seedPlayers[2])
  await Player.create(seedPlayers[3])
  await Player.create(seedPlayers[4])
  await db.close()
  console.log('Seeding success!!!')
}

seed()
  .catch(err => {
    console.error(red('Oh noes! Something went wrong!'))
    console.error(err)
    db.close()
  })
