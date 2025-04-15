import { useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function Home() {
  const [name, setName] = useState('');
  const [selected, setSelected] = useState();
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selected) return alert('날짜를 선택해주세요.');
    const birth = format(selected, 'yyyy-MM-dd');
    const res = await fetch(`/api/get-ilju?birth=${birth}`);
    const data = await res.json();
    setResult({ ...data, name });
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem' }}>나의 일주동물을 찾아보세요 🐾</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: '0.5rem', marginBottom: '1rem', display: 'block' }}
        />
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          captionLayout="dropdown"
          fromYear={1930}
          toYear={2030}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}>확인</button>
      </form>

      {result && (
        <div style={{ marginTop: '2rem', padding: '1rem', border: `3px solid ${result.color}`, borderRadius: '10px' }}>
          <h2 style={{ color: result.color }}>{result.name} 🐾</h2>
          <p><strong>{result.ilju}</strong> 일주</p>
          <p>{result.description}</p>
          <p style={{ marginTop: '1rem' }}>{result.compatibilityNote}</p>
          <ul>
            {result.matches?.map((m, i) => (
              <li key={i} style={{ marginBottom: '0.75rem' }}>
                <strong>{m.ilju} - {m.name}</strong><br />
                <span style={{ fontSize: '0.9rem', color: '#555' }}>{m.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
