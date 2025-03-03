# Expense Tracker

Node.js + Express + MongoDB expense tracking app with EJS and React.

## Setup

1. **Install:**
   ```bash
   git clone <repo>
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

Visit `http://localhost:5000`

## Features
- Add/filter expenses
- Date range totals

## Troubleshooting
- Check MongoDB connection
- Use port 5000, not 3000

This shortened README provides concise instructions for setting up and running the application. It covers the essential steps, prerequisites, and basic usage, along with troubleshooting for common issues. It's ideal for users who want a quick start guide.

