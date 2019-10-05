const Sequelize = require('sequelize')
const pkg = require('../../package.json')
const chalk = require('chalk')

console.log(chalk.yellow('Opening database connection...'))

const db = new Sequelize(`postgres://localhost:5432/${pkg.name}`, { logging: false })

module.exports = db
