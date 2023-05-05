import React, { useState } from 'react';
import './MyForm.css';
import axios from 'axios';
import './App.css'
import { get } from 'mongoose';
import { getAllByDisplayValue } from '@testing-library/react';


function MyForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        addressLine: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
    });




    const [d, setData] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3001/api/submit-form', formData)
            .then(response => {
                console.log(response.data);
            })


    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };


    const getData = () => {
        axios.get('http://localhost:3001/forms').then(response => {
            setData(response.data)
        })

    }

 


    return (
        <>

            <div className="form-container">
                <h2>My Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-column">
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" required id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />

                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />

                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />

                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                        </div>
                        <div className="form-column">
                            <label htmlFor="addressLine1">Address Line:</label>
                            <input type="text" id="addressLine" name="addressLine" value={formData.addressLine1} onChange={handleChange} />

                            <label htmlFor="city">City:</label>
                            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />

                            <label htmlFor="state">State:</label>
                            <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} />

                            <label htmlFor="country">Country:</label>
                            <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} />

                            <label htmlFor="zipCode">Zip Code:</label>
                            <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} />
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <button onClick={getData}>GET DATA</button>
            <div className="card-container">
                {d.map(da => (
                    <div className='card'>

                        <h2>{da.firstName}  {da.lastName}</h2>
                        <p>{da.email}</p>
                        <p>{da.addressLine}</p>
                        <p>{da.zipCode}</p>
                        <p>{da.city}</p>
                        <p>{da.country}</p>
                        <p>{da.state}</p>


                    </div>
                ))}
            </div>


        </>
    );
}

export default MyForm;
