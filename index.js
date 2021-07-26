const express = require('express');
const app = express();
const port = 8000;
const ejs = require('ejs');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const googleStrategy = require('./config/passport-google-oauth2.0.js');

const MongoStore = require('connect-mongo')(session);
app.use(express.urlencoded({ extended: false }));

//setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//session
app.use(
    session({
    name: 'xyz',
    secret: 'vsdbjkdb',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store:new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        }
        ,
        function (err) {
            if(err){
                console.log("error setting up session",err);
                return;
            }
            console.log("Sessions saved");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//use express Router
app.use('/', require('./routes'));



app.listen(port, (err) => {
    if (err) {
        console.log('error in running the server : ', err);
    }
    else {
        console.log('Server running on port : ', port);
    }
});