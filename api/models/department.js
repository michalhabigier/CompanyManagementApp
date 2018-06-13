const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    departmentName: { type: String, required: true },
    employees: {type: [mongoose.Schema.Types.ObjectId], ref: 'Employee'}
});

module.exports = mongoose.model('Department', DepartmentSchema);