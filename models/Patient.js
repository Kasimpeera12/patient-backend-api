const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    patient_id: { type: String, required: true, unique: true },
    patient_name: { type: String, required: true },
    patient_joindate: { type: Date, required: true },
    patient_discharge_date: { type: Date },
});

module.exports = mongoose.model('Patient', PatientSchema);
