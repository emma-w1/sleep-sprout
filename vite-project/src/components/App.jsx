import React, { useEffect, useState } from 'react';
import cong from "../configuration";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import { auth } from '../configuration';
import '../App.css'
import { useAuthState } from 'react-firebase-hooks/auth';

// App.js

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
        return <div>Loading...</div>;
  }

  return (
      <Routes>
            <Route 
              path="/" 
              element={user ? <Navigate to="/home" /> : <Login />} 
            />
              
            <Route 
                path="/home" 
                element={user ? <Home /> : <Navigate to="/" />} 
              />
      </Routes>
    );


}

export default App;