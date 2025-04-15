export default function Input({ ...props }) {
  return (
    <input
      {...props}
      style={{
        padding: '0.5rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginBottom: '0.5rem',
        width: '100%'
      }}
    />
  );
}