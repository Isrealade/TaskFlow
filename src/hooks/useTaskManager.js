import { useTaskContext } from '../context/TaskContext';
import { TASK_ACTIONS } from '../utils/constants';

export const useTaskManager = () => {
  const { state, dispatch } = useTaskContext();

  const addTask = (taskData) => {
    dispatch({ type: TASK_ACTIONS.ADD_TASK, payload: taskData });
  };

  const updateTask = (taskData) => {
    dispatch({ type: TASK_ACTIONS.UPDATE_TASK, payload: taskData });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: TASK_ACTIONS.DELETE_TASK, payload: taskId });
  };

  const updateFilters = (filters) => {
    dispatch({ type: TASK_ACTIONS.UPDATE_FILTERS, payload: filters });
  };

  const updateSort = (sortBy, sortOrder) => {
    dispatch({ type: TASK_ACTIONS.UPDATE_SORT, payload: { sortBy, sortOrder } });
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const task = state.tasks.find(t => t.id === taskId);
    if (task) {
      const updatedTask = {
        ...task,
        status: newStatus,
        completedHours: newStatus === 'completed' ? task.estimatedHours : task.completedHours
      };
      updateTask(updatedTask);
    }
  };

  return {
    tasks: state.tasks,
    filters: state.filters,
    sortBy: state.sortBy,
    sortOrder: state.sortOrder,
    addTask,
    updateTask,
    deleteTask,
    updateFilters,
    updateSort,
    updateTaskStatus
  };
};
