require('dotenv').config()
const PouchDB = require('pouchdb')
const db = new PouchDB(process.env.COUCHDB_URL + process.env.COUCHDB_NAME)

db
  .bulkDocs([{
  _id: "profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol",
  firstName: "Marvin",
  type: "profile",
  lastName: "Gardens",
  dob: "1980-01-17",
  gender: "M",
  contacts: [
    {
      firstName: "Judy",
      lastName: "Gardens",
      primaryPhone: "843 222 1212",
      primaryEmail: "jg1000@hotmail.com"
    }
  ]

},
 {
  _id: "profile_steve_martin_334345dsfdsrwer23sdfs",
  firstName: "Steve",
  type: "profile",
  lastName: "Martin",
  dob: "1958-01-30",
  gender: "M",
  contacts: [
    {
      firstName: "Minerva",
      lastName: "Martin",
      primaryPhone: "843 555 1212",
      primaryEmail: "minerv@gmail.com"
    }
  ]
},
{
  _id: "profile_zep_martin_32423wewdsfd00d9ekdld",
  type: "profile",
  firstName: "Zep",
  lastName: "Gardens",
  dob: "1992-01-17",
  gender: "M",
  photo: "",
  contacts: [
    {
      firstName: "Jody",
      lastName: "Bevins",
      primaryPhone: "843 222 1212",
      primaryEmail: "jg1000@hotmail.com"
    },
    {
      firstName: "Joe",
      lastName: "Gardens",
      primaryPhone: "843 222 3344",
      primaryEmail: "jg9000@gmail.com"
    }
  ]

},
{
  _id: "test_marvin_gardens",
  type: "test",
  firstName: "Marvin",
  lastName: "Gardens"
}
])
  .then(function(result) {
    console.log('Attempting to load data. Inspect each result item below: ')
    console.log(JSON.stringify(result, null, 2))
  })
  .catch(function(err) {
    console.log(err)
  })
