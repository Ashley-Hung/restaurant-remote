/* Require package used in the project */
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000

/* require express-handlebars */
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

/* Route setting */
app.get('/', (req, res) => {
  res.render('index')
})

/* setting static files */
app.use(express.static('public'))

/* Start and Listen on the server */
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
