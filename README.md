This a nodejs-express-mongodb application. Every MEAN Start Up project should follow this and can take the referenmce for there own profit. It follows
some if the basic standards of Node, APIs and Coding. Give it a try.


- Node Version: 14.18
- MongoDB shell version v5.0.3

- Database Dump: Added to simform-db folder


Pilot Commit: Created a MEAN Node API stack to get started with. Also have the ability to log all the API call and its response for debugging purposes. Please
call some of the apis and have a look into logs table for more understandings.
- Completed the following APIS end to end:
```
  - signup
  - login
  - getuser
  - edituser
```


You have to Perform all the following steps in the given sequence for Installing this project.

**Install Nodejs**
- Ubuntu Machine
```
$ sudo apt-get install nodejs-legacy
```
- Mac Machine
```
$ brew install nodejs
```
Verify this by using `node -v` and `npm -v`

**Install Mongodb**
- Ubuntu Machine
```
$ sudo apt-get install mongodb
```
The app will automatically create *node-express-stack* database and *users* collection.

- Mac Machine
```
$ brew install mongodb
```
Verify this by using `mongo -version`

Step 1: Add NodeJs PPA. First you need to node.js ppa in our system provide by nodejs official website.
Step 2: Install Node.js and NPM. After adding required PPA file, lets install Nodejs package.
```
	$ sudo apt-get update
	$ sudo apt-get install nodejs
	$ sudo apt-get install npm
```

Step 3: Check Node.js and NPM Version
```
	$ node --version
	$ npm --version
```
Step 4: Install mongodb
```
	$ sudo apt-get install -y mongodb-org
```
Step 5: Install mongoose
```
	$ npm install mongoose
```
Step 6: Install node dependencies
```
    $ npm install
```
Step 7: Download the RoboMongo to access MongoDb.
```
    https://robomongo.org/download
```
Step 8: Connect with the MongoDB with RoboMongo and Create a database name "MyApp" (Please give the same DB name in your config/environment/development.js) and then create a collection in it name as "roles" and add the following
document in it:
```
   {
      "name": "user"
   }
   {
      "name: "admin"
   }
```

Step 9 That's it now you have a roles database table and you can start using different type of roles in your app.
```
   Start the node server now listed in step 10.
```
Step 10: To start project use following command.
```
	$ npm start
```

API Documentation:-

- Based Endpoint: http://localhost:3001
- Request Headers: Each of the API calls have apiKey, version and content type being sent. The APIs that require a user authentication (i.e. APIs that are available ONLY for a logged in users), we are additionally sending a token in the HTTP Header. 

- Version: 1.0

- Token: <User Token>

- Content-Type: application/json

- Errors: Following are a few common error responses that are receive if basic required keys are not sent in the HTTP header.
```
Error
Description
-103
No token is provided.
-114
Invalid or expired token.
-117
Invalid or missing APIkey.
-150
Missing some required product details fields.
```

- Sign Up

- Usage: This API is used to register a new user in the system.
- End Point: /users/signup
- HTTP Method: POST
- Request:
```
{
    "email":"bhandeshridhar@gmail.com",
    "password":"spice123",
    "firstName":"Shridhar",
    "lastName": "Bhande",
    "profileImage":"<---- base 64 image data ----->"
}
```

- Response:
```
{
    "isError": false,
    "data": {
        "__v": 0,
        "updatedAt": "2021-11-29T09:54:45.468Z",
        "createdAt": "2021-11-29T09:54:45.468Z",
        "firstName": "Shridhar",
        "lastName": "Bhande",
        "email": "bhandeshridhar@gmail.com",
        "password": null,
        "profileImage": "sdmnbsjdbfsj",
        "_id": "61a4a3651b64998c1919c629"
    }
}
```
- Error Responses:
	
  - Error
     - Description
```

EMAIL_ALREADY_EXIST 
-411,
INVALID_EMAIL_ADDRESS
413
REGISTRATION_FIELDS_MISSING
-412

```

- Login

- Usage:  To login into the app which is a valid user
- End Point: /users/login
- HTTP Method: POST
- Request:
```
{
{
    "email":"bhandeshridhar@gmail.com",
    "password":"spice123"
}
}
```
- Response:
```
{
    "isError": false,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTQ5ZGY4NDk1NWYwODRkMjUxZTM3YiIsImZpcnN0TmFtZSI6IlNocmlkaGFyIiwibGFzdE5hbWUiOiJCaGFuZGUiLCJlbWFpbCI6ImJoYW5kZXNocmlkaGFycis1QGdtYWlsLmNvbSIsImRhdGUiOjE2MzgxNzgzMTI3NTUsImV4cCI6MTYzODI2NDcxMjc1NSwiaWF0IjoxNjM4MTc4MzEyfQ.YSa6TpkttZf0tJW1HgXmQ72YJxono5f2M-GhVQm7o9M",
        "user": {
            "_id": "61a49df84955f084d251e37b",
            "updatedAt": "2021-11-29T09:31:36.743Z",
            "createdAt": "2021-11-29T09:31:36.743Z",
            "firstName": "Shridhar",
            "lastName": "Bhande",
            "email": "bhandeshridhar@gmail.com",
            "password": null,
            "profileImage": "sdmnbsjdbfsj",
            "__v": 0
        }
    }
}
```
- Error Responses:
	
- Error Descriptions
```
EMPTY_PASSWORD 
- 417 statuscode

INVALID_EMAIL_ADDRESS
- 413

```

- getuser

- Usage:  TO get specific user details 
- End Point: /users/getuser
- HTTP Method: GET
- Request:
```
 Need only token in the header
```
- Response:
```

{
    "isError": false,
    "data": {
        "user": {
            "_id": "61a47f945e55e966876b6190",
            "updatedAt": "2021-11-29T07:33:02.584Z",
            "createdAt": "2021-11-29T07:21:56.722Z",
            "firstName": "Chakradhar",
            "lastName": "Bhande",
            "email": "bhandeshridharr+2@gmail.com",
            "password": null,
            "profileImage": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "__v": 0
        }
    }
}
```
- Error Responses:
	
- Error Descriptions
```

FETCHING_ISSUE
  - 421 status code



```

- edituser

- Usage:  To update user data 
- End Point: /users/edituser
- HTTP Method: POST
- Request:
```
{
    "email":"bhandesaritaaaa@gmail.com",
    "password":"spice123",
    "firstName":"Sarita",
    "lastName": "Patil",
    "profileImage":"patilllllllllllllllll"
}
```
- Response:
```

{
    "isError": false,
    "data": {
        "user": "User updated successfully"
    }
}
```
- Error Responses:
	
- Error Descriptions
```

FETCHING_ISSUE
  - 421 status code
EMAIL_ALREADY_EXIST 
  - 411,
```

