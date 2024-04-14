// CreateCrewmateForm.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { supabase } from '/client/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
const CreateCrewmateForm = ({ onCrewmateAdded }) => {
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [color, setColor] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedSpeed = parseFloat(speed);
    if (isNaN(parsedSpeed)) {
      setError('Speed must be a valid number.');
      return;
    }

    const { data, error: insertError } = await supabase
      .from('crewmate')
      .insert([{ name, speed: parsedSpeed, color}]);

    if (insertError) {
      console.error('Failed to add crewmate:', insertError.message);
      setError('Failed to add crewmate: ' + insertError.message);
      toast.error('Failed to add crewmate: ' + insertError.message)
    } else {
      onCrewmateAdded(data[0]);
      setName('');
      setSpeed('');
      setColor('');
      setError('');
      navigate('/gallery');
      toast.success("You have successfully added crewmate! Check out the Gallery!");
    }
  };
  
  return (
    <div className="form-card">
      <h1>Create Your Crewmate</h1>
      <img src="/crewmates_group.png" alt="Create Crewmate" style={{ maxWidth: '35%', height: 'auto' }} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Crewmate Name"
        />
        <input
          type="number"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          placeholder="Crewmate Speed"
        />
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="">Select Color</option>
          <option value="Red">Red</option>
          <option value="Green">Green</option>
          <option value="Blue">Blue</option>
          <option value="Purple">Purple</option>
          <option value="Yellow">Yellow</option>
          <option value="Orange">Orange</option>
          <option value="Pink">Pink</option>
          <option value="Rainbow">Rainbow</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};


export default CreateCrewmateForm;
