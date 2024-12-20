import React from 'react';
import { categoryColors } from '../utils/colors';

interface CategoryChartProps {
  categoryTotals: { [category: string]: number };
}

export function CategoryChart({ categoryTotals }: CategoryChartProps) {
  const maxTotal = Math.max(...Object.values(categoryTotals));

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Category Breakdown</h3>
      <div className="space-y-3">
        {Object.entries(categoryTotals)
          .sort(([, a], [, b]) => b - a) // Sort by amount descending
          .map(([category, total]) => {
            const percentage = (total / maxTotal) * 100;
            return (
              <div key={category} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium capitalize">{category}</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-in-out"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: categoryColors[category] || '#94a3b8'
                    }}
                  />
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
}