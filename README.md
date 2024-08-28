#Task Management App

To run locally

1. Clone the repository

2. Install dependencies in both client and server folder using npm install command.

3. Run command " npm run dev" in client directory should have  url local env server url like  http://localhost:3000 etc. in  client/src/services/api.js file instead of deployement url.

4. Run command " npm run local" in server directory should have frontend url like http://localhost:5173/ . in server/index.js in corsoptions to allow cross origin requests.

set up .env file in root of server folder:

PORT=3000           

USER=mongodbusername       // use mongodb username  found in connection string

PASSWORD=mongodbpassword   // use mongodb password found in  connection string

KEY="EncryptThisText"       // any string to use as encryption key for cryptojs ( secure transmission)

JWT_SECRET="tokenizethis"    // any string to use as encrypion key for creating jwt token

EMAIL="youremail@gmail.com" // email used for nodemailer service

EMAILPASSWORD="passowrd/key created" //password create in google developer console for mail services

# Task-Management
