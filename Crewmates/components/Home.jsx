// Home.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Crewmate Creation Hub!</h1>
      <img src="/crewmates_group.png" alt="Welcome Image" style={{ maxWidth: '25%', height: 'auto' }} />
      <p>Explore the website to create and manage your own crewmates.</p>
      <Link to="/create">Create A Crewmate</Link>
    </div>
  );
};

export default Home;
