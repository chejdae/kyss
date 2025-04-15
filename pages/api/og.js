import { ImageResponse } from '@vercel/og';
import { iljuAnimalDB } from '../../lib/iljuAnimalDB';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name') || '이름없음';
  const ilju = searchParams.get('ilju') || '기유';
  const data = iljuAnimalDB[ilju] || {};

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          fontSize: 40,
          fontFamily: 'sans-serif',
          color: '#333',
        }}
      >
        <div style={{ fontSize: 60, fontWeight: 'bold', color: data.color || '#000' }}>
          {name}의 일주동물은
        </div>
        <div style={{ marginTop: 20, fontSize: 80 }}>{data.name || '알 수 없음'}</div>
        <div style={{ marginTop: 40, fontSize: 36 }}>{data.description || ''}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}