const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Employee = require('../models/employee');


exports.employees_get_all = (req, res, next) => {
    Employee.find()
        .select("name salary address")
        .exec()
        .then(docs => {
            const response = {
                employees: docs.map(doc => {
                    return {
                        name: doc.name,
                        salary: doc.salary,
                        address: doc.address,
                        _id: doc._id,
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.employees_add_new = (req, res, next) => {
    const employee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        address: req.body.address,
        salary: req.body.salary
    });
    employee
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Employee created successfully",
                createdEmployee: {
                    _id: result._id,
                    name: result.name,
                    address: result.address,
                    salary: result.salary
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.employees_get_one = (req, res, next) =>{
   const id = req.params.employeeId;
   Employee.findById(id)
       .select('name salary address _id')
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
};

exports.update_employee = (req, res, next) => {
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
};

exports.delete_employee = (req, res, next) => {
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
};


module.exports = router;