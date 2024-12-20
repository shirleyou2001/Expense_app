import React from 'react';
import { MonthlyView } from './components/MonthlyView';
import { YearlyReport } from './components/YearlyReport';
import { ExpenseItem, MonthlyExpenses, YearlyReport as YearlyReportType } from './types/expense';
import { defaultMonthlyExpenses } from './data/defaultExpenses';

function App() {
  const [selectedMonth, setSelectedMonth] = React.useState(new Date().getMonth());
  const [expenses, setExpenses] = React.useState<MonthlyExpenses>(() => {
    const initialExpenses: MonthlyExpenses = {};
    for (let month = 0; month < 12; month++) {
      initialExpenses[month] = Object.entries(defaultMonthlyExpenses).map(([category, amount]) => ({
        id: `${month}-${category}`,
        category,
        amount,
        month
      }));
    }
    return initialExpenses;
  });

  const calculateYearlyReport = (): YearlyReportType => {
    const monthlyTotals: { [month: number]: number } = {};
    const categoryTotals: { [category: string]: number } = {};
    let totalExpenses = 0;

    Object.entries(expenses).forEach(([month, monthExpenses]) => {
      monthlyTotals[parseInt(month)] = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      monthExpenses.forEach((exp) => {
        categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
        totalExpenses += exp.amount;
      });
    });

    return {
      totalExpenses,
      monthlyTotals,
      categoryTotals
    };
  };

  const handleAddExpense = (month: number, newExpense: Omit<ExpenseItem, 'id'>) => {
    setExpenses((prev) => ({
      ...prev,
      [month]: [
        ...(prev[month] || []),
        {
          ...newExpense,
          id: `${month}-${Date.now()}`
        }
      ]
    }));
  };

  const handleUpdateExpense = (month: number, updatedExpense: ExpenseItem) => {
    setExpenses((prev) => ({
      ...prev,
      [month]: prev[month].map((exp) =>
        exp.id === updatedExpense.id ? updatedExpense : exp
      )
    }));
  };

  const handleDeleteExpense = (month: number, id: string) => {
    setExpenses((prev) => ({
      ...prev,
      [month]: prev[month].filter((exp) => exp.id !== id)
    }));
  };

  const yearlyReport = calculateYearlyReport();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Expense Tracker</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MonthlyView
              month={selectedMonth}
              expenses={expenses[selectedMonth] || []}
              onAddExpense={(expense) => handleAddExpense(selectedMonth, expense)}
              onUpdateExpense={(expense) => handleUpdateExpense(selectedMonth, expense)}
              onDeleteExpense={(id) => handleDeleteExpense(selectedMonth, id)}
              onMonthChange={setSelectedMonth}
            />
          </div>
          
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <YearlyReport report={yearlyReport} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;