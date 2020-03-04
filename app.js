const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const http = require('http')
const routes = require('./routes')
//const router = express.Router();
const passenger = require('./routes/passenger')
const airlines = require('./routes/airlines')
const authority = require('./routes/authority')
const insurance = require('./routes/insurance')
const mongoose = require("mongoose");
//const MongoClient = require('mongodb').MongoClient;
//const url = "mongodb://localhost:27017/";
//const timestamp = new Date("<YYYY-mm-ddTHH:MM:ss>");
mongoose.connect("mongodb://localhost:27017/mydb",{ useFindAndModify: false , useUnifiedTopology: true , useNewUrlParser: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.static(__dirname + '/public'))
//app.use(app.router);

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Accept,Authorization");
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods",'PUT,GET,POST');
        return res.status(200).json({});
    }
    next();
})

app.get('/authority/login', authority.login);
//app.post('/authority/signup', authority.signup);
app.get('/airlines/login', airlines.login);
app.get('/passenger/:id', passenger.show);
app.get('/authority/:id', authority.show);
app.get('/insurance/:id', insurance.show);
app.get('/airlines/:id', airlines.show);
app.put('/airlines/load',airlines.load_update);
app.put('/airlines/unload',airlines.unload_update);
app.post('/save', authority.create);
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status= 404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
//app.post('/authority/signin', authority.signin);
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});