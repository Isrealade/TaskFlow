import { filterTasks, sortTasks, calculateTaskStats } from '../../utils/taskUtils';

const mockTasks = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description 1',
    priority: 'high',
    status: 'todo',
    category: 'development',
    dueDate: '2025-09-10',
    tags: ['frontend'],
    assignee: 'John',
    estimatedHours: 8,
    completedHours: 0
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Description 2',
    priority: 'low',
    status: 'completed',
    category: 'design',
    dueDate: '2025-09-05',
    tags: ['ui'],
    assignee: 'Jane',
    estimatedHours: 4,
    completedHours: 4
  }
];

describe('taskUtils', () => {
  describe('filterTasks', () => {
    test('filters tasks by search term', () => {
      const filters = { search: 'Task 1', status: 'all', priority: 'all', category: 'all' };
      const result = filterTasks(mockTasks, filters);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Task 1');
    });

    test('filters tasks by status', () => {
      const filters = { search: '', status: 'completed', priority: 'all', category: 'all' };
      const result = filterTasks(mockTasks, filters);
      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('completed');
    });

    test('filters tasks by priority', () => {
      const filters = { search: '', status: 'all', priority: 'high', category: 'all' };
      const result = filterTasks(mockTasks, filters);
      expect(result).toHaveLength(1);
      expect(result[0].priority).toBe('high');
    });
  });

  describe('sortTasks', () => {
    test('sorts tasks by due date ascending', () => {
      const result = sortTasks(mockTasks, 'dueDate', 'asc');
      expect(result[0].dueDate).toBe('2025-09-05');
      expect(result[1].dueDate).toBe('2025-09-10');
    });

    test('sorts tasks by priority descending', () => {
      const result = sortTasks(mockTasks, 'priority', 'desc');
      expect(result[0].priority).toBe('high');
      expect(result[1].priority).toBe('low');
    });
  });

  describe('calculateTaskStats', () => {
    test('calculates correct task statistics', () => {
      const stats = calculateTaskStats(mockTasks);
      expect(stats.total).toBe(2);
      expect(stats.completed).toBe(1);
      expect(stats.inProgress).toBe(0);
      expect(stats.overdue).toBe(0);
    });
  });
});
