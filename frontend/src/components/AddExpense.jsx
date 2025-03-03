import React, { useState } from 'react';
import axios from 'axios';

function AddExpense() {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); 
        try {
            const response = await axios.post('http://localhost:5000/expenses', {
                amount: parseFloat(amount), 
                category,
                date,
                description,
            });


            setMessage(response.data.message); 

            setAmount('');
            setCategory('');
            setDate('');
            setDescription('');
             window.location.reload(); 

        } catch (error) {
            console.error("Error adding expense:", error);
            if (error.response) {

                setMessage(error.response.data.message || 'Error adding expense.');
            } else {
                setMessage('An unexpected error occurred.');
            }
        }
    };

    return (
        <div>
            <h2>Add Expense</h2>
            {message && <p style={{ color: message.startsWith('Expense') ? 'green' : 'red' }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Amount:</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>
                <div>
                    <label>Category:</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                </div>
                <div>
                    <label>Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
}

export default AddExpense;