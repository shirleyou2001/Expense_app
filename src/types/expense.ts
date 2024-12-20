export interface ExpenseItem {
  id: string;
  category: string;
  amount: number;
  month: number;
}

export interface MonthlyExpenses {
  [month: number]: ExpenseItem[];
}

export interface YearlyReport {
  totalExpenses: number;
  monthlyTotals: { [month: number]: number };
  categoryTotals: { [category: string]: number };
}