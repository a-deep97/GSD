import logo from './logo.svg';
import './App.css';
import {useEfect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TasksPage from './components/tasks';
import AuthPage from './components/auth';
import TaskPage from './components/task';
import ProjectsPage from './components/projects';
import ProjectPage from './components/project';
import DashboardPage from './components/dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='auth' element={<AuthPage/>} />
          <Route path='' element={<TasksPage/>} />
          <Route path='tasks' element={<TasksPage/>} />
          <Route path='task' element={<TaskPage/>} />
          <Route path='projects' element={<ProjectsPage/>} />
          <Route path='project' element={<ProjectPage/>} />
          <Route path='dashboard' element={<DashboardPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
