import React from 'react';

interface MonthSelectorProps {
  selectedMonth: number;
  onChange: (month: number) => void;
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function MonthSelector({ selectedMonth, onChange }: MonthSelectorProps) {
  return (
    <select
      value={selectedMonth}
      onChange={(e) => onChange(Number(e.target.value))}
      className="block w-full rounded-md border-gray-300 shadow-sm 
                 focus:border-blue-500 focus:ring-blue-500 text-lg font-semibold"
    >
      {monthNames.map((month, index) => (
        <option key={index} value={index}>
          {month}
        </option>
      ))}
    </select>
  );
}