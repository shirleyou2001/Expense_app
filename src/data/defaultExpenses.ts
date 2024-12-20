// Housing Related
const housingCategories = [
  'Mortgage',
  'Property Tax',
  'Home Insurance',
  'HOA Fee',
  'Home Improvement',
] as const;

// Utilities
const utilityCategories = [
  'Heater Gas',
  'Electricity',
  'Cell Phone',
  'Water',
  'Internet',
] as const;

// Transportation
const transportationCategories = [
  'Auto Insurance',
  'Auto Gas',
  'City Sticker',
  'License Plate Renew',
  'Tolls',
  'Transportation',
] as const;

// Living Expenses
const livingExpenseCategories = [
  'Food',
  'Entertainment',
  'Healthcare',
  'Dining Out',
  'Fitness',
  'Clothing',
  'Gift',
  'Travel',
  'Haircut',
] as const;

// Education
const educationCategories = [
  'College Tuition',
  'College Housing',
  'College Food',
  'College Books',
] as const;

// Other
const otherCategories = [
  'Miscellaneous',
  'Emergency Funds',
] as const;

export const defaultCategories = [
  ...housingCategories,
  ...utilityCategories,
  ...transportationCategories,
  ...livingExpenseCategories,
  ...educationCategories,
  ...otherCategories,
] as const;

export const defaultMonthlyExpenses: { [key: string]: number } = {
  mortgage: 2000,
  'property tax': 500,
  'home insurance': 150,
  'hoa fee': 300,
  'home improvement': 200,
  'heater gas': 100,
  electricity: 150,
  'cell phone': 80,
  water: 70,
  internet: 80,
  'auto insurance': 100,
  'auto gas': 200,
  'city sticker': 10,
  'license plate renew': 10,
  tolls: 30,
  transportation: 100,
  food: 500,
  entertainment: 200,
  healthcare: 200,
  'dining out': 300,
  fitness: 50,
  clothing: 100,
  gift: 50,
  travel: 200,
  haircut: 30,
  'college tuition': 0,
  'college housing': 0,
  'college food': 0,
  'college books': 0,
  miscellaneous: 100,
  'emergency funds': 500
};