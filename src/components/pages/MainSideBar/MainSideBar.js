import React from 'react';
import { NavBarData } from './SideBarData';
import { Link } from 'react-router-dom';
import logo from '../../../media/eco-soap-logo.png';

import './MainSideBar.css';

function Navbar() {
  return (
    <nav className="nav-menu">
      <div className="nav-menu-items">
        <li className="mainLI">
          <Link to="/dashboard">
            <img id="navBarLogo" src={logo} alt="Eco-Soap Logo" />
          </Link>
        </li>
        {NavBarData.map((item, index) => (
          <li key={index} className={item.cName}>
            <Link to={item.path}>
              <span>{item.title}</span>
              {item.icon}
            </Link>
          </li>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
