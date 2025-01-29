// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import RoleSelection from './pages/RoleSelection';
import ClientInfo from './pages/ClinetsPage/ClientInfo';
import ClientMain from './pages/ClinetsPage/ClientsMain';
import ClientNews from './pages/ClinetsPage/ClientsNews';
import ClientProgram from './pages/ClinetsPage/ClinetProgram'
import ClientMap from './pages/ClinetsPage/ClinetMap';
import ClientListGym from './pages/ClinetsPage/ClientListGym';
import ClientTarinerList from './pages/ClinetsPage/ClientTarinerList'
import ClientTarinerProfile from './pages/ClinetsPage/ClientTrainerProfile';
import ClientsTrainerPage from './pages/ClinetsPage/ClientTrainerPage';
import ClientProfile from './pages/ClinetsPage/ClientProfile';

const App = () => {
  return (
    <Router>
      <Routes>
        {/*Общие страницы*/}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/role-selection" element={<RoleSelection />} />

        {/*Страницы клиента*/}
        <Route path="/client-info" element={<ClientInfo />} />
        <Route path="/client-main" element={<ClientMain />}>
          <Route path="news" element={<ClientNews />} />
          <Route path='programs' element={<ClientProgram />} />
          <Route path='map' element={<ClientMap />} />
          <Route path='list-gym' element={<ClientListGym />} />
          <Route path='list-trainer' element={<ClientTarinerList />} />
          <Route path='trainer-profile' element={<ClientTarinerProfile />} />
          <Route path='trainers' element={<ClientsTrainerPage />} />
          <Route path='profile' element={<ClientProfile />} />
        </Route>
      </Routes>   
    </Router>
  );
};

export default App;