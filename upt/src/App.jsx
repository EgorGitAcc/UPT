// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import RoleSelection from './pages/RoleSelection';
import ClientInfo from './pages/ClinetsPages/ClientInfo';
import ClientMain from './pages/ClinetsPage/ClientsMain';
import ClientNews from './pages/ClinetsPage/ClientsNews';


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
        <Route path="/client-main" element={<ClientMain />}>
          <Route path="news" element={<ClientNews />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;