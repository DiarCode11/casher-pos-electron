import React, { useState } from 'react';
import { LayoutGrid, FileText, Calendar, BarChart2, Archive, MessageSquare, HelpCircle, LogOut } from 'lucide-react';
import Product from './pages/Product';
import Transaction from './pages/Transaction';
import Sales from './pages/Sales';

type Halaman = 'transaksi' | 'produk';

interface SidebarNavItem {
  key: Halaman;
  icon: typeof LayoutGrid;
}

const sidebarNavItems: SidebarNavItem[] = [
  { key: 'transaksi', icon: LayoutGrid },
  { key: 'produk', icon: FileText },
];

const extraIcons = [Calendar, BarChart2, Archive, MessageSquare];

export default function App() {
  const [halamanAktif, setHalamanAktif] = useState<Halaman>('transaksi');

  return (
    <div className="flex h-screen w-full bg-slate-100 font-sans text-slate-800">
      {/* Sidebar */}
      <div className="flex w-16 flex-col items-center justify-between bg-white py-5 border-r border-r-slate-200">
        <div className="flex flex-col items-center gap-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-semibold text-white">
            T
          </div>
          <nav className="flex flex-col gap-2">
            {sidebarNavItems.map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setHalamanAktif(key)}
                className={`flex items-center justify-center rounded-lg p-2 transition-colors ${
                  halamanAktif === key ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-100'
                }`}
              >
                <Icon size={18} />
              </button>
            ))}
            {extraIcons.map((Icon, i) => (
              <button
                key={i}
                className="flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <Icon size={18} />
              </button>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-2">
          <button className="flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-100">
            <HelpCircle size={18} />
          </button>
          <button className="flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-100">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Konten Halaman Dinamis */}
      <main className="flex-1 overflow-hidden">
        {halamanAktif === 'transaksi' ? <Sales /> : <Product />}
      </main>
    </div>
  );
}