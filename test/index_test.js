require('dotenv').config()
const test = require('tape')
const fetch = require('isomorphic-fetch')

const url = process.env.URL

test('GET /', t => {
  fetch(url)
    .then(res => res.text())
    .then(txt => {
      t.equals(txt, 'Welcome to the Healthy IO API. The Fried Chicken of APIS')
      t.end()
    })
  
})

