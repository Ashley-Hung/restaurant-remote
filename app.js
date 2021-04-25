/* Require package used in the project */
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const { results: restaurantList } = require('./restaurant.json') // 解構賦值
const port = 3000

/* Require express-handlebars */
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

/* Setting static files */
app.use(express.static('public'))

/* Route setting */
// home page
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList })
})

//search page
app.get('/search', (req, res) => {
  const { keyword } = req.query
  const trimmedKeyword = keyword.trim().toLowerCase()
  // search by name or category
  const restaurants = restaurantList.filter(restaurant => {
    return (
      restaurant.name.toLowerCase().includes(trimmedKeyword) ||
      restaurant.name_en.toLowerCase().includes(trimmedKeyword) ||
      restaurant.category.toLowerCase().includes(trimmedKeyword)
    )
  })

  res.render('index', { restaurants, keyword })
})

// show page
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.find(
    restaurant => restaurant.id === Number(req.params.restaurant_id)
  )

  res.render('show', { restaurant })
})

/* Start and Listen on the server */
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
