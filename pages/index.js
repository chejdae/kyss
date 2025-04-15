import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [result, setResult] = useState(null);

  const years = Array.from({ length: 101 }, (_, i) => 1930 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!year || !month || !day) return alert('생년월일을 모두 선택해주세요.');
    const birth = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
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
          style={{ padding: '0.5rem', marginBottom: '0.5rem', display: 'block' }}
        />
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <select value={year} onChange={(e) => setYear(e.target.value)} required>
            <option value="">년도</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select value={month} onChange={(e) => setMonth(e.target.value)} required>
            <option value="">월</option>
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select value={day} onChange={(e) => setDay(e.target.value)} required>
            <option value="">일</option>
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>확인</button>
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
