import React from 'react';
import { ExpenseForm } from './ExpenseForm';
import { MonthSelector } from './MonthSelector';
import { ExpenseItem } from '../types/expense';
import { Edit2, Trash2 } from 'lucide-react';

interface MonthlyViewProps {
  month: number;
  expenses: ExpenseItem[];
  onAddExpense: (expense: Omit<ExpenseItem, 'id'>) => void;
  onUpdateExpense: (expense: ExpenseItem) => void;
  onDeleteExpense: (id: string) => void;
  onMonthChange: (month: number) => void;
}

export function MonthlyView({
  month,
  expenses,
  onAddExpense,
  onUpdateExpense,
  onDeleteExpense,
  onMonthChange
}: MonthlyViewProps) {
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editAmount, setEditAmount] = React.useState('');

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const handleEdit = (expense: ExpenseItem) => {
    setEditingId(expense.id);
    setEditAmount(expense.amount.toString());
  };

  const handleSaveEdit = (expense: ExpenseItem) => {
    onUpdateExpense({
      ...expense,
      amount: parseFloat(editAmount)
    });
    setEditingId(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Monthly Expenses</h2>
        <div className="w-48">
          <MonthSelector selectedMonth={month} onChange={onMonthChange} />
        </div>
      </div>
      
      <ExpenseForm month={month} onAddExpense={onAddExpense} />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Expenses</h3>
        <div className="divide-y divide-gray-200">
          {expenses.map((expense) => (
            <div key={expense.id} className="py-3 flex items-center">
              <div className="flex-1">
                <p className="font-medium text-gray-800 capitalize">{expense.category}</p>
              </div>
              <div className="flex items-center gap-4 min-w-[200px] justify-end">
                {editingId === expense.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      min="0"
                      step="0.01"
                    />
                    <button
                      onClick={() => handleSaveEdit(expense)}
                      className="text-green-600 hover:text-green-700"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="font-medium w-24 text-right">${expense.amount.toFixed(2)}</span>
                    <button
                      onClick={() => handleEdit(expense)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit2 size={18} />
                    </button>
                  </>
                )}
                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="flex-1">
            <p className="text-xl font-bold text-gray-800">Total</p>
          </div>
          <div className="min-w-[200px] flex justify-end">
            <span className="font-bold text-xl w-24 text-right">${totalExpenses.toFixed(2)}</span>
            <div className="w-[76px]"></div> {/* Spacer for alignment with action buttons */}
          </div>
        </div>
      </div>
    </div>
  );
}