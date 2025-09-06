import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle2, Circle, Clock, Calendar, Users, Tag, Edit3, Trash2, AlertCircle } from 'lucide-react';
import { PRIORITY_COLORS, STATUS_COLORS } from '../../../utils/constants';
import { formatDate, isOverdue } from '../../../utils/dateUtils';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const handleStatusToggle = () => {
    const nextStatus = 
      task.status === 'completed' ? 'todo' : 
      task.status === 'todo' ? 'in-progress' : 'completed';
    onStatusChange(task.id, nextStatus);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          {/* Status Icon */}
          <button
            onClick={handleStatusToggle}
            className="mt-1 flex-shrink-0"
            data-testid="status-toggle"
          >
            {task.status === 'completed' ? (
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            ) : task.status === 'in-progress' ? (
              <Clock className="h-6 w-6 text-blue-600" />
            ) : (
              <Circle className="h-6 w-6 text-gray-400 hover:text-blue-600" />
            )}
          </button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {task.title}
              </h3>
              {isOverdue(task.dueDate, task.status) && (
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              )}
            </div>
            
            {task.description && (
              <p className="text-gray-600 mb-3">{task.description}</p>
            )}

            {/* Tags */}
            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {task.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Task Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${PRIORITY_COLORS[task.priority]}`}>
                {task.priority.toUpperCase()}
              </span>
              
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[task.status]}`}>
                {task.status.replace('-', ' ').toUpperCase()}
              </span>

              <span className="capitalize">{task.category}</span>

              {task.dueDate && (
                <span className={`flex items-center ${isOverdue(task.dueDate, task.status) ? 'text-red-600' : ''}`}>
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(task.dueDate)}
                </span>
              )}

              {task.assignee && (
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {task.assignee}
                </span>
              )}

              {task.estimatedHours > 0 && (
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {task.completedHours}/{task.estimatedHours}h
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
            data-testid="edit-task"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
            data-testid="delete-task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    priority: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    assignee: PropTypes.string,
    estimatedHours: PropTypes.number,
    completedHours: PropTypes.number
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired
};

export default TaskCard;