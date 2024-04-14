// components/NavBar.jsx
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="nav-bar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/create">Create a Crewmate</Link></li>
        <li><Link to="/gallery">Crewmate Gallery</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
