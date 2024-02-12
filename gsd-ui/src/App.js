import logo from './logo.svg';
import './App.css';
import {useEfect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TasksPage from './components/tasks';
import AuthPage from './components/auth';
import ProjectsPage from './components/projects';
import DashboardPage from './components/dashboard';
import SearchPage from './components/search';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<AuthPage/>} /> 
          <Route path='/auth/:isSignup' element={<AuthPage/>} />
          <Route path='/' element={<TasksPage/>} />
          <Route path='/tasks' element={<TasksPage/>} />
          <Route path='/projects' element={<ProjectsPage/>} />
          <Route path='/dashboard' element={<DashboardPage/>} />
          <Route path='/search' element={<SearchPage/>}/>
          <Route path='/search/:searchtext' element={<SearchPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
