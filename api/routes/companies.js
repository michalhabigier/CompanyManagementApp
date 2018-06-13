const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'All companies'
    });
});

router.post('/', (req, res, next) =>{
    const company = {
        employeeId: req.body.employeeId,
        employeesAmount: req.body.employeesAmount
    }
    res.status(201).json({
        message: 'Company has been created',
        company: company
    });
});

router.get('/:companyId', (req, res, next) =>{
    res.status(200).json({
        message: 'Company details',
        companyId: req.params.companyId
    })
});

router.patch('/:companyId', (req, res, next) =>{
    res.status(200).json({
        message: 'Updated employer'
    });
});

router.delete('/:companyId', (req, res, next) =>{
    res.status(200).json({
        message: 'Deleted company',
        companyId: req.params.companyId
    });
});


module.exports = router;