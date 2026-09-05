import Navbar from '@/components/shared/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { EllipsisVertical, FileSpreadsheet, Plus, Search, SquarePen, Trash2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ProductInterface } from '@/lib/interfaces/product.interface';

const formatRupiah = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);

export default function Product() {
  const [listProduk, setListProduk] = useState<ProductInterface[]>([]);
  const [addedData, setAddedData] = useState<Partial<ProductInterface>>({
    nama: '',
    description: '',
    harga: 0,
    stok: 0,
    unit: 'pcs',
    category: '',
  });
  const [search, setSearch] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
  const [deletedProduct, setDeletedProduct] = useState<ProductInterface | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductInterface | null>(null);

  // State edit form disamakan strukturnya dengan addedData (form create)
  const [editData, setEditData] = useState<Partial<ProductInterface>>({
    nama: '',
    description: '',
    harga: 0,
    stok: 0,
    unit: 'pcs',
    category: '',
  });

  const muatProduk = async () => {
    const data = await window.posAPI.getProducts();
    setListProduk(data);
  };

  useEffect(() => {
    muatProduk();
  }, []);

  const filteredProduk = listProduk.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  const handleSimpan = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!addedData.nama?.trim() || !addedData.harga || addedData.harga <= 0) return;

    await window.posAPI.addProduct({
      ...addedData,
      nama: addedData.nama.trim(),
      description: addedData.description?.trim(),
      harga: Number(addedData.harga),
      stok: addedData.stok ?? 0,
      unit: addedData.unit?.trim() || 'pcs',
      category: addedData.category?.trim() || undefined,
    });
    setAddedData({ nama: '', description: '', harga: 0, stok: 0, unit: 'pcs', category: '' });
    setIsSheetOpen(false);
    await muatProduk();
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingProduct || !editData.nama?.trim() || !editData.harga || editData.harga <= 0) {
      return;
    }

    await window.posAPI.updateProduct({
      ...editingProduct,
      ...editData,
      nama: editData.nama.trim(),
      description: editData.description?.trim(),
      harga: Number(editData.harga),
      stok: editData.stok ?? 0,
      unit: editData.unit?.trim() || 'pcs',
      category: editData.category?.trim() || undefined,
    });

    setEditingProduct(null);
    setIsEditSheetOpen(false);
    await muatProduk();
  };

  const bukaEditProduct = (product: ProductInterface) => {
    setEditingProduct(product);
    setEditData({
      nama: product.nama,
      description: product.description ?? '',
      harga: product.harga,
      stok: product.stok ?? 0,
      unit: product.unit ?? 'pcs',
      category: product.category ?? '',
    });
    setIsEditSheetOpen(true);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (deletedProduct) {
      await window.posAPI.deleteProduct(deletedProduct.id);
      setDeletedProduct(null);
      setIsModalDeleteOpen(false);
      await muatProduk();
    }
  }

  const formatAngka = (value: number | undefined) => {
    if (!value) return '';
    return `Rp${new Intl.NumberFormat('id-ID').format(value)}`;
    };

    const parseAngka = (value: string) => {
    // Hapus semua karakter selain digit (titik ribuan, dsb)
    const angkaBersih = value.replace(/\D/g, '');
        return angkaBersih ? Number(angkaBersih) : 0
    };

  return (
    <div className="flex h-screen flex-col">
      <Navbar>
        <div>
          <h1 className="px-4 text-xl font-semibold">Produk</h1>
          <p className="px-4 text-sm text-neutral-400">Kelola produk dengan mudah</p>
        </div>
      </Navbar>

      {/* Modal Delete */}
      <Dialog open={isModalDeleteOpen} onOpenChange={setIsModalDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={"text-red-600"}>Konfirmasi Hapus Produk</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus produk '{deletedProduct?.nama}'?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalDeleteOpen(false)}>
              Batal
            </Button>
            <Button className={"bg-red-600"} onClick={handleDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sheet Edit Produk — form disamakan dengan form Tambah Produk */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent side="right" className="w-full px-3 sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">Ubah Produk</SheetTitle>
          </SheetHeader>

          <form onSubmit={handleUpdate} className="flex flex-col gap-4 px-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama Produk</label>
              <Input
                type="text"
                placeholder="Masukkan nama produk"
                value={editData.nama ?? ''}
                onChange={(e) => setEditData((current) => ({ ...current, nama: e.target.value }))}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Deskripsi</label>
              <textarea
                placeholder="Masukkan deskripsi produk"
                value={editData.description ?? ''}
                onChange={(e) => setEditData((current) => ({ ...current, description: e.target.value }))}
                className="rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Harga</label>
              <Input
                type="text"
                min="0"
                placeholder="Masukkan harga produk"
                value={editData.harga || ''}
                onChange={(e) => setEditData((current) => ({ ...current, harga: Number(e.target.value) }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Satuan</label>
              <Input
                type="text"
                placeholder="Masukkan satuan produk"
                value={editData.unit ?? ''}
                onChange={(e) => setEditData((current) => ({ ...current, unit: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Kategori</label>
              <Input
                type="text"
                placeholder="Masukkan kategori produk"
                value={editData.category ?? ''}
                onChange={(e) => setEditData((current) => ({ ...current, category: e.target.value }))}
              />
            </div>

            <SheetFooter className="px-0 pb-0">
              <div className="flex w-full gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 py-4"
                  onClick={() => setIsEditSheetOpen(false)}
                >
                  Batal
                </Button>
                <Button type="submit" className="flex-1 bg-blue-600 py-4 text-white hover:bg-blue-700">
                  Simpan Perubahan
                </Button>
              </div>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col gap-3 p-3">
        <div className="flex w-full items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
          <div className="relative w-100">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari menu..."
              className="w-full pl-9"
            />
          </div>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[{ value: '1', label: 'Kategori 1' }, { value: '2', label: 'Kategori 2' }].map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex flex-1 justify-end gap-2">
            <Button className="bg-green-600 py-4 text-white hover:bg-green-700">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Eksport
            </Button>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger
                render={
                  <Button className=" py-4 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Produk
                  </Button>
                }
              />

              <SheetContent side="right" className="w-full sm:max-w-md px-3">
                <SheetHeader>
                  <SheetTitle className={"font-semibold text-lg"}>Tambah Produk Baru</SheetTitle>
                </SheetHeader>

                <form onSubmit={handleSimpan} className="flex flex-col gap-4 px-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nama Produk</label>
                    <Input
                      type="text"
                      placeholder="Masukkan nama produk"
                      value={addedData.nama ?? ''}
                      onChange={(e) => setAddedData((current) => ({ ...current, nama: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2 flex flex-col">
                    <label className="text-sm font-medium">Deskripsi</label>
                    <textarea
                      placeholder="Masukkan deskripsi produk"
                      value={addedData.description ?? ''}
                      onChange={(e) => setAddedData((current) => ({ ...current, description: e.target.value }))}
                      className="border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Harga</label>
                    <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="Masukkan harga produk"
                        value={formatAngka(addedData.harga)}
                        onChange={(e) => {
                        const angka = parseAngka(e.target.value);
                        setAddedData((current) => ({ ...current, harga: angka }));
                        }}
                    />
                </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Satuan</label>
                    <Input
                      type="text"
                      placeholder="Masukkan satuan produk"
                      value={addedData.unit ?? ''}
                      onChange={(e) => setAddedData((current) => ({ ...current, unit: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Kategori</label>
                    <Input
                      type="text"
                      placeholder="Masukkan kategori produk"
                      value={addedData.category ?? ''}
                      onChange={(e) => setAddedData((current) => ({ ...current, category: e.target.value }))}
                    />
                  </div>

                  <SheetFooter className="px-0 pb-0">
                    <div className="flex w-full gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 py-4"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        Batal
                      </Button>
                      <Button type="submit" className="flex-1 py-4 bg-blue-600 text-white hover:bg-blue-700">
                        Simpan
                      </Button>
                    </div>
                  </SheetFooter>
                </form>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="h-full w-full p-4 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-md">
          <table className="w-full text-left text-sm">
            <thead className=" text-slate-700">
              <tr>
                <th className="px-4 py-3 font-bold">Nama Produk</th>
                <th className="px-4 py-3 font-bold">Deskripsi</th>
                <th className="px-4 py-3 font-bold">Harga</th>
                <th className="px-4 py-3 font-bold">Stok</th>
                <th className="px-4 py-3 font-bold">Satuan</th>
                <th className="px-4 py-3 font-bold">Dibuat Pada</th>
                <th className="px-4 py-3 font-bold text-end">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredProduk.length > 0 ? (
                filteredProduk.map((item) => (
                  <tr key={item.id} className="border-t border-slate-200 hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-700">{item.nama}</td>
                    <td className="px-4 py-3 font-medium text-slate-700">{item.description ?? "-"}</td>
                    <td className="px-4 py-3 text-emerald-600">{formatRupiah(item.harga)}</td>
                    <td className="px-4 py-3 font-medium text-slate-700">{item.stok}</td>
                    <td className="px-4 py-3 font-medium text-slate-700">{item.unit}</td>
                    <td className="px-4 py-3 font-medium text-slate-700">{item.created_at}</td>
                    <td className="px-4 py-3 font-medium text-slate-700 flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="ghost">
                          <EllipsisVertical />
                        </Button>} />
                        <DropdownMenuContent>
                          <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => bukaEditProduct(item)}>
                              <SquarePen />
                              Ubah
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                            onClick={() => {
                              setDeletedProduct(item);
                              setIsModalDeleteOpen(true);
                            }} 
                              className={"text-red-500 hover:text-red-600"}>
                              <Trash2 />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                    Belum ada produk yang tersedia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}