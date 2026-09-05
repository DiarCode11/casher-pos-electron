import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image?: string;
};

type ProductCardProps = {
  product: Product;
  inCart: boolean;
  onAdd: (product: Product) => void;
};

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

export default function ProductCard({ product, inCart, onAdd }: ProductCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border-2 shadow-sm overflow-hidden bg-white transition-all",
        product.stock <= 0 
          ? "border-gray-50 bg-white"
          :  inCart
              ? "border-green-500 ring-2 ring-green-100"
              : "border-transparent hover:shadow-md hover:border-muted"
      )}
    >
      <div className="relative h-[100px] w-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          "No Image"
        )}
        {inCart && (
          <div className="absolute top-1.5 right-1.5 bg-green-500 text-white rounded-full p-1">
            <Check className="h-3 w-3" />
          </div>
        )}
      </div>

      <div className="p-2.5 flex flex-col gap-0.5">
        <span className="text-sm font-medium truncate">{product.name}</span>
        <span className={`text-sm font-bold ${product.stock <= 0 ? "text-gray-400" : "text-green-600"}`}>
          {formatRupiah(product.price)}
        </span>
        <span className="text-xs text-muted-foreground">Stok: {product.stock}</span>
      </div>

      <div className="px-2.5 pb-2.5">
        {product.stock <= 0 ? (
          <p className="text-xs bg-gray-200 py-2 rounded-md text-muted-foreground text-center">
            Stok habis
          </p>
        ) :  (
          <Button
            size="sm"
            variant={inCart ? "outline" : "default"}
            className={cn(
              "w-full h-8 text-xs bg-green-500 hover:bg-green-600",
              inCart && "border-green-500 text-green-600 bg-white hover:bg-green-50"
            )}
            onClick={() => onAdd(product)}
          >
            {inCart ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1" />
                Ditambahkan
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5 mr-1" />
                Tambah
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}