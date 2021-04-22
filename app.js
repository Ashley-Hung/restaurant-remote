/* Require package used in the project */
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const port = 3000

/* Require express-handlebars */
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

/* Route setting */
// home page
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// show page
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(
    restaurant => restaurant.id === Number(req.params.restaurant_id)
  )

  res.render('show', { restaurant })
})

/* Setting static files */
app.use(express.static('public'))

/* Start and Listen on the server */
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
