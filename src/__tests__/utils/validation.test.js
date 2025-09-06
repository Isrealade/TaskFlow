import { validateTaskForm } from '../../utils/validation';

describe('validateTaskForm', () => {
  test('validates required title', () => {
    const taskData = { title: '', dueDate: '2025-12-01' };
    const result = validateTaskForm(taskData);
    expect(result.isValid).toBe(false);
    expect(result.errors.title).toBe('Title is required');
  });

  test('validates title length', () => {
    const taskData = { 
      title: 'a'.repeat(101), 
      dueDate: '2025-12-01' 
    };
    const result = validateTaskForm(taskData);
    expect(result.isValid).toBe(false);
    expect(result.errors.title).toBe('Title must be less than 100 characters');
  });

  test('validates estimated hours', () => {
    const taskData = { 
      title: 'Valid Title', 
      dueDate: '2025-12-01',
      estimatedHours: -5 
    };
    const result = validateTaskForm(taskData);
    expect(result.isValid).toBe(false);
    expect(result.errors.estimatedHours).toBe('Estimated hours must be a positive number');
  });

  test('passes validation for valid data', () => {
    const taskData = { 
      title: 'Valid Title', 
      description: 'Valid description',
      dueDate: '2025-12-01',
      estimatedHours: 5 
    };
    const result = validateTaskForm(taskData);
    expect(result.isValid).toBe(true);
    expect(Object.keys(result.errors)).toHaveLength(0);
  });
});
