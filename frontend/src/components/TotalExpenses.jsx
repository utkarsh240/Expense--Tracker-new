
import React, { useState } from 'react';
import axios from 'axios';

function TotalExpenses() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [total, setTotal] = useState(null);
    const [error, setError] = useState(''); 

    const calculateTotal = async () => {
        setError(''); 
        setTotal(null); 
        try {
            const response = await axios.get(`http://localhost:5000/expenses/total?start=${startDate}&end=${endDate}`);
            setTotal(response.data.total);
        } catch (error) {
            console.error("Error calculating total expenses:", error);
            if (error.response) {
                setError(error.response.data.message || 'Error calculating total.');
            } else {
                setError('An unexpected error occurred.');
            }
            setTotal(null); 
        }
    };

    return (
        <div>
            <h2>Total Expenses</h2>
            <div>
                <label>Start Date:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
                <label>End Date:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <button onClick={calculateTotal}>Calculate Total</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {total !== null && <p>Total Expenses: {total}</p>}
        </div>
    );
}

export default TotalExpenses;