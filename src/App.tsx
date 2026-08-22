import React, { useState } from 'react';
import Transaksi from './pages/Transaction';
import Product from './pages/Product';
import Transaction from './pages/Transaction';

export default function App() {
  const [halamanAktif, setHalamanAktif] = useState<'transaksi' | 'produk'>('transaksi');

  return (
    <div>
      {/* Navbar Atas */}
      <nav style={{ background: '#1e3a8a', padding: '15px', color: '#fff', display: 'flex', gap: '20px' }}>
        <b style={{ marginRight: '20px' }}>🏪 CASHER POS</b>
        <button 
          onClick={() => setHalamanAktif('transaksi')} 
          style={{ background: halamanAktif === 'transaksi' ? '#3b82f6' : 'none', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px' }}
        >
          Menu Transaksi
        </button>
        <button 
          onClick={() => setHalamanAktif('produk')} 
          style={{ background: halamanAktif === 'produk' ? '#3b82f6' : 'none', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px' }}
        >
          Kelola Produk
        </button>
      </nav>

      {/* Konten Halaman Dinamis */}
      <main style={{ padding: '20px' }}>
        {halamanAktif === 'transaksi' ? <Transaction /> : <Product />}
      </main>
    </div>
  );
}