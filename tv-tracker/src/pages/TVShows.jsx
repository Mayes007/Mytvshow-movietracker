import { useEffect, useState } from "react";
import pb from "../pocketbase";
import MediaCard from "../components/MediaCard";

function TVShows() {
  const [shows, setShows] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("plan");

  const fetchShows = async () => {
    const records = await pb.collection("media").getFullList({
      filter: 'type="tv"',
    });
    setShows(records);
  };

  useEffect(() => {
    fetchShows();
  }, []);

  const addShow = async () => {
    await pb.collection("media").create({
      title,
      type: "tv",
      status,
    });
    setTitle("");
    setStatus("plan"); // reset dropdown
    fetchShows();
  };

  // ✅ NEW: Section renderer
  const renderSection = (label, statusType) => (
    <>
      <h3>{label}</h3>
      <div className="grid">
        {shows
          .filter((s) => s.status === statusType)
          .map((s) => (
            <MediaCard key={s.id} item={s} refresh={fetchShows} />
          ))}
      </div>
    </>
  );

  return (
    <div className="page">
      <h2>📺 TV Shows</h2>

      <div className="form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Show title"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="plan">Watchlist</option>
          <option value="watching">Continue Watching</option>
          <option value="completed">Completed</option>
        </select>

        <button onClick={addShow}>Add Show</button>
      </div>

      {/* ✅ Sections */}
      {renderSection("📌 Watchlist", "plan")}
      {renderSection("👀 Continue Watching", "watching")}
      {renderSection("✅ Completed", "completed")}
    </div>
  );
}

export default TVShows;