import logo from './logo.svg';
import './App.css';
import {useEfect, useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TasksPage from './components/tasks';
import AuthPage from './components/auth';
import ProjectsPage from './components/projects';
import DashboardPage from './components/dashboard';
import SearchPage from './components/search';

import { jwtToken } from './lib/jwt';

function App() {

  const [isLoggedIn,setIsloggedIn] = useState(false);
  useEffect(()=>{
    if(jwtToken()){
      setIsloggedIn(true);
    }else{
      setIsloggedIn(false);
    }
  },[]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<AuthPage setIsloggedIn={setIsloggedIn} />} /> 
          <Route path='/auth/:isSignup' element={<AuthPage/>} />
          <Route path='/' element={isLoggedIn ? <TasksPage/> : <AuthPage/>} />
          <Route path='/tasks' element={isLoggedIn ? <TasksPage/> : <AuthPage/>} />
          <Route path='/projects' element={isLoggedIn ? <ProjectsPage/> : <AuthPage/>} />
          <Route path='/dashboard' element={isLoggedIn ? <DashboardPage/> : <AuthPage/>} />
          <Route path='/search' element={isLoggedIn ? <SearchPage/>: <AuthPage/>}/>
          <Route path='/search/:searchtext' element={isLoggedIn ? <SearchPage/> : <AuthPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
