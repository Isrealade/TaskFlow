import { TASK_ACTIONS } from '../utils/constants';

export const initialTaskState = {
  tasks: [
    {
      id: 1,
      title: "Implement user authentication system",
      description: "Set up JWT authentication with login/logout functionality",
      priority: "high",
      status: "in-progress",
      category: "development",
      dueDate: "2025-09-08",
      createdAt: "2025-09-01",
      tags: ["backend", "security"],
      assignee: "John Doe",
      estimatedHours: 8,
      completedHours: 3
    },
    {
      id: 2,
      title: "Design mobile responsive layout",
      description: "Create responsive design system for mobile devices",
      priority: "medium",
      status: "todo",
      category: "design",
      dueDate: "2025-09-10",
      createdAt: "2025-09-02",
      tags: ["ui/ux", "mobile"],
      assignee: "Jane Smith",
      estimatedHours: 12,
      completedHours: 0
    },
    {
      id: 3,
      title: "Write API documentation",
      description: "Document all REST API endpoints with examples",
      priority: "low",
      status: "completed",
      category: "documentation",
      dueDate: "2025-09-05",
      createdAt: "2025-08-28",
      tags: ["docs", "api"],
      assignee: "Mike Johnson",
      estimatedHours: 6,
      completedHours: 6
    },
    {
      id: 4,
      title: "Set up CI/CD pipeline",
      description: "Configure automated testing and deployment",
      priority: "high",
      status: "todo",
      category: "devops",
      dueDate: "2025-09-12",
      createdAt: "2025-09-03",
      tags: ["automation", "deployment"],
      assignee: "Sarah Wilson",
      estimatedHours: 16,
      completedHours: 0
    }
  ],
  filters: {
    search: '',
    status: 'all',
    priority: 'all',
    category: 'all'
  },
  sortBy: 'dueDate',
  sortOrder: 'asc'
};

export const taskReducer = (state, action) => {
  switch (action.type) {
    case TASK_ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, { ...action.payload, id: Date.now() }]
      };
    
    case TASK_ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    
    case TASK_ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    
    case TASK_ACTIONS.UPDATE_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    
    case TASK_ACTIONS.UPDATE_SORT:
      return {
        ...state,
        sortBy: action.payload.sortBy || state.sortBy,
        sortOrder: action.payload.sortOrder || state.sortOrder
      };
    
    default:
      return state;
  }
};
