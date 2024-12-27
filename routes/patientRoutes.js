const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// GET: Fetch all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: Add a new patient
router.post('/', async (req, res) => {
    const { patient_id, patient_name, patient_joindate, patient_discharge_date } = req.body;
    try {
        const newPatient = new Patient({
            patient_id,
            patient_name,
            patient_joindate,
            patient_discharge_date,
        });
        await newPatient.save();
        res.json(newPatient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT: Update an existing patient by patient_id
router.put('/:patient_id', async (req, res) => {
    const { patient_id } = req.params;
    const { patient_name, patient_joindate, patient_discharge_date } = req.body;
    try {
        const updatedPatient = await Patient.findOneAndUpdate(
            { patient_id },
            { patient_name, patient_joindate, patient_discharge_date },
            { new: true } // Return the updated document
        );
        if (!updatedPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json(updatedPatient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: Delete a patient by patient_id
router.delete('/:patient_id', async (req, res) => {
    const { patient_id } = req.params;
    try {
        const deletedPatient = await Patient.findOneAndDelete({ patient_id });
        if (!deletedPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json({ message: 'Patient deleted successfully', patient: deletedPatient });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
