import Navbar from "@/components/shared/navbar";

export default function Transaction() {
    return (
        <div className="flex h-screen flex-col">
            <Navbar>
                <div>
                    <h1 className="px-4 text-xl font-semibold">Transaksi</h1>
                    <p className="px-4 text-sm text-neutral-400">Kelola transaksi dengan mudah</p>
                </div>
            </Navbar>
            <div className="flex flex-1 flex-col gap-3 p-3">
                <div className="flex w-full items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
                    s
                </div>
                <div className="h-full w-full p-4 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-md">
                    <table className="w-full text-left text-sm">
                        <thead className=" text-slate-700">
                        <tr>
                            <th className="px-4 py-3 font-bold">Nama Produk</th>
                            <th className="px-4 py-3 font-bold">Deskripsi</th>
                            <th className="px-4 py-3 font-bold">Harga</th>
                            <th className="px-4 py-3 font-bold">Stok</th>
                            <th className="px-4 py-3 font-bold">Dibuat Pada</th>
                            <th className="px-4 py-3 font-bold text-end">Aksi</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}