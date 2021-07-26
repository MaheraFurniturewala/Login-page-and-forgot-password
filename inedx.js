const express = require('express');
const app = express();
const port = 8000;
const ejs = require('ejs');



//setting view engine
app.set('view engine','ejs');
app.set('views','./views');

//use express Router
app.use('/',require('./routes'));


app.listen(port, (err) => {
    if(err){
        console.log('error in running the server : ',err);
    }
    else{
        console.log('Server running on port : ',port);
    }
});