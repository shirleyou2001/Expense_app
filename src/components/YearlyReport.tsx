import React from 'react';
import { BarChart, DollarSign } from 'lucide-react';
import { YearlyReport as YearlyReportType } from '../types/expense';
import { CategoryChart } from './CategoryChart';

interface YearlyReportProps {
  report: YearlyReportType;
}

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export function YearlyReport({ report }: YearlyReportProps) {
  const maxMonthlyTotal = Math.max(...Object.values(report.monthlyTotals));

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Yearly Report</h2>
        <div className="flex items-center gap-2 text-green-600">
          <DollarSign size={24} />
          <span className="text-2xl font-bold">${report.totalExpenses.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <BarChart size={20} />
          Monthly Breakdown
        </h3>
        <div className="space-y-2">
          {Object.entries(report.monthlyTotals).map(([month, total]) => {
            const percentage = (total / maxMonthlyTotal) * 100;
            return (
              <div key={month} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{monthNames[parseInt(month)]}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CategoryChart categoryTotals={report.categoryTotals} />
    </div>
  );
}