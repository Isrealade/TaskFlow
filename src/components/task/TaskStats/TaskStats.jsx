import React from 'react';
import PropTypes from 'prop-types';

const TaskStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="ml-2 text-sm text-gray-600">Total Tasks</div>
        </div>
      </div>
      <div className="bg-green-50 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="ml-2 text-sm text-green-600">Completed</div>
        </div>
      </div>
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
          <div className="ml-2 text-sm text-blue-600">In Progress</div>
        </div>
      </div>
      <div className="bg-red-50 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
          <div className="ml-2 text-sm text-red-600">Overdue</div>
        </div>
      </div>
    </div>
  );
};

TaskStats.propTypes = {
  stats: PropTypes.shape({
    total: PropTypes.number.isRequired,
    completed: PropTypes.number.isRequired,
    inProgress: PropTypes.number.isRequired,
    overdue: PropTypes.number.isRequired
  }).isRequired
};

export default TaskStats;
