const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('./config.js')

// create a new mongoose schema
const MyFormDataSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    addressLine: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    password: String,
    confirmPassword: String
});

// create a new mongoose model
const MyFormData = mongoose.model('MyFormData', MyFormDataSchema);

// create a new express app
const app = express();

// set up middleware to parse the request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
// set up a route to handle the POST request
app.post('/api/submit-form', async (req, res) => {
    try {
        console.log(req.body)
        const { firstName, lastName, email, addressLine, city, state, zipCode, country, password, confirmPassword } = req.body
        const myFormData = new MyFormData({ firstName, lastName, email, addressLine, city, state, zipCode, country, password, confirmPassword });
        const savedFormData = await myFormData.save();
        res.status(201).json(savedFormData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while saving the form data.' });
    }
});

app.get('/forms', async (req, res) => {

    const formData = [];
    await MyFormData.find().then(forms => {
        forms.forEach(form => formData.push(form));
        console.log('Data retrieved and stored in array:', formData);
    })
        .catch(err => console.log(err));
    res.send(formData)
});


// start the server
app.listen(3001, () => {
    console.log('Server started on port 3001.');
});







