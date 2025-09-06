import { renderHook, act } from '@testing-library/react';
import { TaskProvider } from '../../context/TaskContext';
import { useTaskManager } from '../../hooks/useTaskManager';

const wrapper = ({ children }) => <TaskProvider>{children}</TaskProvider>;

describe('useTaskManager', () => {
  test('should add a new task', () => {
    const { result } = renderHook(() => useTaskManager(), { wrapper });
    
    const initialTaskCount = result.current.tasks.length;
    const newTask = {
      title: 'Test Task',
      description: 'Test Description',
      priority: 'high',
      status: 'todo',
      category: 'development',
      dueDate: '2025-12-01',
      tags: ['test'],
      assignee: 'Test User',
      estimatedHours: 5
    };

    act(() => {
      result.current.addTask(newTask);
    });

    expect(result.current.tasks).toHaveLength(initialTaskCount + 1);
    expect(result.current.tasks[result.current.tasks.length - 1]).toMatchObject(newTask);
  });

  test('should delete a task', () => {
    const { result } = renderHook(() => useTaskManager(), { wrapper });
    
    const initialTaskCount = result.current.tasks.length;
    const taskToDelete = result.current.tasks[0];

    act(() => {
      result.current.deleteTask(taskToDelete.id);
    });

    expect(result.current.tasks).toHaveLength(initialTaskCount - 1);
    expect(result.current.tasks.find(task => task.id === taskToDelete.id)).toBeUndefined();
  });

  test('should update task status', () => {
    const { result } = renderHook(() => useTaskManager(), { wrapper });
    
    const taskToUpdate = result.current.tasks[0];
    const newStatus = 'completed';

    act(() => {
      result.current.updateTaskStatus(taskToUpdate.id, newStatus);
    });

    const updatedTask = result.current.tasks.find(task => task.id === taskToUpdate.id);
    expect(updatedTask.status).toBe(newStatus);
  });

  test('should update filters', () => {
    const { result } = renderHook(() => useTaskManager(), { wrapper });
    
    const newFilters = { search: 'test', priority: 'high' };

    act(() => {
      result.current.updateFilters(newFilters);
    });

    expect(result.current.filters.search).toBe('test');
    expect(result.current.filters.priority).toBe('high');
  });
});
