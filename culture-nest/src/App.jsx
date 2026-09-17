import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Community from './pages/Community';
import Archive from './pages/Archive';
import VisaFlow from './pages/VisaFlow';
import Login from './pages/Login';
import TouristHome from './pages/TouristHome';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-on-surface antialiased">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/tourist" element={<TouristHome />} />
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/visa" element={<VisaFlow />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
