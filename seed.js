const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        await Job.deleteMany(); // Clear existing jobs
        const jobs = [
            { title: 'Software Engineer', company: 'Tech Corp', location: 'New York', description: 'Develop and maintain web applications.' },
            { title: 'Data Scientist', company: 'Data Inc', location: 'San Francisco', description: 'Analyze data and build models.' },
        ];
        await Job.insertMany(jobs);
        console.log('Database seeded!');
        mongoose.connection.close();
    })
    .catch(err => console.error('Could not connect to MongoDB', err));
