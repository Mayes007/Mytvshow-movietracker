import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/shows">TV Shows</Link>
    </nav>
  );
}

export default Navbar;