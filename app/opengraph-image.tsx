import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Toolbox - 유용한 소프트웨어를 한 곳에서';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #8b5cf6 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '40px',
        }}
      >
        <div style={{ fontSize: 180, marginBottom: 20 }}>🧰</div>
        <div style={{ fontSize: 80, fontWeight: 'bold', marginBottom: 20 }}>
          Toolbox
        </div>
        <div style={{ fontSize: 40, opacity: 0.9, textAlign: 'center' }}>
          유용한 소프트웨어를 한 곳에서
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

