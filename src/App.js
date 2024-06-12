import './App.css'
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [formData, setFormData] = useState({});
    const [diagnosis, setDiagnosis] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://cdds-backend.onrender.com/diagnose', formData);
            setDiagnosis(response.data.diagnosis);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="App">
            <h1>Cardiovascular Disease Diagnostic System</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Age:
                    <input className='number' type="number" name="age" onChange={handleChange} />
                </label>
                <label>
                    Blood Pressure:
                    <input className='number' type="number" name="bloodPressure" onChange={handleChange} />
                </label>
                <label>
                    Chest Pain:
                    <input className='checkbox' type="checkbox" name="chestPain" onChange={handleChange} />
                </label>
                <label>
                    Smoking:
                    <input className='checkbox' type="checkbox" name="smoking" onChange={handleChange} />
                </label>
                <label>
                    Family History:
                    <input className='checkbox' type="checkbox" name="familyHistory" onChange={handleChange} />
                </label>
                <label>
                    Obesity:
                    <input className='checkbox' type="checkbox" name="obesity" onChange={handleChange} />
                </label>
                <button type="submit">Diagnose</button>
            </form>
            {diagnosis && (diagnosis.map((consequence) => <p>{consequence}</p>))}
        </div>
    );
}

export default App;
