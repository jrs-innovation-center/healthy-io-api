require("dotenv").config()

const express = require("express")
const app = express()
const dal = require("./dal")
const port = process.env.PORT || 3000
const HTTPError = require("node-http-error")
const bodyParser = require("body-parser")
const { pathOr, keys, pick } = require("ramda")
const checkRequiredFields = require("./lib/check-required-fields")

const profileReqFieldCheck = checkRequiredFields([
  "firstName",
  "lastName",
  "dob",
  "gender"
])

const medReqFieldCheck = checkRequiredFields([
  "profileID",
  "medicationName",
  "dosage",
  "frequency"
])


const userReqFieldCheck = checkRequiredFields([
  "firstName",
  "lastName",
  "primaryPhone",
  "primaryEmail"
])

app.use(bodyParser.json())

app.get("/", function(req, res, next) {
  res.send("Welcome to the Healthy IO API. The Fried Chicken of APIS")
})

///////////////////////////////////////////////
//                                           //
//                PROFILES                   //
//                                           //
///////////////////////////////////////////////
///////////////////////////////////////
/////////  CREATE A PROFILE ///////////
///////////////////////////////////////
app.post("/profiles", (req, res, next) => {
  const body = pathOr({}, ["body"], req)
  const reqFieldsCheckResults = profileReqFieldCheck(body)

  console.log("reqFieldsCheckResults", reqFieldsCheckResults)

  pathOr(0, ["length"], reqFieldsCheckResults) > 0
    ? next(
        new HTTPError(400, "Bad request.  Missing required field", {
          missingFields: reqFieldsCheckResults
        })
      )
    : dal.createProfile(
        pick(["firstName", "lastName", "dob", "gender", "contacts"], body),
        (err, result) => {
          if (err) next(new HTTPError(err.status, err.message, err))
          console.log("POST /profiles result", result)
          res.status(201).send(result)
        }
      )
})

///////////////////////////////////////
/////////  READ A PROFILE  ////////////
///////////////////////////////////////
app.get("/profiles/:id", (req, res, next) => {
  const id = req.params.id

  dal.readProfile(id, (err, result) => {
    if (err) next(new HTTPError(err.status, err.message, err))
    console.log("GET /profiles/:id result", result)
    res.status(200).send(result)
  })
})

/////////////////////////////////////////
/////////  UPDATE A PROFILE  ////////////
/////////////////////////////////////////
app.put("/profiles/:id", (req, res, next) => {
  const body = pathOr({}, ["body"], req)

  const checkUpdateFields = checkRequiredFields([
    "_id",
    "_rev",
    "type",
    "firstName",
    "lastName",
    "dob",
    "gender"
  ])

  const checkResults = checkUpdateFields(body)

  console.log("checkResults", checkResults)

  if (pathOr(0, ["length"], checkResults) > 0) {
    next(
      new HTTPError(400, "Bad request.  Missing required fields", {
        missingFields: checkResults
      })
    )
  }

  // check the id in the path against the id in the body
  if (body["_id"] != req.params.id) {
    next(
      new HTTPError(
        400,
        "Bad request. Profile id in path must match the profile id in the request body."
      )
    )
  }

  if (body["type"] != "profile") {
    next(new HTTPError(400, "Bad request. Type must be equal to 'profile'."))
  }

  dal.updateProfile(
    pick(
      [
        "_id",
        "_rev",
        "type",
        "firstName",
        "lastName",
        "dob",
        "gender",
        "contacts"
      ],
      body
    ),
    (err, result) => {
      if (err) next(new HTTPError(err.status, err.message, err))
      console.log("PUT /profiles/:id result", result)
      res.status(200).send(result)
    }
  )
})

/////////////////////////////////////////
/////////  DELETE A PROFILE  ////////////
/////////////////////////////////////////
app.delete("/profiles/:id", (req, res, next) => {
  const id = req.params.id
  dal.deleteProfile(id, (err, result) => {
    if (err) next(new HTTPError(err.status, err.message, err))
    console.log("DELETE /profiles/:id result", result)
    res.status(200).send(result)
  })
})

/////////////////////////////////////////
/////////  LIST PROFILES  ///////////////
/////////////////////////////////////////
app.get("/profiles", (req, res, next) => {
  const limit = Number(pathOr(5, ["query", "limit"], req))
  const filter = pathOr(null, ["query", "filter"], req)
  const lastItem = pathOr(null, ["query", "lastItem"], req)

  // (limit,filter,lastItem,callback) 
  dal.listProfiles(limit,filter,lastItem, (err, result) => {
    if (err) next(new HTTPError(err.status, err.message, err))
    console.log("GET /profiles result", result)
    res.status(200).send(result)
  })
  
})

///////////////////////////////////////////////
//                                           //
//                  MEDS                     //
//                                           //
///////////////////////////////////////////////
///////////////////////////////////////
/////////  CREATE A MED ///////////////
///////////////////////////////////////


app.post("/profiles/:id/medications", (req, res, next) => {
  /*
  {
  type: "profile medication",
  profileID: "profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol",
  medicationName: "Xanax 1 mg tablet",
  dosage: "2",
  frequency: "twice daily",
  instructions: "Take with food."
}
  */
  
  
  const body = pathOr({}, ["body"], req)
  const id = req.params.id
  const reqFieldsCheckResults = medReqFieldCheck(body)

  console.log("reqFieldsCheckResults", reqFieldsCheckResults)
  
  if (id != body.profileID) {
       next(
        new HTTPError(400, "Bad request.  profile id within path must match profile id in the request body.")
      )}

  pathOr(0, ["length"], reqFieldsCheckResults) > 0
    ? next(
        new HTTPError(400, "Bad request.  Missing required field", {
          missingFields: reqFieldsCheckResults
        })
      )
    : dal.createProfileMed(
        pick(["profileID", "medicationName", "dosage", "frequency", "instructions"], body),
        (err, result) => {
          if (err) next(new HTTPError(err.status, err.message, err))
          console.log("POST /profiles result", result)
          res.status(201).send(result)
        }
      )
})

///////////////////////////////////////
/////////  READ A MED  ////////////////
///////////////////////////////////////
app.get("/profiles/:id/medications/:medId", (req, res, next) => { 
  const medId = req.params.medId
  
    dal.readProfileMed(medId, (err, result) => {
    if (err) next(new HTTPError(err.status, err.message, err))
    console.log("GET /profiles/:id/medications/:medId", result)
    res.status(200).send(result)
  })
})
  



/////////////////////////////////////////
/////////  UPDATE A MED  ////////////////
/////////////////////////////////////////
app.put("/profiles/:id/medications/:medId", (req, res, next) => {
  const body = pathOr({}, ["body"], req)
  const id = req.params.id
  const medId = req.params.medId
  
  const checkUpdateFields = checkRequiredFields([
    "_id",
    "_rev",
    "type",
    "profileID", 
    "medicationName", 
    "dosage",
    "frequency"
  ])

const checkResult = checkUpdateFields(body)

if (checkResult.length > 0) {
  next(new HTTPError(400, "Missing required fields", { missingFields: checkResult }))
}
    
if (id != body.profileID) {
  next(new HTTPError(400, "Bad request, profile id within path must match profile id in request body."))
}
  
if (medId != body._id) {
  next(new HTTPError(400, "Bad request, med id within path must match med id in request body."))
}
  
const newBody = pick([
    "_id",
    "_rev",
    "type",
    "profileID", 
    "medicationName", 
    "dosage",
    "frequency", 
    "instructions"
  ], body)

dal.updateProfileMed(newBody, (err, result) => {
  if (err) next(new HTTPError(err.status, err.message, err))
  res.status(200).send(result)
})
  
})

/////////////////////////////////////////
/////////  DELETE A MED  ////////////////
/////////////////////////////////////////
app.delete("/profiles/:id/medications/:medId", (req, res, next) => {
  const medId = req.params.medId
  dal.deleteProfileMed(medId, (err, result) => {
    if (err) next(new HTTPError(err.status, err.message, err))
    console.log("DELETE /profiles/:id/medications/:medId result", result)
    res.status(200).send(result)
  })
})
           

/////////////////////////////////////////
/////////  LIST MEDS  ///////////////////
/////////////////////////////////////////
app.get("/profiles/:id/medications", (req, res, next) => {
  //  filter and pagination not supported
  const limit = Number(pathOr(5, ["query", "limit"], req))
  res.status(200).send("Coming soon!")
})

///////////////////////////////////////////////
//                                           //
//                  USERS                    //
//                                           //
///////////////////////////////////////////////
///////////////////////////////////////
/////////  CREATE A USER //////////////
///////////////////////////////////////
app.post("/users", (req, res, next) => {
  res.status(200).send("Coming soon!")
})

///////////////////////////////////////
/////////  READ A USER  ////////////////
///////////////////////////////////////
app.get("/users/:id", (req, res, next) => res.status(200).send("Coming soon!"))

/////////////////////////////////////////
/////////  UDPATE A USER  ////////////////
/////////////////////////////////////////
app.put("/users/:id", (req, res, next) => {
  res.status(200).send("Coming soon!")
})

/////////////////////////////////////////
/////////  DELETE A USER  ////////////////
/////////////////////////////////////////
app.delete("/users/:id", (req, res, next) =>
  res.status(200).send("Coming soon!")
)

/////////////////////////////////////////
/////////  LIST USER  ///////////////////
/////////////////////////////////////////
app.get("/users", (req, res, next) => {
  //  filter and pagination not supported
  const limit = Number(pathOr(5, ["query", "limit"], req))
  res.status(200).send("Coming soon!")
})

app.use((err, req, res, next) => {
  console.log(req.method, " ", req.path, " ", "error: ", err)
  res.status(err.status || 500)
  res.send(err)
})

app.listen(port, () => console.log("API is up on", port))

/////////////////////////////////////////
/////////      HELPERS       ////////////
/////////////////////////////////////////
const callback = (res, next) => (err, result) =>
  err
    ? next(new HTTPError(err.status, err.message, err))
    : res.status(200).send(result)
