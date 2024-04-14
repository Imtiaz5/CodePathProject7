// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '/client/supabaseClient';

const UpdateCrewmateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();  // Get crewmate ID from URL
  const [crewmate, setCrewmate] = useState({ name: '', speed: '', color: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from('crewmate')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching crewmate:', error);
        setError('Could not fetch crewmate data.');
      } else {
        setCrewmate({ name: data.name, speed: data.speed.toString(), color: data.color });
      }
    };

    fetchCrewmate();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('crewmate')
      .update({ name: crewmate.name, speed: parseFloat(crewmate.speed), color: crewmate.color })
      .eq('id', id);

    if (error) {
      console.error('Failed to update crewmate:', error);
      setError('Failed to update crewmate.');
    } else {
      navigate('/gallery');  // Redirect to the gallery page after update
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCrewmate((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>Edit Your Crewmate</h1>
      <form onSubmit={handleUpdate}>
        <label>
          Name:
          <input type="text" name="name" value={crewmate.name} onChange={handleChange} />
        </label>
        <label>
          Speed:
          <input type="number" name="speed" value={crewmate.speed} onChange={handleChange} />
        </label>
        <label>
          Color:
          <select name="color" value={crewmate.color} onChange={handleChange}>
            <option value="Red">Red</option>
            <option value="Green">Green</option>
            <option value="Blue">Blue</option>
            <option value="Purple">Purple</option>
            <option value="Yellow">Yellow</option>
            <option value="Orange">Orange</option>
            <option value="Pink">Pink</option>
            <option value="Rainbow">Rainbow</option>
          </select>
        </label>
        <button type="submit">Update Crewmate</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UpdateCrewmateForm;
