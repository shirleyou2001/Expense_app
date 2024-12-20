import React from 'react';
import { PlusCircle } from 'lucide-react';
import { ExpenseItem } from '../types/expense';
import { defaultCategories } from '../data/defaultExpenses';

interface ExpenseFormProps {
  month: number;
  onAddExpense: (expense: Omit<ExpenseItem, 'id'>) => void;
}

export function ExpenseForm({ month, onAddExpense }: ExpenseFormProps) {
  const [category, setCategory] = React.useState('');
  const [amount, setAmount] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category && amount) {
      onAddExpense({
        category,
        amount: parseFloat(amount),
        month
      });
      setCategory('');
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select category</option>
            {defaultCategories.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        <PlusCircle size={20} />
        Add Expense
      </button>
    </form>
  );
}