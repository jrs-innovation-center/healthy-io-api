require('dotenv').config()

const express = require('express')
const app = express()
const dal = require('./dal')
const port = process.env.PORT || 5000
const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const { pathOr, keys } = require('ramda')
const checkRequiredFields = require('./lib/check-required-fields')

const profileReqFieldCheck = checkRequiredFields([
  'firstName',
  'lastName',
  'dob',
  'gender'
])

const medReqFieldCheck = checkRequiredFields([
  'profileID',
  'medicationName',
  'dosage',
  'frequency'
])

const userReqFieldCheck = checkRequiredFields([
  'firstName',
  'lastName',
  'primaryPhone',
  'primaryEmail'
])

app.use(bodyParser.json())

app.get('/', function(req, res, next) {
  res.send('Welcome to the Healthy IO API.')
})

///////////////////////////////////////////////
//                                           //
//                PROFILES                   //
//                                           //
///////////////////////////////////////////////
///////////////////////////////////////
/////////  CREATE A PROFILE ///////////
///////////////////////////////////////
app.post('/profiles', (req, res, next) => {
  res.status(200).send('Coming soon!')
})

///////////////////////////////////////
/////////  READ A PROFILE  ////////////
///////////////////////////////////////
app.get('/profiles/:id', (req, res, next) =>
  res.status(200).send('Coming soon!')
)

/////////////////////////////////////////
/////////  UDPATE A PROFILE  ////////////
/////////////////////////////////////////
app.put('/profiles/:id', (req, res, next) => {
  res.status(200).send('Coming soon!')
})

/////////////////////////////////////////
/////////  DELETE A PROFILE  ////////////
/////////////////////////////////////////
app.delete('/profiles/:id', (req, res, next) =>
  res.status(200).send('Coming soon!')
)

/////////////////////////////////////////
/////////  LIST PROFILES  ///////////////
/////////////////////////////////////////
app.get('/profiles', (req, res, next) => {
  const limit = Number(pathOr(5, ['query', 'limit'], req))
  const filter = pathOr(null, ['query', 'filter'], req)
  const lastItem = pathOr(null, ['query', 'lastItem'], req)

  res.status(200).send('Coming soon!')
})

///////////////////////////////////////////////
//                                           //
//                  MEDS                     //
//                                           //
///////////////////////////////////////////////
///////////////////////////////////////
/////////  CREATE A MED ///////////////
///////////////////////////////////////
app.post('/profiles/:id/medications', (req, res, next) => {
  res.status(200).send('Coming soon!')
})

///////////////////////////////////////
/////////  READ A MED  ////////////////
///////////////////////////////////////
app.get('/profiles/:id/medications/:medId', (req, res, next) =>
  res.status(200).send('Coming soon!')
)

/////////////////////////////////////////
/////////  UDPATE A MED  ////////////////
/////////////////////////////////////////
app.put('/profiles/:id/medications/:medId', (req, res, next) => {
  res.status(200).send('Coming soon!')
})

/////////////////////////////////////////
/////////  DELETE A MED  ////////////////
/////////////////////////////////////////
app.delete('/profiles/:id/medications/:medId', (req, res, next) =>
  res.status(200).send('Coming soon!')
)

/////////////////////////////////////////
/////////  LIST MEDS  ///////////////////
/////////////////////////////////////////
app.get('/profiles/:id/medications', (req, res, next) => {
  //  filter and pagination not supported
  const limit = Number(pathOr(5, ['query', 'limit'], req))
  res.status(200).send('Coming soon!')
})

///////////////////////////////////////////////
//                                           //
//                  USERS                    //
//                                           //
///////////////////////////////////////////////
///////////////////////////////////////
/////////  CREATE A USER //////////////
///////////////////////////////////////
app.post('/users', (req, res, next) => {
  res.status(200).send('Coming soon!')
})

///////////////////////////////////////
/////////  READ A USER  ////////////////
///////////////////////////////////////
app.get('/users/:id', (req, res, next) => res.status(200).send('Coming soon!'))

/////////////////////////////////////////
/////////  UDPATE A USER  ////////////////
/////////////////////////////////////////
app.put('/users/:id', (req, res, next) => {
  res.status(200).send('Coming soon!')
})

/////////////////////////////////////////
/////////  DELETE A USER  ////////////////
/////////////////////////////////////////
app.delete('/users/:id', (req, res, next) =>
  res.status(200).send('Coming soon!')
)

/////////////////////////////////////////
/////////  LIST USER  ///////////////////
/////////////////////////////////////////
app.get('/users', (req, res, next) => {
  //  filter and pagination not supported
  const limit = Number(pathOr(5, ['query', 'limit'], req))
  res.status(200).send('Coming soon!')
})

app.use((err, req, res, next) => {
  console.log(req.method, ' ', req.path, ' ', 'error: ', err)
  res.status(err.status || 500)
  res.send(err)
})

app.listen(port, () => console.log('API is up on', port))

/////////////////////////////////////////
/////////      HELPERS       ////////////
/////////////////////////////////////////
const callback = (res, next) => (err, result) =>
  err
    ? next(new HTTPError(err.status, err.message, err))
    : res.status(200).send(result)
