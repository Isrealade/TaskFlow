import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskForm from '../../../src/components/task/TaskForm/TaskForm';

const defaultProps = {
  onSubmit: jest.fn(),
  onCancel: jest.fn()
};

describe('TaskForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form fields correctly', () => {
    render(<TaskForm {...defaultProps} />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
  });

  test('shows validation errors for empty required fields', async () => {
    render(<TaskForm {...defaultProps} />);
    
    const submitButton = screen.getByText('Create Task');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument();
    });
  });

  test('calls onSubmit with correct data', async () => {
    render(<TaskForm {...defaultProps} />);
    
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Task' }
    });
    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: '2025-12-01' }
    });
    
    const submitButton = screen.getByText('Create Task');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(defaultProps.onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Task',
          dueDate: '2025-12-01'
        })
      );
    });
  });

  test('populates form when editing existing task', () => {
    const existingTask = {
      id: 1,
      title: 'Existing Task',
      description: 'Existing Description',
      priority: 'high',
      status: 'in-progress',
      category: 'design',
      dueDate: '2025-12-01',
      tags: ['existing', 'task'],
      assignee: 'Jane Doe',
      estimatedHours: 8,
      completedHours: 3
    };
    
    render(<TaskForm {...defaultProps} task={existingTask} isEditing={true} />);
    
    expect(screen.getByDisplayValue('Existing Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Existing Description')).toBeInTheDocument();
    expect(screen.getByDisplayValue('existing, task')).toBeInTheDocument();
  });

  test('calls onCancel when cancel button is clicked', () => {
    render(<TaskForm {...defaultProps} />);
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(defaultProps.onCancel).toHaveBeenCalled();
  });
});
