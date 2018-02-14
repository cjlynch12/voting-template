// server.js

// init project
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config()
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const Users = require('./models/users');




// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());





mongoose.connect(process.env.MLAB_URI);
mongoose.connection.on('error', console.error.bind(console, 'mongodb connection error'));
mongoose.connection.once('open', () => console.log('mongodb connected'));

require('./passport.js');
app.use(passport.initialize());
//passport.serializeUser(Users.serializeUser());
//passport.deserializeUser(Users.deserializeUser());


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});



app.route('/testmsg')
  .get(function(req,res) {
    res.send({'message':'test'})
});

const userRoutes = require('./routes/users.js');
app.use('/users', userRoutes);

const yelpRoutes = require('./routes/yelp.js');
app.use('/yelp', yelpRoutes);


app.get("*", function(request,response) {
  response.sendFile(__dirname + '/app/index.html');
});






const yelp = require('yelp-fusion');
require('dotenv').config();
const yelpKey = process.env.YELP_KEY;
const client = yelp.client(yelpKey);

const router = new express.Router();




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


