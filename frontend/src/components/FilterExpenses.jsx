
import React, { useState } from 'react';
import axios from 'axios';

function FilterExpenses() {
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [filteredExpenses, setFilteredExpenses] = useState([]);

    const handleFilter = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/expenses?category=${category}&date=${date}`);
            setFilteredExpenses(response.data);
        } catch (error) {
            console.error("Error filtering expenses:", error);
             setFilteredExpenses([]); 
        }
    };

    return (
        <div>
            <h2>Filter Expenses</h2>
            <div>
                <label>Category:</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <button onClick={handleFilter}>Filter</button>

            {}
            <h3>Filtered Expenses</h3>
            {filteredExpenses.length === 0 ? (
                <p>No expenses found matching the filter criteria.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExpenses.map((expense) => (
                            <tr key={expense._id}>
                                <td>{expense.amount}</td>
                                <td>{expense.category}</td>
                                <td>{expense.date}</td>
                                <td>{expense.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default FilterExpenses;