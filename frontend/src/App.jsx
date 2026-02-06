import React from 'react';
import Login from './components/Login';
import Landing from './pages/Landing';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import ProtectedRoutes from './components/ProtectedRoutes';

const App = () => {

  const { showUserLogin } = useAppContext();

  return (
    <>

      <Toaster />
      {
        showUserLogin && <Login />
      }
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/dashboard' element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        } />
      </Routes>
    </>
  );
}

export default App;
