// App.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import CreateCrewmateForm from '/components/CreateCrewmateForm';
import CrewmateList from '/components/CrewmateList';
import UpdateCrewmateForm from '/components/UpdateCrewMateForm';
import { supabase } from '/client/supabaseClient';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from '/components/Home';
import CrewmateGallery from '/components/CrewmateGallery';
import CrewmateInfo from '/components/CrewmateInfo';
import NavBar from '/components/NavBar';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    fetchCrewmates();
  }, []);

  const fetchCrewmates = async () => {
    const { data, error } = await supabase.from('crewmate').select('*');
    if (error) {
      console.error(error);
    } else {
      setCrewmates(data);
    }
  };

  const handleCrewmateAdded = (newCrewmate) => {
    setCrewmates([...crewmates, newCrewmate]);
  };

  const handleCrewmateUpdated = (updatedCrewmate) => {
    const updatedCrewmates = crewmates.map((crewmate) =>
      crewmate.id === updatedCrewmate.id ? updatedCrewmate : crewmate
    );
    setCrewmates(updatedCrewmates);
  };

  const handleCrewmateDeleted = async (id) => {
    const { error } = await supabase.from('crewmate').delete().match({ id });
    if (error) {
      console.error(error);
    } else {
      setCrewmates(crewmates.filter((crewmate) => crewmate.id !== id));
    }
  };

  return (
    <Router>
      <div className="container">
        <div className="sidebar">
          <NavBar />
        </div>
        <main className="main">
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCrewmateForm onCrewmateAdded={handleCrewmateAdded} />} />
            <Route path="/gallery/" element={<CrewmateGallery crewmates={crewmates} fetchCrewmates={fetchCrewmates} handleCrewmateUpdated={handleCrewmateUpdated} handleCrewmateDeleted={handleCrewmateDeleted} />} />
            <Route path="/edit/:id" element={<UpdateCrewmateForm crewmates={crewmates} onUpdate={fetchCrewmates} />} />
            <Route path="/crewmate/:id" element={<CrewmateInfo />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
