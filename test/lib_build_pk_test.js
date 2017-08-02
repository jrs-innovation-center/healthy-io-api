require('dotenv').config()
const uuid = require('uuid')
const { take } = require('ramda')
const test = require('tape')
const pkGenerator = require('../lib/build-pk')

test('generate id', t => {
  t.plan(1)
  t.equals(take(7, pkGenerator(
      "profile_",
      `Tom Wilson ${uuid.v4()}`
    )
  ),
           
  'profile'
  )
})