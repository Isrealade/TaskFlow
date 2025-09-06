import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';
import { Plus } from 'lucide-react';

const Header = ({ onAddTask, stats }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">TaskFlow</h1>
            <p className="text-gray-600 mt-1">Manage your projects efficiently</p>
          </div>
          <Button onClick={onAddTask}>
            <Plus className="h-5 w-5 mr-2" />
            New Task
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6">
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
      </div>
    </header>
  );
};

Header.propTypes = {
  onAddTask: PropTypes.func.isRequired,
  stats: PropTypes.shape({
    total: PropTypes.number.isRequired,
    completed: PropTypes.number.isRequired,
    inProgress: PropTypes.number.isRequired,
    overdue: PropTypes.number.isRequired
  }).isRequired
};

export default Header;
