const PouchDB = require("pouchdb")
PouchDB.plugin(require("pouchdb-find"))
const dalHelper = require("./lib/dal-helper")
const pkGenerator = require("./lib/build-pk")
const { prop, assoc, head, last, split } = require("ramda")
const uuid = require("uuid")

const createProfile = (profile, callback) => {
  // _id: profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol
  const id = pkGenerator(
    "profile_",
    `${prop("firstName", profile)} ${prop("lastName", profile)} ${uuid.v4()}`
  )

  profile = assoc("_id", id, profile)

  console.log("profile", profile)
  profile = assoc("type", "profile", profile)
  dalHelper.create(profile, callback)
}

const readProfile = (id, callback) => dalHelper.read(id, callback)

const updateProfile = (profile, callback) => dalHelper.update(profile, callback)

const deleteProfile = (id, callback) => dalHelper.deleteDoc(id, callback)


/*{
  selector: {
    type: 'profile'
  }, limit: 5:
}*/
const listProfiles = (limit,filter,lastItem,callback) => {
  let query = {}
  
  if (filter) {
    
    // filter MODE
   // "lastName:Smith" 
    const arrayFilter = split(':',filter)
    const filterField = head(arrayFilter)
    const filterValue = last(arrayFilter)
    
    const selectorValue = {}
    selectorValue[filterField] = filterValue
    selectorValue.type = "profile"
    //selectorValue = {lastName: 'Smith', type: 'profile'}
    
    query = {selector: selectorValue, limit}
  } else if (lastItem) {
      query = {selector: {_id: {$gt: lastItem}, type: 'profile'}, limit}
    
  } else {
    query = {selector: {_id: {$gt: null}, type: 'profile'}, limit}
    
  }
  
  console.log("query: ", query)
  dalHelper.findDocs(query, callback)
}


const createProfileMed = (med, callback) => {
  // _id: profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol
  const id = pkGenerator(
    "medication_",
    `${prop("medicationName", med)} ${uuid.v4()}`
  )

  med = assoc("_id", id, med)

  console.log("med", med)
  med = assoc("type", "profile medication", med)
  dalHelper.create(med, callback)
}

const readProfileMed = (id, callback) => dalHelper.read(id, callback)

const updateProfileMed = (med, callback) => dalHelper.update(med, callback)

const deleteProfileMed = (id, callback) => dalHelper.deleteDoc(id, callback)

const dal = {
  createProfile,
  readProfile,
  updateProfile,
  deleteProfile,
  listProfiles,
  createProfileMed,
  readProfileMed,
  updateProfileMed,
  deleteProfileMed
  // listProfileMeds,
  //
  // createUser,
  // readUser,
  // updateUser,
  // deleteUser,
  // listUsers
}

module.exports = dal
