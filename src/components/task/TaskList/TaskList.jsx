import React from 'react';
import PropTypes from 'prop-types';
import { Circle, Plus } from 'lucide-react';
import TaskCard from '../TaskCard/TaskCard';
import Button from '../../common/Button/Button';

const TaskList = ({ tasks, onEdit, onDelete, onStatusChange, onAddTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <div className="text-gray-400 mb-4">
          <Circle className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p className="text-gray-600 mb-6">
          Get started by creating your first task
        </p>
        <Button onClick={onAddTask}>
          <Plus className="h-5 w-5 mr-2" />
          Create First Task
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired
};

export default TaskList;
