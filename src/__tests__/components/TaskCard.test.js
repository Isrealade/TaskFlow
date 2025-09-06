import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskCard from '../../../src/components/task/TaskCard/TaskCard';

const mockTask = {
  id: 1,
  title: 'Test Task',
  description: 'Test Description',
  priority: 'high',
  status: 'todo',
  category: 'development',
  dueDate: '2025-12-01',
  tags: ['test', 'frontend'],
  assignee: 'John Doe',
  estimatedHours: 5,
  completedHours: 2
};

const defaultProps = {
  task: mockTask,
  onEdit: jest.fn(),
  onDelete: jest.fn(),
  onStatusChange: jest.fn()
};

describe('TaskCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders task information correctly', () => {
    render(<TaskCard {...defaultProps} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('HIGH')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('calls onStatusChange when status toggle is clicked', () => {
    render(<TaskCard {...defaultProps} />);
    
    const statusToggle = screen.getByTestId('status-toggle');
    fireEvent.click(statusToggle);
    
    expect(defaultProps.onStatusChange).toHaveBeenCalledWith(1, 'in-progress');
  });

  test('calls onEdit when edit button is clicked', () => {
    render(<TaskCard {...defaultProps} />);
    
    const editButton = screen.getByTestId('edit-task');
    fireEvent.click(editButton);
    
    expect(defaultProps.onEdit).toHaveBeenCalledWith(mockTask);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<TaskCard {...defaultProps} />);
    
    const deleteButton = screen.getByTestId('delete-task');
    fireEvent.click(deleteButton);
    
    expect(defaultProps.onDelete).toHaveBeenCalledWith(1);
  });

  test('shows overdue indicator for overdue tasks', () => {
    const overdueTask = {
      ...mockTask,
      dueDate: '2020-01-01' // Past date
    };
    
    render(<TaskCard {...defaultProps} task={overdueTask} />);
    
    expect(screen.getByTestId('status-toggle').closest('div')).toContainElement(
      screen.getByText('Test Task').parentElement.querySelector('[data-lucide="alert-circle"]')
    );
  });

  test('displays tags correctly', () => {
    render(<TaskCard {...defaultProps} />);
    
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('frontend')).toBeInTheDocument();
  });
});
