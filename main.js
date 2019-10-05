const app = require('./server')
const PORT = 1103

db.sync()
  .then(() => {
    app.listen(PORT => console.log(`Server running on port ${PORT}`))
  })
