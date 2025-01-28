// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import RoleSelection from './pages/RoleSelection';
import ClientInfo from './pages/ClientInfo';

const App = () => {
  return (
    <Router>
      <Routes>
        {/*Общие страницы*/}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/role-selection" element={<RoleSelection />} />

        {/*Страницы клиента*/}
        <Route path="/client-info" element={<ClientInfo />} />
      </Routes>
    </Router>
  );
};

export default App;