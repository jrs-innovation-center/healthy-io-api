require('dotenv').config()

const test = require('tape')

const dal = require('../dal')

test('dal.createProfile', t => {
  dal.createProfile({
      firstName: "Judy",
      lastName: "Gardenson",
      dob: "1988-01-22",
      gender: "F",
      contacts: [
        {
          firstName: "Alexis",
          lastName: "Gardenson",
          primaryPhone: "843 222 2222",
          primaryEmail: "agson1000@hotmail.com"
        }
      ]
    }, (err, res) => {
      if (err) { console.log(err) }
      console.log(res)
      t.end()
    })
})