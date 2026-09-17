import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        <NavLink className="navbar-brand d-flex items-center font-weight-bold" to="/">
          <span className="text-warning mr-2">🪔</span> CultureNest
        </NavLink>
        
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink 
                to="/" 
                end
                className={({ isActive }) => `nav-link px-3 ${isActive ? 'active font-weight-bold text-warning' : ''}`}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/community" 
                className={({ isActive }) => `nav-link px-3 ${isActive ? 'active font-weight-bold text-warning' : ''}`}
              >
                Community
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/visa" 
                className={({ isActive }) => `nav-link px-3 ${isActive ? 'active font-weight-bold text-warning' : ''}`}
              >
                Cultural Visa &amp; Passport
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
