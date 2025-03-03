
const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 


const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("expense_tracker_db"); 
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  }
}

connectDB();



app.post('/expenses', async (req, res) => {
    try {
        const { amount, category, date, description } = req.body;

        if (!amount || !category || !date) {
            return res.status(400).json({ message: 'Amount, category, and date are required.' });
        }
        if (typeof amount !== 'number') {
            return res.status(400).json({ message: 'Amount must be a number.' });
        }

        const newExpense = {
            amount,
            category,
            date,
            description,
        };

        const result = await db.collection('expenses').insertOne(newExpense);
        res.status(201).json({ message: 'Expense added successfully', expenseId: result.insertedId });

    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.get('/expenses', async (req, res) => {
    try {
        const { category, date } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }
        if (date) {
          query.date = date;  
        }

        const expenses = await db.collection('expenses').find(query).toArray();
        res.json(expenses);

    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.get('/expenses/total', async (req, res) => {
    try {
        const { start, end } = req.query;

        if (!start || !end) {
            return res.status(400).json({ message: 'Start and end dates are required.' });
        }

        const startDate = new Date(start);
        const endDate = new Date(end);
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format.  Use YYYY-MM-DD." });
        }
        endDate.setHours(23, 59, 59, 999); 

        const expenses = await db.collection('expenses').find({
            date: {
                $gte: startDate.toISOString().split('T')[0], 
                $lte: endDate.toISOString().split('T')[0]
            }
        }).toArray();

        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        res.json({ total });

    } catch (error) {
        console.error("Error calculating total expenses:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});