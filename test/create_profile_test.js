require('dotenv').config()

const test = require('tape')
const fetch = require('isomorphic-fetch')

const url = process.env.URL

const { has } = require('ramda')

// var nock = require('nock');

// var couchdb = nock(process.env.COUCHDB_URL)
//   .put('/' + process.env.COUCHDB_NAME)
//   .reply(200, {
//     "_id": "profile_judy_gardenson_1e4a9277-5ea2-47a0-b390-de4409c8c13a",
//     "_rev": "1-3689aa6b035caac952d564351713303c",
//     "firstName": "Judy",
//     "lastName": "Gardenson",
//     "dob": "1988-01-22",
//     "gender": "F",
//     "contacts": [
//       {
//         "firstName": "Alexis",
//         "lastName": "Gardenson",
//         "primaryPhone": "843 222 2222",
//         "primaryEmail": "agson1000@hotmail.com"
//       }
//     ],
//     "type": "profile"
//   })

test('POST /profiles', t => {
  const doc = JSON.stringify({
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
    })
  console.log(doc)
  fetch(url + '/profiles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: doc
  })
  .then(res => res.json())
  .then(json => {
    t.ok(json.ok)
    t.ok(has('id', json))
    t.ok(has('rev', json))
    t.end()
  })
  .catch(err => console.log(err))
})