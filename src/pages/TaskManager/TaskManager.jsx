import React, { useState } from 'react';
import Header from '../../components/layout/Header/Header';
import TaskFilters from '../../components/task/TaskFilters/TaskFilters';
import TaskList from '../../components/task/TaskList/TaskList';
import TaskForm from '../../components/task/TaskForm/TaskForm';
import Modal from '../../components/common/Modal/Modal';
import { useTaskManager } from '../../hooks/useTaskManager';
import { useTaskFilters } from '../../hooks/useTaskFilters';
import { useTaskStats } from '../../hooks/useTaskStats';

const TaskManager = () => {
  const {
    tasks,
    filters,
    sortBy,
    sortOrder,
    addTask,
    updateTask,
    deleteTask,
    updateFilters,
    updateSort,
    updateTaskStatus
  } = useTaskManager();

  const [showFilters, setShowFilters] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = useTaskFilters(tasks, filters, sortBy, sortOrder);
  const stats = useTaskStats(tasks);

  const handleAddTask = (taskData) => {
    addTask(taskData);
    setIsAddingTask(false);
  };

  const handleUpdateTask = (taskData) => {
    updateTask(taskData);
    setEditingTask(null);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsAddingTask(false);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  const handleCloseModal = () => {
    setIsAddingTask(false);
    setEditingTask(null);
  };

  return (
    <div>
      <Header onAddTask={() => setIsAddingTask(true)} stats={stats} />
      
      <div className="py-8">
        <TaskFilters
          filters={filters}
          sortBy={sortBy}
          sortOrder={sortOrder}
          showFilters={showFilters}
          onFiltersChange={updateFilters}
          onSortChange={updateSort}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        <TaskList
          tasks={filteredTasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onStatusChange={updateTaskStatus}
          onAddTask={() => setIsAddingTask(true)}
        />
      </div>

      {/* Task Form Modal */}
      <Modal
        isOpen={isAddingTask || !!editingTask}
        onClose={handleCloseModal}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          task={editingTask}
          isEditing={!!editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleAddTask}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default TaskManager;
