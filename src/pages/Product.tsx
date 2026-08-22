import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  nama: string;
  harga: number;
}

// Deklarasi interface global window untuk TypeScript agar tidak memunculkan error type posAPI
declare global {
  interface Window {
    posAPI: {
      getProduk: () => Promise<Product[]>;
      addProduk: (nama: string, harga: number) => Promise<{ success: boolean }>;
    };
  }
}

export default function Product() {
  const [listProduk, setListProduk] = useState<Product[]>([]);
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');

  // Memuat data produk secara realtime dari SQLite saat halaman dibuka
  const muatProduk = async () => {
    const data = await window.posAPI.getProduk();
    setListProduk(data);
  };

  useEffect(() => {
    muatProduk();
  }, []);

  const handleSimpan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !harga) return;

    await window.posAPI.addProduk(nama, Number(harga));
    setNama('');
    setHarga('');
    muatProduk(); // Memperbarui tampilan daftar produk
  };

  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2>Tambah Produk Baru</h2>
      <form onSubmit={handleSimpan} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input type="text" placeholder="Nama Produk" value={nama} onChange={(e) => setNama(e.target.value)} style={{ padding: '8px', width: '200px' }} />
        <input type="number" placeholder="Harga (Rp)" value={harga} onChange={(e) => setHarga(e.target.value)} style={{ padding: '8px', width: '150px' }} />
        <button type="submit" style={{ background: '#10b981', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px' }}>Simpan Ke SQLite</button>
      </form>

      <h2>Daftar Menu Produk</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f3f4f6', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nama Barang</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Harga Unit</th>
          </tr>
        </thead>
        <tbody>
          {listProduk.map((item) => (
            <tr key={item.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.id}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.nama}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Rp {item.harga.toLocaleString('id-ID')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
