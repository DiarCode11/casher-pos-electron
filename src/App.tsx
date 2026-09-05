import React, { useState } from 'react';
import { LayoutGrid, FileText, Calendar, BarChart2, Archive, MessageSquare, HelpCircle, LogOut, ShoppingCart, Handbag, Package, ArrowRightLeft } from 'lucide-react';
import Product from './pages/Product';
import Sales from './pages/Sales';
import { Tooltip, TooltipContent, TooltipTrigger } from './components/ui/tooltip';
import Purchase from './pages/Purchase';
import Transaction from './pages/Transaction';

type Halaman = 'sales' | 'produk' | 'pembelian' | 'purchase';

interface SidebarNavItem {
  key: Halaman;
  name: string;
  icon: typeof LayoutGrid;
  page: React.ReactNode
}

const sidebarNavItems: SidebarNavItem[] = [
  { key: 'sales', name: 'Penjualan', icon: ShoppingCart, page: <Sales /> },
  { key: 'purchase', name: 'Pembelian', icon: Handbag, page: <Purchase /> },
  { key: 'produk', name: 'Produk', icon: Package, page: <Product /> },
  { key: 'pembelian', name: 'Transaksi', icon: ArrowRightLeft, page: <Transaction /> },
];


export default function App() {
  const [halamanAktif, setHalamanAktif] = useState<Halaman>('sales');

  function getPageByKey(key: string): React.ReactNode | undefined {
    return sidebarNavItems.find((item) => item.key === key)?.page;
  }

  return (
    <div className="flex h-screen w-full bg-slate-100 font-sans text-slate-800">
      {/* Sidebar */}
      <div className="flex w-16 flex-col items-center justify-between bg-white py-5 border-r border-r-slate-200">
        <div className="flex flex-col items-center gap-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-lg font-semibold text-white">
            T
          </div>
          <nav className="flex flex-col gap-2">
            {sidebarNavItems.map(({ key, icon: Icon, name }) => (
              <Tooltip>
                <TooltipTrigger render={
                  <button
                    key={key}
                    onClick={() => setHalamanAktif(key)}
                    className={`flex items-center justify-center rounded-lg p-2 transition-colors ${
                      halamanAktif === key ? 'bg-green-600 text-white' : 'text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={18} />
                  </button>
                } />
                <TooltipContent side='right'>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
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
        {getPageByKey(halamanAktif)}
      </main>
    </div>
  );
}