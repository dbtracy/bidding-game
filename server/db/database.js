const Sequelize = require('sequelize')
const pkg = require('../../package.json')
const chalk = require('chalk')

console.log(chalk.yellow('Opening database connection...'))

const db = new Sequelize(`${pkg.name}`, 'postgres', 'postgres', { dialect: 'postgres', logging: false })

module.exports = db
