import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Community from './pages/Community';
import Archive from './pages/Archive';
import VisaFlow from './pages/VisaFlow';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-on-surface antialiased">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/visa" element={<VisaFlow />} />
        </Routes>
      </div>
    </Router>
  );
}
