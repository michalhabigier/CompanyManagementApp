const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Department = require('../models/department');

router.get("/", (req, res, next) => {
    Department.find()
        .select("departmentName employees _id")
        .exec()
        .then(docs => {
            const response = {
                departments: docs.map(doc => {
                    return {
                        departmentName: doc.departmentName,
                        employees: doc.employees,
                        _id: doc._id
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
});

router.post("/", (req, res, next) => {
    const department = new Department({
        _id: new mongoose.Types.ObjectId(),
        departmentName: req.body.departmentName,
        employees: []
    });
    department
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Department created successfully",
                createdDepartment: {
                    _id: result._id,
                    departmentName: result.departmentName,
                    employees: result.employees
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


router.get('/:departmentId', (req, res, next) =>{
    const id = req.params.departmentId;
    Department.findById(id)
        .select('departmentName employees _id')
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

router.patch("/:departmentId", (req, res, next) => {
    const id = req.params.departmentId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Department.update({ _id: id }, { $set: updateOps })
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

router.delete("/:departmentId", (req, res, next) => {
    const id = req.params.departmentId;
    Department.findOneAndRemove({ _id: id })
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