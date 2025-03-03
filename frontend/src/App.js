import React from 'react';
import ExpensesList from './components/ExpensesList';
import AddExpense from './components/AddExpense';
import FilterExpenses from './components/FilterExpenses';
import TotalExpenses from './components/TotalExpenses';

function App() {
  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <AddExpense />
      <FilterExpenses />
      <TotalExpenses />
      <ExpensesList />
    </div>
  );
}

export default App;
