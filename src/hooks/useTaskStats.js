import { useMemo } from 'react';
import { calculateTaskStats } from '../utils/taskUtils';

export const useTaskStats = (tasks) => {
  const stats = useMemo(() => calculateTaskStats(tasks), [tasks]);
  return stats;
};
