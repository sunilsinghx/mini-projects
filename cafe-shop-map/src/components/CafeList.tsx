interface Cafe {
  id: number;
  name: string;
}

interface CafeListProps {
  cafes: Cafe[];
  onSelect: (id: number) => void;
}

export const CafeList = ({ cafes, onSelect }: CafeListProps) => {
  return (
    <div
      style={{
        padding: "1rem",
        background: "#f9f9f9",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <h3>Nearby Cafes</h3>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {cafes.map((cafe) => (
          <li
            key={cafe.id}
            onClick={() => onSelect(cafe.id)}
            style={{
              cursor: "pointer",
              padding: "0.5rem 0",
              borderBottom: "1px solid #ccc",
            }}
          >
            {cafe.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
