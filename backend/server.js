var cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const cookieSession = require("cookie-session");

const listEndpoints = require("express-list-endpoints");

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a root route
app.get('/', (req, res) => {
  res.send("Welcome to Question and Answers App");
});

// Require employee routes
const appRoutes = require('./src/routes/appRoutes')

// using cors
app.use(cors());

// using as middleware
app.use('/api/v1/', appRoutes)

console.log("Routes: ",listEndpoints(app));

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});