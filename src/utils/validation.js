export const validateTaskForm = (taskData) => {
  const errors = {};

  if (!taskData.title || taskData.title.trim().length === 0) {
    errors.title = 'Title is required';
  }

  if (taskData.title && taskData.title.length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }

  if (taskData.description && taskData.description.length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }

  if (!taskData.dueDate) {
    errors.dueDate = 'Due date is required';
  }

  if (taskData.estimatedHours && (isNaN(taskData.estimatedHours) || taskData.estimatedHours < 0)) {
    errors.estimatedHours = 'Estimated hours must be a positive number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
