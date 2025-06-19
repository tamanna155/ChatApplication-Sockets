import React from 'react';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';

export default function App(){
  return(
  <Router>
  <Routes>
    <Route path='/register' element={<Register />} />
    <Route path='/login' element={<Login />} />
    <Route path='/' element={<Chat />} />
    <Route path='/setAvatar' element={<SetAvatar />} />
  </Routes>
  </Router>
  );
}