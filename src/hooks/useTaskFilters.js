import { useMemo } from 'react';
import { filterTasks, sortTasks } from '../utils/taskUtils';

export const useTaskFilters = (tasks, filters, sortBy, sortOrder) => {
  const filteredAndSortedTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filters);
    return sortTasks(filtered, sortBy, sortOrder);
  }, [tasks, filters, sortBy, sortOrder]);

  return filteredAndSortedTasks;
};
