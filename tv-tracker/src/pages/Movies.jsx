import { useEffect, useState } from "react";
import pb from "../pocketbase";
import MediaCard from "../components/MediaCard";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("plan");

  const fetchMovies = async () => {
    const records = await pb.collection("media").getFullList({
      filter: 'type="movie"',
    });
    setMovies(records);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const addMovie = async () => {
    await pb.collection("media").create({
      title,
      type: "movie",
      status,
    });
    setTitle("");
    setStatus("plan"); // reset dropdown
    fetchMovies();
  };

  // ✅ NEW: Section renderer
  const renderSection = (label, statusType) => (
    <>
      <h3>{label}</h3>
      <div className="grid">
        {movies
          .filter((m) => m.status === statusType)
          .map((m) => (
            <MediaCard key={m.id} item={m} refresh={fetchMovies} />
          ))}
      </div>
    </>
  );

  return (
    <div className="page">
      <h2>🎬 Movies</h2>

      <div className="form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Movie title"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="plan">Watchlist</option>
          <option value="watching">Continue Watching</option>
          <option value="completed">Completed</option>
        </select>

        <button onClick={addMovie}>Add Movie</button>
      </div>

      {/* ✅ Sections */}
      {renderSection("📌 Watchlist", "plan")}
      {renderSection("👀 Continue Watching", "watching")}
      {renderSection("✅ Completed", "completed")}
    </div>
  );
}

export default Movies;