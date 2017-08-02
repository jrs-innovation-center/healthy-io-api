require('dotenv').config()
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
const HTTPError = require('node-http-error')
const db = new PouchDB(process.env.COUCHDB_URL + process.env.COUCHDB_NAME)
const pkGenerator = require('./build-pk')

function create(doc, callback) {
  db.put(doc, function(err, doc) {
    if (err) callback(err)
    callback(null, doc)
  })
}

function read(id, callback) {
  db.get(id, function(err, doc) {
    if (err) callback(err)
    callback(null, doc)
  })
}

function update(doc, callback) {
  db.put(doc, function(err, doc) {
    if (err) callback(err)
    callback(null, doc)
  })
}

function deleteDoc(id, callback) {
  db
    .get(id)
    .then(function(doc) {
      return db.remove(doc)
    })
    .then(function(result) {
      callback(null, result)
    })
    .catch(function(err) {
      callback(err)
    })
}

const findDocs = (query, callback) =>
  query
    ? db.find(query).then(res => callback(null, res.docs)).catch(err => callback(err))
    : callback(null, [])



const dalHelper = {
  create,
  read,
  update,
  deleteDoc,
  findDocs
}

module.exports = dalHelper
