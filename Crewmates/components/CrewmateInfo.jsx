// CrewmateInfo.jsx
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '/client/supabaseClient';

const CrewmateInfo = () => {
    const { id } = useParams();
    const [crewmate, setCrewmate] = useState(null);
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchCrewmate = async () => {
            const { data, error } = await supabase
                .from('crewmate')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching crewmate:', error);
            } else {
                setCrewmate(data);
                updateDescription(data.speed);
            }
        };

        fetchCrewmate();
    }, [id]);

    const updateDescription = (speed) => {
        if (speed < 5) {
            setDescription('This Crewmate is slow, you might want to pick some other crewmate.');
        } else if (speed <= 8) {
            setDescription('This Crewmate has Average speed, a solid teammate.');
        } else if (speed <= 12) {
            setDescription('This Crewmate is pretty fast, a fine addition to your team!');
        } else {
            setDescription('This Crewmate is the Fastest there is!');
        }
    };

    if (!crewmate) return <div>Loading...</div>;

    return (
        <div>
            <h1>Crewmate: {crewmate.name}</h1>
            <h2>Stats:</h2>
            <p>Color: {crewmate.color}</p>
            <p>Speed: {crewmate.speed} mph</p>
            <p>{description}</p>
            <Link to={`/edit/${crewmate.id}`}>Edit This Crewmate</Link>
        </div>
    );
};

export default CrewmateInfo;
