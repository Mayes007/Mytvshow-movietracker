import { useEffect, useState } from "react";
import pb from "../pocketbase";
import MediaCard from "../components/MediaCard";

// ... existing imports

function TVShows() {
  // ... existing state

  const fetchShows = async () => {
    const records = await pb.collection("media").getFullList({
      // CHANGED: Match "Tv Show" from your screenshot
      filter: 'type="Tv Show"', 
    });
    setShows(records);
  };

  // ... useEffect

  const addShow = async () => {
    await pb.collection("media").create({
      title,
      type: "Tv Show", // CHANGED: Match "Tv Show"
      status,
    });
    setTitle("");
    setStatus("Watchlist"); // CHANGED: Match "Watchlist"
    fetchShows();
  };

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
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Show title" />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {/* CHANGED: Values must match the strings in your DB screenshot */}
          <option value="Watchlist">Watchlist</option>
          <option value="Continue Watching">Continue Watching</option>
          <option value="Compete">Completed</option> 
        </select>
        <button onClick={addShow}>Add Show</button>
      </div>

      {/* CHANGED: Status keys must match exactly */}
      {renderSection("📌 Watchlist", "Watchlist")}
      {renderSection("👀 Continue Watching", "Continue Watching")}
      {renderSection("✅ Completed", "Compete")}
    </div>
  );
}

export default TVShows;