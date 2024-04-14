// CrewmateList.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const CrewmateList = ({ crewmates, onDeleteClick }) => {
  return (
    <div>
      {crewmates.map((crewmate) => (
        <div key={crewmate.id}>
          <h3><Link to={`/crewmate/${crewmate.id}`}>{crewmate.name}</Link></h3>
          <p>Speed: {crewmate.speed} mph</p>
          <p>Color: {crewmate.color}</p>
          <Link to={`/edit/${crewmate.id}`}>Update</Link>
          <button onClick={() => onDeleteClick(crewmate.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

CrewmateList.propTypes = {
  crewmates: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default CrewmateList;
