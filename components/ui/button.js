export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      {children}
    </button>
  );
}