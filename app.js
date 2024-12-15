const express = require('express')
const colors = require('ansi-colors')
const app = express()
const port = 3025

// middleware
app.use(express.static('public'))
app.use(express.json())

// routes
//app.use('/events/:eventid', require('./routes/api/v1/foodtruck'))
app.use('/', require('./routes/pages/homepage'))
app.use('/api/v1', require('./routes/api/v1/foodtruck'))
//app.use('/admin', require('./routes/pages/admin'))

// server
const url = colors.blue('http://localhost:3025/')
const message = `Server is running on port ${port}. Visit ${url} in your browser.`
app.listen(port, () => console.log(message))


