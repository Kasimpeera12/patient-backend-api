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
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.json(newPatient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/api/patients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Patient.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json({ message: 'Patient deleted successfully', id });
  } catch (err) {
    console.error('Error deleting patient:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
