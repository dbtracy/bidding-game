const Sequelize = require('sequelize')
const db = require('./database')

const Player = db.define('players', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 0

  }
})


module.exports = { Player, db }























// const Campus = db.define('campuses', {
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true
//     }
//   },
//   address: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true
//     }
//   },
//   description: {
//     type: Sequelize.TEXT
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     defaultValue: 'http://1.bp.blogspot.com/-W5PyIEnoffU/Tbqd_WUsH0I/AAAAAAAAAOI/J5toiro9oT4/s1600/BE068110.jpg'
//   }
// });
