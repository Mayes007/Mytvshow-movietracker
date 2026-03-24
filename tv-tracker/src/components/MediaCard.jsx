function MediaCard({ item }) {
  return (
    <div className="card">
      <h3>{item.title}</h3>
      <p>Status: {item.status}</p>
    </div>
  );
}

export default MediaCard;