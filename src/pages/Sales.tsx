import Navbar from "@/components/shared/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard, { Product } from "@/components/sales/product-card";
import { ProductInterface } from "@/lib/interfaces/product.interface";

const items = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);

type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

export default function Sales() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const loadProducts = async () => {
    const data: ProductInterface[] = await window.posAPI.getProducts();
    setProducts(
      data.map((product) => ({
        id: product.id,
        name: product.nama,
        price: product.harga,
        stock: product.stok,
      }))
    );
  };

  useEffect(() => {
    void loadProducts();
  }, []);

  const addToCart = (product: (typeof products)[number]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const isInCart = (id: number) => cart.some((item) => item.id === id);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="flex h-screen flex-col">
      <Navbar>
        <h1 className="px-4 text-xl">Penjualan</h1>
      </Navbar>
      <div className="flex flex-1 overflow-y-auto p-3 pb-3 gap-4">
        {/* Kiri: search + grid produk */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          <div className="w-full rounded-xl shadow-sm bg-white p-3 flex gap-3">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Cari menu..." className="pl-9 w-full" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="h-full w-full bg-white rounded-xl shadow-md border p-4 overflow-y-auto overlay-scroll">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  inCart={isInCart(product.id)}
                  onAdd={addToCart}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Kanan: invoice / keranjang */}
        <div className="h-full w-[350px] shrink-0 rounded-xl bg-white shadow-md p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <h1 className="text-lg font-semibold">Tagihan</h1>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col gap-2">
            {cart.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center mt-10">
                Belum ada item, klik tombol tambah di produk.
              </p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-2 border-b pb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{formatRupiah(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6"
                      onClick={() => updateQty(item.id, -1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-5 text-center text-sm">{item.qty}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6"
                      onClick={() => updateQty(item.id, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t pt-3 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span>Total</span>
              <span className="font-semibold">{formatRupiah(total)}</span>
            </div>
            <Button className="w-full" disabled={cart.length === 0}>
              Bayar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}