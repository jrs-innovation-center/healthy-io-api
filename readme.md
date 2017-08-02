
# Healthy IO API

## TLDR

The Healthy IO API enables the developer with the ability to manage patient profile, medications, and users.  Search through lists of profiles and medications. Create and manage a patient profile including contacts and medications.

- `/profiles` - used to manage patient profiles and their related contacts.
- `/users` - manages users within the application.
- `/medications` - relate a patient with their medications.

## Patient Profile

### Create a patient profile

`POST /profiles`  - Creates a new patient profile by including patient biographical information such as name, gender, date of birth, and optionally their photo.  The profile can also contain a list of contacts for the patient. After the profile is created, manage a patient's medications through the `/medications` endpoint.

**POST /profiles example**

Below is an example of a HTTP request to add a patient profile containing 1 contact.  The request body contains the representation of the profile.

```
POST /profiles


{
  firstName: "Marvin",
  lastName: "Gardens",
  dob: "1980-01-17",
  gender: "M",
  photo: "data:image/png;base64,iVBORw0KGgoAAAA...",
  contacts: [
    {
      firstName: "Judy",
      lastName: "Gardens",
      primaryPhone: "843 222 1212",
      primaryEmail: "jg1000@hotmail.com"
    }
  ]

}

```

### Retrieve a single patient profile

`GET /profiles/{id}` - Retrieves information for a single patient profile, including contact information. To retrieve patient medication information, a separate call to `GET /profiles/{id}/medications` is required.

**GET /profiles/{id} example**

Here is an example of an HTTP request to retrieve a single patient profile and an example of a response:

```
GET /profiles/profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol

{
  _id: "profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol",
  _rev: "3986732ladhjslfjkhqlkjh",
  type: "profile",
  firstName: "Marvin",
  lastName: "Gardens",
  dob: "1980-01-17",
  gender: "M",
  photo: "data:image/png;base64,iVBORw0KGgoAAAA...",
  contacts: [
    {
      firstName: "Judy",
      lastName: "Gardens",
      primaryPhone: "843 222 1212",
      primaryEmail: "jg1000@hotmail.com"
    }
  ]

}

```

### Update a patient profile

`PUT /profiles/{id}` - This endpoint allows you to update information for a single patient profile, like contact information.

**PUT /profiles/{id} example**

Here is an example of an HTTP request to update a single patient profile:

> You will need the most up-to-date `_rev` in order to fulfill this request. Failure to provide this key information will result in a `409 - Conflict` HTTP error response code.

```
PUT /profiles/profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol

{
  _id: "profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol",
  _rev: "3986732ladhjslfjkhqlkjh",
  type: "profile",
  firstName: "Marvin",
  lastName: "Gardens",
  dob: "1980-01-17",
  gender: "M",
  photo: "data:image/png;base64,iVBORw0KGgoAAAA...",
  contacts: [
    {
      firstName: "Judy",
      lastName: "Gardens",
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

}
```

**Successful response example**

```
{
  ok: true,
  id: profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol,
  rev: "3986732ladhjslfjkhqlkjh"
}
```

### Delete a patient profile

`DELETE /profiles/{id}` - Deletes a single patient profile and all data associated with that profile.

**DELETE /profiles/{id} example**

Here is an example of an HTTP request to delete a single patient profile:

```
DELETE /profiles/profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol
```

**Successful response example**

```
{
  ok: true,
  id: profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol,
  rev: "3986732ladhjslfjkhqlkjh"
}
```

### List / Search / Paginate

`GET /profiles` - Retrieves a list of profiles, including contact information.

**Simple GET /profiles example**

Here is a simple `GET /profiles` example.  By not providing an optional `limit` query parameter, the api will return 5 profiles ordered by the id (firstName, lastName.

```
GET /profiles
[
{
  _id: "profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol",
  _rev: "3986732ladhjslfjkhqlkjh",
  type: "profile",
  firstName: "Marvin",
  lastName: "Gardens",
  dob: "1980-01-17",
  gender: "M",
  photo: "data:image/png;base64,iVBORw0KGgoAAAA...",
  contacts: [
    {
      firstName: "Judy",
      lastName: "Gardens",
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
  _id: "profile_zep_gardens_56wd402341ls",
  _rev: "awerjo14432",
  type: "profile",
  firstName: "Zep",
  lastName: "Gardens",
  dob: "1992-01-17",
  gender: "M",
  photo: "data:image/png;base64,iVBORw0KGgoAAAA...",
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

... remaining data omitted for brevity ...

]

```

**Searching profiles with the `filter` query parameter**

Here is an example of a `GET /profiles` using the `filter` query parameter to conduct a search by first name.

```
GET /profiles?filter=firstName:Zep

[
  {
    _id: "profile_zep_gardens_56wd402341ls",
    _rev: "awerjo14432",
    type: "profile",
    firstName: "Zep",
    lastName: "Gardens",
    dob: "1992-01-17",
    gender: "M",
    photo: "data:image/png;base64,iVBORw0KGgoAAAA...",
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
  }
]



```

**Paginate using the `lastItem` and `limit` query parameters**

Here is an example of retrieving the first page of profiles. Using a `GET \profiles` along with the `limit` query parameter set to the page size to a value of 3.


```
GET /profiles?limit=3

[
  {
    _id: "profile_angie_gardens_56wd402341zzz",
    _rev: "awerjo14432",
    type: "profile",
    firstName: "Angie",
    lastName: "Gardens",
    dob: "1992-01-17",
    gender: "M",
    photo: "data:image/png;base64,iVBORw0KGgoAAAA...",
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
    _id: "profile_beverly_gardens_56wd40234yyy",
    _rev: "awerjo14432",
    type: "profile",
    firstName: "Beverly",
    lastName: "Gardens",
    dob: "1992-01-17",
    gender: "M",
    photo: "data:image/png;base64,iVBORw0KGgoAAAA...",
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
    _id: "profile_cal_gardens_56wd402341ls",
    _rev: "awerjo14432",
    type: "profile",
    firstName: "Cal",
    lastName: "Gardens",
    dob: "1992-01-17",
    gender: "M",
    photo: "data:image/png;base64,iVBORw0KGgoAAAA...",
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
  }
]
```

To retrieve the next page of results, use the `lastItem` query parameter in conjunction with `limit`.

```
GET /profiles?limit=3&lastItem=profile_cal_gardens_56wd402341ls


[
  {
    _id: "profile_daniel_gardens_56wd402341zzz",
    _rev: "awerjo14432",
    type: "profile",
    firstName: "Daniel",
    lastName: "Gardens",
    dob: "1992-01-17",
    gender: "M",
    photo: "data:image/png;base64,iVBORw0KGgoAAAA...",
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
    _id: "profile_greg_gardens_56wd40234yyy",
    _rev: "awerjo14432",
    type: "profile",
    firstName: "Greg",
    lastName: "Gardens",
    dob: "1992-01-17",
    gender: "M",
    photo: "data:image/png;base64,iVBORw0KGgoAAAA...",
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
    _id: "profile_zep_gardens_56wd402341ls",
    _rev: "awerjo14432",
    type: "profile",
    firstName: "Zep",
    lastName: "Gardens",
    dob: "1992-01-17",
    gender: "M",
    photo: "data:image/png;base64,iVBORw0KGgoAAAA...",
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
  }
]

```

---

## Medications

### Create a patient profile medication

`POST /medications`  - Creates a new patient profile medication by including medication information such as name, dosage, form, frequency and optional special instructions.  

**POST /profiles/{id}/medications example**

Below is an example of a HTTP request to add a medication patient profile containing 1 contact.  The request body contains the representation of the medication for a given profile.

```
POST /profiles/profile_marvin_gardens_34wd323dk449rkd93/medications

{
  type: "profile medication",
  profileID: "profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol",
  medicationName: "Xanax 1 mg tablet",
  dosage: "2",
  frequency: "twice daily",
  instructions: "Take with food."
}
```

Example response


```
{
  ok: true,
  id: "medication_xanax_1_mg_tablet",
  rev: "1-fidfnei452"
}

```

### Retrieve a single patient profile medication

`GET /profiles/{id}/medications/{medicationId}` - Retrieves information for a single patient profile medication.

**GET /profiles/{id}/medications/{medicationId} example**

Here is an example of an HTTP request to retrieve a single patient profile medication and an example of a response:

```
GET /profiles/profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol/medications/medication_xanax_1_mg_tablet


{
  _id: "medication_xanax_1_mg_tablet",
  _rev: "1-dsafasdfwrew4rsdfsdf",
  type: "profile medication",
  profileID: "profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol",
  medicationName: "Xanax 1 mg tablet",
  dosage: "2",
  frequency: "twice daily",
  instructions: "Take with food."
}
```

### Update a patient profile medication

`PUT /profiles/{id}/medications/{medicationId} ` - This endpoint allows you to update information for a single patient profile medication fields, such as dosage, frequency, and instructions.

> The medication name field cannot be updated.

**PUT /profiles/{id}/medications/{medicationId}  example**

Here is an example of an HTTP request to update a single patient profile medication by increasing the dosage to 3:

> You will need the most up-to-date `_rev` in order to fulfill this request. Failure to provide this key information will result in a `409 - Conflict` HTTP error response code.

```
PUT /profiles/profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol/medications/medication_xanax_1_mg_tablet

{
  _id: "medication_xanax_1_mg_tablet",
  _rev: "asl123oao9",
  type: "profile medication",
  profileID: "profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol",
  medicationName: "Xanax 1 mg tablet",
  dosage: "3",
  frequency: "twice daily",
  instructions: "Take with food."
}
```

**Successful response example**

```
{
  ok: true,
  id:"medication_xanax_1_mg_tablet",
  rev: "2-asl123oao9"
}
```

### Delete a patient profile medication

`DELETE /profiles/{id}/medications/{medicationId}` - Deletes a single patient profile medication.

**DELETE /profiles/{id}/medications/{medicationId} example**

Here is an example of an HTTP request to delete a single patient profile medication:

```
DELETE /profiles/profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol/medications/medication_xanax_1_mg_tablet
```

**Successful response example**

```
{
  ok: true,
  id: "medication_xanax_1_mg_tablet",
  rev: "3-fidfnei452"
}
```

### List patient profile medications

`GET /profiles/{id}/medications` - Retrieves a list of medications for a profile.

**Simple GET /profiles/{id}/medications example**

Here is a simple `GET /profiles/{id}/medications` example.  While the `limit` query parameter is supported, filtering and pagination are not.

```
GET /profiles/profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol/medications?limit=2

[
  {
    _id: "medication_tylenol_100_mg_tablet"
    _rev: "1-dsafasdfwrew4rsdfsdf",
    type: "profile medication",
    profileID: "profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol",
    medicationName: "Tylenol 100 mg tablet",
    dosage: "2",
    frequency: "twice daily",
    instructions: "Take with food."
  },
  {
    _id: "medication_xanax_1_mg_tablet",
    _rev: "1-adfat345252sas3asfasd",
    type: "profile medication",
    profileID: "profile_marvin_gardens_34wd323dk449rkd932edi2o2lsldlol",
    medicationName: "Xanax 1 mg tablet",
    dosage: "2",
    frequency: "twice daily",
    instructions: "Take with food."
  }
]
```

---

## Users

### Create a user

`POST /users`  - Creates a new user profile by including user information such as first name, last name, phone number, and e-mail address.   

**POST /users example**

Below is an example of a HTTP request to add a medication patient profile containing 1 contact.  The request body contains the representation of the medication for a given profile.

```
POST /users

{
  firstName: "Judy",
  lastName: "Gardens",
  primaryPhone: "843 222 1212",
  primaryEmail: "jg1000@hotmail.com"
}
```

**Sample response**

```
{
  ok: true,
  id: "user_gardens_judy_423kjh238sfdhwef8q3foo",
  rev: "1-dgakdsfkajsdfboo34u783shxnmhithere"
}
```

### Retrieve a single user

`GET /users/{id}` - Retrieves information for a single user.

**GET /users/{id} example**

Here is an example of an HTTP request to retrieve a single user profile and an example of a response:

```
GET /users/user_gardens_judy_423kjh238sfdhwef8q3foo

{
  _id: "user_gardens_judy_423kjh238sfdhwef8q3foo",
  _rev: "1-dgakdsfkajsdfboo34u783shxnmhithere",
  type: "user",
  firstName: "Judy",
  lastName: "Gardens",
  primaryPhone: "843 222 1212",
  primaryEmail: "jg1000@hotmail.com"
}
```

### Update a user

`PUT /users/{id}` - This endpoint allows you to update information for a single patient profile, like contact information.

**PUT /users/{id} example**

Here is an example of an HTTP request to update a single user profile.  Int he example we are updating the user's phone number:

> You will need the most up-to-date `_rev` in order to fulfill this request. Failure to provide this key information will result in a `409 - Conflict` HTTP error response code.

```
PUT /users/user_gardens_judy_423kjh238sfdhwef8q3foo

{
  _id: "user_gardens_judy_423kjh238sfdhwef8q3foo",
  _rev: "1-dgakdsfkajsdfboo34u783shxnmhithere",
  type: "user",
  firstName: "Judy",
  lastName: "Gardens",
  primaryPhone: "843 222 2222",
  primaryEmail: "jg1000@hotmail.com"
}

```

**Successful response example**

```
{
  ok: true,
  id: "user_gardens_judy_423kjh238sfdhwef8q3foo",
  rev: "2-fadsfasdf94w59isdfsdf"
}
```

### Delete a user profile

`DELETE /users/{id}` - Deletes a single user profile and all data associated with that profile.

**DELETE /user/{id} example**

Here is an example of an HTTP request to delete a single user profile:

```
DELETE /users/user_gardens_judy_423kjh238sfdhwef8q3foo
```

**Successful response example**

```
{
  ok: true,
  id: user_gardens_judy_423kjh238sfdhwef8q3foo,
  rev: "3986732ladhasdfasdfdufy78oy32u4h72yj"
}
```
