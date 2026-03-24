import { useState } from "react";
import pb from "../pocketbase";

function AddMedia({ type, refresh }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("plan");

  const handleAdd = async () => {
    if (!title) return;

    await pb.collection("media").create({
      title,
      type,
      status,
    });

    setTitle("");
    refresh();
  };

  return (
    <div className="card">
      <h2>Add {type}</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="plan">Plan to Watch</option>
        <option value="watching">Watching</option>
        <option value="completed">Completed</option>
      </select>

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddMedia;