export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

export const isOverdue = (dueDate, status) => {
  return new Date(dueDate) < new Date() && status !== 'completed';
};

export const getDaysUntilDue = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
