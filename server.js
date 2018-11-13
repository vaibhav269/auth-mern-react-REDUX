var express = require('express');
var app = express();
const port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var configDB = require('./server/config/db.js');
var bodyParser = require('body-parser');

//configuration=================================================================
//database connection

mongoose.connect(configDB.url,{useNewUrlParser:true});

//for rendering react js
app.use(express.static('dist')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//routes==========================================================================
require('./server/app/routes/api/signin.js')(app);
require('./server/app/routes/api/signup.js')(app);
require('./server/app/routes/api/getUserData.js')(app);
require('./server/app/routes/api/verify.js')(app);
require('./server/app/routes/api/signInGoogle.js')(app);
require('./server/app/routes/api/signinFacebook.js')(app);
require('./server/app/routes/api/logout.js')(app);

//launch============================================================================
app.listen(port,function(){
    console.log("Server started");
});
