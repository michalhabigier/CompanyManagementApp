const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    address: { type: String, required: true },
    salary: { type: Number, required: true },
    department: {type: [mongoose.Schema.Types.ObjectId], ref: 'Department'}
});

module.exports = mongoose.model('Employee', EmployeeSchema);