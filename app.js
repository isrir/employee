const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/company', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

const employeeSchema = new mongoose.Schema({
    name: String,
    department: String,
    experience: Number
});

const Employee = mongoose.model('Employee', employeeSchema);

app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find({
            department: 'IT',
            experience: { $gt: 10 }
        });
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching employees' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});