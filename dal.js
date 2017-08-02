const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
const dalHelper = require('./lib/dal-helper')
const pkGenerator = require('./lib/build-pk')

const dal = {
  // createProfile,
  // readProfile,
  // updateProfile,
  // deleteProfile,
  // listProfile,
  //
  // createProfileMed,
  // readProfileMed,
  // updateProfileMed,
  // deleteProfileMed,
  // listProfileMeds,
  //
  // createUser,
  // readUser,
  // updateUser,
  // deleteUser,
  // listUsers
}

module.exports = dal
