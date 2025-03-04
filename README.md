# Expense Tracker

Node.js + Express + MongoDB expense tracking app with React.

## Setup

1. **Install:**
   ```bash
   git clone https://github.com/utkarsh240/Expense-Tracker.git
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Configure:**
   Create `backend/.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/expense_tracker_db
   PORT=5000
   ```

3. **Run:**
   ```bash
   # Terminal 1
   cd backend && node index.js
   
   # Terminal 2
   cd frontend && npm start
   ```

Visit `http://localhost:3000`

## Features
- Add/filter expenses
- Date range totals

## Troubleshooting
- Check MongoDB connection
- Use port 3000
- CORS error? Add `Access-Control-Allow-Origin: http://localhost:3000` to `backend/index.js`

