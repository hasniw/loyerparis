import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'LoyerParis - Prix des loyers à Paris 2026';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: '72px', fontWeight: 800, marginBottom: '24px' }}>
          <span style={{ color: '#f59e0b' }}>Loyer</span><span style={{ color: '#ffffff' }}>Paris</span>
        </div>
        <div style={{ fontSize: '32px', color: '#9ca3af', textAlign: 'center', maxWidth: '800px', lineHeight: 1.4 }}>
          Prix des loyers à Paris et Île-de-France en 2026
        </div>
        <div style={{ display: 'flex', gap: '24px', marginTop: '40px', fontSize: '20px', color: '#6b7280' }}>
          <span>🏠 20 arrondissements</span>
          <span>📊 Données 2026</span>
          <span>💰 Estimation gratuite</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
