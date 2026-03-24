import MediaCard from "./MediaCard";

function StatusSection({ title, items, refresh }) {
  return (
    <div>
      <h3>{title}</h3>
      {items.length === 0 && <p>Nothing here</p>}

      <div className="list">
        {items.map((item) => (
          <MediaCard key={item.id} item={item} refresh={refresh} />
        ))}
      </div>
    </div>
  );
}

export default StatusSection;