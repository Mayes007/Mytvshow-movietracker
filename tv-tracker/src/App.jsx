import { Routes, Route, Link } from "react-router-dom";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";

function App() {
  return (
    <div>
      <nav className="nav">
        <h1>🎬 TV Tracker</h1>
        <div>
          <Link to="/">Movies</Link>
          <Link to="/tv">TV Shows</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/tv" element={<TVShows />} />
      </Routes>
    </div>
  );
}

export default App;