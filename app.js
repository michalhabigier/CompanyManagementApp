const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const employeesRoutes = require('./api/routes/employees');
const departmentRoutes = require('./api/routes/departments');

mongoose.connect("mongodb+srv://mhabigier:zFT04o2Mk@node-company-management-um4sr.mongodb.net/test?retryWrites=true",
    (err) => {
        if(err){
            console.log("Could not connect to MongoDB");
        } else{
    console.log("Successfully connected to DB")
}
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/employees', employeesRoutes);
app.use('/departments', departmentRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
   res.status(error.status || 500);
   res.json({
       error: {
           message: error.message
       }
   });
});

module.exports = app;