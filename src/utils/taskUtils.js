import { isOverdue } from './dateUtils';

export const filterTasks = (tasks, filters) => {
  return tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         task.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                         task.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
    
    const matchesStatus = filters.status === 'all' || task.status === filters.status;
    const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
    const matchesCategory = filters.category === 'all' || task.category === filters.category;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });
};

export const sortTasks = (tasks, sortBy, sortOrder) => {
  const sorted = [...tasks].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'dueDate':
        comparison = new Date(a.dueDate) - new Date(b.dueDate);
        break;
      case 'priority': {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
        break;
      }
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'status': {
        const statusOrder = { todo: 1, 'in-progress': 2, completed: 3 };
        comparison = statusOrder[a.status] - statusOrder[b.status];
        break;
      }
      default:
        comparison = 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return sorted;
};

export const calculateTaskStats = (tasks) => {
  return {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    overdue: tasks.filter(t => isOverdue(t.dueDate, t.status)).length
  };
};
