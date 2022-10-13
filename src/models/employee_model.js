const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
    address: { type: String, required: true },
    salary: { type: Number, required: true },
    nic_number: { type: String, required: true },
    transaction_date: { type: Date, default: null, required: true },
    role: { type: String, required: true }
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;