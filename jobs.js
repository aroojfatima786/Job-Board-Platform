const express = require('express');
const Job = require('../models/Job');

const router = express.Router();

// Create a job listing
router.post('/', async (req, res) => {
    const job = new Job(req.body);
    try {
        await job.save();
        res.status(201).send(job);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all job listings
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.send(jobs);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a job listing by ID
router.delete('/:id', async (req, res) => {
    const jobId = req.params.id;
    try {
        const deletedJob = await Job.findByIdAndDelete(jobId);
        if (!deletedJob) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting job' });
    }
});

module.exports = router;
