import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  nama: string;
  harga: number;
}

interface CartItem extends Product {
  jumlah: number;
}

export default function Transaction() {
  const [produkTersedia, setProdukTersedia] = useState<Product[]>([]);
  const [keranjang, setKeranjang] = useState<CartItem[]>([]);

  useEffect(() => {
    window.posAPI.getProduk().then(setProdukTersedia);
  }, []);

  const tambahKeKeranjang = (produk: Product) => {
    const ada = keranjang.find((item) => item.id === produk.id);
    if (ada) {
      setKeranjang(keranjang.map((item) => item.id === produk.id ? { ...item, jumlah: item.jumlah + 1 } : item));
    } else {
      setKeranjang([...keranjang, { ...produk, jumlah: 1 }]);
    }
  };

  const totalBelanja = keranjang.reduce((sum, item) => sum + item.harga * item.jumlah, 0);

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* Sisi Kiri: Pilihan Produk */}
      <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '8px' }}>
        <h2>Pilih Menu Barang</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {produkTersedia.map((item) => (
            <div key={item.id} onClick={() => tambahKeKeranjang(item)} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', cursor: 'pointer', background: '#f9fafb' }}>
              <h4>{item.nama}</h4>
              <p style={{ color: '#2563eb' }}>Rp {item.harga.toLocaleString('id-ID')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sisi Kanan: Struk Keranjang Belanja */}
      <div style={{ width: '350px', background: '#fff', padding: '20px', borderRadius: '8px' }}>
        <h2>Keranjang Belanja</h2>
        {keranjang.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>{item.nama} (x{item.jumlah})</span>
            <span>Rp {(item.harga * item.jumlah).toLocaleString('id-ID')}</span>
          </div>
        ))}
        <hr style={{ margin: '15px 0' }} />
        <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Total:</span>
          <span style={{ color: '#dc2626' }}>Rp {totalBelanja.toLocaleString('id-ID')}</span>
        </h3>
        <button onClick={() => { alert('Transaksi Berhasil Disimpan!'); setKeranjang([]); }} style={{ width: '100%', background: '#2563eb', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', marginTop: '10px', fontSize: '16px' }}>
          Bayar / Cetak Struk
        </button>
      </div>
    </div>
  );
}