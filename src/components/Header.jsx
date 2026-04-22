import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/globals.css';

const Header = () => {
  return (
    <div className="hero-home">
      <h1>CREATORVERSE</h1>
      <div className="buttons">
        <Link to="/list" className="home-button">VIEW ALL CREATORS</Link>
        <Link to="/add" className="home-button">ADD A CREATOR</Link>
      </div>
    </div>
  );
};

export default Header;
