"use client";

import Link from 'next/link';

export default function Crucigrama() {
  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      <div style={{ padding: '28px', borderRadius: '24px', background: '#f3f4f6', boxShadow: '0 24px 60px rgba(15, 23, 42, 0.12)' }}>
        <h2 style={{ margin: 0, color: '#111827', fontSize: '1.8rem' }}>Crucigrama</h2>
        <p style={{ color: '#475569', lineHeight: 1.8 }}>
          Aquí irá el crucigrama interactivo para repasar tu lección. Mientras tanto, puedes explorar el memorama o regresar a la selección de juegos.
        </p>
      </div>
      <Link href="/index/juegos/crucigrama" style={{ color: '#2563eb', fontWeight: 700 }}>
        Ver ruta de crucigrama existente
      </Link>
    </div>
  );
}
