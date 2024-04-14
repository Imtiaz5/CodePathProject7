// CrewmateGallery.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '/client/supabaseClient';

const CrewmateGallery = ({ crewmates, fetchCrewmates, handleCrewmateUpdated, handleCrewmateDeleted }) => {
  useEffect(() => {
    fetchCrewmates();
  }, [fetchCrewmates]);

  const shadowStyle = (color) => {
    if (color.toLowerCase() === "rainbow") {
      return {
        boxShadow: `
          3px 0 5px red, 
          -3px 0 5px blue, 
          0 3px 5px green, 
          0 -3px 5px yellow`
      };
    } else {
      return {
        boxShadow: `0 4px 8px ${color}`,
      };
    }
  };
  

  return (
    <div className="crewmate-gallery">
      <h1>Your Crewmate Gallery!</h1>
      <div className="card-container">
        {crewmates.length > 0 ? (
          crewmates.map(crewmate => (
            <div key={crewmate.id} className="card" style={shadowStyle(crewmate.color)}>
              <img src={`/crewmate_sil_${crewmate.color}.png`} alt={`${crewmate.name} Silhouette`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <h3><Link to={`/crewmate/${crewmate.id}`}>{crewmate.name}</Link></h3>
              <p>Speed: {crewmate.speed} mph</p>
              <p>Color: {crewmate.color}</p>
              <div className="button-group">
                <Link to={`/edit/${crewmate.id}`} className="button">Edit</Link>
                <button onClick={() => handleCrewmateDeleted(crewmate.id)} className="button">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>You have not made a crewmate yet!</p>
        )}
      </div>
    </div>
  );
};

export default CrewmateGallery;
