const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Employee = require('../models/employee');

router.get("/", (req, res, next) => {
    Employee.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/", (req, res, next) => {
    const employee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        salary: req.body.salary
    });
    employee
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /products",
                createdEmployee: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:employeeId', (req, res, next) =>{
   const id = req.params.employeeId;
   Employee.findById(id)
       .exec()
       .then(doc => {
           console.log("From db", doc);
           if(doc){
               res.status(200).json(doc);
           } else{
               res.status(404)
                   .json({message: "Employee with this ID doesn't exist!"});
           }
       })
       .catch(err => {
           console.log(err);
           res.status(500).json({
               error: err
           });
       });
});

router.patch("/:employeeId", (req, res, next) => {
    const id = req.params.employeeId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Employee.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete("/:employeeId", (req, res, next) => {
    const id = req.params.employeeId;
    Employee.findOneAndRemove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;