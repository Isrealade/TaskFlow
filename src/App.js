import React from 'react';
import Layout from './components/layout/Layout';
import TaskManager from './pages/TaskManager';
import './App.css';

function App() {
  return (
    <div className="App">
      <Layout>
        <TaskManager />
      </Layout>
    </div>
  );
}

export default App;
