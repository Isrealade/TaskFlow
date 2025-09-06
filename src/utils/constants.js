export const TASK_ACTIONS = {
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  UPDATE_FILTERS: 'UPDATE_FILTERS',
  UPDATE_SORT: 'UPDATE_SORT'
};

export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed'
};

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

export const TASK_CATEGORIES = {
  DEVELOPMENT: 'development',
  DESIGN: 'design',
  DOCUMENTATION: 'documentation',
  DEVOPS: 'devops',
  TESTING: 'testing'
};

export const PRIORITY_COLORS = {
  high: 'text-red-600 bg-red-100',
  medium: 'text-yellow-600 bg-yellow-100',
  low: 'text-green-600 bg-green-100'
};

export const STATUS_COLORS = {
  todo: 'text-gray-600 bg-gray-100',
  'in-progress': 'text-blue-600 bg-blue-100',
  completed: 'text-green-600 bg-green-100'
};
