import { useEffect, useState } from "react";
import pb from "../pocketbase";
import MediaCard from "../components/MediaCard";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  // Set default state to match your DB string "Watchlist"
  const [status, setStatus] = useState("Watchlist");

  const fetchMovies = async () => {
    try {
      const records = await pb.collection("media").getFullList({
        // Updated: Match "Movie" in PocketBase
        filter: 'type="Movie"',
      });
      setMovies(records);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const addMovie = async () => {
    if (!title) return; // Prevent empty adds

    try {
      await pb.collection("media").create({
        title,
        type: "Movie", // Updated: Match "Movie"
        status,
      });
      setTitle("");
      setStatus("Watchlist"); // Reset to default
      fetchMovies();
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  // ✅ Section renderer using exact DB strings
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
          <option value="Watchlist">Watchlist</option>
          <option value="Continue Watching">Continue Watching</option>
          <option value="Compete">Completed</option>
        </select>

        <button onClick={addMovie}>Add Movie</button>
      </div>

      {/* ✅ Sections matching your PocketBase data exactly */}
      {renderSection("📌 Watchlist", "Watchlist")}
      {renderSection("👀 Continue Watching", "Continue Watching")}
      {renderSection("✅ Completed", "Compete")}
    </div>
  );
}

export default Movies;