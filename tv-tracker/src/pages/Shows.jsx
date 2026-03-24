import { useEffect, useState } from "react";
import pb from "../pocketbase";
import AddMedia from "../components/AddMedia";
import StatusSection from "../components/StatusSection";

function Shows() {
  const [media, setMedia] = useState([]);

  const fetchMedia = async () => {
    const records = await pb.collection("media").getFullList();
    setMedia(records.filter((item) => item.type === "show"));
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <div>
      <h1>📺 TV Shows</h1>

      <AddMedia type="show" refresh={fetchMedia} />

      <StatusSection
        title="Plan to Watch"
        items={media.filter((m) => m.status === "plan")}
        refresh={fetchMedia}
      />

      <StatusSection
        title="Watching"
        items={media.filter((m) => m.status === "watching")}
        refresh={fetchMedia}
      />

      <StatusSection
        title="Completed"
        items={media.filter((m) => m.status === "completed")}
        refresh={fetchMedia}
      />
    </div>
  );
}

export default Shows;