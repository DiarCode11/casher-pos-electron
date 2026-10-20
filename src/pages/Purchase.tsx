import Navbar from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Search } from "lucide-react";

export default function Purchase() {
    return (
        <div className="flex h-screen flex-col">
            <Navbar>
                <div>
                    <h1 className="px-4 text-xl font-semibold">Pembelian</h1>
                    <p className="px-4 text-sm text-neutral-400">Kelola pembelian dengan mudah</p>
                </div>
            </Navbar>
            <div className="flex flex-1 flex-col gap-3 p-3">
                <div className="flex w-full items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
                   <div className="relative w-100">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Cari transaksi..."
                            className="w-full pl-9"
                        />
                    </div>
                    <div className="flex flex-1 justify-end gap-2">
                        <Sheet>
                            <SheetTrigger>
                                <Button>
                                    Tambah Pembelian
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                <SheetTitle>Are you absolutely sure?</SheetTitle>
                                <SheetDescription>This action cannot be undone.</SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
                <div className="h-full w-full p-4 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-md">
                    <table className="w-full text-left text-sm">
                        <thead className=" text-slate-700">
                        <tr>
                            <th className="px-4 py-3 font-bold">ID Produk</th>
                            <th className="px-4 py-3 font-bold">Nama Produk</th>
                            <th className="px-4 py-3 font-bold">Harga Per Item</th>
                            <th className="px-4 py-3 font-bold">Jumlah Item</th>
                            <th className="px-4 py-3 font-bold">Sub Total</th>
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