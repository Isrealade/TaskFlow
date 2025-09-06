import React from 'react';
import TaskStats from '../../components/task/TaskStats/TaskStats';
import { useTaskStats } from '../../hooks/useTaskStats';
import { useTaskManager } from '../../hooks/useTaskManager';

const Dashboard = () => {
  const { tasks } = useTaskManager();
  const stats = useTaskStats(tasks);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <TaskStats stats={stats} />
    </div>
  );
};

export default Dashboard;
