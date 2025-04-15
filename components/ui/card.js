export default function Card({ title, content, color, children }) {
  return (
    <div
      style={{
        border: `3px solid ${color || '#ccc'}`,
        borderRadius: '10px',
        padding: '1rem',
        marginTop: '1rem',
        backgroundColor: '#fafafa'
      }}
    >
      <h2 style={{ color }}>{title}</h2>
      <p>{content}</p>
      {children}
    </div>
  );
}